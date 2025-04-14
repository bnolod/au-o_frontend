import { FaMagnifyingGlass, FaPlus, FaX } from 'react-icons/fa6';
import { useRef, useState } from 'react';
import { Modal } from '@mui/material';
import { MdClose, MdGroup } from 'react-icons/md';
import { createImageForm } from '../../../lib/functions';
import { GroupCreationRequest } from '../../../lib/request/GroupCreationRequest';
import { useSnackbar } from '../../../contexts/SnackbarContext';
import { useAuthentication } from '../../../contexts/AuthenticationContext';
import { imageUpload } from '../../../lib/ApiCalls/ImageApiCalls';

export default function GroupHeader() {
  const [open, setOpen] = useState(false);
  const {showSnackbar} = useSnackbar();
  const {user} = useAuthentication();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File>();
  const [displayedImage, setDisplayedImage] = useState<string>('');
  const [newGroupForm, setNewGroupForm] = useState<GroupCreationRequest>({
    name: '',
    description: '',
    alias: '',
    bannerImage: '',
    public: true,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let upload = null;
      if (!user) {
        showSnackbar('nincs user', 'error');
        return;
      }
      if (image) {
        showSnackbar(`Kép ${image.name} feltöltése folyamatban`, 'info');
        const res = createImageForm(image, `groupimage_${newGroupForm.name}` , user);
        if (res) {
          upload = await imageUpload(res);
          if (upload !== null) {
            setNewGroupForm({
              ...newGroupForm,
              bannerImage: upload.url,
            });
            showSnackbar(`Kép ${image.name} sikeresen feltöltve`, 'success');
          } else {
            showSnackbar('Hiba a kép feltöltése közben', 'error');
            return;
          }
        }
      }
      if (null != updateProfile(userRequest.nickname, userRequest.bio, upload ? upload.url : userRequest.profileImg)) {
        showSnackbar('Sikeres profil frissítés', 'success');
      } else {
        showSnackbar('Hiba a profil frissítése közben', 'error');
      }
    };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setImage(e.target.files[0]);
      setDisplayedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Modal
        className="h-full w-full text-textColor flex flex-col justify-center items-center"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="w-full lg:w-1/2 bg-background h-4/5 lg:h-2/3 overflow-y-scroll rounded-2xl">
          <div className="p-4 bg-backdropSecondary flex justify-between items-center sticky top-0">
            <h1 className="text-xl flex flex-row items-center gap-2">
              <MdGroup size={32}></MdGroup>
              Create a group
            </h1>
            <MdClose size={32} className="cursor-pointer hover:opacity-50" onClick={handleClose}></MdClose>
          </div>
          <section className="min-h-full w-full flex flex-col gap-2 p-8">
            <label htmlFor="groupName" className="text-textColor/75">
              Group Name
            </label>
            <input
              type="text"
              name="groupName"
              maxLength={32}
              placeholder="Car Group 1"
              className="w-full py-3 focus:outline-highlightSecondary focus:outline-none px-4 rounded-xl bg-backdropPrimary"
            />
            <label htmlFor="groupName" className="text-textColor/75">
              Description
            </label>
            <input
              type="text"
              name="description"
              maxLength={32}
              placeholder="This group is about..."
              className="w-full py-3 focus:outline-highlightSecondary focus:outline-none px-4 rounded-xl bg-backdropPrimary"
            />
            <label htmlFor="groupName" className="text-textColor/75">
              Alias (optional)
            </label>
            <input
              type="text"
              name="groupName"
              maxLength={32}
              placeholder="MYGROUP"
              className="w-full py-3 focus:outline-highlightSecondary focus:outline-none px-4 rounded-xl bg-backdropPrimary"
            />
            <div className="w-full flex flex-row gap-2 items-center my-2">
              <input
                type="checkbox"
                name="publiccheckbox"
                className="w-5 h-5 text-blue-600 bg-backdropSecondary border-gray-300 rounded-sm focus:ring-blue-500  dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="publiccheckbox">Private group</label>
            </div>
            <input type="file" className="bg-red-500 hidden" ref={fileInputRef} name="image" onChange={onImageChange} />
            <button
              className="p-3 bg-highlightSecondary rounded-xl w-1/3 mx-auto"
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.click();
                }
              }}
            >
              Upload Banner image {image && image.name}
            </button>
            <button className="my-4 bg-highlightPrimary w-1/2 p-4 rounded-2xl shadow-lg shadow-[#00000022] hover:opacity-75 transition-opacity m-auto">
              Create group
            </button>
          </section>
        </div>
      </Modal>
      <div className="flex flex-row w-full gap-2 items-center h-12">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 h-full px-4 text-sm border-2 border-backdropSecondary secondary rounded-xl focus:border-highlightPrimary focus:outline-none"
        />
        <button className="bg-highlightPrimary h-full aspect-square p-2 flex flex-col rounded-2xl">
          <FaMagnifyingGlass size={16} className="m-auto" />
        </button>
        <button
          className="flex flex-row items-center justify-center h-full aspect-square hover:aspect-auto bg-highlightSecondary rounded-xl text-white transition-all duration-300 overflow-hidden group"
          onClick={handleOpen}
        >
          <span className="flex items-center justify-center w-full h-full transition-all duration-300 group-hover:w-auto group-hover:mx-2">
            <FaPlus className="text-lg" />
          </span>
          <p className="w-0 transition-all duration-300 group-hover:opacity-100 group-hover:w-auto group-hover:px-2 text-nowrap">
            Create Group
          </p>
        </button>
      </div>
    </>
  );
}
