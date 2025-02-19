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
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="overflow-hidden relative h-96">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform transform ${
              index === currentIndex ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <img src={image.url} alt={`Slide ${index}`} className="w-full h-full object-contain" />
          </div>
        ))}
      </div>
      <div className="absolute top-2 right-2 bg-backdropSecondary rounded-xl p-1">{currentIndex+1}/{images.length}</div>
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
