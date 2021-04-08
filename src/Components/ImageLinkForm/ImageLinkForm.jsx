import React from 'react';
import './ImageLink.modules.css'
const ImageLinkForm = (props) => {
    return (
    <div className="container " >
       <p className='f3'>
        {'This Magic Brain will detect faces in your pictures. Give it a try.'}
      </p>
        <div className="shadow-lg p-3 mb-5 ">
          
            <input className='form-control ' type='text'    placeholder='Enter URL of Image' value={props.value}  onChange={props.onChangeValueHandler }/>
            <div className="pt-3"
            >    <button className='btn btn-primary btn-lg  '  onClick={props.onButtonSubmit}>Detect</button>       </div>
          
        </div>
      </div>
    );
};

export default ImageLinkForm;