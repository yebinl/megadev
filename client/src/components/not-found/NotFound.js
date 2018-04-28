import React from 'react';
import pic from './404.png';

export default () => {
  return (
    <div mt-4>
      <img src={pic} alt="404 NOT FOUND" style={{width:'80%', margin:'auto', display:'block'}} />
    </div>
  );
};
