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
        specialists = { data: [] },
        directions = { data: [] },
        specialist = { data: [] },
        direction = { data: [] },
    } = usePage().props

    const { data, setData, get, processing, errors, reset, transform } = useForm({
        specialist: specialist.data,
        direction: direction.data
    });

    transform(data => ({
        ...data,
        specialist: data.specialist ? data.specialist.map(el => el.id).join('_') : null,
        direction: data.direction ? data.direction.map(el => el.id).join('_') : null,
    }))

    const handleSubmit = (e) => {
        e.preventDefault();
        get(window.location, {
            onSuccess: () => {

            }
        });
    }

    return <form className={`my-6`} action="" onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-4 mb-4">
            <div className="flex flex-col gap-2 col-span-5">
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

            <div className="flex flex-col gap-2 col-span-5">
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
            <div className="flex items-end justify-end col-span-2">
                <PrimaryButton disabled={processing} size="sm">Применить</PrimaryButton>
            </div>
        </div>
    </form>
}

export default Filter;