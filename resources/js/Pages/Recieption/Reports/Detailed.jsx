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



const customStyles = {
    control: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return ({
            ...styles,
            borderRadius: `.25rem`,
            minHeight: `1.125rem`,
            outline: `none`,
            borderColor: `gray`,
            boxShadow: `none`,
            flexWrap: `nowrap`
        })
    },
    placeholder: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return ({
            ...styles,
            whiteSpace: `nowrap`,
        })
    },
    singleValue: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return ({
            ...styles,
            fontWeight: 500,
        })
    },
    indicatorContainer: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return ({
            ...styles,
            padding: 2
        })
    },
    ValueContainer2: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return ({
            ...styles,
            padding: 0
        })
    },
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return ({
            ...styles,
            paddingTop: `2px`,
            paddingBottom: `2px`,
        })
    },
    indicatorSeparator: (styles, { data, isDisabled, isFocused, isSelected }) => ({
        ...styles,
        backgroundColor: `transparent`
    }),
};

setDefaultLocale(ru);
registerLocale('ru', ru);


const Th = ({ children, className, ...props }) => {
    return <th className={`border bg-white border-black font-medium px-2 py-1 ${className}`} {...props}> {children}</th>
}

const Td = ({ children, className, ...props }) => {
    return <td className={`px-2 py-1 border bg-white border-black ${className}`} {...props}> {children}</td>
}

const CustomInput = forwardRef((props, ref) => {
    return <input {...props} ref={ref} className="text-sm bg-transparent border-1 shadow-none rounded outline-none py-2 px-4 w-full" />;
});


const DropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <svg width="16" height="6" className="text-purple-900" viewBox="0 0 16 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.63656 5.35044L0.214103 0.86339C-0.241616 0.545002 0.0811491 0.000608444 0.725521 0.000608444L14.5935 0.000608444C15.238 0.000608444 15.5607 0.545002 15.105 0.86339L8.68252 5.35044C8.11757 5.74517 7.2015 5.74517 6.63656 5.35044Z" fill="currentColor" />
            </svg>
        </components.DropdownIndicator>
    );
};

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
        direction: direction
    });

    transform(data => ({
        ...data,
        start: moment(data.start).isValid() ? moment(data.start).format('YYYY-MM-DD') : null,
        end: moment(data.end).isValid() ? moment(data.end).format('YYYY-MM-DD') : null,
        direction: data.direction ? data.direction.id : null
    }))

    const handleSubmit = (e) => {
        e.preventDefault();
        get(route(`${auth.user.role.name}.reports.detailed`, {
            branch: branch.data.id
        }), {
            onSuccess: () => {

            }
        });
    }

    const getQuantity = () => {
        let quantity = 0;
        results.data.map(result => result.categories.map(cetagory => cetagory.services.map(service => quantity += service.quantity)))
        return quantity;
    }

    const getSum = () => {
        let sum = 0;
        results.data.map(result => result.categories.map(cetagory => cetagory.services.map(service => sum += service.sum)))
        return sum;
    }


    return (
        <AuthenticatedLayout
            scrollpage={true}
            auth={props.auth}
            errors={props.errors}
            heading={<h1 className="font-semibold text-3xl text-gray-800 leading-tight">{pagetitle}</h1>}
        >
            <div className="rounded-lg shadow-block bg-white pb-12 pt-5 px-8">

                <div className="grid grid-cols-2 gap-6">
                    <Select
                        getOptionLabel={el => el.title}
                        getOptionValue={el => el.href}
                        styles={customStyles}
                        components={{ DropdownIndicator }}
                        options={reports}
                        value={reports.find(el => el.active)}
                        onChange={value => router.visit(value.href)}
                        placeholder="Выбрать из списка"
                    />
                    <Select
                        getOptionLabel={el => el.title}
                        getOptionValue={el => el.href}
                        styles={customStyles}
                        components={{ DropdownIndicator }}
                        options={branches}
                        value={branches.find(el => el.id === branch.data.id)}
                        onChange={value => router.visit(value.href)}
                        placeholder="Выбрать из списка"
                    />
                </div>

                <h1 className="my-6 text-xl font-semibold">{props.title}</h1>
                <form className={`my-6 grid grid-cols-3 gap-4`} action="" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
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

                    <div className="flex flex-col gap-2">
                        <label>Направление:</label>
                        <Select
                            getOptionLabel={el => el.title}
                            getOptionValue={el => el.id}
                            styles={customStyles}
                            isClearable={true}
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
                    <div className="col-span-4 flex justify-end">
                        <PrimaryButton disabled={processing} size="">Сформировать отчет</PrimaryButton>
                    </div>

                </form>


                {results.data.length ? <div className="overflow-auto">
                    <table className="my-6 table-auto w-full mb-16 text-xs">
                        <thead>
                            <tr>
                                <Th rowSpan={1}>№</Th>
                                <Th rowSpan={1}>услуга</Th>
                                <Th rowSpan={1}>цена</Th>
                                <Th rowSpan={1}>количество полученных услуг</Th>
                                <Th rowSpan={1}>сумма c учетом скидки</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.data.map((result, rdx) => <Fragment key={rdx}>
                                <tr><Th colSpan={5}>{result.title}</Th></tr>
                                {result.categories ? result.categories.map((cetagory, cdx) => <Fragment key={cdx}>{cetagory.services.map((service, sdx) => <tr key={sdx}>
                                    <Td>{service.id}</Td>
                                    <Td>{service.title}</Td>
                                    <Td className={`text-center`}>{service.price}</Td>
                                    <Td className={`text-center`}>{service.quantity}</Td>
                                    <Td className={`text-center`}>{service.sum}</Td>
                                </tr>)}</Fragment>) : <></>}
                                <tr>
                                    <Td colSpan={3} className={`text-right font-bold text-sm`}>Итого:</Td>
                                    <Td colSpan={1} className={`text-center`}>{result.quantity}</Td>
                                    <Td colSpan={1} className={`text-center`}>{result.sum}</Td>
                                </tr>
                            </Fragment>)}
                        </tbody>
                        <tfoot>
                            <tr>
                                <Td colSpan={3} className={`text-right font-bold text-sm`}>Итого по филиалу:</Td>
                                <Td colSpan={1} className={`text-center`}>{getQuantity()}</Td>
                                <Td colSpan={1} className={`text-center`}>{getSum()}</Td>
                            </tr>
                        </tfoot>
                    </table>
                </div> : <></>}
            </div >
        </AuthenticatedLayout >
    );
}
