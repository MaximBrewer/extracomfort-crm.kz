import { useLayout } from "@/Contexts/LayoutContext";
import { useForm, usePage } from "@inertiajs/react";
import InputError from "../InputError"
import InputLabel from "../InputLabel";
import PrimaryButton from "../PrimaryButton";
import TextInput from "../TextInput"
import AsyncSelect from 'react-select/async';
import axios from "axios";
import SecondaryButton from "../SecondaryButton";
import Info from "./Info";
import { useState } from "react";
import Select from "react-select";
import { useEffect } from "react";

const customStyles = {
    control: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return ({
            ...styles,
            minHeight: `2.625rem`,
            borderRadius: `.5rem`,
            outline: `none`,
            borderColor: `transparent`,
            boxShadow: `none`,
            backgroundColor: `#F4F4F4`
        })
    },
    indicatorSeparator: (styles, { data, isDisabled, isFocused, isSelected }) => ({ ...styles, backgroundColor: `transparent` }),
};

export default (props) => {

    const { setModal } = useLayout()

    const { service, time, branch, date, direction, auth, second = false } = props

    const categories = direction.data.categories ? direction.data.categories : []
    const [services, setServices] = useState(categories.services ? categories.services : [])

    const { data, setData, post, patch, processing, errors, reset, transform } = useForm({
        category: null,
        service: null,
        fservice: service,
        time: time,
        patient: null,
        second: second,
        comment: ``
    });

    transform((data) => ({
        ...data,
        category: data.category ? data.category.id : null,
        service: data.service ? data.service.id : null,
        fservice: data.fservice ? data.fservice.id : null,
        patient: data.patient ? data.patient.value : null,
    }))

    const submit = (e) => {
        e.preventDefault();
        post(route(`${auth.user.role.name}.fisio.books.store`, {
            branch: branch.id,
            date: date,
        }), {
            onSuccess: ({ props }) => {
                setModal(<Info message={props.message} status={`success`} />)
            }
        });
    }

    const filterPatients = async (inputValue) => {
        const response = await axios.get(`/${auth.user.role.name}/search/patients?query=${inputValue}`)
        return response.data.options;
    };

    const promiseOptions = (inputValue) =>
        new Promise((resolve) => {
            resolve(filterPatients(inputValue))
        });

    useEffect(() => {
        setServices(data.category && data.category.services.length ? data.category.services : [])
        if (data.category && data.category.services && data.category.services.length === 1)
            setData('service', data.category.services[0])
    }, [data.category])

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

        {categories.length ? <div className="w-full mb-4">
            <InputLabel htmlFor="service" value="Услуга" color={`text-gray-200`} weight={`normal`} />
            <Select
                styles={customStyles}
                isSearchable={false}
                isClearable={false}
                name="service"
                maxMenuHeight={200}
                value={data.category}
                options={categories}
                placeholder={``}
                getOptionLabel={item => item.title}
                getOptionValue={item => item.id}
                onChange={(value) => setData('category', value)}
            // className="basic-multi-select"
            // classNamePrefix="select"
            />
            <InputError message={errors.service} className="mt-2" />
        </div> : ``}

        {services.length > 1 ? <div className="w-full mb-4">
            <InputLabel htmlFor="service" value="Услуга" color={`text-gray-200`} weight={`normal`} />
            <Select
                styles={customStyles}
                isSearchable={false}
                isClearable={false}
                name="service"
                maxMenuHeight={200}
                value={data.service}
                options={services}
                placeholder={``}
                getOptionLabel={item => item.title}
                getOptionValue={item => item.id}
                onChange={(value) => setData('service', value)}
            // className="basic-multi-select"
            // classNamePrefix="select"
            />
            <InputError message={errors.service} className="mt-2" />
        </div> : ``}
        <div className={`w-full mb-4`}>
            <InputLabel htmlFor="comment" value="Комментарий" color={`text-gray-200`} weight={`normal`} />
            <textarea
                className="pl-4 pr-5 py-2.5 bg-gray-50 border-0 w-full rounded-lg text-black text-sm"
                onChange={(e) => setData('comment', e.target.value)}
                value={data.comment} />
            <InputError message={errors.comment} className="mt-2"
            />
        </div>
        <div className="flex gap-4 justify-end w-full items-center">
            <SecondaryButton size="sm" className="px-4 pt-2.5 pb-2.5" onClick={e => setModal(null)}><span>Отменить</span></SecondaryButton>
            <PrimaryButton size="sm" onClick={submit} disabled={processing}>Записать</PrimaryButton>
        </div>
        <div className="w-full">
            {Object.keys(errors).length ? Object.keys(errors).map((err, edx) => <InputError key={edx} message={errors[err]} className="mt-2" />) : <></>}
        </div>
    </div>
}
