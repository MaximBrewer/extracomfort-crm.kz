import { useLayout } from "@/Contexts/LayoutContext";
import durations from "@/data/durations";
import services from "@/data/services";
import { useForm, usePage } from "@inertiajs/react";
import Select from "react-select";
import InputError from "../InputError"
import InputLabel from "../InputLabel";
import PrimaryButton from "../PrimaryButton";
import times from "@/data/times";
import { useState } from "react";
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

    const { auth, branch, patient, specialist, book = null, day = null, date = null, week = null, year, item } = props

    const { setModal } = useLayout()

    const { data, setData, post, patch, processing, setError, errors, reset, transform } = useForm({
        time: times.data.find(time => time.value == item.time),
        duration: null,
        service: null,
        year: year,
        day: day,
        week: week,
        date: date
    });

    const [services, setServices] = useState(props.services ? props.services : [])

    useEffect(() => {
        setServices(data.direction && data.direction.services.length ? data.direction.services : [])
    }, [data.direction])

    transform((data) => ({
        ...data,
        time: data.time ? data.time.value : null,
        duration: data.duration ? data.duration.value : null,
        service: data.service ? data.service.id : null,
    }))

    const submit = (e) => {
        e.preventDefault();
        // if (id)
        //     patch(route(`${auth.user.role.name}.book.update`, {
        //         branch: branch.id
        //     }), {
        //         onSuccess: () => {
        //             setModal(null)
        //         }
        //     });
        // else
        post(route(`${auth.user.role.name}.book.store`, {
            branch: branch.id,
            patient: patient.id,
            specialist: specialist.id
        }), {
            onSuccess: () => {
                setModal(null)
            }
        });
    }

    return <div>
        <h2 className={`font-bold text-xl text-center mb-4`}>Новая запись в расписании</h2>
        <form onSubmit={submit} className={`min-w-[32rem]`}>

            <div className={`flex items-start`}>
                <div className="mb-4 w-1/2">
                    <InputLabel htmlFor="time" value="Начало приема" color={`text-gray-200`} weight={`normal`} />
                    <Select
                        styles={customStyles}
                        isSearchable={false}
                        isClearable={false}
                        maxMenuHeight={200}
                        name="time"
                        value={data.time}
                        options={times.data}
                        placeholder={``}
                        onChange={(value) => {
                            setData('time', value)
                            setError('message', null)
                        }}
                    // className="basic-multi-select"
                    // classNamePrefix="select"
                    />
                    <InputError message={errors.time} className="mt-2" />
                </div>
                <svg className={`w-3 h-auto shrink-0 mx-4 mt-9`} viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.6962 4.25606L7.65722 1.21706C7.26622 0.827061 6.63322 0.827061 6.24222 1.21706C5.85222 1.60706 5.85222 2.24106 6.24222 2.63106L7.58622 3.97506H1.94922C1.39822 3.97506 0.949219 4.42306 0.949219 4.97506C0.949219 5.52606 1.39822 5.97506 1.94922 5.97506H7.58622L6.24222 7.31806C5.85222 7.70906 5.85222 8.34206 6.24222 8.73306C6.63322 9.12306 7.26622 9.12306 7.65722 8.73306L10.6962 5.69306C10.7002 5.69006 10.7042 5.68606 10.7072 5.68206C10.9032 5.48706 11.0002 5.23106 11.0002 4.97506C11.0002 4.71906 10.9032 4.46306 10.7072 4.26706C10.7042 4.26406 10.7002 4.26006 10.6962 4.25606Z" fill="#333333" />
                </svg>
                <div className="mb-4 w-1/2">
                    <InputLabel htmlFor="duration" value="Длительность" color={`text-gray-200`} weight={`normal`} />
                    <Select
                        styles={customStyles}
                        isSearchable={false}
                        isClearable={false}
                        maxMenuHeight={200}
                        name="duration"
                        value={data.duration}
                        options={durations.data}
                        placeholder={``}
                        onChange={(value) => {
                            setData('duration', value)
                            setError('message', null)
                        }}
                    // className="basic-multi-select"
                    // classNamePrefix="select"
                    />
                    <InputError message={errors.duration} className="mt-2" />
                </div>
            </div>

            <div className="mb-4">
                <InputLabel htmlFor="service" value="Направление" color={`text-gray-200`} weight={`normal`} />
                <Select
                    styles={customStyles}
                    isSearchable={false}
                    isClearable={false}
                    name="service"
                    maxMenuHeight={200}
                    value={data.direction}
                    options={specialist.directions}
                    placeholder={``}
                    getOptionLabel={item => item.title}
                    getOptionValue={item => item.id}
                    onChange={(value) => setData('direction', value)}
                // className="basic-multi-select"
                // classNamePrefix="select"
                />
                <InputError message={errors.service} className="mt-2" />
            </div>

            {services.length ? <div className="mb-4">
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


            <div className={`text-center`}>
                <InputError message={errors.message} className="mt-2" />
            </div>
            <div className={`text-center`}>
                <PrimaryButton className={`w-full max-w-[24rem] my-4 justify-center text-lg font-semibold`}>Отправить</PrimaryButton>
            </div>
            <div className={`text-center`}>
                <a href="#" className={`text-red-500 underline hover:no-underline`} onClick={e => {
                    e.preventDefault();
                    setModal(null)
                }}>Отменить</a>
            </div>
        </form>
    </div>
}