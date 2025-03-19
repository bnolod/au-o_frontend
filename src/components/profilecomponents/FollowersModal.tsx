import { Modal } from '@mui/material';
import { User } from '../../lib/entity/User';

export default function FollowersModal({
  open,
  handleClose,
  users,
}: {
  open: boolean;
  handleClose: () => void;
  users: User[];
}) {
  return (
    <div className="flex flex-col">
      {users.map((user) => (
        <div>{user.nickname}</div>
      ))}
    </div>
  );
}
