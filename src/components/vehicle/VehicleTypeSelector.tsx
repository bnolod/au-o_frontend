import { Modal } from '@mui/material';
import { useState } from 'react';
import { CarType } from '../../lib/types';
import { GetCarImage } from '../cars';

export default function VehicleTypeSelector({
  selected,
  setSelected,
  typeSelectorOpen,
  closeTypeSelector,
}: {
  selected: CarType;
  setSelected: (value: CarType) => void;
  typeSelectorOpen: boolean;
  closeTypeSelector: () => void;
}) {

  const CarTypes : CarType[] = ['SEDAN', 'COUPE', 'GRANDCOUPE', 'HATCH', 'KOMBI', 'CABRIOLET', 'PICKUP', 'ROADSTER', 'SUV'];

  return (
    <Modal open={typeSelectorOpen} onClose={() => closeTypeSelector()} className="flex items-center justify-center text-textColor">
      <div className="bg-backdropSecondary rounded-xl w-2/6 aspect-square grid grid-cols-3 p-3">
        {CarTypes.map((carType) => (
          <button className={'flex flex-col justify-center p-3 ' + (selected == carType && " border rounded-xl")} onClick={()=>{setSelected(carType); }}>
            <GetCarImage width={180} height={100} strokeWidth={2.5} stroke={ "#fff"} type={carType} ></GetCarImage>
            <p>{carType}</p>
          </button>
        ))}
      </div>
    </Modal>
  );
}
