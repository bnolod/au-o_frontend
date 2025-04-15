import Card from '../components/Card';
import React, { FormEvent, useEffect, useState } from 'react';
import PostImage from '../components/postcomponents/PostImage';
import { Car, ImageUploadResponse } from '../lib/types';

import Button from '../components/Button';
import { useAuthentication } from '../contexts/AuthenticationContext';
import { createImageForm } from '../lib/functions';
import { imageUpload } from '../lib/ApiCalls/ImageApiCalls';
import { CreatePostRequest } from '../lib/request/PostCreationRequest';
import { publishPost } from '../lib/ApiCalls/PostApiCalls';
import { useSnackbar } from '../contexts/SnackbarContext';
import { useNavigate } from 'react-router';
import { PostCreationTexts } from '../constants/texts';
import { useLanguage } from '../contexts/LanguageContext';
import { Modal } from '@mui/material';
import { getUserGarageById } from '../lib/ApiCalls/CarApiCalls';
import VehiclePageItem from '../components/vehicle/VehiclePageItem';
import { validateUserPost } from '../lib/Validation/Validation';

export default function PostPage() {
  const { user } = useAuthentication();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [newPostForm, setNewPostForm] = useState<CreatePostRequest>();
  const [vehicleOpen, setVehicleOpen] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>();

  //nem hiszem el
  if (loading && user !== undefined) {
    setLoading(false);
    setNewPostForm({
      description: '',
      location: '',
      userId: user!.id,
      groupId: null,
      eventId: null,
      images: [],
      vehicleId: null,
    });
  }

  const [images, setImages] = useState<File[]>([]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formIsValid()) return;
    const uploadedImages: ImageUploadResponse[] = [];
    for (const image of images) {
      showSnackbar(`Kép ${image.name} feltöltése folyamatban`, 'info');
      const res = await createImageForm(image, newPostForm!.description, user!);
      if (res) {
        const upload = await imageUpload(res);
        if (upload !== null) {
          uploadedImages.push(upload as ImageUploadResponse);
          showSnackbar(`Kép ${image.name} sikeresen feltöltve`, 'success');
        } else {
          showSnackbar('Hiba a kép feltöltése közben', 'error');
        }
      }
    }
    publishPost({
      text: newPostForm!.description,
      postImages: uploadedImages,
      location: newPostForm!.location,
      vehicleId: newPostForm!.vehicleId || null,
    });
    navigate('/profile');
    showSnackbar('Sikeres posztolás', 'success');
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      for (const file of fileArray) {
        //TODO: Other file types
        if (file.type == 'image/webp') {
          showSnackbar('WebP formátum nem támogatott', 'error');
          return;
        }
      }
      setImages((image) => [...image, ...fileArray]);
    }
  }

  function handleImageRemove(index: number) {
    setImages((image) => image.filter((_, i) => i !== index));
  }
  const handleFetch = async () => {
    if (user) {
      const res = await getUserGarageById(user.id);
      if (res) {
        setCars(res);
      }
    }
  };

  useEffect(() => {
    handleFetch();
  }, [user]);
  function formIsValid() {
    if (newPostForm?.description === '') {
      showSnackbar('Hiányzó leírás', 'error');
      return false;
    }
    if (newPostForm?.location === '') {
      showSnackbar('Hiányzó lokáció', 'error');
      return false;
    }
    if (images.length === 0) {
      showSnackbar('Hiányzó képek', 'error');
      return false;
    }
    return true;
  }

  function handleVehicleSelect(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setVehicleOpen(true);
  }

  return (
    <div className="h-full w-full flex flex-col justify-center align-middle items-center justify-items-center">
      {loading ? (
        <h1 className={'text-7xl text-center italic'}>Spinner</h1>
      ) : (
        <Card className=" w-full self-center shadow-lg shadow-[#00000022]">
          <h1 className="text-center text-3xl">New Post</h1>
          <section>
            <div>
              <PostImage
                editMode={true}
                images={images.map((image) => ({
                  url: URL.createObjectURL(image),
                  deleteHash: 'not',
                }))}
                onImageRemove={handleImageRemove}
              />
            </div>
            <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
              <label
                htmlFor="fileUpload"
                className="secondary p-3 w-full rounded-xl tx-l text-center hover:cursor-pointer"
              >
                <input
                  className="hidden"
                  multiple
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  id="fileUpload"
                  onChange={handleImageChange}
                />
                {PostCreationTexts.upload[language]}
              </label>
              <label htmlFor="text">{PostCreationTexts.form.description.label[language]}</label>
              <textarea
                className="secondary rounded-xl p-3"
                onChange={(e) => {
                  setNewPostForm({ ...newPostForm!, description: e.currentTarget.value });
                }}
                placeholder={PostCreationTexts.form.description.placeholder[language]}
                name="text"
              />
              <label htmlFor="location">{PostCreationTexts.form.location.label[language]}</label>
              <input
                className="secondary rounded-xl p-3"
                onChange={(e) => {
                  setNewPostForm({ ...newPostForm!, location: e.currentTarget.value });
                }}
                type="text"
                name="location"
                placeholder={PostCreationTexts.form.location.placeholder[language]}
              />

              <label htmlFor="">{PostCreationTexts.form.vehicle[language]}</label>
              {user && newPostForm && (
                <button onClick={handleVehicleSelect} className="w-full p-3 bg-backdropSecondary rounded-xl">
                  {PostCreationTexts.form.vehicle[language] +
                    ': ' +
                    ( selectedCar && selectedCar.model || "none" )}
                </button>
              )}

              <Modal
                open={vehicleOpen}
                onClose={() => setVehicleOpen(false)}
                className="w-full h-full flex text-textColor items-center justify-center"
              >
                <div className="w-full h-5/6 md:w-2/4 md:h-3/4 p-3 bg-background rounded-3xl">
                  <div className="h-full overflow-y-scroll ">
                    {cars.map((car) => {
                      return (
                        <div onClick={() => {
                          setNewPostForm({ ...newPostForm!, vehicleId: Number(car.id) });
                          setSelectedCar(car);
                          setVehicleOpen(false);
                          showSnackbar('Jármű kiválasztva', 'success');
                        }}>
                        <div className='pointer-events-none'>
                          <VehiclePageItem car={car} />
                        </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Modal>

              <Button type="submit" secondary>
                {PostCreationTexts.confirmPost[language]}
              </Button>
            </form>
          </section>
        </Card>
      )}
    </div>
  );
}
