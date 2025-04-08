import { FaCarCrash } from 'react-icons/fa';
import Card from '../Card';

export default function GroupsDisplay() {
  return (
    <Card>
      {true && (
        <div className="text-center text-textColor/50 flex flex-col items-center p-3">
          <FaCarCrash className="text-6xl" />
          <p>No Groups found.</p>
        </div>
      )}
    </Card>
  );
}
