import { Divider } from "@mui/material";
import Card from "../components/Card";
import React, { FormEvent, useState } from "react";
import PostImage from "../components/postcomponents/PostImage";
import { ImageUploadResponse } from "../lib/types";
import Input from "../components/Input";
import Button from "../components/Button";

export default function PostPage() {
  const [images, setImages] = useState<File[]>([]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImages((image) => [...image, ...fileArray]);
    }
  }

  return (
    <Card>
      <h1 className="text-center text-3xl">New Post</h1>
      <section>
        <div>
          <PostImage
            images={images.map((image) => ({
              url: URL.createObjectURL(image),
              deleteHash: "not",
            }))}
          />
        </div>
        <form className="w-full flex flex-col" onSubmit={handleSubmit}>
          <label
            htmlFor="fileUpload"
            className="secondary p-3 w-full rounded-xl mb-2 tx-l text-center hover:cursor-pointer"
          >
            <input
              className="hidden"
              multiple
              type="file"
              id="fileUpload"
              onChange={handleImageChange}
            />
            Fotók feltöltése
          </label>
          <label htmlFor="text">Leírás:</label>
          <textarea
            className="description mb-2"
            placeholder="Leírás"
            name="text"
          />
          <Button text="Post"></Button>

        </form>
      </section>
    </Card>
  );
}
