import React from 'react';

import './Faces.modules.css';
const Face = ({imageUrl,box,detect}) => {

  let c;
  console.log(detect,'ok');
  if(detect)
c= <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>

  console.log(imageUrl);
    console.log(box);
    return (
        <div className='center ma'>
        <div className='absolute mt2 ok '>
          <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
          {c}
        </div>
      </div>
    );
};

export default Face;