import { useTasks } from "@/Contexts/TasksContext";
import { useForm } from "@inertiajs/react";
import TextArea from "../TextArea";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import moment from "moment";

export default (props) => {

    const { task } = props;

    const timeoutRef = useRef();

    const { setModal, setLists, executors, auth } = useTasks()

    const [comments, setComments] = useState([])

    const { post, data, setData, reset } = useForm({
        comment: ''
    })

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        axios
            .post(route(`${auth.user.role.name}.tasks.comments.store`, {
                task: task.id
            }), data)
            .then(({ data }) => {
                setData('comment', ``)
                setComments(data.data)
                reset()
            })
    }

    const reloadComments = () => {
        axios
            .get(route(`${auth.user.role.name}.tasks.comments.index`, {
                task: task.id
            }), data)
            .then(({ data }) => {
                setComments(data.data)
                timeoutRef.current = setTimeout(() => reloadComments(), 10000)
            })
    }

    useEffect(() => {
        reloadComments();
    }, [task])

    useEffect(() => {
        clearTimeout(timeoutRef)
    }, [])

    return <div className="mb-6">
        <div className="flex gap-3 mb-6">
            <div className="w-8 h-8 bg-cover rounded-full bg-center" style={{ backgroundImage: `url('${auth.user.avatar}')` }}></div>
            <form className="grow relative flex items-center" onSubmit={submit}>
                <div className="w-full">
                    <TextArea
                        onChange={handleOnChange}
                        name="comment"
                        className="w-full h-[3rem] px-4 py-2.5 pr-16"
                        bg="bg-neutral-100" rounded="rounded-lg"
                        value={data.comment}
                        placeholder="Напишите комментарий"
                    />
                </div>
                <button type="submit" className="right-4 absolute cursor-pointer" disabled={!data.comment}>
                    <svg className="w-4 h-auto" viewBox="0 0 16.347 14">
                        <path d="M.14,14,16.48,7,.14,0,.133,5.444,11.809,7,.133,8.556Z" transform="translate(-0.133)" fill="currentColor"></path>
                    </svg>
                </button>
            </form>
        </div>
        <div className="flex flex-col-reverse">
            {comments.map((comment, cdx) => <div key={cdx} className="flex gap-2">
                {comment.user ? <div className="w-8 h-8 rounded-lg bg-cover bg-center relative shrink-0" style={{ backgroundImage: `url('${comment.user.avatar}')` }} /> : ``}
                <div className="flex flex-col gap-2 grow">
                    {comment.user ? <div className="text-gray-700 text-sm font-bold">{comment.user.name}</div> : ``}
                    <div className="text-zinc-500 text-xs">{moment(comment.created_at).fromNow()}</div>
                    <div className="px-4 py-2.5 bg-neutral-100 rounded-lg w-full">
                        <div className="text-gray-700 text-sm">{comment.comment}</div>
                    </div>
                    {/* <div className="justify-start items-start gap-4 inline-flex">
                    <div className="text-center text-gray-700 text-xs font-normal underline leading-tight">Изменить</div>
                    <div className="text-center text-red-600 text-xs font-normal underline leading-tight">Удалить</div>
                </div> */}
                </div>
            </div>)}
        </div>
    </div>
}
