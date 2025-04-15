import { useEffect, useState } from 'react';
import { EditPostRequest } from '../../lib/types';
import { Post } from '../../lib/entity/Post';
import { MdDescription, MdLocationPin } from 'react-icons/md';
import { Modal } from '@mui/material';
import { Car } from '../../lib/entity/Car';
import { getOwnGarage } from '../../lib/ApiCalls/CarApiCalls';
import { useSnackbar } from '../../contexts/SnackbarContext';
import VehiclePageItem from '../vehicle/VehiclePageItem';
import { editPost } from '../../lib/ApiCalls/PostApiCalls';
import { useNavigate } from 'react-router';

export default function PostEditModal({ post, onClose }: { post: Post, onClose: () => void }) {
  const [formState, setFormState] = useState<EditPostRequest>({
    vehicleId: post.vehicle?.id || null,
    location: post.location,
    text: post.text,
  });
  const [vehicleOpen, setVehicleOpen] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car>();
  const {showSnackbar} = useSnackbar();
  const navigate = useNavigate()
async function handleSave() {
  const req = await editPost(formState.text, formState.location, formState.vehicleId, post.postId + "");
  if (req) {
    showSnackbar('Post updated', 'success');
    onClose();
    navigate("/")
    return
  }
  showSnackbar('Error updating post', 'error');
}
  async function init() {
    const req = await getOwnGarage()
    if (req) {
      setCars(req);
    } else {
      console.log('Error getting garage');
    }
  }
  useEffect(() => {
    init()
  }, [])
  return (
    <>
      <div className="flex flex-col w-11/12 gap-2 items-center">
        <h3 className="txl">Edit Post</h3>
        <br />
        <span className="w-full">
          <label className="tlg flex items-center gap-2">
            <MdDescription size={20} />
            Text
          </label>
          <input
            value={formState.text}
            onChange={(e) => setFormState({ ...formState, text: e.currentTarget.value })}
            type="text"
            placeholder="Description"
            className="w-full bg-backdropSecondary p-2 my-1 rounded-xl"
          />
        </span>
        <span className="w-full">
          <label className="tlg flex items-center gap-2">
            <MdLocationPin size={20} />
            Location
          </label>
          <input
            value={formState.location}
            onChange={(e) => setFormState({ ...formState, location: e.currentTarget.value })}
            type="text"
            placeholder="Location"
            className="w-full bg-backdropSecondary p-2 my-1 rounded-xl"
          />
        </span>
        <button className='p-2 bg-backdropSecondary rounded-xl w-full mt-2 tlg' onClick={() => {setVehicleOpen(true)}}>Vehicle: {selectedCar?.model}</button>
        <Modal
                open={vehicleOpen}
                onClose={() => setVehicleOpen(false)}
                className="w-full h-full flex text-textColor items-center justify-center"
              >
                <div className="w-full h-5/6 md:w-2/4 md:h-3/4 p-3 bg-background rounded-3xl">
                  <div className="h-full overflow-y-scroll ">
                    {cars.map((car) => {
                      return (
                        <div onClick={() => {
                          setFormState({ ...formState, vehicleId: Number(car.id) });
                          setSelectedCar(car);
                          setVehicleOpen(false);
                          showSnackbar('Jármű kiválasztva', 'success');
                        }}>
                        <div className='pointer-events-none'>
                          <VehiclePageItem car={car} />
                        </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Modal>
              <div className='flex flex-row-reverse w-full gap-2'>
                <button className="flex-1 p-2 bg-highlightSecondary rounded-xl w-full mt-2 tlg" onClick={handleSave}>Save Changes</button>
                <button className="p-2 flex-1 bg-backdropSecondary rounded-xl w-full mt-2 tlg" onClick={onClose}>Discard</button>
              </div>
      </div>
    </>
  );
}
