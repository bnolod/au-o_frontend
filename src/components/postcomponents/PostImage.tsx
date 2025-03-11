import { useState } from 'react';
import { ImageUploadResponse } from '../../lib/types';
import { MdArrowBackIos, MdArrowForwardIos, MdClose } from 'react-icons/md';

export default function PostImage({
  images,
  editMode = false,
  onImageRemove,
}: {
  images: ImageUploadResponse[];
  editMode?: boolean;
  onImageRemove: (index: number) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);



  function nextSlide() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }
  function prevSlide() {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }
  console.log(currentIndex)

  return (
    <div className="relative w-full mx-auto  rounded-xl p-4">
      <div className="overflow-hidden relative m-auto w-9/12 aspect-square ">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex justify-center transition-transform transform ${
                index === currentIndex ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <img src={image.url} alt={`Slide ${index}`} className=" rounded-2xl object-contain" />
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
