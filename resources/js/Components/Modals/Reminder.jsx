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
import Calendar from 'react-calendar';
import TextInput from "../TextInput";

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

    const { auth, branch, patient, specialist, reminder = null } = props

    const { setModal, moment } = useLayout()

    const [openCalendar, setOpenCalendar] = useState(false)

    const { data, setData, post, patch, processing, setError, errors, reset, transform } = useForm({
        date: moment(),
        direction: null,
        category: null,
        service: null,
    });

    const [categories, setcategories] = useState(props.categories ? props.categories : [])
    const [services, setServices] = useState(categories.services ? categories.services : [])

    useEffect(() => {
        setcategories(data.direction && data.direction.categories.length ? data.direction.categories : [])
    }, [data.direction])

    useEffect(() => {
        setServices(data.category && data.category.services.length ? data.category.services : [])
        if (data.category && data.category.services && data.category.services.length === 1)
            setData('service', data.category.services[0])
    }, [data.category])

    transform((data) => ({
        ...data,
        direction: data.direction ? data.direction.id : null,
        category: data.category ? data.category.id : null,
        service: data.service ? data.service.id : null,
    }))

    const submit = (e) => {
        e.preventDefault();
        post(route(`${auth.user.role.name}.reminder.store`, {
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
        <h2 className={`font-bold text-xl text-center mb-4`}>Новая бронь</h2>
        <form onSubmit={submit} className={`min-w-[32rem]`}>

            <div className="mb-4 relative">
                <InputLabel htmlFor="date" value="Дата" color={`text-gray-200`} weight={`normal`} />
                <input readOnly={true} value={moment(data.date).isValid() ? moment(data.date).format('DD.MM.YYYY') : moment().format('DD.MM.YYYY')}
                    className={`pl-4 pr-5 py-2.5 bg-gray-50 border-0 w-full rounded-lg text-black text-sm`}
                    onFocus={e => setOpenCalendar(true)} />
                {openCalendar ? <div className="absolute top-full left-0 z-40">
                    <Calendar
                        value={moment(data.date).isValid() ? data.date : new Date()}
                        onChange={(val) => {
                            setData(prev => {
                                return {
                                    ...prev,
                                    date: val
                                }
                            })
                            setOpenCalendar(false)
                        }}
                    />
                </div> : ``}
                <InputError message={errors.date} className="mt-2" />
            </div>

            <div className="mb-4">
                <InputLabel htmlFor="direction" value="Направление" color={`text-gray-200`} weight={`normal`} />
                <Select
                    styles={customStyles}
                    isSearchable={false}
                    isClearable={false}
                    name="direction"
                    maxMenuHeight={200}
                    value={data.direction}
                    options={specialist.directions}
                    placeholder={``}
                    getOptionLabel={item => item.title}
                    getOptionValue={item => item.id}
                    onChange={(value) => setData('direction', value)}
                />
                <InputError message={errors.direction} className="mt-2" />
            </div>

            {categories.length ? <div className="mb-4">
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

            {services.length > 1 ? <div className="mb-4">
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


            <div className={``}>
                <InputLabel htmlFor="comment" value="Комментарий" color={`text-gray-200`} weight={`normal`} />
                <textarea
                    className="pl-4 pr-5 py-2.5 bg-gray-50 border-0 w-full rounded-lg text-black text-sm"
                    onChange={(e) => setData('comment', e.target.value)}
                    value={data.comment} />
                <InputError message={errors.comment} className="mt-2"
                />
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