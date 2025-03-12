import { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { User } from '../../lib/types';
import { Avatar } from '@mui/material';
import { getActiveUsers } from '../../lib/ApiCalls/WsApiCalls';
import { Navigate, useNavigate } from 'react-router';

export default function LeftNavigation() {
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  const fetchActiveUsers = async () => {
    const res = await getActiveUsers();
    setActiveUsers(res? res : [])
    setTimeout(() => {
      fetchActiveUsers();
    }, 30000);
  };

  useEffect(() => {
    fetchActiveUsers();
  },[])

  return (
    <div className="flex flex-col gap-5 w-full h-full rounded-3xl px-4 ">
      <div className="bg-background/75 shadow-lg shadow-[#00000022] p-4 rounded-2xl">
        <h1 className="text-center text-xl font-bold">Active Users</h1>
        <div className="flex items-center justify-between backdrop-blur-7xl rounded-xl mt-2 ">
          <input
            type="search"
            className="p-3 pl-5 bg-background flex-grow rounded-xl  w-full"
            placeholder="Search..."
          />
          <button className=" flex justify-end p-3">
            <MdSearch className="text-xl"></MdSearch>
          </button>
        </div>
      </div>
      <div className="h-full overflow-y-scroll">
        <div className="flex-row flex flex-wrap gap-2">
        {
          activeUsers.map(user => {
            return <div className="flex items-center gap-2 px-2 cursor-pointer hover:opacity-50 transition-all " onClick={() => {navigate("/profile/"+user.id)}}>
            <Avatar
              src={user.profileImg}
              sx={{ width: 24, height: 24 }}
            />
            <p className="font-semibold text-md ">{user.username}</p>
          </div>
          })
        }
        
        </div>
      </div>
    </div>
  );
}
