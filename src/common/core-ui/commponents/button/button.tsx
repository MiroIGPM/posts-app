import React, { FC, MouseEventHandler, useEffect } from 'react';
import { IButtonProps } from './models/button.props';
import './button.scss';

const Button: FC<IButtonProps> = (
  {
    customClass, onButtonClicked, text, propMessage, commponentName, isDisabled,
  },
) => {
  useEffect(() => {
    console.log(`${propMessage} ${commponentName}`);
  }, []);

  const onClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    if (isDisabled) {
      return;
    }
    e.stopPropagation();
    onButtonClicked?.();
  };

  return (
    <div className={`button ${customClass} ${isDisabled && 'disabled'}`} onClick={onClickHandler}>
      {text}
    </div>
  );
};

export default Button;
