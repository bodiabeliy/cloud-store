import React from 'react';
import './styles.scss';
const Preloader = () => {
  return (
    <div className="preloader">
      <div className="preloader__image_animate">
        <h2 style={{ color: 'white', textAlign: 'center', marginTop: '150px' }}>
          Идёт загрузка данных...
        </h2>
      </div>
    </div>
  );
};

export default Preloader;
