import { MdInfo, MdLockOutline } from 'react-icons/md';
import { SocialCardProps } from '../props';
import { GroupTexts } from '../../../constants/texts';
import { joinGroup } from '../../../lib/ApiCalls/GroupApiCalls';
import SocialBanner from './SocialBanner';
import { useNavigate } from 'react-router';

export default function SocialCard({
  language,
  group,
  event,
  type = 'GROUP',
  preview,
  onCreateClick,
}: SocialCardProps) {
  if (!group && !event) return null;
  const navigate = useNavigate();
  const item =
    group && !event
      ? {
          id: group.id,
          name: group.name,
          bannerImage: group.bannerImage,
          alias: group.alias,
          count: group.memberCount,
          public: group.public,
          creationDate: group.creationDate,
          isUserRelated: group.member,
          description: group.description,
        }
      : {
          id: event!.id,
          name: event!.name,
          bannerImage: event!.bannerImage,
          alias: event!.name,
          count: event!.attendees,
          public: event!.public,
          creationDate: event!.creationDate,
          isUserRelated: event!.isAttending,
          description: event!.description,
        };
  if (item === undefined) return <p>spinner</p>;
  if (item)
    return (
      <article
        className=" rounded-2xl cursor-pointer hover:scale-[1.025] hover:bg-backdropSecondary transition-all group"
        onClick={() => navigate('/groups/' + group?.id)}
      >
        <div className="flex flex-col">
          <div
            className={`${
              preview !== 'DISPLAY' ? ' ' : 'pointer-events-none'
            }  overflow-hidden rounded-xl p-2 bg-backdropSecondary `}
          >
            <SocialBanner
              id={Number(item.id)}
              language={language}
              name={item.alias}
              image={item.bannerImage}
              count={item.count}
              type={type}
              onClick={onCreateClick}
            />
            <div className="flex flex-row justify-between pt-4 px-2">
              <h3 className="text-xl flex-1 truncate font-bold leading-tight">
                {group && !group.public && <MdLockOutline />}
                {item.name}
              </h3>
              <p className="text-xl font-bold muted"> {item.alias}</p>
            </div>
          </div>
          <div className="p-2 mt-2 rounded-xl bg-backdropPrimary  group-hover:bg-backdropSecondary transition-all">
            <MdInfo className='absolute -mt-3 -ml-3 group-[xd]' size={16}></MdInfo>
            <p className='absolute -mt-3 ml-2 text-xs transition-all text-textColor/50 truncate row'>Description</p>

            <p className="opacity-85 font-thin">{item.description}</p> {/*TODO: ADD EXPANDING TEXT FIELD*/}
            {/* <div className="flex items-start gap-3"></div> */}
          </div>
        </div>
      </article>
    );
}
