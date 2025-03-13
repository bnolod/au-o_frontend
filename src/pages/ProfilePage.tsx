import { Avatar, Modal } from '@mui/material';
import { MdBackupTable, MdBookmark, MdCarRepair, MdGroups, MdMoreHoriz } from 'react-icons/md';
import PostDisplay from '../components/profilecomponents/PostDisplay';
import { useEffect, useState } from 'react';
import { User } from '../lib/types';
import { apiFetch } from '../lib/apiClient';
import { useParams } from 'react-router';
import DriversLicense from '../components/DriversLicense';

export default function ProfilePage({ userId }: { userId: number }) {
  const [user, setUser] = useState<User>();
  const { id } = useParams();
  const [selectedPage, setSelectedPage] = useState<'posts' | 'groups' | 'car' | 'saved'>('posts');
  const [openEditModal, setEditModal] = useState(false);

  function handlePageChange(event: React.MouseEvent<HTMLButtonElement>, value: 'posts' | 'groups' | 'car' | 'saved') {
    // event.currentTarget.style.color = "red";
    setSelectedPage(value);

    // Add logic to handle page change here
  }

  useEffect(() => {
    async function load() {
      const res = await apiFetch<User>(`users/user/${id || userId}`);
      if (res && res.data) {
        console.log(res.data);
        setUser(res.data);
      }
    }
    load();
  }, [id, userId]);

  function handleProfileClick() {
    setEditModal(true);

  }

  //
  let bottomDisplay;
  if (user) {
    switch (selectedPage) {
      case 'posts':
        bottomDisplay = <PostDisplay userId={parseInt(id!)}/>;
        break;
      case 'groups':
        bottomDisplay = <div>Groups</div>;
        break;
      case 'car':
        bottomDisplay = <div>Car</div>;
        break;
      case 'saved':
        bottomDisplay = <PostDisplay userId={parseInt(id!)} saved />;
        break;
    }
  }

  return (
    <>
      <div className="bg-background rounded-xl my-2 flex flex-col p-3 gap-3 shadow-md shadow-[#00000066]">
        <MdMoreHoriz className="text-2xl self-end" />
        <div className="flex justify-start items-center w-full gap-3">
          <button className="hover:animate-spin" onClick={handleProfileClick}>
            <Avatar src={user?.profileImg} sx={{ height: 76, width: 76 }}>
              {user?.nickname.substring(0, 3).toUpperCase()}
            </Avatar>
          </button>
          <Modal open={openEditModal} onClose={() => setEditModal(false)} className='flex justify-center items-center'>
            <DriversLicense></DriversLicense>
          </Modal>
          <div className="flex-grow">
            <h3 className="text-4xl">{user?.username}</h3>
            <p className="text-sm">@{user?.nickname}</p>
          </div>
          <div className="justify-self-end text-right">
            <p>{8} Followers</p>
            <p>{1111} Following</p>
          </div>
        </div>
        <div className="flex text-3xl bg-backdropSecondary rounded-xl p-2 justify-center divide-x-2 shadow-md shadow-[#00000066]">
          <button
            className={`flex-grow flex justify-center ${selectedPage == 'posts' ? ' text-red-500' : ''} `}
            onClick={(event) => handlePageChange(event, 'posts')}
          >
            <MdBackupTable />
          </button>
          <button
            className={`flex-grow flex justify-center ${selectedPage == 'groups' ? ' text-red-500' : ''} `}
            onClick={(event) => handlePageChange(event, 'groups')}
          >
            <MdGroups />
          </button>
          <button
            className={`flex-grow flex justify-center ${selectedPage == 'saved' ? ' text-red-500' : ''} `}
            onClick={(event) => handlePageChange(event, 'saved')}
          >
            <MdBookmark />
          </button>
          <button
            className={`flex-grow flex justify-center ${selectedPage == 'car' ? ' text-red-500' : ''} `}
            onClick={(event) => handlePageChange(event, 'car')}
          >
            <MdCarRepair />
          </button>
        </div>
        <div className="min-h-[50vh]">{bottomDisplay}</div>
      </div>
    </>
  );
}
