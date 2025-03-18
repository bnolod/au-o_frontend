import { MdCarCrash, MdCarRental, MdCarRepair } from 'react-icons/md';
import { Car } from '../../lib/entity/Car';

export default function VehiclePageItem({ car }: { car: Car }) {
  return (
    <div
      key={car.id}
      className="p-4 m-4 rounded-xl hover:bg-backdropSecondary shadow-md shadow-[#00000022] hover:scale-[1.01] bg-backdropPrimary transition-all cursor-pointer flex flex-row justify-between "
    >
      <div>
        <p className="text-2xl font-bold">{car.manufacturer}</p>
        <p className="">{car.model}</p>
        <div className="flex flex-row gap-4 text-textColor/50">
          <p>{car.horsepower} HP</p>
          <p>{car.displacement} L</p>
          <p>{car.productionYear}</p>
        </div>
      </div>
      <div className="flex flex-row self-center">
        <MdCarRental size={48} />
        <MdCarCrash size={48} />
        <MdCarRepair size={48} />
      </div>
    </div>
  );
}
