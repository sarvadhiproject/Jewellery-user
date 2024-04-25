import React, { useState } from 'react';

function QuantityPicker({ min, max }) {
  const [value, setValue] = useState(min);
  const [disableDec, setDisableDec] = useState(true);
  const [disableInc, setDisableInc] = useState(false);

  const increment = () => {
    const newValue = value + 1;
    if (value < max) {
      setValue(newValue);
      setDisableDec(false);
    }
    if (value === max - 1) {
      setDisableInc(true);
    }
    if (value === min) {
      setDisableDec(false);
    }
  };

  const decrement = () => {
    const newValue = value - 1;
    if (value > min) {
      setValue(newValue);
      if (value === min + 1) {
        setDisableDec(true);
      }
    } else {
      setValue(min);
    }
    if (value === max) {
      setDisableInc(false);
    }
  };

  return (
    <span className="quantity-picker">
      <button
        className={`${disableDec ? 'mod-disable ' : ''}quantity-modifier modifier-left`}
        onClick={decrement}
      >
        &ndash;
      </button>
      <input className="quantity-display" type="text" value={value} readOnly />
      <button
        className={`${disableInc ? 'mod-disable ' : ''}quantity-modifier modifier-right`}
        onClick={increment}
      >
        &#xff0b;
      </button>
    </span>
  );
}

export default QuantityPicker;
