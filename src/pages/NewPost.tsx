import Card from '../components/Card';
import React, { FormEvent, useState } from 'react';
import PostImage from '../components/postcomponents/PostImage';
import { ImageUploadResponse } from '../lib/types';

import Button from '../components/Button';
import { useAuthentication } from '../contexts/AuthenticationContext';
import { createImageForm } from '../lib/functions';
import { imageUpload } from '../lib/ApiCalls/ImageApiCalls';
import { CreatePostRequest } from '../lib/request/PostCreationRequest';
import { publishPost } from '../lib/ApiCalls/PostApiCalls';

export default function PostPage() {
  const user = useAuthentication();

  const [loading, setLoading] = useState<boolean>(true);
  const [newPostForm, setNewPostForm] = useState<CreatePostRequest>();
  const [formLocation, setFormLocation] = useState<string>("");
  const [formText, setFormText] = useState<string>("");
  

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
  console.log('setloading' + loading);
  const [images, setImages] = useState<File[]>([]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const uploadedImages: ImageUploadResponse[] = [];
    for (const image of images) {
      console.log(image);
      const res = await createImageForm(image, newPostForm!.description, user.user!);
      if (res) {
        const upload = await imageUpload(res);
        if (upload) {
          uploadedImages.push(upload);
        }
      }
    }
    publishPost({text: formText, postImages: uploadedImages, location: formLocation, vehicleId: null});
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImages((image) => [...image, ...fileArray]);
    }
  }

  return (
    <div className='h-full w-full flex flex-col justify-center align-middle items-center justify-items-center'>
      {loading ? (
        <h1 className={'text-7xl text-center italic'}>spinner</h1>
      ) : (
        <Card className=' mt-4 w-full self-center shadow-lg shadow-[#00000022]' >
          <h1 className="text-center text-3xl">New Post</h1>
          <section>
            <div>
              <PostImage
                images={images.map((image) => ({
                  url: URL.createObjectURL(image),
                  deleteHash: 'not',
                }))}
              />
            </div>
            <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
              <label
                htmlFor="fileUpload"
                className="secondary p-3 w-full rounded-xl tx-l text-center hover:cursor-pointer"
              >
                <input className="hidden" multiple type="file" id="fileUpload" onChange={handleImageChange} />
                Fotók feltöltése
              </label>
              <label htmlFor="text">Leírás:</label>
              <textarea className="secondary rounded-xl p-3" placeholder="Leírás" name="text" />
              <label htmlFor="location">Lokáció:</label>
              <input className="secondary rounded-xl p-3" type="text" name="location" />
              <span className="flex gap-3">
                <span className="flex flex-grow flex-col">
                  <label htmlFor="event">Esemény:</label>
                  <input type="text" name="event" className="secondary rounded-xl p-3 w-full" />
                </span>
                <span className="flex flex-grow flex-col">
                  <label htmlFor="group">Csoport:</label>
                  <input type="text" name="event" className="secondary rounded-xl p-3 w-full" />
                </span>
              </span>

              <Button type="submit" secondary>
                Post
              </Button>
            </form>
          </section>
        </Card>
      )}
    </div>
  );
}
