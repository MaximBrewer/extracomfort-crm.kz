import { useLayout } from "@/Contexts/LayoutContext";
import statuses from "@/data/statuses";
import ArrowDown from "@/Icons/ArrowDown";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import InputError from "../InputError"
import InputLabel from "../InputLabel";
import PrimaryButton from "../PrimaryButton";
import TextInput from "../TextInput"

export default (props) => {

    const { book, auth, message=`` } = props

    const actionRoute = `${auth.user.role.name}.book.status`;

    const status = statuses.data.find(s => s.code == book.status);

    const { setModal } = useLayout()

    const [open, setOpen] = useState(false)

    const { data, setData, post, patch, processing, errors, reset, transform } = useForm({
        status: status,
    });

    transform((data) => ({
        ...data,
        status: data.status.code
    }))

    const submit = (e) => {
        e && e.preventDefault();
        patch(route(actionRoute, {
            book: book.id
        }), {
            onSuccess: () => {
                setModal(null)
            }
        });
    }

    const close = () => setOpen(false)

    useEffect(() => {
        document.addEventListener('clickinmodal', close)
        return () => {
            document.removeEventListener('clickinmodal', close)
        }
    }, [])

    return <div>
        <h2 className={`font-bold text-xl text-center mb-4`}>Статус</h2>
        <form onSubmit={submit} className={`min-w-[18rem]`}>
            <div className="mb-4">
                <InputLabel htmlFor="status" value="Выберите статус" color={`text-gray-200`} weight={`font-normal`} />
                <div className={`relative my-1 select-none`} onClick={e => e.stopPropagation()}>
                    <a href={`#`} onClick={e => setOpen(prev => !prev)}
                        className={`flex itenms-center justify-between rounded-lg bg-gray-50 shadow-bb px-2.5 py-2 ${data.status.color}`}
                    >
                        <span>{data.status.title}</span>
                        <ArrowDown className={`w-5 h-auto text-gray-700`} />
                    </a>
                    {open ? <ul className={`absolute top-full left-0 w-full rounded-lg bg-gray-50 shadow-bb`}>
                        {statuses.data.map((s, sdx) => <li key={sdx}>
                            <a href={`#`}
                                className={`block px-2.5 py-2 ${s.color}`}
                                onClick={e => {
                                    e.preventDefault();
                                    setData(prev => ({
                                        ...prev,
                                        status: s
                                    }))
                                    setOpen(false)
                                }}>{s.title}</a>
                        </li>)}
                    </ul> : ``}
                </div>
                <InputError message={errors.message} className="mt-2" />
            </div>
            <PrimaryButton className={`w-full my-4 justify-center text-lg font-semibold`}>Изменить</PrimaryButton>
            <div className={`text-center`}>
                <a href="#" className={`text-red-500 underline hover:no-underline`} onClick={e => {
                    e.preventDefault();
                    setModal(null)
                }}>Отменить</a>
            </div>
        </form>
    </div>
}