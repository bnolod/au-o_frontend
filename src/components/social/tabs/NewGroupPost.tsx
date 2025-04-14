
import { useState, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAuthentication } from '../../../contexts/AuthenticationContext';
import { useSnackbar } from '../../../contexts/SnackbarContext';
import { imageUpload } from '../../../lib/ApiCalls/ImageApiCalls';
import { createImageForm } from '../../../lib/functions';
import { CreatePostRequest } from '../../../lib/request/PostCreationRequest';
import { ImageUploadResponse } from '../../../lib/types';
import PostImage from '../../postcomponents/PostImage';
import { postToGroup } from '../../../lib/ApiCalls/GroupApiCalls';

export default function NewGroupPost() {
  const user = useAuthentication();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [newPostForm, setNewPostForm] = useState<CreatePostRequest>();
  const { showSnackbar } = useSnackbar();
  const {id} = useParams();

  //nem hiszem el
  if (loading && user.user !== undefined) {
    setLoading(false);
    setNewPostForm({
      description: '',
      location: '',
      userId: user.user!.id,
      groupId: null,
      eventId: null,
      images: [],
      vehicleId: null,
    });
  }

  const [images, setImages] = useState<File[]>([]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formIsValid()) return null;

    const uploadedImages: ImageUploadResponse[] = [];
    for (const image of images) {
      showSnackbar(`Kép ${image.name} feltöltése folyamatban`, 'info');
      const res = await createImageForm(image, newPostForm!.description, user.user!);
      if (res) {
        const upload = await imageUpload(res);
        if (upload !== null) {
          uploadedImages.push(upload as ImageUploadResponse);
          showSnackbar(`Kép ${image.name} sikeresen feltöltve`, 'success');
        }
        else{
          showSnackbar('Hiba a kép feltöltése közben', 'error');
        }
      }
    }
    postToGroup(Number(id!),{
      text: newPostForm!.description,
      postImages: uploadedImages,
      location: newPostForm!.location,
      vehicleId: null,
    });
    navigate('/groups/'+id);
    showSnackbar('Sikeres posztolás', 'success');
    
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      for (const file of fileArray) {
        //TODO: Other file types
        if(file.type == 'image/webp'){
          showSnackbar('WebP formátum nem támogatott', 'error');
          return;
        }
      };
      setImages((image) => [...image, ...fileArray]);
    }
  }

  function handleImageRemove(index: number) {
    setImages((image) => image.filter((_, i) => i !== index));
  }

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

  return (
    <div className="h-full w-full flex flex-col justify-center align-middle items-center justify-items-center">
      {loading ? (
        <h1 className={'text-7xl text-center italic'}>spinner</h1>
      ) : (
        <div className=" w-full self-center shadow-lg shadow-[#00000022] bg-background p-2 rounded-2xl">
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
                <input className="hidden" multiple type="file"  accept="image/png, image/jpg, image/jpeg" id="fileUpload" onChange={handleImageChange} />
                Fotók feltöltése
              </label>
              <label htmlFor="text">Leírás:</label>
              <textarea
                className="secondary rounded-xl p-3"
                onChange={(e) => {
                  setNewPostForm({ ...newPostForm!, description: e.currentTarget.value });
                }}
                placeholder="Leírás"
                name="text"
              />
              <label htmlFor="location">Lokáció:</label>
              <input
                className="secondary rounded-xl p-3"
                onChange={(e) => {
                  setNewPostForm({ ...newPostForm!, location: e.currentTarget.value });
                }}
                type="text"
                name="location"
              />
             

              <button type="submit" className='p-2 my-2 bg-highlightSecondary rounded-xl'>
                Post
              </button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
