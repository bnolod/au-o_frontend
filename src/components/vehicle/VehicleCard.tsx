import {
  Md10Mp,
  MdAndroid,
  MdBadge,
  MdCalendarMonth,
  MdClose,
  MdEdit,
  MdEngineering,
  MdKey,
  MdOutlineEngineering,
  MdSettingsAccessibility,
  MdSpeaker,
  MdSpeakerGroup,
  MdSpellcheck,
} from 'react-icons/md';
import { Car } from '../../lib/entity/Car';
import { NavLink } from 'react-router';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import React, { useEffect, useState } from 'react';
import { Post } from '../../lib/entity/Post';
import { getPostsByVehicleId } from '../../lib/ApiCalls/CarApiCalls';
import { ImageList, ImageListItem } from '@mui/material';
import { getAspectRatio } from '../../lib/functions';
import VehicleTypeSelector from './VehicleTypeSelector';
import { CarType } from '../../lib/types';

export default function VehicleCard({ car, closeFn, editMode = false}: { car: Car; closeFn?: () => void, editMode:boolean }) {
  const { user: authUser } = useAuthentication();
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [carEditable, setCarEditable] = useState<Car>(car);
  const [carTypeModal, setCarTypeModal] = useState(false);

  const handlePostFetch = async () => {
    const res = await getPostsByVehicleId(car.id);
    if (res != null) {
      setPosts(res);
    }
  };

  useEffect(() => {
    handlePostFetch();
  }, [car]);


  


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
            <div>
              <input
              type="text"
              value={carEditable.manufacturer}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCarEditable({ ...carEditable, manufacturer: e.target.value })
              }
              className="text-2xl w-full bg-transparent font-bold"
              />
              <input
              type="text"
              value={carEditable.model}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCarEditable({ ...carEditable, model: e.target.value })
              }
              className="w-full bg-transparent"
              />
              
              <button
              onClick={()=>{setCarTypeModal(!carTypeModal)}}
              className="text-textColor/50 bg-transparent w-full"
              >{carEditable.type}</button>

              {carTypeModal && <VehicleTypeSelector selected={carEditable.type} setSelected={(value:CarType)=>{setCarEditable({...carEditable, type: value})}}/>}
            </div>
          </div>
          {authUser && authUser.id == car.owner?.id && (
            <div className="w-full">
              <button className="ml-auto shadow-md shadow-[#00000066] py-2 px-4 rounded-xl bg-highlightSecondary flex flex-row items-center justify-center gap-2">
                <MdEdit size={20}></MdEdit>
                Edit car
              </button>
            </div>
          )}
        </section>
        <section className="pb-4 flex flex-col gap-4">
          <div className="flex flex-row mx-4 p-4 rounded-2xl bg-backdropPrimary dshadow items-center gap-4">
            <MdEngineering size={32} />
            <p className="text-textColor/75">Horsepower:</p>
            <p className="ml-auto px-4 text-lg font-bold">{car.horsepower} HP</p>
          </div>
          <div className="flex flex-row mx-4 p-4 rounded-2xl bg-backdropPrimary dshadow items-center gap-4">
            <MdKey size={32} />
            <p className="text-textColor/75">Displacement:</p>
            <p className="ml-auto px-4 text-lg font-bold">{car.displacement} L</p>
          </div>
          <div className="flex flex-row mx-4 p-4 rounded-2xl bg-backdropPrimary dshadow items-center gap-4">
            <MdCalendarMonth size={32} />
            <p className="text-textColor/75">Horsepower:</p>
            <p className="ml-auto px-4 text-lg font-bold">{car.productionYear}</p>
          </div>
          <div className="flex flex-col mx-4 p-4 rounded-2xl bg-backdropPrimary dshadow items-center gap-4">
            <div className="flex flex-row w-full gap-4">
              <MdSpellcheck size={32} />
              <p className="text-textColor/75">Description:</p>
            </div>
            <p className="w-full break-words">{car.description}</p>
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
