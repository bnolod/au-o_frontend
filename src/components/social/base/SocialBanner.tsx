import { url } from 'inspector';
import { EventTexts, GroupTexts } from '../../../constants/texts';
import { formatNumber } from '../../../lib/functions';
import { CommonStaticElementProps } from '../../../lib/types';
import { SocialBannerProps } from '../props';

export default function SocialBanner({
  name,
  image,
  id,
  type = 'GROUP',
  count = 0,
  language,
  header = false,
  onClick,
}: SocialBannerProps & { language: 'HU' | 'EN' }) {
  return (
    <div
      onClick={
        onClick
          ? onClick
          : () => {
              if (type === 'EVENT') {
                //TODO: handle routing
              } else {
                //TODO: handle routing
              }
            }
      }
      style={{
        aspectRatio: header ? 1.7 : 2.5,
        objectFit: 'cover',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${'/examples/BannerPlaceholder.png'}`,
        backgroundRepeat: 'no-repeat',
      }}
      className="relative social-banner-container "
    >
      {count !== null && (
        <p className="social-banner-image-text z-40 select-none">
          {formatNumber(count, language)}{' '}
          {type === 'EVENT' ? EventTexts.buttons.attend.attendeeCount[language] : GroupTexts.page.memberCount[language]}
        </p>
      )}
      {!image && !name && <h3 className="text-3xl select-none">???</h3>}
      {!image && name && (
        <h1 className={`${type === 'GROUP' ? 'text-5xl' : 'text-3xl'} select-none font-bold`}>
          {' '}
          {name.length > 20 && name.split(' ').length > 4 ? name.split(' ') : name}
        </h1>
      )}
      {image && name && (
        <img
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
          }}
          className="rounded-xl"
          src={image}
        />
      )}
    </div>
  );
}
