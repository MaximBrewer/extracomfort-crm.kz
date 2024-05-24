import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { forwardRef } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import moment from 'moment';
import Select, { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import { useEffect } from 'react';
import paymethods from '@/data/paymethods';
import { Fragment } from 'react';
import { customStyles, Th, Td, CustomInput, DropdownIndicator, Navigate } from './Components';
import axios from 'axios';

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

    const loadOptions = async (inputValue, callback) => {
        let data = await axios.get(route(`${auth.user.role.name}.search.patients`, {
            branch: branch.data.id
        }), { params: { query: inputValue } }).then((response) => {
            return response.data.options;
        });
        callback(data);
    };

    const { data, setData, get, processing, errors, reset, transform } = useForm({
        start: start && moment(start).isValid() ? new Date(start) : null,
        end: end && moment(end).isValid() ? new Date(end) : null,
        // specialist: specialist,
        // direction: direction,
        // service: service
    });

    transform(data => ({
        ...data,
        start: moment(data.start).isValid() ? moment(data.start).format('YYYY-MM-DD') : null,
        end: moment(data.end).isValid() ? moment(data.end).format('YYYY-MM-DD') : null,
        // specialist: data.specialist ? data.specialist.id : null,
        // direction: data.direction ? data.direction.id : null,
        // service: data.service ? data.service.id : null
    }))

    const handleSubmit = (e) => {
        e.preventDefault();
        get(route(`${auth.user.role.name}.reports.${report}`, {
            branch: branch.data.id
        }), {
            onSuccess: () => {

            }
        });
    }


    return (
        <AuthenticatedLayout
            scrollpage={true}
            auth={props.auth}
            errors={props.errors}
            heading={<h1 className="font-semibold text-3xl text-gray-800 leading-tight">{pagetitle}</h1>}
        >
            <div className="rounded-lg shadow-block bg-white pb-12 pt-5 px-8">
                <Navigate {...props} />
                <form className={`my-6`} action="" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-[1fr_1fr_4fr] gap-4 mb-4">
                        <div className="flex flex-col gap-2">
                            <label>Начало периода:</label>
                            <DatePicker
                                customInput={<CustomInput />}
                                selected={data.start}
                                placeholderText="__.__.____"
                                dateFormat={`dd.MM.yyyy`}
                                onChange={(date) => setData('start', date)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Конец периода:</label>
                            <DatePicker
                                customInput={<CustomInput />}
                                selected={data.end}
                                placeholderText="__.__.____"
                                dateFormat={`dd.MM.yyyy`}
                                onChange={(date) => setData('end', date)}
                            />
                        </div>
                        <div className="flex flex-col gap-2 grow">
                            <label>Пациент:</label>
                            <AsyncSelect
                                cacheOptions
                                defaultOptions
                                loadOptions={loadOptions}
                                onChange={value => setData(prev => ({
                                    ...prev,
                                    patient: value.value
                                }))}
                                className="w-full"
                                placeholder="Введите имя, телефон или e-mail"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <PrimaryButton disabled={processing} size="">Сформировать отчет</PrimaryButton>
                    </div>
                </form>
                {results.data.length ? <div className="overflow-auto">
                    <table className="mt-6 table-auto w-full mb-4 text-xs">
                        <thead>
                            <tr>
                                <Th className="text-left">дата</Th>
                                <Th className="text-left">специалист</Th>
                                <Th className="text-left">оказанная услуга</Th>
                                <Th className="text-left">оплата</Th>
                                <Th className="text-left">администратор, сделавший запись</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.data.map((result, rdx) => <Fragment key={rdx}>
                                <tr>
                                    <Td>{result.date}</Td>
                                    <Td>{result.specialist}</Td>
                                    <Td>{result.service}</Td>
                                    <Td>{result.pay}</Td>
                                    <Td>{result.recieption}</Td>
                                </tr>
                            </Fragment>
                            )}
                        </tbody>
                    </table>
                </div> : <></>}
            </div >
        </AuthenticatedLayout >
    );
}
