import { FormControlLabel, TextField, Checkbox } from '@mui/material';
import React, { useState } from 'react';
import Button from '../../../../../customComponents/Button';

const BathroomInput = ({
  externalBathrooms,
  internalBathrooms,
  setExternalBathrooms,
  setInternalBathrooms,
}) => {
  const onBathroomChange = setter => e => setter(e.target.value);

  return (
    <>
      {/* External */}
      <div className='property-form__bathroom__input grow'>
        <TextField
          id='externalBathrooms'
          label='Douches Externes'
          name='externalBathrooms'
          value={externalBathrooms}
          onChange={onBathroomChange(setExternalBathrooms)}
          type='number'
          //helperText='Une maison peut avoir des douches externes'
          InputProps={{ inputProps: { min: 0 } }}
          required
          fullWidth
        />
      </div>
      {/* Internal */}
      <div className='property-form__bathroom__input grow'>
        <TextField
          id='internalBathrooms'
          label='Douches Internes'
          name='internalBathrooms'
          value={internalBathrooms}
          onChange={onBathroomChange(setInternalBathrooms)}
          type='number'
          //helperText='Une maison doit avoir des douches internes'
          InputProps={{ inputProps: { min: 0 } }}
          required
          fullWidth
        />
      </div>
    </>
  );
};

function Interior({ currentStep, onPrevStep, setCurrentStep }) {
  const [step] = useState(3);

  // checkbox
  const [hasBathroom, setHasBathroom] = useState(false);
  const [hasGarage, setHasGarage] = useState(false);
  const [hasCuisine, sethasCuisine] = useState(false);
  const [hasLivingRoom, setHasLivingRoom] = useState(false);
  const [hasDiningRoom, setHasDiningRoom] = useState(false);

  // values
  const [rooms, setRooms] = useState(1);
  const [cuisine, setCuisine] = useState(0);
  const [garages, setGarages] = useState(0);
  const [livingRooms, setLivingRooms] = useState(0);
  const [diningRooms, setDiningRooms] = useState(0);
  const [externalBathrooms, setExternalBathrooms] = useState(0);
  const [internalBathrooms, setInternalBathrooms] = useState(0);

  // Checkbox handlers

  const onCheckboxChange = (setter, value) => e => setter(!value);

  // text input with (e.target.value) handlers
  const onTextChange = setter => e => setter(e.target.value);

  const onNextStep = e => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <div
      className={`
        property-form__step property-form__step--interior
        ${currentStep === step ? '' : 'h-0 overflow-hidden opacity-0'}
      `}
    >
      {/* Step label */}
      <h1 className='property-form__step__label text-3xl text-center mb-5'>
        Details de Lieu
      </h1>

      <div className='property__form__step__inputs'>
        {/* Rooms */}
        <div className='property-form__rooms'>
          <TextField
            id='rooms'
            label='Chambres'
            type='number'
            value={rooms}
            onChange={onTextChange(setRooms)}
            placeholder='Chambres'
            // helperText='Une maison doit avoir des chambres'
            InputProps={{ inputProps: { min: 1 } }}
            required
            fullWidth
          />
        </div>

        {/* Bath Rooms */}
        <div className='property-form__bathroom flex'>
          <div className='property-form__bathroom__checkbox'>
            <FormControlLabel
              control={<Checkbox />}
              label='Douches'
              checked={hasBathroom}
              onChange={onCheckboxChange(setHasBathroom, hasBathroom)}
            />
          </div>

          {hasBathroom && (
            <BathroomInput
              {...{
                externalBathrooms,
                internalBathrooms,
                setExternalBathrooms,
                setInternalBathrooms,
              }}
            />
          )}
        </div>

        {/* Garages */}
        <div className='property-form__garage flex'>
          <div className='property-form__garage__checkbox'>
            <FormControlLabel
              control={<Checkbox />}
              label='Garage'
              onChange={onCheckboxChange(setHasGarage, hasGarage)}
              checked={hasGarage}
            />
          </div>

          {hasGarage && (
            <div className='property-form__garage__input grow'>
              <TextField
                id='garages'
                label='Garages'
                name='garages'
                value={garages}
                onChange={onTextChange(setGarages)}
                type='number'
                placeholder='Garages'
                // helperText='Une maison doit avoir des garages'
                InputProps={{ inputProps: { min: 0 } }}
                required
                fullWidth
              />
            </div>
          )}
        </div>

        {/* Living Rooms */}
        <div className='property-form__living-room flex'>
          <div className='property-form__living-room__checkbox'>
            <FormControlLabel
              control={<Checkbox />}
              label='Salon'
              onChange={onCheckboxChange(setHasLivingRoom, hasLivingRoom)}
              checked={hasLivingRoom}
            />
          </div>

          {hasLivingRoom && (
            <div className='property-form__living-room__input grow'>
              <TextField
                id='livingRooms'
                label='Salon'
                name='livingRooms'
                value={livingRooms}
                onChange={onTextChange(setLivingRooms)}
                type='number'
                placeholder='Salon'
                // helperText='Une maison doit avoir un salon'
                InputProps={{ inputProps: { min: 0 } }}
                required
                fullWidth
              />
            </div>
          )}
        </div>

        {/* Dining Rooms */}
        <div className='property-form__dining-room flex'>
          <div className='property-form__dining-room__checkbox'>
            <FormControlLabel
              control={<Checkbox />}
              label='Sale a manger'
              value={hasDiningRoom}
              onChange={onCheckboxChange(setHasDiningRoom, hasDiningRoom)}
              checked={hasDiningRoom}
            />
          </div>

          {hasDiningRoom && (
            <div className='property-form__dining-room__input grow'>
              <TextField
                id='diningRooms'
                label='Sale a manger'
                name='diningRooms'
                value={diningRooms}
                onChange={onTextChange(setDiningRooms)}
                type='number'
                placeholder='Sale a manger'
                // helperText='Une maison peut avoir une sale a manger'
                InputProps={{ inputProps: { min: 0 } }}
                required
                fullWidth
              />
            </div>
          )}
        </div>

        {/* Cuisine */}
        <div className='property-form__cuisine flex'>
          <div className='property-form__cuisine__checkbox'>
            <FormControlLabel
              control={<Checkbox />}
              label='Cuisine'
              onChange={onCheckboxChange(sethasCuisine, hasCuisine)}
              checked={hasCuisine}
            />
          </div>

          {hasCuisine && (
            <div className='property-form__cuisine__input grow'>
              <TextField
                id='cuisine'
                label='Cuisine'
                name='cuisine'
                value={cuisine}
                onChange={onTextChange(setCuisine)}
                type='number'
                placeholder='cuisine'
                InputProps={{ inputProps: { min: 0 } }}
                required
                fullWidth
              />
            </div>
          )}
        </div>
      </div>

      <div className='property-form__step__controls flex'>
        <Button type='prev' handleClick={onPrevStep} classNames='mr-5'>
          Back
        </Button>
        <Button type='next' handleClick={onNextStep}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default Interior;
