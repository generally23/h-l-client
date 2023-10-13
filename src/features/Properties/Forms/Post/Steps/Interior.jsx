import { FormControlLabel, TextField, Checkbox } from '@mui/material';
import React, { useState } from 'react';
import Button from '../../../../../customComponents/Button';

const BathroomInput = ({
  externalBathrooms,
  internalBathrooms,
  setExternalBathrooms,
  setInternalBathrooms,
}) => {
  const onBathroomChange = setter => e => setter(parseInt(e.target.value) || 0);

  return (
    <>
      {/* External */}
      <div className='property-form__bathroom__input grow mr-5'>
        <TextField
          id='externalBathrooms'
          label='Douches Externes'
          name='externalBathrooms'
          value={externalBathrooms}
          onChange={onBathroomChange(setExternalBathrooms)}
          type='number'
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
          InputProps={{ inputProps: { min: 0 } }}
          required
          fullWidth
        />
      </div>
    </>
  );
};

function Interior({
  currentStep,
  onPrevStep,
  setCurrentStep,
  hasBathroom,
  setHasBathroom,
  hasGarage,
  setHasGarage,
  hasCuisine,
  sethasCuisine,
  hasLivingRoom,
  setHasLivingRoom,
  hasDiningRoom,
  setHasDiningRoom,
  hasPool,
  setHasPool,
  rooms,
  setRooms,
  externalBathrooms,
  setExternalBathrooms,
  internalBathrooms,
  setInternalBathrooms,
}) {
  // Checkbox handlers
  const onCheckboxChange = (setter, value) => e => setter(!value);

  const onRoomsChange = e => setRooms(parseInt(e.target.value) || 1);

  const onNextStep = e => {
    setCurrentStep(currentStep + 1);
  };

  // State
  const [step] = useState(3);

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
        <div className='property-form__rooms mb-10'>
          <TextField
            id='rooms'
            label='Chambres'
            name='rooms'
            type='number'
            value={rooms}
            onChange={onRoomsChange}
            placeholder='Chambres'
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

        {/* Garage */}
        <div className='property-form__garage flex'>
          <div className='property-form__garage__checkbox'>
            <FormControlLabel
              control={<Checkbox />}
              label='Garage'
              onChange={onCheckboxChange(setHasGarage, hasGarage)}
              checked={hasGarage}
              name='hasGarage'
              value={hasGarage}
            />
          </div>

          {/* {hasGarage && (
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
          )} */}
        </div>

        {/* Living Room */}
        <div className='property-form__living-room flex'>
          <div className='property-form__living-room__checkbox'>
            <FormControlLabel
              control={<Checkbox />}
              label='Salon'
              onChange={onCheckboxChange(setHasLivingRoom, hasLivingRoom)}
              checked={hasLivingRoom}
              name='hasLivingRoom'
              value={hasLivingRoom}
            />
          </div>

          {/* {hasLivingRoom && (
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
          )} */}
        </div>

        {/* Dining Rooms */}
        <div className='property-form__dining-room flex'>
          <div className='property-form__dining-room__checkbox'>
            <FormControlLabel
              control={<Checkbox />}
              label='Sale a manger'
              name='hasDingRoom'
              value={hasDiningRoom}
              onChange={onCheckboxChange(setHasDiningRoom, hasDiningRoom)}
              checked={hasDiningRoom}
            />
          </div>

          {/* {hasDiningRoom && (
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
          )} */}
        </div>

        {/* Cuisine */}
        <div className='property-form__cuisine flex'>
          <div className='property-form__cuisine__checkbox'>
            <FormControlLabel
              control={<Checkbox />}
              label='Cuisine'
              name='hasCuisine'
              value={hasCuisine}
              onChange={onCheckboxChange(sethasCuisine, hasCuisine)}
              checked={hasCuisine}
            />
          </div>

          {/* {hasCuisine && (
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
          )} */}
        </div>

        {/* Pool */}
        <div className='property-form__pool flex'>
          <div className='property-form__pool__checkbox'>
            <FormControlLabel
              control={<Checkbox />}
              label='Piscine'
              name='hasPool'
              value={hasPool}
              onChange={onCheckboxChange(setHasPool, hasPool)}
              checked={hasPool}
            />
          </div>
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
