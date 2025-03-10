import { MdLockOutline } from "react-icons/md";
import { SocialCardProps } from "../props";
import { GroupTexts } from "../../../constants/texts";
import { joinGroup } from "../../../lib/ApiCalls/GroupApiCalls";
import SocialBanner from "./SocialBanner";

export default function SocialCard({
  language,
  group,
  event,
  type = 'GROUP',
  preview,
  onCreateClick,
}:  SocialCardProps) {
  if (!group && !event) return null;
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
        className="my-4"
        style={{
          //shadowColor: colorScheme === 'dark' ? '#fff0f0' : '#1b1b1b',
          //shadowOffset: {
            //width: 0,
            //height: 10,
          //},
          //shadowOpacity: 1,
          //shadowRadius: 20,
        }}
      >
        <div className={`${preview !== 'DISPLAY' ? ' ' : 'pointer-events-none'}`}>
          <SocialBanner
            id={Number(item.id)}
            language={language}
            name={item.alias}
            image={item.bannerImage}
            count={item.count}
            type={type}
            onClick={onCreateClick}
          />
        </div>
        <div className="social-card">
          <div className="social-card-container">
            <div className="basis-4/6">
              <h3 className="tlg leading-tight">
                {group && !group.public && <MdLockOutline />}
                {item.name}
                <p className="tsm p-3 font-semibold muted "> {item.alias}</p>
              </h3>
              <span className="opacity-85">{item.description}</span> {/*TODO: ADD EXPANDING TEXT FIELD*/}
            </div>
            <div className="flex items-start gap-3">
              {!item.isUserRelated && (
                <button onClick={!preview ? () => {type === "GROUP" ? joinGroup(group!.id) : {}} : () => {}} className="social-card-action-button">
                  {type === 'GROUP'
                    ? group?.public
                      ? GroupTexts.buttons.join[language]
                      : group?.member
                      ? GroupTexts.actions.application.sent[language]
                      : GroupTexts.page.apply[language]
                    : 'Attend'}
                </button>
              )}
              <button
                className="social-card-secondary-button"
                onClick={
                  !preview
                    ? () => {
                        if (type === 'EVENT') {
                            //TODO: add routing to event page
                        }
                        else {   
                            //TODO: add routing to event page
                        }
                      }
                    : () => {}
                }
              >
                {type === 'GROUP' &&
                group?.validMember
                  ? group.public
                    ? GroupTexts.actions.visit[language]
                    : GroupTexts.actions.visit[language]
                  : group?.public
                  ? GroupTexts.actions.visit[language]
                  : GroupTexts.actions.details[language]}
              </button>
            </div>
          </div>
        </div>
      </article>
    );
}