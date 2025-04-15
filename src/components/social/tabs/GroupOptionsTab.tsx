import { useState } from 'react';
import { GroupEditRequest, modifyGroup } from '../../../lib/ApiCalls/GroupApiCalls';
import { Group } from '../../../lib/entity/Group';
import { useSnackbar } from '../../../contexts/SnackbarContext';
import Input from '../../Input';
import { FaDoorClosed, FaDoorOpen } from 'react-icons/fa6';

export default function GroupOptionsTab({ group, language, reLoad }: { group: Group; language: 'HU' | 'EN'; reLoad: () => void}) {
  const { showSnackbar } = useSnackbar();
  const [editGroup, setEditGroup] = useState<GroupEditRequest>({
    name: group.name,
    description: group.description,
    alias: group.alias,
    public: group.public,
  });
  async function handleGroupEdit() {
    const res = await modifyGroup(group.id, editGroup);
    if (res) {
      reLoad()
      showSnackbar('Sikeresen módosítottad a csoportot', 'info');
      
      return;
    } else showSnackbar('Nem sikerült módosítani a csoportot', 'error');
  }
  return (
      <section className='secondary rounded-2xl p-4'>

        <Input type='text' inputPlaceholder='Név' labelText='Név' value={editGroup.name} onChange={(e) => setEditGroup({ ...editGroup, name: e.target.value })} />
        <Input type='text' inputPlaceholder='Leírás' labelText='Leírás' value={editGroup.description} onChange={(e) => setEditGroup({ ...editGroup, description: e.target.value })} />
        <div className='flex gap-2 flex-row justify-between justify-center items-center'>
        <Input type='text' inputPlaceholder='Rövid név' labelText='Rövid név' value={editGroup.alias} onChange={(e) => setEditGroup({ ...editGroup, alias: e.target.value })} />
        <button className='w-20 rounded-xl primary self-end flex flex-col justify-center items-center p-1' onClick={() => {
            setEditGroup({ ...editGroup, public: !editGroup.public });
        }}>
            {editGroup.public ? 
            
            <FaDoorOpen className='text-xl' />
        : <FaDoorClosed className='text-xl'/>}
        <p className='text-sm'>
            
            {editGroup.public ? 'Public' : 'Private'}
        </p>

        </button>
        </div>
        <div className='flex flex-row gap-2 mt-4 justify-center'>
        <button className='primary rounded-xl p-2 flex-1' onClick={() => {
            setEditGroup({
                name: group.name,
                description: group.description,
                alias: group.alias,
                public: group.public,
            })
        }}>Visszaállítás</button>
        <button className='bg-highlightSecondary rounded-xl p-2 flex-1' onClick={handleGroupEdit}>Mentés</button>
        </div>
      </section>
    );
  
}
