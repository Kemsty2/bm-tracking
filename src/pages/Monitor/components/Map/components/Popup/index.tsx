import React from 'react';

const Popup = ({ properties }: any) => {
  const { id, name, description } = properties;

  return (
    <div id={`popup-${id}`}>
      <h3>{name}</h3>
      {description}
    </div>
  );
};

export default Popup;
