import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div className="loader-container">
            <ClipLoader color={'#123abc'} loading={true} size={50} />
        </div>
    );
};

export default Loader;
