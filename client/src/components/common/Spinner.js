import React from 'react';
import spinner from './myspin.gif';

export default () => {
  return (
    <div>
      <img src={spinner}
          style={{width:'100px', margin:'auto', display:'block'}}
          alt="Loading" />
    </div>
  );
};
