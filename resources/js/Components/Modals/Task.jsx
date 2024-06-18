import { useTasks } from "@/Contexts/TasksContext"
import Close from "@/Icons/Close"
import moment from "moment"
import SuccessButton from "../SuccessButton"
import DefaultButton from "../DefaultButton"
import TextArea from "../TextArea"
import Comments from "../Tasks/Comments"
import { Link } from "@inertiajs/react"

const Status = ({ status_id }) => {
    const colors = {
        1: 'bg-indigo-300',
        2: 'bg-red-400',
        3: 'bg-lime-600',
    }
    const texts = {
        1: 'К работе',
        2: 'На проверке',
        3: 'Выполненные',
    }
    return <div className={`px-3 py-1 ${colors[status_id]} rounded-lg`}>
        <div className={`text-white text-sm`}>{texts[status_id]}</div>
    </div>
}


export default (props) => {

    const { task } = props

    const { setModal, setLists, executors, auth, dropTask, editTask } = useTasks()

    return <div className="w-[40rem]">
        <Close className="w-6 h-6 right-5 top-5 absolute cursor-pointer" onClick={e => setModal(null)} />
        <div className="flex items-center gap-3 mb-6 text-sm text-zinc-500">
            <div className="w-6 h-6 bg-cover rounded-full bg-center" style={{ backgroundImage: `url('${task.user.avatar}')` }}></div>
            <div>
                <span className="">Инициатор задачи </span>
                <span className="font-bold">{task.user.name}</span>
            </div>
        </div>
        <div className="mb-6">
            {task.data && task.data.link ?
                <Link className="block text-2xl font-semibold mb-3 underline hover:no-underline" href={route(task.data.link.route, task.data.link.params)}>{task.title}</Link> :
                <div className="text-2xl font-semibold mb-3">{task.title}</div>}

            <div className="flex gap-3 items-center">
                <Status status_id={task.status_id} />
            </div>
        </div>
        <div className="gap-4 flex mb-6">
            <div className="items-center gap-2 flex">
                <div className="text-gray-700 text-sm font-normal leading-tight">Участники:</div>
                <div className="gap-1 flex">
                    {task.users.map((item, udx) => <div
                        key={item.id}
                        className="w-8 h-8 rounded-lg border bg-cover bg-center relative"
                        data-tooltip-id="modaltooltip" data-tooltip-content={item.fullName}
                        style={{ backgroundImage: `url('${item.avatar}')` }}
                    >
                    </div>)}
                </div>
            </div>
            <div className="items-center gap-2 flex">
                <div className="text-gray-700 text-sm">Срок:</div>
                <div className="px-4 py-2.5 bg-neutral-100 rounded-lg items-center gap-2 flex">
                    {task.range
                        ? <><span>{moment(task.start).format("D MMM")}</span><span> - </span></>
                        : ``}
                    <span>{moment(task.deadline).format("D MMM в HH:mm")}</span>
                </div>
            </div>
        </div>
        <div className="mb-6">
            <div className="text-gray-700 text-sm mb-3">Описание:</div>
            <div className="text-sm">{task.desc}</div>
        </div>
        <div className="mb-6">
            {task.oldfiles.length ? <div className="mb-6">
                <div className="text-gray-700 text-sm mb-3">Прикрепленные файлы:</div>
                <ul className="grid grid-cols-3 gap-2">
                    {task.oldfiles.map((file, fdx) => <li key={fdx}>
                        <a href={file.link} target="_blank" className="p-2 bg-neutral-100 rounded-lg items-center gap-2 flex relative">
                            <div className="bg-white rounded-lg justify-center items-center flex h-10 min-w-[2.5rem]">
                                <div className="">{file.title.split('.').splice(-1)}</div>
                            </div>
                            <div className="text-xs leading-tight max-w-[12rem] overflow-hidden">
                                <div className="text-gray-700 font-bold whitespace-nowrap overflow-hidden text-ellipsis w-full">{file.title}</div>
                                <div className="text-zinc-500 whitespace-nowrap overflow-hidden text-ellipsis w-full">{moment(file.created_at).fromNow()}</div>
                            </div>
                            {/* <div className="absolute cursor-pointer right-1 top-1" onClick={e => {
                            setData(prev => {
                                const newdata = { ...prev }
                                newdata.oldfiles.splice(fdx, 1)
                                return newdata
                            })
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 relative" viewBox="0 0 12 12" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M2.46967 2.46967C2.76256 2.17678 3.23744 2.17678 3.53033 2.46967L6 4.93934L8.46967 2.46967C8.76256 2.17678 9.23744 2.17678 9.53033 2.46967C9.82322 2.76256 9.82322 3.23744 9.53033 3.53033L7.06066 6L9.53033 8.46967C9.82322 8.76256 9.82322 9.23744 9.53033 9.53033C9.23744 9.82322 8.76256 9.82322 8.46967 9.53033L6 7.06066L3.53033 9.53033C3.23744 9.82322 2.76256 9.82322 2.46967 9.53033C2.17678 9.23744 2.17678 8.76256 2.46967 8.46967L4.93934 6L2.46967 3.53033C2.17678 3.23744 2.17678 2.76256 2.46967 2.46967Z" fill="#808080" />
                            </svg>
                        </div> */}
                        </a>
                    </li>)}
                </ul>
            </div> : ``}
        </div>
        <Comments task={task} />
        {/*    
        <div className="left-[20px] top-[584px] absolute justify-start items-start gap-2 inline-flex">
                <img className="w-8 h-8 rounded-lg" src="https://via.placeholder.com/32x32" />
                <div className="h-10 px-4 py-2.5 bg-neutral-100 rounded-lg justify-start items-center gap-2.5 flex">
                    <div className="text-gray-700 text-sm font-normal leading-tight">Напишите комментарий</div>
                </div>
            </div>
            <div className="left-[20px] top-[636px] absolute justify-start items-start gap-2 inline-flex">
                <img className="w-8 h-8 rounded-lg" src="https://via.placeholder.com/32x32" />
                <div className="flex-col justify-start items-start gap-1 inline-flex">
                    <div className="text-gray-700 text-sm font-bold leading-tight">Александр Александров</div>
                    <div className="text-zinc-500 text-xs font-normal">Сегодня в 12:32</div>
                    <div className="w-[568px] px-4 py-2.5 bg-neutral-100 rounded-lg justify-start items-center gap-2.5 inline-flex">
                        <div className="text-gray-700 text-sm font-normal leading-tight">Кайрат проследи чтобы пациент не буйствовал если что позови</div>
                    </div>
                    <div className="justify-start items-start gap-4 inline-flex">
                        <div className="text-center text-gray-700 text-xs font-normal underline leading-tight">Изменить</div>
                        <div className="text-center text-red-600 text-xs font-normal underline leading-tight">Удалить</div>
                    </div>
                </div>
            </div> */}
        <div className="flex gap-2.5 items-center">
            <SuccessButton className="rounded-[.5rem]" onClick={e => {
                e.stopPropagation();
                editTask(task)
            }}>
                <span className="text-sm leading-none">Редактировать</span>
            </SuccessButton>
            <DefaultButton className="rounded-[.5rem]">
                <span className="text-sm leading-none" onClick={e => dropTask(task.id)}>Удалить</span>
            </DefaultButton>
        </div>
    </div>
}