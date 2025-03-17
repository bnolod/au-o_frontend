import { Avatar } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { User, UserResponse } from '../lib/types';
import { useSnackbar } from '../contexts/SnackbarContext';
import { createImageForm } from '../lib/functions';
import { imageUpload } from '../lib/ApiCalls/ImageApiCalls';
import { updateProfile } from '../lib/ApiCalls/UserApiCalls';

export default function DriversLicense({ user }: { user: UserResponse }) {
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
    if (!image || !user) {
      showSnackbar('nincs image vagy user', 'error');
      return;
    }
    showSnackbar(`Kép ${image.name} feltöltése folyamatban`, 'info');
    const res = await createImageForm(image, userRequest!.nickname, user);
    if (res) {
      const upload = await imageUpload(res);
      if (upload !== null) {
        setUserRequest({
          ...userRequest,
          profileImg: upload.url,
        });
        console.log(userRequest.profileImg)
        showSnackbar(`Kép ${image.name} sikeresen feltöltve`, 'success');
      } else {
        showSnackbar('Hiba a kép feltöltése közben', 'error');
        return;
      }
      if (null != updateProfile(userRequest.nickname, userRequest.bio, upload.url)) {
        showSnackbar('Sikeres profil frissítés', 'success');
      } else {
        showSnackbar('Hiba a profil frissítése közben', 'error');
      }
    }
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="bg-backdropSecondary text-textColor rounded-xl p-3 w-4/12 aspect-[90/55]">
      <div className="flex items-center">
        <img
          src={isDark ? '/assets/auoLogo_white.svg' : '/assets/auoLogo_black.svg'}
          className="w-1/3"
          alt="AUO logo"
        />
        <h1 className="text-5xl text-center flex-grow">_igazolvány</h1>
      </div>
      <form className="flex h-full" onSubmit={handleSubmit}>
        <input type="file" name="image" className="hidden" id="image" ref={fileInputRef} onChange={onImageChange} />
        <div className="w-1/3 h-3/4 justify-start flex" onClick={handleAvatarClick}>
          <Avatar src={displayedImage} sx={{ width: '100%', height: '100%' }} variant="square">
            {userRequest?.nickname.substring(0, 3).toUpperCase()}
          </Avatar>
        </div>
        <div className="w-2/3">
          <label htmlFor="nickname">Nickname: </label>
          <input
            type="text"
            name="nickname"
            value={userRequest?.nickname}
            className="bg-backdropPrimary"
            onChange={(e) => setUserRequest({ ...userRequest, nickname: e.target.value })}
          />
          <br />
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" value={`@${userRequest?.username}`} className="bg-backdropPrimary" />
          <br />
          <label htmlFor="nickname">Nickname: </label>
          <input type="text" name="nickname" value={userRequest?.nickname} className="bg-backdropPrimary" />
          <br />
        </div>
        <button className="bg-highlightPrimary rounded-full" type="submit">
          gomb
        </button>
      </form>
    </div>
  );
}
