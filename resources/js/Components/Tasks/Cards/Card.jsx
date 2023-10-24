import React from 'react';
import Sheet from '@/Components/Sheet';
import Chat from '@/Components/Chat';
import { useTasks } from '@/Contexts/TasksContext';
import Pencil from '@/Components/Pencil';
import moment from 'moment';
import Task from '@/Components/Modals/Task';

export default (props) => {

  const { style, item } = props;

  const { editTask, auth, setModal } = useTasks();



  return (
    <div style={style} className="p-4 bg-white rounded-lg shadow mb-4 cursor-pointer relative" id={item ? `task${item.id}` : null}
      onClick={e => {
        e.stopPropagation();
        setModal(<Task task={item} />)
      }}
    >
      {auth.user.id === item.user.id ? <Pencil className="w-4 h-4 absolute top-2 right-2" onClick={e => {
        e.stopPropagation();
        editTask(item)
      }} /> : ``}
      <div className="text-sm font-semibold mb-4">{item.title}</div>
      <div className="items-center gap-2.5 flex mb-4">
        <div className="gap-1 flex">
          {item.users.map((item, udx) => <div
            key={item.id}
            className="w-5 h-5 rounded-lg border bg-cover bg-center relative"
            data-tooltip-id="tooltip" data-tooltip-content={item.fullName}
            style={{ backgroundImage: `url('${item.avatar}')` }}
          >
          </div>)}
        </div>
        <div className="grow px-2 py-2.5 bg-slate-100 rounded-lg">
          {item.range
            ? <><span>{moment(item.start).format("D MMM")}</span><span> - </span></>
            : ``}
          <span>{moment(item.deadline).format("D MMM в HH:mm")}</span>
        </div>
      </div>
      <div className="items-center gap-4 flex text-zinc-500 text-xs">
        {item.oldfiles.length ? <div className="justify-start items-center gap-2 flex">
          <Sheet className="w-4 h-4 shrink-0" />
          <div className="">Есть прикрепленные файлы</div>
        </div> : ``}
        {item.comments ? <div className="justify-start items-center gap-2 flex">
          <Chat className="w-4 h-4 shrink-0" />
          <div className="">{item.comments}</div>
        </div> : ``}
      </div>
    </div>
  );
};
