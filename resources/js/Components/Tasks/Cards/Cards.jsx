import React, { useEffect, useState } from 'react';
import { findDOMNode } from 'react-dom';

import Card from './DraggableCard';
import { useDrop } from 'react-dnd';


// function getPlaceholderIndex(y, scrollY) {
//   // shift placeholder if y position more than card height / 2
//   const yPos = y - OFFSET_HEIGHT + scrollY;
//   let placeholderIndex;
//   if (yPos < CARD_HEIGHT / 2) {
//     placeholderIndex = -1; // place at the start
//   } else {
//     placeholderIndex = Math.floor((yPos - CARD_HEIGHT / 2) / (CARD_HEIGHT + CARD_MARGIN));
//   }
//   return placeholderIndex;
// }

// const specs = {
//   drop(props, monitor, component) {
//     document.getElementById(monitor.getItem().id).style.display = 'block';
//     const { placeholderIndex } = component.state;
//     const lastX = monitor.getItem().x;
//     const lastY = monitor.getItem().y;
//     const nextX = props.x;
//     let nextY = placeholderIndex;

//     if (lastY > nextY) { // move top
//       nextY += 1;
//     } else if (lastX !== nextX) { // insert into another list
//       nextY += 1;
//     }

//     if (lastX === nextX && lastY === nextY) { // if position equel
//       return;
//     }

//     props.moveCard(lastX, lastY, nextX, nextY);
//   },
//   hover(props, monitor, component) {
//     // defines where placeholder is rendered
//     const placeholderIndex = getPlaceholderIndex(
//       monitor.getClientOffset().y,
//       findDOMNode(component).scrollTop
//     );

//     // horizontal scroll
//     if (!props.isScrolling) {
//       if (window.innerWidth - monitor.getClientOffset().x < 200) {
//         props.startScrolling('toRight');
//       } else if (monitor.getClientOffset().x < 200) {
//         props.startScrolling('toLeft');
//       }
//     } else {
//       if (window.innerWidth - monitor.getClientOffset().x > 200 &&
//           monitor.getClientOffset().x > 200
//       ) {
//         props.stopScrolling();
//       }
//     }

//     // IMPORTANT!
//     // HACK! Since there is an open bug in react-dnd, making it impossible
//     // to get the current client offset through the collect function as the
//     // user moves the mouse, we do this awful hack and set the state (!!)
//     // on the component from here outside the component.
//     // https://github.com/gaearon/react-dnd/issues/179
//     component.setState({ placeholderIndex });

//     // when drag begins, we hide the card and only display cardDragPreview
//     const item = monitor.getItem();
//     document.getElementById(item.id).style.display = 'none';
//   }
// };

export default (props) => {

  const { status_id, item, isOver, canDrop, moveCard, isDragging, setIsDragging, setCurrentItem, setInitialOffset, setCurrentOffset } = props;

  const [cardList, setCardsList] = useState([]);

  const [collectedProps, drop] = useDrop(() => ({
    accept: `box`,
    drop(props, monitor) {
      document.getElementById(`task${monitor.getItem().id}`).style.display = 'block';
      moveCard(monitor.getItem(), status_id);
      // const lastX = monitor.getItem().x;
      // const lastY = monitor.getItem().y;
      // const nextX = props.x;
      // let nextY = placeholderIndex;

      // if (lastY > nextY) { // move top
      //   nextY += 1;
      // } else if (lastX !== nextX) { // insert into another list
      //   nextY += 1;
      // }

      // if (lastX === nextX && lastY === nextY) { // if position equel
      //   return;
      // }

      // props.moveCard(lastX, lastY, nextX, nextY);
    },
    hover(props, monitor, component) {
      // console.log(props, monitor, component)
      // defines where placeholder is rendered
      // const placeholderIndex = getPlaceholderIndex(
      //   monitor.getClientOffset().y,
      //   findDOMNode(component).scrollTop
      // );

      // // horizontal scroll
      // if (!props.isScrolling) {
      //   if (window.innerWidth - monitor.getClientOffset().x < 200) {
      //     props.startScrolling('toRight');
      //   } else if (monitor.getClientOffset().x < 200) {
      //     props.startScrolling('toLeft');
      //   }
      // } else {
      //   if (window.innerWidth - monitor.getClientOffset().x > 200 &&
      //     monitor.getClientOffset().x > 200
      //   ) {
      //     props.stopScrolling();
      //   }
      // }

      // // IMPORTANT!
      // // HACK! Since there is an open bug in react-dnd, making it impossible
      // // to get the current client offset through the collect function as the
      // // user moves the mouse, we do this awful hack and set the state (!!)
      // // on the component from here outside the component.
      // // https://github.com/gaearon/react-dnd/issues/179
      // component.setState({ placeholderIndex });

      // // when drag begins, we hide the card and only display cardDragPreview
      // const item = monitor.getItem();
      // document.getElementById(item.id).style.display = 'none';
    }
  }))

  // useEffect(() => {
  //   let cardList = [];
  //   item.tasks.data.forEach((item, i) => {
  //     if (isOver && canDrop) {
  //       isPlaceHold = false;
  //       if (i === 0 && placeholderIndex === -1) {
  //         cardList.push(<div key="placeholder" className="item placeholder" />);
  //       } else if (placeholderIndex > i) {
  //         isPlaceHold = true;
  //       }
  //     }
  //     if (item !== undefined) {
  //       cardList.push(
  //         <Card
  //           setInitialOffset={setInitialOffset}
  //           setCurrentOffset={setCurrentOffset}
  //           setIsDragging={setIsDragging}
  //           setCurrentItem={setCurrentItem}
  //           isDragging={isDragging}
  //           status_id={status_id} y={i}
  //           moveCard={moveCard}
  //           item={item}
  //           key={item.id}
  //         />
  //       );
  //     }
  //     if (isOver && canDrop && placeholderIndex === i) {
  //       cardList.push(<div key="placeholder" className="item placeholder" />);
  //     }
  //   });
  //   setCardsList(cardList)

  // }, [item.tasks.data, item.tasks.data.length])

  return <div className="h-full overflow-y-auto" ref={drop}>
    {item.tasks.data.map((item, i) => <Card
      setInitialOffset={setInitialOffset}
      setCurrentOffset={setCurrentOffset}
      setIsDragging={setIsDragging}
      setCurrentItem={setCurrentItem}
      isDragging={isDragging}
      status_id={status_id} y={i}
      moveCard={moveCard}
      item={item}
      key={item.id}
    />)}
  </div>
}
