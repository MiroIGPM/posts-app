import React, { FC, useEffect } from 'react';
import './spinner.scss';

interface ISpinnerProps {
  commponentName: string
  propMessage: string
}

const Loader: FC<ISpinnerProps> = ({ commponentName, propMessage }) => {
  useEffect(() => {
    console.log(`${propMessage} ${commponentName}`);
  }, []);

  return (
    <div className="loader-wrapper">
      <div className="lds-ellipsis">
        <div style={{ backgroundColor: '#29ABE2' }} />
        <div style={{ backgroundColor: '#29ABE2' }} />
        <div style={{ backgroundColor: '#29ABE2' }} />
        <div style={{ backgroundColor: '#29ABE2' }} />
      </div>
      <div className="loading-text">Loading</div>
    </div>
  );
};

export default Loader;
