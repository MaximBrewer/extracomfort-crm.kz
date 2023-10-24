import React from 'react';

import CardDragPreview from './CardDragPreview';
import snapToGrid from './snapToGrid';


const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100000
};

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props;
  
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    };
  }

  let { x, y } = currentOffset;

  if (props.snapToGrid) {
    x -= initialOffset.x;
    y -= initialOffset.y;
    [x, y] = snapToGrid(x, y);
    x += initialOffset.x;
    y += initialOffset.y;
  }

  const transform = `translate(${x}px, ${y}px)`;
  return {
    WebkitTransform: transform,
    transform
  };
}

export default (props) => {

  const { item, isDragging } = props;

  return isDragging ? (
    <div style={layerStyles}>
      <div style={getItemStyles(props)}>
        <CardDragPreview item={item} />
      </div>
    </div>
  ) : null;
}
