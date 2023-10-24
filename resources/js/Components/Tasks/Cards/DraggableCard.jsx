import React, { useEffect } from 'react';
// import { findDOMNode } from 'react-dom';
// import { DragSource } from 'react-dnd';
// import { getEmptyImage } from 'react-dnd-html5-backend';

import Card from './Card';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

// const cardSource = {
//   beginDrag(props, monitor, component) {
//     // dispatch to redux store that drag is started
//     const { item, x, y } = props;
//     const { id, title } = item;
//     const { clientWidth, clientHeight } = findDOMNode(component);

//     return { id, title, item, x, y, clientWidth, clientHeight };
//   },
//   endDrag(props, monitor) {
//     document.getElementById(monitor.getItem().id).style.display = 'block';
//     props.stopScrolling();
//   },
//   isDragging(props, monitor) {
//     const isDragging = props.item && props.item.id === monitor.getItem().id;
//     return isDragging;
//   }
// };

// // options: 4rd param to DragSource https://gaearon.github.io/react-dnd/docs-drag-source.html
// const OPTIONS = {
//   arePropsEqual: function arePropsEqual(props, otherProps) {
//     let isEqual = true;
//     if (props.item.id === otherProps.item.id &&
//         props.x === otherProps.x &&
//         props.y === otherProps.y
//        ) {
//       isEqual = true;
//     } else {
//       isEqual = false;
//     }
//     return isEqual;
//   }
// };

// function collectDragSource(connectDragSource, monitor) {
//   return {
//     connectDragSource: connectDragSource.dragSource(),
//     connectDragPreview: connectDragSource.dragPreview(),
//     isDragging: monitor.isDragging()
//   };
// }


export default (props) => {

  const { setIsDragging, setCurrentItem, item, setInitialOffset, setCurrentOffset } = props;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
    item: item,
    end: (item, monitor) => {
      // const dropResult = monitor.getDropResult()
      // // if (item && dropResult) {
      // //   alert(`You dropped ${item.name} into ${dropResult.name}!`)
      // // }
      // console.log(item, monitor, dropResult)
      // // const lastX = monitor.getItem().x;
      // // const lastY = monitor.getItem().y;
      // // const nextX = props.x;
      // // let nextY = monitor.getItem().y;
      // // props.moveCard(item, monitor.getItem().status_id, monitor.getItem().sort, nextX, nextY);
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  useEffect(() => {
    setCurrentItem(item)
    setIsDragging(isDragging)
    // this.props.connectDragPreview(getEmptyImage(), {
    //   captureDraggingState: true
    // });
  }, [isDragging, setIsDragging])

  return <div ref={drag}>
    <Card
      style={isDragging ? { opacity: 0.5 } : { opacity: 1 }}
      item={props.item}
      setInitialOffset={setInitialOffset}
      setCurrentOffset={setCurrentOffset}
    />
  </div>
}
