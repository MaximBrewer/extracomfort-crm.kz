import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { forwardRef } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import moment from 'moment';
import Select, { components } from 'react-select';
import { useEffect } from 'react';
import paymethods from '@/data/paymethods';
import { Fragment } from 'react';
import { customStyles, Th, Td, CustomInput, DropdownIndicator, Navigate } from './Components';

setDefaultLocale(ru);
registerLocale('ru', ru);


export default (props) => {

    const {
        branch,
        pagetitle,
        auth,
        start = null,
        end = null,
        direction = null,
        directions = { data: [] },
        branches = { data: [] },
        results = { data: [] },
        reports = [],
        report
    } = usePage().props


    return (
        <AuthenticatedLayout
            scrollpage={true}
            auth={props.auth}
            errors={props.errors}
            heading={<h1 className="font-semibold text-3xl text-gray-800 leading-tight">{pagetitle}</h1>}
        >
            <div className="rounded-lg shadow-block bg-white pb-12 pt-5 px-8">
                <Navigate {...props} />
                Debt
            </div >
        </AuthenticatedLayout >
    );
}

<div className="flex flex-col gap-2">
<label>Направление:</label>
<Select
    getOptionLabel={el => el.title}
    getOptionValue={el => el.id}
    styles={customStyles}
    isClearable={true}
    isMulti={true}
    components={{ DropdownIndicator }}
    options={directions.data}
    value={data.direction ? directions.data.find(el => data.direction && el.id == data.direction.id) : null}
    onChange={value => setData(prev => ({
        ...prev,
        direction: value
    }))}
    placeholder="Выбрать из списка"
/>
</div>