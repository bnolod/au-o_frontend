import { Avatar, Modal } from '@mui/material';
import { MdBackupTable, MdBookmark, MdCarRepair, MdGroups, MdMessage, MdMoreHoriz } from 'react-icons/md';
import PostDisplay from '../components/profilecomponents/PostDisplay';
import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/apiClient';
import { NavLink, useParams } from 'react-router';
import DriversLicense from '../components/DriversLicense';
import { User } from '../lib/entity/User';
import { useAuthentication } from '../contexts/AuthenticationContext';
import ProfileVehiclePage from '../components/vehicle/ProfileVehiclePage';

export default function ProfilePage({ userId }: { userId: number }) {
  const [user, setUser] = useState<User>();
  const {user: authUser} = useAuthentication();
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
        bottomDisplay = <PostDisplay userId={parseInt(id!)} />;
        break;
      case 'groups':
        bottomDisplay = <div>Groups</div>;
        break;
      case 'car':
        bottomDisplay = <ProfileVehiclePage user={user}/>;
        break;
      case 'saved':
        bottomDisplay = <PostDisplay userId={parseInt(id!)} saved />;
        break;
    }
  }

  return (
      <div className=" rounded-2xl w-full  flex flex-col gap-3">
      <div className='bg-backdropPrimary pt-4 pb-4 rounded-2xl px-4 shadow-md shadow-[#00000066]'>

        <div className="flex justify-start items-center w-full gap-3  py-8 px-4 rounded-2xl ">
          <button className="hover:animate-spin" onClick={handleProfileClick}>
            <Avatar src={user?.profileImg} sx={{ height: 76, width: 76 }}>
              {user?.nickname.substring(0, 3).toUpperCase()}
            </Avatar>
          </button>
          <Modal open={openEditModal} onClose={() => setEditModal(false)} className="flex justify-center items-center">
            <DriversLicense user={user}></DriversLicense>
          </Modal>
          <div className="flex-grow">
            <h3 className="text-3xl font-semibold">{user?.nickname} </h3>
            <p className="text-md text-textColor/75">@{user?.username}</p>
          </div>
          <div className="justify-self-end text-right">
            <p>{8} Followers</p>
            <p>{1111} Following</p>
          </div>
        </div>
        <div className="p-4">
          <p className="text-textColor/90">{user?.bio}Helló ez a bio hali hali!</p>
        </div>
        <div className="w-full flex flex-row justify-between text-base">
          <button className='hover:opacity-75 shadow-md shadow-[#00000066] transition-all py-2 px-8 rounded-xl  bg-highlightPrimary'>Follow</button>
          <div className='gap-2 flex flex-row'>
            {user?.id == authUser?.id ?
            <button className='hover:opacity-75 shadow-md shadow-[#00000066] transition-all py-2 px-4 rounded-xl  bg-backdropSecondary'>
              Edit Profile
            </button>
            :
            <NavLink to={`/messages/${user?.id}`} className='hover:opacity-75 shadow-md shadow-[#00000066] transition-all py-2 px-4 rounded-xl  bg-backdropSecondary'>Message</NavLink>
            }
            
            <button className='py-2 px-4 rounded-xl hover:opacity-75 shadow-md shadow-[#00000066] transition-all bg-backdropSecondary'>
              <MdMoreHoriz className='hover:opacity-50 transition-opacity' size={24}></MdMoreHoriz>
            </button>
          </div>
        </div>
        </div>
        <div className="flex text-3xl bg-backdropPrimary rounded-xl p-5 w-full self-center  justify-center divide-x-2 divide-textColor/15 shadow-md shadow-[#00000066]">
          <button
            className={`flex-grow flex justify-center ${selectedPage == 'posts' ? ' text-highlightPrimary' : ''} `}
            onClick={(event) => handlePageChange(event, 'posts')}
          >
            <MdBackupTable className='hover:opacity-50 transition-opacity' />
          </button>
          <button
            className={`flex-grow flex justify-center ${selectedPage == 'groups' ? ' text-highlightPrimary' : ''} `}
            onClick={(event) => handlePageChange(event, 'groups')}
          >
            <MdGroups className='hover:opacity-50 transition-opacity' />
          </button>
          <button
            className={`flex-grow flex justify-center ${selectedPage == 'saved' ? ' text-highlightPrimary' : ''} `}
            onClick={(event) => handlePageChange(event, 'saved')}
          >
            <MdBookmark className='hover:opacity-50 transition-opacity' />
          </button>
          <button
            className={`flex-grow flex justify-center ${selectedPage == 'car' ? ' text-highlightPrimary' : ''} `}
            onClick={(event) => handlePageChange(event, 'car')}
          >
            <MdCarRepair className='hover:opacity-50 transition-opacity' />
          </button>
        </div>
        <div className="min-h-[50vh]">{bottomDisplay}</div>
      </div>
  );
}
