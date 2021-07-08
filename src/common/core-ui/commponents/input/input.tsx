import React, { FC } from 'react';
import { IInputProps } from './models/input.props';
import './input.scss';

const Input: FC<IInputProps> = (
  {
    customInputClass,
    customLabelClass,
    onChange,
    label,
    placeholder,
    inputValue,
  },
) => {
  const onChangeHandler = (e: { target: { value: string; }; }) => {
    const { value } = e.target;
    onChange?.(value);
  };

  return (
    <div>
      <input
        className={`input ${customInputClass}`}
        onChange={onChangeHandler}
        placeholder={placeholder}
        value={inputValue}
      />
      <div className={`label ${customLabelClass}`}>
        {label}
      </div>
    </div>
  );
};

export default Input;
