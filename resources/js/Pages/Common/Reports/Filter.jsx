import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import moment from 'moment';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { useEffect } from 'react';
import { useState } from 'react';
import { customStyles, CustomInput, DropdownIndicator } from './Components';
import { useRef } from 'react';

setDefaultLocale(ru);
registerLocale('ru', ru);

const Filter = () => {

    const {
        branch,
        auth,
        start = null,
        end = null,
        specialists = { data: [] },
        directions = { data: [] },
        specialist = { data: [] },
        direction = { data: [] },
        service = { data: [] },
        patient = { data: [] },
        report
    } = usePage().props

    const [services, setServices] = useState([])

    const { data, setData, get, processing, errors, reset, transform } = useForm({
        start: start && moment(start).isValid() ? new Date(start) : null,
        end: end && moment(end).isValid() ? new Date(end) : null,
        specialist: specialist.data,
        direction: direction.data,
        service: service.data,
        patient: patient.data
    });

    transform(data => ({
        ...data,
        start: moment(data.start).isValid() ? moment(data.start).format('YYYY-MM-DD') : null,
        end: moment(data.end).isValid() ? moment(data.end).format('YYYY-MM-DD') : null,
        specialist: data.specialist ? data.specialist.map(el => el.id).join('_') : null,
        direction: data.direction ? data.direction.map(el => el.id).join('_') : null,
        service: data.service ? data.service.map(el => el.id).join('_') : null,
        patient: data.patient ? data.patient.value : null,
    }))

    useEffect(() => {

        let servicesArray = [];

        setData(prev => {
            servicesArray = prev.service;
            return {
                ...prev,
                service: []
            }
        })

        if (data.direction && data.direction.length === 1 && data.direction[0].categories) {
            let exists = false;
            setServices(data.direction[0].categories.map(cat => {
                if (cat.services.length > 1)
                    return {
                        label: cat.title,
                        options: cat.services
                    }
                else if (cat.services.length) {
                    exists = servicesArray.findIndex(el => el.id === cat.services[0].id)
                    return cat.services[0]
                } else {
                    return {
                        label: cat.title,
                        options: []
                    }
                }
            }))
            setData(prev => {
                return {
                    ...prev,
                    service: exists ? servicesArray : []
                }
            })
        } else {
            setServices([])
        }

    }, [data.direction])

    const handleSubmit = (e) => {
        e.preventDefault();
        get(route(`${auth.user.role.name}.reports.${report}`, {
            branch: branch.data.id
        }), {
            onSuccess: () => {

            }
        });
    }

    const filterPatients = async (inputValue) => {
        const response = await axios.get(route(`${auth.user.role.name}.search.patients`, {
            query: inputValue
        }))
        return response.data.options;
    };

    const promiseOptions = (inputValue) =>
        new Promise((resolve) => {
            resolve(filterPatients(inputValue))
        });

    return <form className={`my-6`} action="" onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-4 mb-4">
            <div className="flex flex-col gap-2 col-span-2">
                <label>Начало периода:</label>
                <DatePicker
                    customInput={<CustomInput />}
                    selected={data.start}
                    placeholderText="__.__.____"
                    dateFormat={`dd.MM.yyyy`}
                    onChange={(date) => setData('start', date)}
                />
            </div>
            <div className="flex flex-col gap-2 col-span-2">
                <label>Конец периода:</label>
                <DatePicker
                    customInput={<CustomInput />}
                    selected={data.end}
                    placeholderText="__.__.____"
                    dateFormat={`dd.MM.yyyy`}
                    onChange={(date) => setData('end', date)}
                />
            </div>
            <div className="flex flex-col gap-2 col-span-4">
                <label>Cпециалист:</label>
                <Select
                    getOptionLabel={el => el.fullName}
                    getOptionValue={el => el.id}
                    styles={customStyles}
                    isClearable={true}
                    isMulti={true}
                    components={{ DropdownIndicator }}
                    options={specialists.data}
                    value={data.specialist}
                    onChange={value => {
                        setData(prev => ({
                            ...prev,
                            specialist: value
                        }))
                    }}
                    placeholder="Выбрать из списка"
                />
            </div>

            <div className="flex flex-col gap-2 col-span-4">
                <label>Направление:</label>
                <Select
                    getOptionLabel={el => el.title}
                    getOptionValue={el => el.id}
                    styles={customStyles}
                    isClearable={true}
                    isMulti={true}
                    components={{ DropdownIndicator }}
                    options={directions.data}
                    value={data.direction}
                    onChange={value => setData(prev => ({
                        ...prev,
                        direction: value
                    }))}
                    placeholder="Выбрать из списка"
                />
            </div>

            {services.length ? <div className="flex flex-col gap-2 col-span-12">
                <label>Услуга:</label>
                {data.service.title}
                <Select
                    getOptionLabel={el => el.title}
                    getOptionValue={el => el.id}
                    styles={customStyles}
                    isClearable={true}
                    isMulti={true}
                    components={{ DropdownIndicator }}
                    options={services}
                    value={data.service}
                    onChange={value => setData(prev => ({
                        ...prev,
                        service: value
                    }))}
                    placeholder="Выбрать из списка"
                />
            </div> : <></>}
            <div className="flex flex-col gap-2 col-span-12">
                <label>Пациент:</label>
                <AsyncSelect
                    className="w-full mb-4"
                    styles={customStyles}
                    components={{ DropdownIndicator }}
                    cacheOptions
                    defaultOptions
                    isClearable={true}
                    isMulti={false}
                    value={data.patient}
                    loadOptions={promiseOptions}
                    // getOptionLabel={p => `${p.lastname} ${p.name} ${p.surname} ${p.phone ? `(${p.phone})` : `${p.email ? `(${p.email})` : ``}`}`}
                    // getOptionValue={p => p.id}
                    onChange={value => setData(prev => ({
                        ...prev,
                        patient: value
                    }))}
                    placeholder="Введите имя, телефон или e-mail"
                />
            </div>

        </div>
        <div className="flex justify-end">
            <PrimaryButton disabled={processing} size="">Сформировать отчет</PrimaryButton>
        </div>

    </form>
}

export default Filter;