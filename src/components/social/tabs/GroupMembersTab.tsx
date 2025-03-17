import { Avatar, Card, ImageList, ImageListItem } from '@mui/material';
import { getAspectRatio } from '../../../lib/functions';
import { useEffect, useState } from 'react';
import { getGroupMembers, getGroupPosts } from '../../../lib/ApiCalls/GroupApiCalls';
import { PostResponse } from '../../../lib/types';
import { useNavigate } from 'react-router';
import Button from '../../Button';
import { GroupMemberListResponse } from '../../../lib/entity/Group';

export default function GroupMembersTab({
  tab,
  id,
  validMember,
}: {
  tab: 'posts' | 'members' | 'about' | 'chat' | 'options';
  id: number;
  validMember: boolean;
}) {

  const [users, setUsers] = useState<GroupMemberListResponse | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, [tab === 'members']);
  async function init() {
    const res = await getGroupMembers(id);
    if (res) {
      setUsers(res.data);
    }
  }

 
  if (users)
    return (
      <div className=" bg-background p-4 rounded-2xl">
        {/* {users.users.length === 0 && <div className="text-center primary text-textColor">No users found.</div>}
        {validMember && (
          <Button className="w-full p-2 text-center" onClick={() => navigate('/group/' + id + '/post/create')}>
            Create a post
          </Button>
        )} */}
        {users &&
          users.users.map((user) => (
            <div className="flex items-center gap-2 p-2">
              <Avatar src={user.user.profileImg} className="rounded-full w-12 h-12" />
              <div>
                <h2 className="text-lg font-bold">{user.user.nickname}</h2>
                <p className="muted">@{user.user.username}</p>
              </div>
            </div>
          ))}
      </div>
    );
  else {
    return (
      <div className="my-2">
        <p>No</p>
      </div>
    );
  }
}
