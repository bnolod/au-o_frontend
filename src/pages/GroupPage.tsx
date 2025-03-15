import { Navigate, useParams } from 'react-router';
import { Group } from '../lib/entity/Group';
import { useEffect, useState } from 'react';
import { getGroup } from '../lib/ApiCalls/GroupApiCalls';
import { FaInfo, FaRegMessage, FaStar, FaUsers, FaWrench } from 'react-icons/fa6';
import GroupPostTab from '../components/social/tabs/GroupPostTab';
import GroupMembersTab from '../components/social/tabs/GroupMembersTab';
import GroupChatTab from '../components/social/tabs/GroupChat';
import { useWebSocket } from '../contexts/WebSocketContext';
import GroupOptionsTab from '../components/social/tabs/GroupOptionsTab';
export default function GroupPage() {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <Navigate to="/groups" />;
  }
  const [group, setGroup] = useState<Group>();
  const [tab, setTab] = useState<'posts' | 'members' | 'about' | 'chat' | 'options'>('posts');
  useEffect(() => {
    init();
  }, []);
  
 
  async function init() {
    const group = await getGroup(id!);
    if (group) {
      setGroup(group);
      console.log(group);
    }
  }
  if (group === undefined) return <p>spinner</p>;
  return (
    <section className='flex flex-col gap-4'>
        <div className=" gap-2 flex flex-col rounded-3xl w-full bg-backdropPrimary shadow-md shadow-[#00000066]">
          <div
            style={{
              backgroundImage: `url(${group.bannerImage})`,
            }}
            className="w-full aspect-[7/2] rounded-t-2xl secondary flex items-center justify-center mx-auto bg-cover bg-center bg-no-repeat"
          >
            <h1 className="text-6xl text-center  text-white/50 font-bold">{group.alias}</h1>
          </div>
          <div className="w-full pb-4 pt-2 px-4 flex flex-row gap-4">
            <FaUsers className="text-5xl text-textColor self-center  rounded-xl " />
            {/* <span> */}
            <h2 className="text-3xl font-semibold self-center">{group.name}</h2>
            {/* <p className="muted">{group.description.slice(0,12)}...</p> */}
            {/* </span> */}
          </div>
        </div>
      <div className="bg-backdropSecondary shadow-md shadow-[#00000066] p-3 gap-4 flex flex-col rounded-3xl ">

        <p className="text-lg pt-8 break-words px-2">
          <span className="absolute text-textColor/50 -mt-8">Description</span>

          {group.description}
        </p>
        <div className="flex flex-row gap-2 justify-between overflow-y-visible overflow-x-scroll scroll-hidden">
          <button
            className={`border-2 border-background/25 hover:opacity-50 transition-opacity  rounded-xl bg-backdropPrimary  flex items-center flex-1 p-2 gap-2 text-lg font-semibold ${
              tab === 'posts' ? 'bg-highlightSecondary' : 'secondary'
            }`}
            onClick={() => {
              setTab('posts');
            }}
          >
            <FaStar className="text-lg" />
          <p>

            Posts
          </p>
          </button>
          <button
            className={`border-2 border-background/25 hover:opacity-50 transition-opacity rounded-xl bg-backdropPrimary  flex items-center flex-1 p-2 gap-2 text-lg font-semibold  ${
              tab === 'members' ? 'bg-highlightSecondary' : 'secondary'
            }`}
            onClick={() => {
              setTab('members');
            }}
          >
            <FaUsers className="text-lg" />
          <p>
            Members
          </p>
          </button>
          <button
            className={`border-2 border-background/25 hover:opacity-50 transition-opacity  rounded-xl bg-backdropPrimary  flex items-center flex-1 p-2 gap-2 text-lg font-semibold ${
              tab === 'about' ? 'bg-highlightSecondary' : 'secondary'
            }`}
            onClick={() => {
              setTab('about');
            }}
          >
            <FaInfo className="text-lg" />
          <p>

            About
          </p>
          </button>
          <button
            className={`border-2 border-background/25 hover:opacity-50 transition-opacity  rounded-xl bg-backdropPrimary  flex items-center flex-1 p-2 gap-2 text-lg font-semibold ${
              tab === 'chat' ? 'bg-highlightSecondary' : 'secondary'
            }`}
            onClick={() => {
              setTab('chat');
            }}
          >
            <FaRegMessage className="text-lg" />
          <p>

            Chat
          </p>
          </button>
          <button
            className={`border-2 border-background/25 hover:opacity-50 transition-opacity  rounded-xl bg-backdropPrimary  flex items-center flex-1 p-2 gap-2 text-lg font-semibold ${
              tab === 'options' ? 'bg-highlightSecondary' : 'secondary'
            }`}
            onClick={() => {
              setTab('options');
            }}
          >
            <FaWrench className="text-lg" />
          <p>

            Options
          </p>
          </button>
        </div>
      </div>
      <article className=" flex-col w-full mx-auto my-2 justify-center">
        {tab === 'posts' && <GroupPostTab validMember={group.validMember} tab={tab} id={group.id} />}
        {tab === 'members' && <GroupMembersTab validMember={group.validMember} tab={tab} id={group.id} />}
        {tab === 'chat' && <GroupChatTab group={group} />}
        {tab === 'options' && <GroupOptionsTab group={group} language={"EN"} />}
      </article>
    </section>
  );
}
