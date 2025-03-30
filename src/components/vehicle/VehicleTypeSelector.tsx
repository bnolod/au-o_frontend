import { Modal } from '@mui/material';
import { useState } from 'react';
import { CarType } from '../../lib/types';
import { GetCarImage } from '../cars';

export default function VehicleTypeSelector({
  selected,
  setSelected,
}: {
  selected: CarType;
  setSelected: (value: CarType) => void;
}) {
  const [open, setOpen] = useState(true);

  const CarTypes : CarType[] = ['SEDAN', 'COUPE', 'GRANDCOUPE', 'HATCH', 'KOMBI', 'CABRIOLET', 'PICKUP', 'ROADSTER', 'SUV'];

  return (
    <Modal open={open} onClose={() => setOpen(false)} className="flex items-center justify-center text-textColor">
      <div className="bg-backdropSecondary rounded-xl w-2/6 aspect-square grid grid-cols-3">
        {CarTypes.map((carType) => (
          <button className={'flex flex-col justify-center ' + (selected == carType && "underline")} onClick={()=>{setSelected(carType); setOpen(false)}}>
            <GetCarImage type={carType} ></GetCarImage>
            {carType}
          </button>
        ))}
      </div>
    </Modal>
  );
}
