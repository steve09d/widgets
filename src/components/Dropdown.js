import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ options, selected, onSelectedChange, label }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = event => {
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };
    document.body.addEventListener('click', onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener('click', onBodyClick, {
        capture: true,
      });
    };
  }, []);

  const opt = options.map(option => {
    if (option.value !== selected.value) {
      return (
        <div
          key={option.value}
          className='item'
          onClick={() => onSelectedChange(option)}
        >
          {option.label}
        </div>
      );
    } else return null;
  });

  return (
    <div ref={ref} className='ui form'>
      <div className='field'>
        <label>{label}</label>
        <div
          onClick={() => setOpen(!open)}
          className={`ui selection dropdown ${open ? 'visible active' : ''}`}
          /* style={{ backgroundColor: 'lightgray' }} */
        >
          <i className='dropdown icon'></i>
          <div className='text'>{selected.label}</div>
          <div className={`menu ${open ? 'visible transition' : ''}`}>
            {opt}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
