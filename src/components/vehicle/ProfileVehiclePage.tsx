import { useEffect, useState } from 'react';
import { User } from '../../lib/entity/User';
import { Car } from '../../lib/entity/Car';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { getUserGarageById } from '../../lib/ApiCalls/CarApiCalls';
import VehiclePageItem from './VehiclePageItem';
import { Modal } from '@mui/material';
import VehicleCard from './VehicleCard';
import { FaCarCrash } from 'react-icons/fa';

export default function ProfileVehiclePage({ user, className }: { user: User, className?: string; }) {
  const { user: AuthUser } = useAuthentication();
  const [cars, setCars] = useState<Car[]>([]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  function handleItemClick(car: Car) {
    setSelectedCar(car);
    setOpenModal(true);
  }

  const handleFetch = async () => {
    const res = await getUserGarageById(user.id);
    if (res) {
      setCars(res);
    }
  };

  useEffect(() => {
    handleFetch();
  }, [user]);

  return (
    <div className={"flex flex-col w-full bg-background p-3 rounded-2xl " + (className ? className : "")} >
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        className="flex items-center justify-center p-4 text-textColor"
      >
        {selectedCar ? (
          <VehicleCard
            editMode={selectedCar.owner?.id === AuthUser?.id}
            closeFn={() => {
              setOpenModal(false);
            }}
            car={selectedCar}
          />
        ) : (
          <></>
        )}
      </Modal>

      {cars.length > 0 ? (
        cars.map((car) => {
          return (
            <div
              onClick={() => {
                handleItemClick(car);
              }}
            >
              <VehiclePageItem car={car} />
            </div>
          );
        })
      ) : (
        <div className='text-center text-textColor/50 items-center flex flex-col p-3'><FaCarCrash className='text-6xl'/><p>No cars found.</p></div>
      )}
    </div>
  );
}
