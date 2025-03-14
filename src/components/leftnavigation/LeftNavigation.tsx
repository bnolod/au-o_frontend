import { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { User } from '../../lib/types';
import { Avatar } from '@mui/material';
import { getActiveUsers } from '../../lib/ApiCalls/WsApiCalls';
import { Navigate, useNavigate } from 'react-router';
import { apiFetch } from '../../lib/apiClient';
import { searchUsers } from '../../lib/ApiCalls/SearchApiCalls';

export default function LeftNavigation() {
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');

  const handleSearch = async () => {
    const res = await searchUsers(searchInput);
    setSearchResults(res);
  };

  const fetchActiveUsers = async () => {
    const res = await getActiveUsers();
    setActiveUsers(res ? res : []);
    setTimeout(() => {
      fetchActiveUsers();
    }, 30000);
  };

  useEffect(() => {
    fetchActiveUsers();
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full h-[90vh] rounded-3xl px-4 ">
      <div className="bg-background/75 shadow-lg shadow-[#00000022] p-4 rounded-2xl">
        <h1 className=" pl-2 text-xl font-bold">Search Users</h1>
        <div className="flex items-center justify-between backdrop-blur-7xl rounded-xl mt-2 ">
          <input
            type="search"
            className="p-3 pl-5 transition-all focus:bg-backdropPrimary bg-background placeholder:text-textColor/15 flex-grow rounded-xl  w-full outline-none"
            placeholder="Search..."
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button className=" flex justify-end p-3" onClick={handleSearch}>
            <MdSearch className="text-xl"></MdSearch>
          </button>
        </div>
        <div className='overflow-y-scroll max-h-96'>
          {searchResults.map((result) => {
            return (
              <div className="flex flex-row gap-2 items-center my-4">
                <Avatar src={result.profileImg} />
                {result.username}
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-full overflow-y-scroll flex-col flex">
          <p className="w-full text-textColor/40">Currently Active</p>
        <div className=" flex flex-wrap-reverse gap-2 h-full ">
          {activeUsers.map((user) => {
            return (
              <div
                className="flex items-center h-12 gap-2 px-2 cursor-pointer hover:opacity-50 transition-all "
                onClick={() => {
                  navigate('/profile/' + user.id);
                }}
              >
                <Avatar src={user.profileImg} sx={{ width: 24, height: 24 }} />
                <p className="font-semibold text-md ">{user.username}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
