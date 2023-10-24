import { useLayout } from "@/Contexts/LayoutContext";
import { useForm } from "@inertiajs/react";
import InputError from "../InputError"
import InputLabel from "../InputLabel";
import PrimaryButton from "../PrimaryButton";
import TextInput from "../TextInput"
import moment from "moment";
import TextArea from "../TextArea";
import User from "@/Icons/User";
import File from "@/Icons/File";
import Clock from "@/Icons/Clock2";
import SecondaryButton from "../SecondaryButton";
import SuccessButton from "../SuccessButton";
import DefaultButton from "../DefaultButton";
import Lens from "../Lens";
import { Fragment, useEffect, useRef, useState } from "react";
import Plus from "../Plus";
import Calendar from 'react-calendar';
import Close from "@/Icons/Close";
import TimePicker from 'react-time-picker';
import { useTasks } from "@/Contexts/TasksContext";

export default (props) => {

    const { task = null, executors = [], auth = null } = props

    const { setModal, setLists, dropTask } = useTasks()

    const [openExecutors, setOpenExecutors] = useState(false)
    const [openCalendar, setOpenCalendar] = useState(false)
    const [executorQuery, setExecutorQuery] = useState(``)

    const executorQueryRef = useRef(null)
    const rootExecutorsRef = useRef(null)

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        _method: task ? 'patch' : null,
        id: task ? task.id : null,
        title: task ? task.title : ``,
        desc: task ? task.desc : ``,
        users: task ? task.users : [],
        files: [],
        oldfiles: task ? task.oldfiles : [],
        start: task ? task.start : new Date(),
        deadline: task ? task.deadline : new Date(),
        range: task ? task.range : false,
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        if (task && task.id)
            post(route(`${auth.user.role.name}.tasks.update`, {
                task: task.id
            }), {
                onSuccess: ({ props }) => {
                    props && props.lists && setLists(props.lists)
                    setModal(null)
                }
            });
        else
            post(route(`${auth.user.role.name}.tasks.store`), {
                onSuccess: ({ props }) => {
                    props && props.lists && setLists(props.lists)
                    setModal(null)
                }
            });
    }

    const checkRootExecutors = (e) => {
        rootExecutorsRef.current.contains(e.target) || setOpenExecutors(false)
    }

    useEffect(() => {

    }, [data])

    return <div className="w-[40rem]" onClick={e => checkRootExecutors(e)}>
        <Close className="w-6 h-6 right-5 top-5 absolute cursor-pointer" onClick={e => setModal(null)} />
        <div className="flex items-center gap-3  mb-6">
            <div className="w-8 h-8 bg-cover rounded-full bg-center" style={{ backgroundImage: `url('${auth.user.avatar}')` }}></div>
            <div>
                <span className="">Инициатор задачи </span>
                <span className="font-bold">{auth.user.name}</span>
            </div>
        </div>
        <form onSubmit={submit} className={`text-sm task-form`}>
            <div className="mb-4">
                <TextInput
                    id="title"
                    type="text"
                    name="title"
                    bg="bg-gray-50"
                    rounded="rounded-lg"
                    value={data.title}
                    placeholder="Название задачи"
                    className="w-full"
                    onChange={handleOnChange}
                />
                <InputError message={errors.title} className="mt-2" />
            </div>
            {data.users.length ? <div className="items-center gap-2 flex mb-4">
                <div className="text-gray-700 text-sm">Участники:</div>
                <div className="items-center gap-1 flex">
                    {data.users.map((item, udx) => <div
                        key={item.id}
                        className="w-5 h-5 rounded-lg border bg-cover bg-center relative" style={{ backgroundImage: `url('${item.avatar}')` }}
                        onClick={e => {
                            setData(prev => {
                                const newdata = { ...prev }
                                newdata.users.splice(udx, 1)
                                return newdata
                            })
                        }}
                    >
                        {data.users.findIndex(el => el.id === item.id) > -1 ? <svg className="w-2.5 h-2.5 absolute -top-1 -right-1" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 0C7.76142 0 10 2.23858 10 5C10 7.76142 7.76142 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0ZM6.60984 3.48484L4.375 5.71967L3.39016 4.73484C3.24372 4.58839 3.00628 4.58839 2.85983 4.73484C2.71339 4.88128 2.71339 5.11872 2.85983 5.26516L4.10984 6.51516C4.25628 6.66161 4.49372 6.66161 4.64016 6.51516L7.14017 4.01516C7.28661 3.86872 7.28661 3.63128 7.14017 3.48484C6.99372 3.33839 6.75628 3.33839 6.60984 3.48484Z" fill="#35C53A" />
                            <path d="M6.60984 3.48483L4.375 5.71967L3.39016 4.73483C3.24372 4.58839 3.00628 4.58839 2.85983 4.73483C2.71339 4.88128 2.71339 5.11872 2.85983 5.26516L4.10984 6.51516C4.25628 6.66161 4.49372 6.66161 4.64016 6.51516L7.14017 4.01516C7.28661 3.86872 7.28661 3.63128 7.14017 3.48483C6.99372 3.33839 6.75628 3.33839 6.60984 3.48483Z" fill="white" />
                        </svg> : ``}
                    </div>)}
                    <div className="shrink-0 cursor-pointer" onClick={e => {
                        e.stopPropagation()
                        setOpenExecutors(true)
                    }}>
                        <Plus className="w-4 h-4" />
                    </div>
                </div>
            </div> : ``}

            <div className="text-gray-700 text-sm items-center gap-2 flex mb-4">
                <div className="">Срок:</div>
                <div className="px-4 py-2.5 bg-neutral-100 rounded-lg">
                    {data.range
                        ? <><span>{moment(data.start).format("D MMM")}</span><span> - </span></>
                        : ``}
                    <span>{moment(data.deadline).format("D MMM в HH:mm")}</span>
                </div>
            </div>

            <div className="mb-4 flex gap-4">
                <div className="grow">
                    <TextArea
                        id="desc"
                        name="desc"
                        bg="bg-gray-50"
                        rounded="rounded-lg"
                        value={data.desc}
                        placeholder="Описание задачи"
                        className="w-full min-h-[10rem]"
                        onChange={handleOnChange}
                    />
                    <InputError message={errors.desc} className="mt-2" />
                </div>
                <div className="flex flex-col gap-4 shrink-0">
                    <div className="relative" ref={rootExecutorsRef}>
                        <div className={`pl-4 pr-5 py-2.5 ${openExecutors ? `bg-blue-100` : `bg-slate-100`} cursor-pointer rounded-lg items-center gap-2 flex text-gray-700 text-sm`} onClick={e => setOpenExecutors(prev => !prev)}>
                            <User className="w-5 h-5 relative" />
                            <div className="">Добавить исполнителя</div>
                        </div>
                        {openExecutors ? <div className="bg-stone-50 rounded-lg absolute  bg-white z-50 px-3 py-4 shadow">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 cursor-pointer absolute right-3 top-3" viewBox="0 0 16 16" fill="none" onClick={e => setOpenExecutors(false)}>
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.46967 3.46967C3.76256 3.17678 4.23744 3.17678 4.53033 3.46967L8 6.93934L11.4697 3.46967C11.7626 3.17678 12.2374 3.17678 12.5303 3.46967C12.8232 3.76256 12.8232 4.23744 12.5303 4.53033L9.06066 8L12.5303 11.4697C12.8232 11.7626 12.8232 12.2374 12.5303 12.5303C12.2374 12.8232 11.7626 12.8232 11.4697 12.5303L8 9.06066L4.53033 12.5303C4.23744 12.8232 3.76256 12.8232 3.46967 12.5303C3.17678 12.2374 3.17678 11.7626 3.46967 11.4697L6.93934 8L3.46967 4.53033C3.17678 4.23744 3.17678 3.76256 3.46967 3.46967Z" fill="#414D55" />
                            </svg>
                            <div className="">Исполнители</div>
                            <div className="relative flex items-center">
                                <Lens className="absolute left-2 w-4 h-4" />
                                <input type="text" value={executorQuery} placeholder="Поиск исполнителя" className="pl-8 pr-2 py-2 border-0 bg-white w-full rounded-lg"
                                    onChange={e => setExecutorQuery(e.target.value)}
                                />
                            </div>
                            <ul className="flex flex-col gap-3 max-h-[16rem] overflow-y-auto py-2.5">
                                {executors.map(item => <Fragment key={item.id}>
                                    {item.name.toLowerCase().indexOf(executorQuery.toLowerCase()) > -1 || !executorQuery ? <li>
                                        <div className={`w-[16rem] pl-4 pr-5 py-2.5 rounded-lg items-center gap-2 flex cursor-pointer ${data.users.findIndex(el => el.id === item.id) > -1 ? `bg-sky-500` : `bg-slate-100`}`} onClick={e => {
                                            setData(prev => {
                                                const newdata = { ...prev }
                                                const userIndex = newdata.users.findIndex(el => el.id === item.id)
                                                if (userIndex > -1) {
                                                    newdata.users.splice(userIndex, 1)
                                                } else {
                                                    newdata.users.push(item)
                                                }
                                                return newdata
                                            })
                                        }}>
                                            <div className="w-5 h-5 rounded-lg bg-cover bg-center relative" style={{ backgroundImage: `url('${item.avatar}')` }}>
                                                {data.users.findIndex(el => el.id === item.id) > -1 ? <svg className="w-2.5 h-2.5 absolute -top-1 -right-1" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 0C7.76142 0 10 2.23858 10 5C10 7.76142 7.76142 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0ZM6.60984 3.48484L4.375 5.71967L3.39016 4.73484C3.24372 4.58839 3.00628 4.58839 2.85983 4.73484C2.71339 4.88128 2.71339 5.11872 2.85983 5.26516L4.10984 6.51516C4.25628 6.66161 4.49372 6.66161 4.64016 6.51516L7.14017 4.01516C7.28661 3.86872 7.28661 3.63128 7.14017 3.48484C6.99372 3.33839 6.75628 3.33839 6.60984 3.48484Z" fill="#35C53A" />
                                                    <path d="M6.60984 3.48483L4.375 5.71967L3.39016 4.73483C3.24372 4.58839 3.00628 4.58839 2.85983 4.73483C2.71339 4.88128 2.71339 5.11872 2.85983 5.26516L4.10984 6.51516C4.25628 6.66161 4.49372 6.66161 4.64016 6.51516L7.14017 4.01516C7.28661 3.86872 7.28661 3.63128 7.14017 3.48483C6.99372 3.33839 6.75628 3.33839 6.60984 3.48483Z" fill="white" />
                                                </svg> : ``}
                                            </div>
                                            <div className="text-gray-700 text-sm">
                                                <div>{item.name}</div>
                                                <div>{item.role}</div>
                                            </div>
                                        </div>
                                    </li> : ``}
                                </Fragment>)}
                            </ul>
                        </div> : ``}
                    </div>
                    <div className="pl-4 pr-5 py-2.5 bg-slate-100 rounded-lg items-center gap-2 flex text-gray-700 text-sm relative">
                        <File className="w-5 h-5 shrink-0" />
                        <div className="">Прикрепить файл</div>
                        <input type="file" multiple className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer" onChange={e => {
                            setData(prev => {
                                const newdata = { ...prev }
                                for (let file of e.target.files) newdata.files.push(file)
                                e.target.value = ''
                                return newdata
                            })
                        }} />
                    </div>
                    <div className="pl-4 pr-5 py-2.5 bg-slate-100 rounded-lg items-center gap-2 flex text-gray-700 text-sm relative cursor-pointer" onClick={e => setOpenCalendar(true)}>
                        <Clock className="w-5 h-5 shrink-0" />
                        <div className="">Срок исполнения</div>
                        {openCalendar ? <div className="absolute bg-stone-50 rounded-lg text-zinc-500 text-sm top-full -translate-y-[12rem] left-0 p-3 shadow-lg z-20">
                            <Close className="w-4 h-4 absolute top-2 right-2 cursor-pointer" onClick={e => {
                                e.stopPropagation()
                                setOpenCalendar(false)
                            }} />
                            <div className="text-center mb-2">Дата</div>
                            <div className="mb-2">
                                <Calendar
                                    value={data.range ? [
                                        moment(data.start).isValid() ? data.start : new Date(),
                                        moment(data.deadline).isValid() ? data.deadline : new Date()
                                    ] : moment(data.deadline).isValid() ? data.deadline : new Date()}
                                    onChange={(val) => {
                                        setData(prev => {
                                            return data.range ? {
                                                ...prev,
                                                start: val[0],
                                                deadline: val[1]
                                            } : {
                                                ...prev,
                                                deadline: val
                                            }
                                        })
                                    }}
                                    returnValue={data.range ? `range` : `start`}
                                    selectRange={!!data.range}
                                />
                            </div>
                            <div className="mb-2">
                                <div className="">Начало:</div>
                                <div className="items-center gap-2 flex">
                                    <div className="w-5 h-5 relative flex items-center justify-center">
                                        <input type="checkbox" onChange={handleOnChange} name="range" defaultChecked={!!data.range} value="1" className="peer absolute opacity-0 top-0 left-0 w-full h-full z-10" />
                                        <div className="w-5 h-5 absolute border border-purple-900 rounded-md peer-checked:bg-purple-900" />
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 absolute opacity-0 peer-checked:opacity-100" viewBox="0 0 12 12" fill="none">
                                            <path d="M2.5 6L5 8.5L10 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <input className={`pl-4 pr-5 py-2.5 bg-white rounded-lg text-gray-700 text-sm ${data.range ? `` : `opacity-40`}`} readOnly value={moment(data.start).format('DD.MM.YYYY')} />
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="">Срок:</div>
                                <div className="items-center gap-2 flex">
                                    <input className="pl-4 pr-5 py-2.5 bg-white rounded-lg text-gray-700 text-sm" readOnly value={moment(data.deadline).format('DD.MM.YYYY')} />
                                    <TimePicker className="pl-4 pr-5 py-2.5 text-gray-700 text-sm bg-white rounded-lg w-[5rem]"
                                        onChange={(value) => {
                                            setData(prev => {
                                                const newdata = { ...prev }
                                                newdata.deadline = moment(newdata.deadline).hours(value.split(':')[0])
                                                newdata.deadline = moment(newdata.deadline).minutes(value.split(':')[1])
                                                return newdata
                                            })
                                        }}
                                        clockIcon={null}
                                        clearIcon={null}
                                        value={moment(data.deadline).isValid() ? moment(data.deadline).format('HH:mm') : new Date()}
                                        disableClock={true}
                                    />
                                </div>
                            </div>
                            <SuccessButton className="pt-2 pb-2 w-full justify-center" type="button" onClick={e => {
                                e.stopPropagation()
                                setOpenCalendar(false)
                            }}>
                                <span className="text-sm">Сохранить</span>
                            </SuccessButton>
                        </div> : ``}
                    </div>
                </div>
            </div>
            {data.files.length || data.oldfiles.length ? <div className="mb-4">
                <div className="text-gray-700 text-sm mb-2">Прикрепленные файлы:</div>
                <ul className="grid grid-cols-3 gap-2">
                    {data.oldfiles.length ? data.oldfiles.map((file, fdx) => <li key={fdx} className="p-2 bg-neutral-100 rounded-lg items-center gap-2 flex relative">
                        <div className="bg-white rounded-lg justify-center items-center flex h-10 min-w-[2.5rem]">
                            <div className="">{file.title.split('.').splice(-1)}</div>
                        </div>
                        <div className="text-xs leading-tight max-w-[12rem] overflow-hidden">
                            <div className="text-gray-700 font-bold whitespace-nowrap overflow-hidden text-ellipsis w-full">{file.title}</div>
                            <div className="text-zinc-500 whitespace-nowrap overflow-hidden text-ellipsis w-full">{moment(file.created_at).fromNow()}</div>
                        </div>
                        <div className="absolute cursor-pointer right-1 top-1" onClick={e => {
                            setData(prev => {
                                const newdata = { ...prev }
                                newdata.oldfiles.splice(fdx, 1)
                                return newdata
                            })
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 relative" viewBox="0 0 12 12" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M2.46967 2.46967C2.76256 2.17678 3.23744 2.17678 3.53033 2.46967L6 4.93934L8.46967 2.46967C8.76256 2.17678 9.23744 2.17678 9.53033 2.46967C9.82322 2.76256 9.82322 3.23744 9.53033 3.53033L7.06066 6L9.53033 8.46967C9.82322 8.76256 9.82322 9.23744 9.53033 9.53033C9.23744 9.82322 8.76256 9.82322 8.46967 9.53033L6 7.06066L3.53033 9.53033C3.23744 9.82322 2.76256 9.82322 2.46967 9.53033C2.17678 9.23744 2.17678 8.76256 2.46967 8.46967L4.93934 6L2.46967 3.53033C2.17678 3.23744 2.17678 2.76256 2.46967 2.46967Z" fill="#808080" />
                            </svg>
                        </div>
                    </li>) : ``}
                    {data.files.length ? data.files.map((file, fdx) => <li key={fdx} className="p-2 bg-neutral-100 rounded-lg items-center gap-2 flex relative">
                        <div className="bg-white rounded-lg justify-center items-center flex h-10 min-w-[2.5rem]">
                            <div className="">{file.name.split('.').splice(-1)}</div>
                        </div>
                        <div className="text-xs leading-tight max-w-[12rem] overflow-hidden">
                            <div className="text-gray-700 font-bold whitespace-nowrap overflow-hidden text-ellipsis w-full">{file.name}</div>
                            <div className="text-zinc-500 whitespace-nowrap overflow-hidden text-ellipsis w-full">только что</div>
                        </div>
                        <div className="absolute cursor-pointer right-1 top-1" onClick={e => {
                            setData(prev => {
                                const newdata = { ...prev }
                                newdata.files.splice(fdx, 1)
                                return newdata
                            })
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 relative" viewBox="0 0 12 12" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M2.46967 2.46967C2.76256 2.17678 3.23744 2.17678 3.53033 2.46967L6 4.93934L8.46967 2.46967C8.76256 2.17678 9.23744 2.17678 9.53033 2.46967C9.82322 2.76256 9.82322 3.23744 9.53033 3.53033L7.06066 6L9.53033 8.46967C9.82322 8.76256 9.82322 9.23744 9.53033 9.53033C9.23744 9.82322 8.76256 9.82322 8.46967 9.53033L6 7.06066L3.53033 9.53033C3.23744 9.82322 2.76256 9.82322 2.46967 9.53033C2.17678 9.23744 2.17678 8.76256 2.46967 8.46967L4.93934 6L2.46967 3.53033C2.17678 3.23744 2.17678 2.76256 2.46967 2.46967Z" fill="#808080" />
                            </svg>
                        </div>
                    </li>) : ``}
                </ul>
            </div> : ``}
            <div>
                <InputError message={errors.files} className="mb-2" />
                <InputError message={errors.users} className="mb-2" />
                <InputError message={errors.deadline} className="mb-2" />
                <InputError message={errors.start} className="mb-2" />
                <InputError message={errors.range} className="mb-2" />
            </div>
            <div className="flex gap-2.5 items-center">
                <SuccessButton className="rounded-[.5rem]">
                    <span className="text-sm leading-none">Сохранить</span>
                </SuccessButton>
                <DefaultButton type="button" className="rounded-[.5rem]" onClick={e => dropTask(task.id)}>
                    <span className="text-sm leading-none">Удалить</span>
                </DefaultButton>
            </div>
        </form>
    </div>
}