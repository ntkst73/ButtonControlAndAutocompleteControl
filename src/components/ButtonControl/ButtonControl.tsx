import React, { useState, useCallback, ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import InputControl from '../../store/inputControl';

interface Button {
  text: string;
  action?: string;
  callback?: (inputValue?: string) => void;
}

interface Props {
  leftButton?: Button | null;
  rightButtons?: Button[];
  value: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ButtonControl =  observer(({handleInputChange, leftButton, rightButtons, value }: Props) => {
  const handleButtonClick = useCallback((callback?: (inputValue?: string) => void) => {
    if (callback) {
      callback(value);
    }
  }, [value]);

  return (
    <div>
      {leftButton && (
        <button className='button' onClick={() => handleButtonClick(leftButton.callback)}>
          {leftButton.text}
        </button>
      )}
      <input className='input' type="text" value={value} onChange={handleInputChange} />
      {rightButtons &&
        rightButtons.map((button) => (
          <button className='button' key={button.text} onClick={() => handleButtonClick(button?.callback)}>
            {button.text}
          </button>
        ))}
    </div>
  );
});

export default ButtonControl;