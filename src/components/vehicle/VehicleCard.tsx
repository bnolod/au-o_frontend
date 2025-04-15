import { MdCalendarMonth, MdCheck, MdClose, MdEdit, MdEngineering, MdKey, MdSpellcheck } from 'react-icons/md';
import { Car } from '../../lib/entity/Car';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import React, { useEffect, useState } from 'react';
import { Post } from '../../lib/entity/Post';
import { editCar, getPostsByVehicleId } from '../../lib/ApiCalls/CarApiCalls';
import { ImageList, ImageListItem } from '@mui/material';
import { getAspectRatio } from '../../lib/functions';
import VehicleTypeSelector from './VehicleTypeSelector';
import { CarType } from '../../lib/types';
import { GetCarImage } from '../cars';
import { FaGear, FaHorse } from 'react-icons/fa6';
import { CarCreationRequest } from '../../lib/request/CarCreationRequest';
import { useSnackbar } from '../../contexts/SnackbarContext';

export default function VehicleCard({
  car,
  closeFn,
  editMode = false,
}: {
  car: Car;
  closeFn?: () => void;
  editMode: boolean;
}) {
  const { user: authUser } = useAuthentication();
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [carEditable, setCarEditable] = useState<Car>(car);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [carTypeModal, setCarTypeModal] = useState(false);
  const {showSnackbar} = useSnackbar()

  const handlePostFetch = async () => {
    const res = await getPostsByVehicleId(car.id);
    if (res != null) {
      setPosts(res);
    }
  };

  useEffect(() => {
    handlePostFetch();
  }, [car]);

  function handleCancel() {
    setCarEditable(car);
    setIsEditing(false);
    setCarTypeModal(false);
  }
  async function handleSave() {
    const carToSave: CarCreationRequest = {...carEditable} 
    const req = await editCar(car.id, carToSave);
    if (req) {
      setIsEditing(false);
      showSnackbar("Car edited successfully", "success")
    
    return}
    
    showSnackbar("Failed to edit car", "error")
  }
  let isOwner = authUser && authUser.id == car.owner?.id;

  return (
    <div className="w-full m-4 md:w-1/2 flex flex-col bg-background h-full rounded-2xl overflow-hidden gap-6">
      <header className="w-full flex flex-row justify-between p-4 bg-backdropSecondary items-center">
        {car.owner ? (
          <p className="text-xl">
            Car of
            <span className="font-bold"> @{car.owner?.username}</span>
          </p>
        ) : (
          <p className="text-xl">Car</p>
        )}
        {closeFn && (
          <MdClose
            className="cursor-pointer hover:opacity-75"
            size={32}
            onClick={() => {
              closeFn();
            }}
          />
        )}
      </header>
      <main className="overflow-y-scroll flex flex-col gap-4">
        <section className="bg-backdropSecondary dshadow mx-4 p-4 rounded-xl flex flex-col">
          <div className="flex flex-row">
            <div className="flex flex-col gap-2 w-1/2">
              <input
                type="text"
                disabled={!isEditing}
                value={carEditable.manufacturer}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCarEditable({ ...carEditable, manufacturer: e.target.value })
                }
                className={` ${
                  isEditing ? 'bg-backdropPrimary border border-black dark:border-white' : 'bg-transparent'
                } text-2xl p-2 rounded-xl font-bold`}
              />
              <input
                disabled={!isEditing}
                type="text"
                value={carEditable.model}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCarEditable({ ...carEditable, model: e.target.value })
                }
                className={` ${
                  isEditing ? 'bg-backdropPrimary border border-black dark:border-white' : 'bg-transparent'
                } p-2 rounded-xl`}
              />

              <button
                onClick={
                  !isEditing
                    ? () => {}
                    : () => {
                        setCarTypeModal(!carTypeModal);
                      }
                }
                className={` ${
                  isEditing
                    ? 'bg-backdropPrimary border border-black dark:border-white'
                    : 'bg-transparent pointer-events-none'
                } p-2 text-left rounded-xl`}
              >
                {carEditable.type}
              </button>

              <VehicleTypeSelector
                typeSelectorOpen={carTypeModal}
                closeTypeSelector={() => setCarTypeModal(false)}
                selected={carEditable.type}
                setSelected={(value: CarType) => {
                  setCarEditable({ ...carEditable, type: value });
                }}
              />
            </div>
            <div className="flex flex-grow justify-end">
              <GetCarImage
                height={180}
                strokeWidth={1.5}
                stroke="#fff"
                type={carEditable.type}
                width={'100%'}
              ></GetCarImage>
            </div>
          </div>
          {isOwner &&
            (!isEditing ? (
              <div className="w-full">
                <button
                  onClick={() => setIsEditing(true)}
                  className="ml-auto shadow-md shadow-[#00000066] py-2 px-4 rounded-xl bg-highlightSecondary flex flex-row items-center justify-center gap-2"
                >
                  <MdEdit size={20}></MdEdit>
                  Edit car
                </button>
              </div>
            ) : (
              <div className="w-fit self-end flex flex-row justify-end items-center gap-2">
                <button
                  onClick={handleCancel}
                  className=" shadow-md shadow-[#00000066] py-2 px-4 rounded-xl bg-backdropPrimary flex flex-row items-center justify-center gap-2"
                >
                  <MdClose size={20} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className=" shadow-md shadow-[#00000066] py-2 px-4 rounded-xl bg-highlightSecondary flex flex-row items-center justify-center gap-2"
                >
                  <MdCheck size={20} />
                  Save
                </button>
              </div>
            ))}
        </section>
        <section className="pb-4 flex flex-col gap-4">
          <div className="flex justify-between flex-row mx-4 p-4 rounded-2xl bg-backdropPrimary dshadow items-center gap-4">
            <span className="flex flex-row items-center gap-4">
              <FaHorse size={32} />
              <p className="text-textColor/75">Horsepower:</p>
            </span>

            <input
              disabled={!isEditing}
              type="number"
              value={carEditable.horsepower}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCarEditable({ ...carEditable, horsepower: parseInt(e.target.value) })
              }
              className={` ${
                isEditing ? 'bg-backdropPrimary border border-black dark:border-white' : 'bg-transparent'
              } p-2 rounded-xl self-end w-fit text-right`}
            />
          </div>
          <div className="flex flex-row mx-4 p-4 rounded-2xl justify-between bg-backdropPrimary dshadow items-center gap-4">
            <span className="flex flex-row items-center gap-4">
              <FaGear size={32} />
              <p className="text-textColor/75">Displacement:</p>
            </span>

            <input
              disabled={!isEditing}
              type="number"
              step={0.1}
              value={carEditable.displacement/10}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCarEditable({ ...carEditable, displacement: parseFloat(e.target.value)*10 })
              }
              className={` ${
                isEditing ? 'bg-backdropPrimary border border-black dark:border-white' : 'bg-transparent'
              } p-2 rounded-xl self-end w-fit text-right`}
            />
          </div>
          <div className="flex flex-row mx-4 p-4 justify-between rounded-2xl bg-backdropPrimary dshadow items-center gap-4">

          <span className="flex flex-row  items-center gap-4">
              <MdCalendarMonth size={32} />
              <p className="text-textColor/75">Production Year:</p>
            </span>

            <input
              disabled={!isEditing}
              type="number"
              step={1}
              value={carEditable.productionYear}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCarEditable({ ...carEditable, productionYear: parseFloat(e.target.value) })
              }
              className={` ${
                isEditing ? 'bg-backdropPrimary border border-black dark:border-white' : 'bg-transparent'
              } p-2 rounded-xl self-end w-fit text-right`}
            />
          </div>
          <div className="flex flex-col mx-4 p-4 rounded-2xl bg-backdropPrimary dshadow items-center gap-4">
            <div className="flex flex-row w-full gap-4">
              <MdSpellcheck size={32} />
              <p className="text-textColor/75">Description:</p>
            </div>
            <textarea className={`${!isEditing ? "w-full pointer-events-none bg-transparent" : "bg-backdropSecondary"} p-2 rounded-xl break-words w-full`}>{car.description}</textarea>
          </div>
        </section>
        <section className=" px-4 pb-16">
          {posts != null && posts.length > 0 ? (
            <div>
              <h1 className="text-center text-2xl pb-4">Featured in:</h1>

              <ImageList variant="masonry" cols={2} gap={16}>
                {posts
                  .slice()
                  .reverse()
                  .map((post) => (
                    <ImageListItem key={post.postId}>
                      <div className="w-full bg-backdropSecondary rounded-xl">
                        <img
                          src={post.images[0]?.url}
                          className="rounded-xl w-full object-cover cursor-pointer hover:opacity-75 transition-opacity bg-backdropPrimary"
                          onLoad={(e) => {
                            const img = e.target as HTMLImageElement;
                            const aspectClass = getAspectRatio(img.naturalWidth, img.naturalHeight);
                            img.classList.add(aspectClass);
                          }}
                          onClick={() => handlePostClick(post)}
                          alt="Post"
                        />
                        <p className="px-3 text-textColor/50 py-2 truncate"> {post.text}</p>
                      </div>
                    </ImageListItem>
                  ))}
              </ImageList>
            </div>
          ) : (
            <p className="text-center text-textColor/50">No posts with this vehicle found.</p>
          )}
        </section>
      </main>
    </div>
  );
}
