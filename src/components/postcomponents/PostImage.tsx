import { useState } from 'react';
import { ImageUploadResponse } from '../../lib/types';
import { MdArrowBackIos, MdArrowForwardIos, MdCarCrash, MdClose, MdOutlineArrowRight } from 'react-icons/md';
import { Modal } from '@mui/material';
import VehicleCard from '../vehicle/VehicleCard';
import { Car } from '../../lib/entity/Car';
import VehiclePageItem from '../vehicle/VehiclePageItem';
import { useAuthentication } from '../../contexts/AuthenticationContext';

export default function PostImage({
  images,
  editMode = false,
  car,
  onImageRemove,
}: {
  images: ImageUploadResponse[];
  editMode?: boolean;
  onImageRemove: (index: number) => void;
  car?: Car;
}) {
  const {user} = useAuthentication()
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  function nextSlide() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }
  function prevSlide() {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }
  console.log(currentIndex);

  return (
    <div className="relative w-full mx-auto  bg-background pt-4">
      {car && (
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          className="flex items-center justify-center p-4 text-textColor"
        >
          <VehicleCard
          editMode={car.owner?.id === user?.id}
            closeFn={() => {
              setOpenModal(false);
            }}
            car={car}
          />
        </Modal>
      )}
      {car && (
        <div
          className="absolute w-full bg-backdropSecondary/75 h-16 px-2 z-50 bottom-0 flex flex-row cursor-pointer hover:opacity-50 items-center transition-opacity"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <MdCarCrash size={48} className="mr-4" />
          <div>
            <p className="font-bold text-lg">{car.manufacturer}</p>
            <p>{car.model}</p>
          </div>
          <MdOutlineArrowRight className="ml-auto mr-2" size={32} />
        </div>
      )}
      <div className="overflow-hidden relative m-auto w-full aspect-[8/5] ">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full flex justify-center transition-transform transform ${
                index === currentIndex ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <img
                src={image.url}
                alt={`Slide ${index}`}
                className=" rounded-2xl overflow-hidden object-contain h-full"
              />
            </div>
          ))
        ) : (
          <div className={`absolute inset-0 flex justify-center transition-transform transform`}>
            <img
              src={'./examples/AvatarPlaceholder.png'}
              alt={'PostImage'}
              className="h-full rounded-2xl object-contain"
            />
          </div>
        )}
      </div>
      {images.length > 0 && editMode && (
        <div
          className="absolute top-2 left-2 px-3 bg-highlightPrimary rounded-xl p-1 text-2xl"
          onClick={() => {
            onImageRemove(currentIndex);
            if (currentIndex > 0) {
              setCurrentIndex(currentIndex - 1);
            }
          }}
        >
          <MdClose />
        </div>
      )}
      {images.length > 1 && (
        <>
          <div className="absolute top-2 right-2 px-3 bg-backdropSecondary rounded-xl p-1">
            {currentIndex + 1}/{images.length}
          </div>
          <button className="absolute top-1/2 left-0 transform -translate-y-1/2 rounded-ful p-2" onClick={prevSlide}>
            <MdArrowBackIos />
          </button>
          <button className="absolute top-1/2 right-0 transform -translate-y-1/2 rounded-full p-2" onClick={nextSlide}>
            <MdArrowForwardIos />
          </button>
        </>
      )}
    </div>
  );
}
