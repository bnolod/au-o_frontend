import { Avatar } from '@mui/material';
import Header from '../components/Header';
import MessageBoard from '../components/messages/MessageBoard';
import PrivateMessages from '../components/messages/PrivateMessages';
import { User } from '../lib/types';
import { useAuthentication } from '../contexts/AuthenticationContext';
import { useParams } from 'react-router';

export default function MessagesPage() {
  const { user } = useAuthentication();
  const { id } = useParams();

  return (
    <div className="bg-background h-screen flex flex-col text-textColor">
      <Header />
      <main className="flex flex-row h-full items-center  justify-evenly pt-24 gap-">
        <div className="w-3/12 h-full hidden md:flex flex-col items-center overflow-y-scroll ">
          <MessageBoard msgOnClick>

          </MessageBoard>
        </div>
        <div className=" w-9/12 flex flex-col h-full mx-4">
        {
            id && !isNaN(Number(id)) ?
            <PrivateMessages userId={Number(id)} />
            :
            <div className='w-full h-full flex items-center justify-items-center rounded-2xl bg-backdropSecondary'>
                        <p className='text-center w-full'>Select an user to send a message.</p>
            </div>
        }
        </div>
      </main>
    </div>
  );
}
