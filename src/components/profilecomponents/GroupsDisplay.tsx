import { FaCarCrash } from 'react-icons/fa';
import Card from '../Card';
import { Group } from '../../lib/entity/Group';
import { useEffect, useState } from 'react';
import { getOwnGroups } from '../../lib/ApiCalls/GroupApiCalls';
import SocialCard from '../social/base/SocialCard';
import { useLanguage } from '../../contexts/LanguageContext';

export default function GroupsDisplay() {
  const { language } = useLanguage();

  const [groups, setGroups] = useState<Group[]>([]);

  async function load() {
    const res = await getOwnGroups();
    if (res) {
      setGroups(res);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <Card className=' gap-8'>
      {groups.length == 0 ? (
        <div className="text-center text-textColor/50 flex flex-col items-center p-3">
          <FaCarCrash className="text-6xl" />
          <p>No Groups found.</p>
        </div>
      ) : (
        groups.map((group) => (
          <SocialCard
            key={group.id}
            group={group}
            type="GROUP"
            language={language}
            onCreateClick={() => {}}
            event={null}
            preview={'DISPLAY'}
          />
        ))
      )}
    </Card>
  );
}
