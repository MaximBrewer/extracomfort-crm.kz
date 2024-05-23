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
        reports = []
    } = usePage().props


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
        get(route(`${auth.user.role.name}.reports.reception`, {
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
                    <div className="grid grid-cols-[1fr_1fr_2fr_2fr] gap-4 mb-4">
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
                    </div>
                    <div className="flex justify-end">
                        <PrimaryButton disabled={processing} size="">Сформировать отчет</PrimaryButton>
                    </div>
                </form>


                {results.data.length ? <div className="overflow-auto">
                    <table className="mt-6 table-auto w-full mb-4 text-xs">
                        <thead>
                            <tr>
                                <Th rowSpan={2}>Специалисты</Th>
                                <Th colSpan={3}>Кол-во принятых пациентов</Th>
                            </tr>
                            <tr>
                                <Th>первичные</Th>
                                <Th>повторные</Th>
                                <Th>всего</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.data.map((dir, cdx) => <Fragment key={cdx}>
                                <tr>
                                    <Td colSpan="4"><span className='font-bold'>{dir.title}</span></Td>
                                </tr>
                                {dir.specialists.map((specialist, ddx) =>
                                    <tr key={ddx}>
                                        <Td>{specialist.fullname}</Td>
                                        <Td>{specialist.first}</Td>
                                        <Td>{specialist.repeat}</Td>
                                        <Td>{specialist.total}</Td>
                                    </tr>)}
                                <tr>
                                    <Td><span className='font-bold'>Итого по подразделению:</span></Td>
                                    <Td>{dir.first}</Td>
                                    <Td>{dir.repeat}</Td>
                                    <Td>{dir.total}</Td>
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
