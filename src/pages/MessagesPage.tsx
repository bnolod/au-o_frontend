import { Avatar } from '@mui/material';
import Header from '../components/Header';
import MessageBoard from '../components/messages/MessageBoard';
import PrivateMessages from '../components/messages/PrivateMessages';
import { User } from '../lib/types';
import { useAuthentication } from '../contexts/AuthenticationContext';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { apiFetch } from '../lib/apiClient';

export default function MessagesPage() {
  const { user } = useAuthentication();
  const { id } = useParams();

  return (
    <div className="bg-background h-screen flex flex-col text-textColor">
      <Header />
      <main className="flex flex-row h-full items-center  justify-evenly pt-24 gap-">
        
        <div className="w-full md:w-9/12 flex flex-col h-full mx-4">
        {
            id  ?
            <PrivateMessages userId={Number(id)} />
            :
            <div className='w-full h-full flex items-center justify-items-center mb-4 border-r-4 border-backdropSecondary'>
                                  <MessageBoard msgOnClick/>

            </div>
        }
        </div>
        <div className="w-3/12 h-full hidden md:flex flex-col items-center overflow-y-scroll ">
        {id?
          <MessageBoard msgOnClick/>
:""}

        </div>
      </main>
    </div>
  );
}
