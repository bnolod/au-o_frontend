import { Avatar } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { User, UserResponse } from '../lib/types';
import { useSnackbar } from '../contexts/SnackbarContext';
import { createImageForm } from '../lib/functions';
import { imageUpload } from '../lib/ApiCalls/ImageApiCalls';
import { updateProfile } from '../lib/ApiCalls/UserApiCalls';

export default function DriversLicense({ user, onClose }: { user: UserResponse, onClose: () => void }) {
  const [isDark, setIsDark] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showSnackbar } = useSnackbar();

  const [userRequest, setUserRequest] = useState<User>(user!);
  const [image, setImage] = useState<File>();
  const [displayedImage, setDisplayedImage] = useState<string>(user!.profileImg);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (mq.matches) {
      setIsDark(true);
    }
    // This callback will fire if the perferred color scheme changes without a reload
    mq.addEventListener('change', (evt) => setIsDark(evt.matches));
  }, []);

  //kepfeltoltes teljes kaosz, de eppen mukodik

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setImage(e.target.files[0]);
      setDisplayedImage(URL.createObjectURL(e.target.files[0]));

    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let upload = null;
    if (!user) {
      showSnackbar('nincs user', 'error');
      return;
    }
    if (image) {
      showSnackbar(`Kép ${image.name} feltöltése folyamatban`, 'info');
      const res = createImageForm(image, userRequest!.nickname, user);
      if (res) {
        upload = await imageUpload(res);
        if (upload !== null) {
          setUserRequest({
            ...userRequest,
            profileImg: upload.url,
          });
          console.log(userRequest.profileImg);
          showSnackbar(`Kép ${image.name} sikeresen feltöltve`, 'success');
        } else {
          showSnackbar('Hiba a kép feltöltése közben', 'error');
          return;
        }
      }
    }
    if (null != updateProfile(userRequest.nickname, userRequest.bio, upload ? upload.url : userRequest.profileImg)) {
      showSnackbar('Sikeres profil frissítés', 'success');
      onClose()
    } else {
      showSnackbar('Hiba a profil frissítése közben', 'error');
    }
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="bg-backdropSecondary flex flex-col gap-2 text-textColor rounded-xl p-3 w-6/12 aspect-[90/55]">
      <div className="flex items-center">
        <img
          src={isDark ? '/assets/auoLogo_white.svg' : '/assets/auoLogo_black.svg'}
          className="w-1/3"
          alt="AUO logo"
        />
        <h1 className="text-5xl text-right text-textColor/50 flex-grow">_igazolvány</h1>
      </div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="flex flex-row gap-6">
          <input
            type="file"
            name="image"
            className="hidden"
            accept="image/png, image/jpg, image/jpeg"
            id="image"
            ref={fileInputRef}
            onChange={onImageChange}
          />
          <div
            className="w-1/2 cursor-pointer hover:opacity-75 rounded-2xl overflow-hidden"
            onClick={handleAvatarClick}
          >
            <Avatar src={displayedImage} sx={{ width: '100%', height: '100%' }} variant="square">
              {userRequest?.nickname.substring(0, 3).toUpperCase()}
            </Avatar>
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="username"
              disabled
              value={`@${userRequest?.username}`}
              className="w-full  bg-backdropSecondary p-2"
            />
            <br />
            <label htmlFor="nickname">Nickname: </label>
            <input
              type="text"
              name="nickname"
              value={userRequest?.nickname}
              className="border-b-2 w-full border-b-black outline-none focus:border-b-highlightPrimary bg-backdropSecondary p-2"
              onChange={(e) => setUserRequest({ ...userRequest, nickname: e.target.value })}
            />
            <br />
            <label htmlFor="nickname">Bio: </label>
            <input
              type="text"
              name="nickname"
              value={userRequest?.bio}
              className="border-b-2 w-full border-b-black outline-none focus:border-b-highlightPrimary bg-backdropSecondary p-2"
              onChange={(e) => setUserRequest({ ...userRequest, bio: e.target.value })}
            />
            <br />
          </div>
        </div>
        <button className="bg-highlightPrimary p-2 rounded-full" type="submit">
          Edit
        </button>
      </form>
    </div>
  );
}
