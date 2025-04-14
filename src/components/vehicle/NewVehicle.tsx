import { Modal } from '@mui/material';
import { useState } from 'react';
import { MdBadge, MdBookmark, MdCalendarMonth, MdDescription, MdFlashOn, MdStar, MdThunderstorm } from 'react-icons/md';
import { CarCreationRequest } from '../../lib/request/CarCreationRequest';
import { FaGear } from 'react-icons/fa6';
import Button from '../Button';
import { validateNewVehicle } from '../../lib/Validation/Validation';
import { useSnackbar } from '../../contexts/SnackbarContext';
import VehicleTypeSelector from './VehicleTypeSelector';
import { GetCarImage } from '../cars';
import { addCar } from '../../lib/ApiCalls/CarApiCalls';

export default function NewVehicleForm() {
    const {showSnackbar} = useSnackbar()
      const [carTypeModal, setCarTypeModal] = useState(false);
    const [formState, setFormState] = useState<CarCreationRequest>({
        description: '',
        displacement: 0,
        horsepower: 0,
        manufacturer: '',
        model: '',
        productionYear: 1999,
        type: 'SEDAN',
    })
    async function handleSubmit() {

        const validity = validateNewVehicle(formState.manufacturer, formState.model, formState.horsepower, formState.description, formState.displacement, formState.productionYear, "EN")
        if (!validity.valid) {
            if (validity.messages && validity.messages?.length > 0) {
                showSnackbar(validity.messages[0], 'error')
                return
            }
            else {
                showSnackbar(validity.message!, 'error')
                return
            }
        }
        const req = await addCar(formState)
        if (req) {
            showSnackbar('Car added successfully', 'success')
            setFormState({
                description: '',
                displacement: 0,
                horsepower: 0,
                manufacturer: '',
                model: '',
                productionYear: 1999,
                type: 'SEDAN',
            })
            setCarTypeModal(false)
            window.location.reload()
        }
        else {
            showSnackbar('Car creation failed', 'error')
        }

        
    }
  return (
    <div  className="text-textColor flex flex-col w-11/12 gap-4">
        <h2 className='t2x text-center'>New Car</h2>
      <div className="flex flex-col flex-1 w-full">
        <label className="flex items-center gap-2 text-lg m-1" htmlFor="manufacturer">
          <MdBookmark /> Manufacturer
        </label>
        <input
          type="text"
          value={formState.manufacturer}
          onChange={(e) => setFormState({ ...formState, manufacturer: e.target.value })}
          name="manufacturer"
          placeholder="Toyota"
          className="w-full  rounded-xl bg-backdropSecondary p-2"
        />
        <br />
        <label className="flex items-center gap-2 text-lg m-1" htmlFor="model">
          <MdStar /> Model
        </label>
        <input
          type="text"
          value={formState.model}
          onChange={(e) => setFormState({ ...formState, model: e.target.value })}
          name="model"
          placeholder="Celica"
          className="w-full  rounded-xl bg-backdropSecondary p-2"
        />
        <br />
        <label className="flex items-center gap-2 text-lg m-1" htmlFor="productionYear">
          <MdCalendarMonth /> Production Year
        </label>
        <input
          type="number"  name="productionYear" min="1920" max="2025" step="1"
          value={formState.productionYear}
          onChange={(e) => setFormState({ ...formState, productionYear: parseInt(e.target.value) })}
          placeholder="1999"
          className="w-full  rounded-xl bg-backdropSecondary p-2"
        />
        <br />
        <label className="flex items-center gap-2 text-lg m-1" htmlFor="description">
          <MdDescription /> Description
        </label>
        <textarea
            name="description"
          value={formState.description}
          onChange={(e) => setFormState({ ...formState, description: e.target.value })}
          placeholder="Say something about your car"
          className="w-full rounded-xl bg-backdropSecondary p-2"
        />
        <br />
        <div
              onClick={()=>{setCarTypeModal(!carTypeModal)}}
              className=" justify-center flex items-center relative bg-highlightSecondary hover:cursor-pointer p-3 txl text-center w-full rounded-xl text-left"
              >
                <div className='absolute'>
                    <GetCarImage type={formState.type} height={150} width={125} stroke='#777' strokeWidth={1.6}  />
                </div>
                <span className='z-50 font-bold'>

                {formState.type}
                </span>
                </div>
        <div className='flex flex-row gap-2'>
            <span className='flex-1'>

        <label className="flex items-center gap-2 text-lg m-1" htmlFor="horsepower">
          <MdFlashOn /> Horsepower
        </label>
        <input
          type="number"  name="horsepower" min="1" max="2000" step="1"
          value={formState.horsepower}
          onChange={(e) => setFormState({ ...formState, horsepower: parseInt(e.target.value) })}
          placeholder="100"
          className="w-full  rounded-xl bg-backdropSecondary p-2"
          />
        <br />
          </span>
            <span className='flex-1'>

        <label className="flex items-center gap-2 text-lg m-1" htmlFor="displacement">
          <FaGear /> Displacement
        </label>
        <input
          type="number"  name="horsepower" min="0" max="10" step="0.1"
          value={formState.displacement/10}
          onChange={(e) => setFormState({ ...formState, displacement: parseFloat(e.target.value)*10 })}
          placeholder="1.6"
          className="w-full  rounded-xl bg-backdropSecondary p-2"
          />
        <br />
          </span>
          </div>
      </div>
      <Button className='w-full mb-3 bg-highlightSecondary' onClick={() => handleSubmit()}>Submit</Button>
      <VehicleTypeSelector closeTypeSelector={() => setCarTypeModal(false)} selected={formState.type} setSelected={(value) => setFormState({...formState, type: value})} typeSelectorOpen={carTypeModal}/>
    </div>
  );
}
