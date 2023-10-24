import { useLayout } from "@/Contexts/LayoutContext";
import paymethods from "@/data/paymethods";
import ArrowDown from "@/Icons/ArrowDown";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import InputError from "../InputError"
import InputLabel from "../InputLabel";
import PrimaryButton from "../PrimaryButton";
import TextInput from "../TextInput"

export default (props) => {

    const { book, auth } = props

    const actionRoute = `${auth.user.role.name}.book.payment`;

    const { setModal, priceFormat } = useLayout()

    const [open, setOpen] = useState(false)

    const { data, setData, post, patch, processing, errors, reset, transform } = useForm({
        method: null,
        sum: ``,
        prepay: false
    });

    transform((data) => ({
        ...data,
        method: data.method ? data.method.code : null
    }))

    const submit = (e) => {
        e && e.preventDefault();
        post(route(actionRoute, {
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

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    return <div>
        <h2 className={`font-bold text-xl text-center mb-4`}>Оплата</h2>
        <form onSubmit={submit} className={`min-w-[18rem]`}>
            <div className="mb-4 select-none">
                <InputLabel htmlFor="method" value="Выберите метод оплаты" color={`text-gray-200`} weight={`normal`} />
                <div className={`relative my-1`} onClick={e => e.stopPropagation()}>
                    <a href={`#`} onClick={e => setOpen(prev => !prev)}
                        className={`flex itenms-center justify-between rounded-lg bg-gray-50 shadow-bb px-2.5 py-2 ${data.method ? `text-violet-500` : `text-gray-70`}`}
                    >
                        <span>{data.method ? data.method.title : `Не выбрано`}</span>
                        <ArrowDown className={`w-4 h-auto text-gray-700`} />
                    </a>
                    {open ? <ul className={`absolute top-full left-0 w-full rounded-lg bg-gray-50 shadow-bb`}>
                        {paymethods.data.map((m, mdx) => <li key={mdx}>
                            <a href={`#`}
                                className={`block px-2.5 py-2 text-violet-500 border-t`}
                                onClick={e => {
                                    e.preventDefault();
                                    setData(prev => ({
                                        ...prev,
                                        method: m
                                    }))
                                    setOpen(false)
                                }}>{m.title}</a>
                        </li>)}
                    </ul> : ``}
                </div>
                <InputError message={errors.method} className="mt-2" />
            </div>
            <div className="mb-4">
                <InputLabel htmlFor="sum" value="Сумма оплаты" color={`text-gray-200`} weight={`normal`} />
                <TextInput
                    id="sum"
                    type="number"
                    name="sum"
                    bg="bg-gray-50"
                    value={data.sum}
                    className="mt-1 block w-full text-xl"
                    onChange={handleOnChange}
                />
                <InputError message={errors.sum} className="mt-2" />
            </div>
            <div className={`mb-4`}>Баланс: <span className={`text-blue-400`}>{priceFormat(book.patient.balance)}</span></div>
            <div className="mb-4">
                <label htmlFor="prepay" className={`flex items-center select-none cursor-pointer`}>
                    <input type="checkbox" name="prepay" id="prepay" onChange={handleOnChange} defaultChecked={data.prepay} className={`hidden opacity-0 peer`} />
                    <div className={`mr-2 w-5 h-5 peer-checked:hidden border-violet-500 border rounded-[6px]`}></div>
                    <div className={`mr-2 w-5 h-5 hidden peer-checked:flex items-center justify-center border-violet-500 text-violet-500 border rounded-[6px]`}>
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 6L5 8.5L10 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>Предоплата</div>
                </label>
                <InputError message={errors.prepay} className="mt-2" />
            </div>
            <PrimaryButton className={`w-full mb-4 justify-center text-lg font-semibold`}>Отправить</PrimaryButton>
            <div className={`text-center`}>
                <a href="#" className={`text-red-500 underline hover:no-underline`} onClick={e => {
                    e.preventDefault();
                    setModal(null)
                }}>Отменить</a>
            </div>
        </form>
    </div>
}