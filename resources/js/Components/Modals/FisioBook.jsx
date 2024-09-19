import { useLayout } from "@/Contexts/LayoutContext";
import { useForm } from "@inertiajs/react";
import InputError from "../InputError"
import InputLabel from "../InputLabel";
import PrimaryButton from "../PrimaryButton";
import TextInput from "../TextInput"
import AsyncSelect from 'react-select/async';
import axios from "axios";
import SecondaryButton from "../SecondaryButton";
import Info from "./Info";

export default (props) => {

    const { setModal } = useLayout()

    const { service, time, branch, date, second = false } = props

    const { data, setData, post, patch, processing, errors, reset, transform } = useForm({
        service: service,
        time: time,
        patient: null,
        second: second
    });

    transform((data) => ({
        ...data,
        service: data.service ? data.service.id : null,
        patient: data.patient ? data.patient.value : null,
    }))

    const submit = (e) => {
        e.preventDefault();
        post(route('recieption.fisio.books.store', {
            branch: branch.id,
            date: date,
        }), {
            onSuccess: ({ props }) => {
                setModal(<Info message={props.message} status={`success`} />)
            }
        });
    }

    const filterPatients = async (inputValue) => {
        const response = await axios.get(`/recieption/search/patients?query=${inputValue}`)
        return response.data.options;
    };

    const promiseOptions = (inputValue) =>
        new Promise((resolve) => {
            resolve(filterPatients(inputValue))
        });

    return <div className={`flex flex-col items-center justify-center min-w-[32rem]`}>
        <h2 className="text-xl font-medium mb-4">Запись в физиокабинет на {service.title} в {time}</h2>
        <AsyncSelect
            className="w-full mb-4"
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
            // getOptionLabel={p => `${p.lastname} ${p.name} ${p.surname} ${p.phone ? `(${p.phone})` : `${p.email ? `(${p.email})` : ``}`}`}
            // getOptionValue={p => p.id}
            onChange={value => setData('patient', value)}
            placeholder="Введите имя, телефон, тин или e-mail"
        />
        <div className="flex gap-4 justify-end w-full items-center">
            <SecondaryButton size="sm" className="px-4 pt-2.5 pb-2.5" onClick={e => setModal(null)}><span>Отменить</span></SecondaryButton>
            <PrimaryButton size="sm" onClick={submit} disabled={processing}>Записать</PrimaryButton>
        </div>
        <div className="w-full">
            {Object.keys(errors).length ? Object.keys(errors).map((err, edx) => <InputError key={edx} message={errors[err]} className="mt-2" />) : <></>}
        </div>
    </div>
}