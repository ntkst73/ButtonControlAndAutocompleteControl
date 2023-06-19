import React, { useState, useCallback, ChangeEvent } from "react";
import "./App.css";
import ButtonControl from './components/ButtonControl/ButtonControl'
import AutocompleteControl from './components/AutocompleteControl'
import inputControl from './store/inputControl';
import { observer } from 'mobx-react';

const App = observer(() => {

  const {valueInput, valueInputClone} = inputControl;

  const clearButton = {
    text: 'Clear',
    callback: () => inputControl.setValueInput('')
  };

  const helloWorldButton = {
    text: 'Hello world!',
    callback: () => inputControl.setValueInput('Hello world!')
  };

  const alertButton = {
    text: 'Alert',
    callback: () => window.alert(valueInputClone)
  };

  const isNumber = (value1: any) => !isNaN(parseFloat(value1)) && isFinite(value1);

  const showNumberButton = {
    text: 'Show number',
    callback: () => {
      if (isNumber(valueInputClone)) {
        window.alert(parseFloat(valueInputClone));
      }
    },
  };

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    inputControl.setValueInput(event.target.value);
  }, []);

   const handleInputChangeClone = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    inputControl.setValueInputClone(event.target.value);
  }, []);

  return (
    <div>
      <ButtonControl 
        handleInputChange={handleInputChange}
        value={valueInput}
        rightButtons={[clearButton, helloWorldButton]}
      />
      <br />
      <ButtonControl
        value={valueInputClone}
        handleInputChange={handleInputChangeClone}
        leftButton={showNumberButton}
        rightButtons={[alertButton]}
      />
      <br />
      <AutocompleteControl maxOptions={3} />
      <br />
      <AutocompleteControl maxOptions={10} />
    </div>
  );
})

export default App;