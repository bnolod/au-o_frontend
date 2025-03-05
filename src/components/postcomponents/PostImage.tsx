import { useState } from "react";
import { ImageUploadResponse } from "../../lib/types";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

export default function PostImage({ images }: { images: ImageUploadResponse[] }) {

  const [currentIndex, setCurrentIndex] = useState(0);
  
  function nextSlide (){
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }
  function prevSlide(){
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);

  }
  return (
    <div className="relative w-full mx-auto  rounded-xl p-4">
      <div className="overflow-hidden relative min-h-96 ">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex justify-center transition-transform transform ${
              index === currentIndex ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <img src={image.url} alt={`Slide ${index}`} className="h-full rounded-2xl object-contain" />
          </div>
        ))}
      </div>
      <div className="absolute top-2 right-2 px-3 bg-backdropSecondary rounded-xl p-1">{currentIndex+1}/{images.length}</div>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 rounded-ful p-2"
        onClick={prevSlide}
      >
        <MdArrowBackIos/>
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 rounded-full p-2"
        onClick={nextSlide}
      >
        <MdArrowForwardIos/>
      </button>
    </div>
  );
}
