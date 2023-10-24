import React from 'react';
import Card from './Cards/Card';


const CardDragPreview = (props) => {
  return (
    <div style={{
      display: 'inline-block',
      transform: 'rotate(-7deg)',
      WebkitTransform: 'rotate(-7deg)',
      width: `${props.item.clientWidth || 243}px`,
      height: `${props.item.clientWidth || 243}px`
    }}>
      <Card item={props.item} />
    </div>
  );
};

export default CardDragPreview;
