import { MdCarCrash, MdCarRental, MdCarRepair } from 'react-icons/md';
import { Car } from '../../lib/entity/Car';
import { GetCarImage } from '../cars';

export default function VehiclePageItem({ car }: { car: Car }) {
  return (
    <div
      key={car.id}
      className="p-4 m-4 rounded-xl items-center hover:bg-backdropSecondary shadow-md shadow-[#00000022] hover:scale-[1.01] bg-backdropPrimary transition-all cursor-pointer flex flex-row justify-between "
    >
      <div>
        <p className="text-2xl font-bold">{car.manufacturer}</p>
        <p className="">{car.model}</p>
        <div className="flex flex-row gap-4 text-textColor/50">
          <p>{car.horsepower} HP</p>
          <p>{car.displacement/10} L</p>
          <p>{car.productionYear}</p>
        </div>
      </div>
      <div className="flex flex-row items-center self-center">
        <GetCarImage height={100} width={140} stroke='#fff' strokeWidth={2} type={car.type} />
      </div>
    </div>
  );
}
