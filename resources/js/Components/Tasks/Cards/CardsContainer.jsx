import React from 'react';
// import { DropTarget } from 'react-dnd';

import Cards from './Cards';
import Plus from '@/Components/Plus';
import { useTasks } from '@/Contexts/TasksContext';

// const listSource = {
//   beginDrag(props) {
//     return {
//       id: props.id,
//       x: props.x
//     };
//   },
//   endDrag(props) {
//     props.stopScrolling();
//   }
// };

// const listTarget = {
//   canDrop() {
//     return false;
//   },
//   hover(props, monitor) {
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
//     const { id: listId } = monitor.getItem();
//     const { id: nextX } = props;
//     if (listId !== nextX) {
//       props.moveList(listId, props.x);
//     }
//   }
// };

export default (props) => {

  const { addTask } = useTasks();

  const { item, status_id, moveCard, isDragging, setIsDragging, setInitialOffset, setCurrentOffset, setCurrentItem } = props;
  const opacity = isDragging ? 0.5 : 1;

  return <div className="w-1/3 bg-neutral-100 rounded-lg p-4 h-full flex flex-col" style={{ opacity }}>
    <div className="mb-4 flex justify-between items-center">
      <div className="text-gray-500 text-2xl font-semibold">{item.title}</div>
      {status_id === 1 ? <div className="shrink-0 cursor-pointer" onClick={e => {
        addTask();
      }}>
        <Plus className="w-6 h-auto " />
      </div> : ``}

    </div>
    <div className="grow overflow-y-hidden">
      <Cards
        setIsDragging={setIsDragging}
        setCurrentItem={setCurrentItem}
        setInitialOffset={setInitialOffset}
        setCurrentOffset={setCurrentOffset}
        isDragging={isDragging}
        moveCard={moveCard}
        status_id={status_id}
        item={item}
      />
    </div>
  </div>
}
