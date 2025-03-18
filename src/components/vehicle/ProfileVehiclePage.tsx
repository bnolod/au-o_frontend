import { useEffect, useState } from 'react';
import { User } from '../../lib/entity/User';
import { Car } from '../../lib/entity/Car';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { getUserGarageById } from '../../lib/ApiCalls/CarApiCalls';
import VehiclePageItem from './VehiclePageItem';
import { Modal } from '@mui/material';
import VehicleCard from './VehicleCard';

export default function ProfileVehiclePage({ user }: { user: User }) {
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
    <div className="flex flex-col w-full bg-background p-4 rounded-2xl shadow-md shadow-[#00000066]">
            <Modal open={openModal} onClose={() => setOpenModal(false)} className="flex items-center justify-center p-4 text-textColor">
                    {selectedCar ? <VehicleCard closeFn={()=> {setOpenModal(false)}} car={selectedCar}/>
                     : <></>}
                  </Modal>
            
      {cars.length > 0 ? (
        cars.map((car) => {
          return (
            <div onClick={() => {
                        handleItemClick(car)

            }}>
            <VehiclePageItem car={car}/>
            </div>
          );
        })
      ) : (
        <div>No cars found.</div>
      )}
    </div>
  );
}
