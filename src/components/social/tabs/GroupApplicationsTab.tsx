import { useEffect, useState } from 'react';
import { Group, GroupMemberResponse } from '../../../lib/entity/Group';
import { useAuthentication } from '../../../contexts/AuthenticationContext';
import { getPendingMembers, handleJoinRequest } from '../../../lib/ApiCalls/GroupApiCalls';
import { Avatar } from '@mui/material';

export default function GroupApplicationsTab({ group, status }: { group: Group; status: GroupMemberResponse }) {
  const [applications, setApplications] = useState<GroupMemberResponse[]>([]);
  const { user } = useAuthentication();
  useEffect(() => {
    getPending();
  }, []);

  async function getPending() {
    setApplications([]);
    if (group && (status.role === 'ADMIN' || status.role === 'MODERATOR')) {
      const res = await getPendingMembers(group.id, status.role);
      if (res) {
        setApplications(res);
      }
    }
  }

  if ((user && status && status.role === 'ADMIN') || status.role === 'MODERATOR') {
    return (
      <>
        <div className=" bg-background p-4 rounded-2xl" key={applications.length}>
          <h4 className="txl text-center">Applications</h4>
          <br />
          {applications &&
            applications.length > 0 &&
            applications
              .filter((app) => !app.valid)
              .map((app) => (
                <div className="flex items-center justify-between gap-2 p-2">
                  <div className="flex items-center gap-2">
                    <Avatar src={app.user.profileImg} className="rounded-full w-12 h-12" />
                    <span>
                      <h2 className="text-lg font-bold">{app.user.nickname}</h2>
                      <p className="muted">@{app.user.username}</p>
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="primary rounded-xl p-2 flex-1"
                      onClick={async () => {
                          await handleJoinRequest(group.id, app.user.id, true);
                          await getPending();
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-highlightSecondary rounded-xl p-2 flex-1"
                      onClick={async () => {
                        await handleJoinRequest(group.id, app.user.id, false);
                          await getPending();
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </>
    );
  } else {
    return (
      <div className=" bg-background p-4 rounded-2xl">
        <h4 className="text-center">No applications</h4>
      </div>
    );
  }
}
