import { MdClose, MdEdit } from 'react-icons/md';
import { Car } from '../../lib/entity/Car';
import { NavLink } from 'react-router';
import { useAuthentication } from '../../contexts/AuthenticationContext';

export default function VehicleCard({ car, closeFn }: { car: Car; closeFn?: () => void }) {
  const { user: authUser } = useAuthentication();

  return (
    <div className="w-full m-4 md:w-1/2 flex flex-col bg-background h-full rounded-2xl overflow-hidden gap-6">
      <header className="w-full flex flex-row justify-between p-4 bg-backdropSecondary items-center">
        <p className="text-xl">
          Car of
          <span className="font-bold"> @{car.owner?.username}</span>
        </p>
        {closeFn && (
          <MdClose
            className="cursor-pointer hover:opacity-75"
            size={32}
            onClick={() => {
              closeFn();
            }}
          />
        )}
      </header>
      <main className="overflow-y-scroll ">
        <section className="bg-backdropSecondary mx-4 p-4 rounded-xl flex flex-col">
          <div className="flex flex-row">
            <div>
              <p className="text-2xl font-bold">{car.manufacturer}</p>
              <p>{car.model}</p>
              <p className="text-textColor/50">{car.type}</p>
            </div>
          </div>
          {authUser && authUser.id == car.owner?.id && (
            <div className="w-full">
              <button className="ml-auto shadow-md shadow-[#00000066] py-2 px-4 rounded-xl bg-highlightSecondary flex flex-row items-center justify-center gap-2">
                <MdEdit size={20}></MdEdit>
                Edit car
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
