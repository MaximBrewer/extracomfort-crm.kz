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
    return <td className={`text-center px-2 py-1 border bg-white border-black ${className}`} {...props}> {children}</td>
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
        branches = { data: [] },
        specialists = { data: [] },
        books = { data: [] },
        specialist = null,
        direction = null,
        reports = []
    } = usePage().props



    const { data, setData, get, processing, errors, reset, transform } = useForm({
        start: start && moment(start).isValid() ? new Date(start) : null,
        end: end && moment(end).isValid() ? new Date(end) : null,
        specialist: specialist,
        direction: direction
    });

    transform(data => ({
        ...data,
        start: moment(data.start).isValid() ? moment(data.start).format('YYYY-MM-DD') : null,
        end: moment(data.end).isValid() ? moment(data.end).format('YYYY-MM-DD') : null,
        specialist: data.specialist ? data.specialist.id : null,
        direction: data.direction ? data.direction.id : null
    }))

    useEffect(() => {
        !specialist || !data.specialist || (data.specialist && specialist.id !== data.specialist.id) && setData(prev => ({
            ...prev,
            direction: null
        }))
    }, [data.specialist])

    const handleSubmit = (e) => {
        e.preventDefault();
        get(route(`${auth.user.role.name}.reports.common`, {
            branch: branch.data.id
        }), {
            onSuccess: () => {

            }
        });
    }

    const countServicePrice = () => {
        let sum = 0;
        books.data.map(el => sum += 1 * el.service.price)
        return sum;
    }

    const countServiceDiscoutPrice = () => {
        let sum = 0;
        books.data.map(book => sum += book.payments.length ? book.payments.at(-1).sum : 0)
        return sum;
    }

    const countCashRegister = () => {
        let sum = 0;
        // books.data.map(book => sum += book.payments.length ? book.payments.at(-1).sum : 0)
        return sum;
    }

    const countBalance = () => {
        let sum = 0;
        books.data.map(book => sum += book.payments.length && book.payments.at(-1).method === 'balance' ? book.payments.at(-1).sum : 0)
        return sum;
    }

    const countFromBalance = () => {
        let sum = 0;
        books.data.map(book => sum += book.payments.length && book.payments.at(-1).method === 'balance' ? book.payments.at(-1).sum : 0)
        return sum;
    }

    const countNonCache = () => {
        let sum = 0;
        books.data.map(book => sum += book.payments.length
            && book.payments.at(-1).method !== 'cash'
            && book.payments.at(-1).method !== 'balance'
            && book.payments.at(-1).method !== 'free'
            ? book.payments.at(-1).sum
            : 0)
        return sum;
    }


    const countCash = () => {
        let sum = 0;
        books.data.map(book => sum += book.payments.length && book.payments.at(-1).method === 'cash' ? book.payments.at(-1).sum : 0)
        return sum;
    }


    const countDuty = () => {
        let sum = 0;
        books.data.map(book => sum += !book.payments.length ? book.service.price : 0)
        return sum;
    }


    const countFree = () => {
        let sum = 0;
        books.data.map(book => sum += book.payments.length && book.payments.at(-1).method === 'free' ? 1 : 0)
        return sum;
    }
console.log(branch)

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
                        <label>Cпециалист:</label>
                        <Select
                            getOptionLabel={el => el.fullName}
                            getOptionValue={el => el.id}
                            styles={customStyles}
                            isClearable={true}
                            components={{ DropdownIndicator }}
                            options={specialists.data}
                            value={specialists.data.find(el => data.specialist && el.id == data.specialist.id)}
                            onChange={value => setData(prev => ({
                                ...prev,
                                specialist: value
                            }))}
                            placeholder="Выбрать из списка"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        {data.specialist ? <>
                            <label>Направление:</label>
                            <Select
                                getOptionLabel={el => el.title}
                                getOptionValue={el => el.id}
                                styles={customStyles}
                                isClearable={true}
                                components={{ DropdownIndicator }}
                                options={data.specialist.directions}
                                value={data.direction ? data.specialist.directions.find(el => data.direction && el.id == data.direction.id) : null}
                                onChange={value => setData(prev => ({
                                    ...prev,
                                    direction: value
                                }))}
                                placeholder="Выбрать из списка"
                            />
                        </> : <></>}
                    </div>
                    <div className="col-span-4 flex justify-end">
                        <PrimaryButton disabled={processing} size="">Сформировать отчет</PrimaryButton>
                    </div>

                </form>


                {books.data.length ? <div className="overflow-auto">
                    <table className="my-6 table-auto w-full mb-16 text-xs">
                        <thead>
                            <tr>
                                <Th rowSpan={2}>№</Th>
                                <Th rowSpan={2}>дата</Th>
                                <Th rowSpan={2}>фио пациента</Th>
                                <Th rowSpan={2}>услуга</Th>
                                <Th rowSpan={2}>стоимость услуги</Th>
                                <Th rowSpan={2}>стоимость услуги со скидкой</Th>
                                <Th rowSpan={2}>тип оплаты</Th>
                                <Th rowSpan={2}>оплата в кассу</Th>
                                <Th rowSpan={2}>оплата с баланса</Th>
                                <Th colSpan={5}>Итого поступление в кассу</Th>
                            </tr>
                            <tr>
                                <Th>нал</Th>
                                <Th>безнал</Th>
                                <Th>с баланса</Th>
                                <Th>долг</Th>
                                <Th>без оплаты</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.data.map((book, cdx) => <tr key={cdx}>
                                <Td>{book.id}</Td>
                                <Td>{book.date}</Td>
                                <Td>{book.patient.fullName}</Td>
                                <Td>{book.service.title}</Td>
                                <Td>{book.service.price}</Td>
                                <Td>{book.payments.length ? book.payments.at(-1).sum : ""}</Td>
                                <Td>{book.payments.length ? paymethods.data.find(el => el.code === book.payments.at(-1).method).title : ''}</Td>
                                <Td>{book.payments.length && book.payments.at(-1).method !== 'balance' && book.payments.at(-1).method !== 'free' ? book.payments.at(-1).sum : ""}</Td>
                                <Td>{book.payments.length && book.payments.at(-1).method === 'balance' ? book.payments.at(-1).sum : ""}</Td>
                                <Td>{book.payments.length && book.payments.at(-1).method === 'cash' ? book.payments.at(-1).sum : ""}</Td>
                                <Td>{book.payments.length
                                    && book.payments.at(-1).method !== 'cash'
                                    && book.payments.at(-1).method !== 'balance'
                                    && book.payments.at(-1).method !== 'free'
                                    ? book.payments.at(-1).sum : ""}</Td>
                                <Td>{book.payments.length && book.payments.at(-1).method === 'balance' ? book.payments.at(-1).sum : ""}</Td>
                                <Td>{!book.payments.length ? book.service.price : ""}</Td>
                                <Td>
                                    <div className={`flex justify-center`}>{book.payments.length && book.payments.at(-1).method === 'free' ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg> : ""}</div>
                                </Td>
                            </tr>)}
                        </tbody>
                        <tfoot>
                            <tr>
                                <Td colSpan={4}></Td>
                                <Td>{countServicePrice()}</Td>
                                <Td>{countServiceDiscoutPrice()}</Td>
                                <Td colSpan={1}></Td>
                                <Td>{countCashRegister()}</Td>
                                <Td>{countBalance()}</Td>
                                <Td>{countCash()}</Td>
                                <Td>{countNonCache()}</Td>
                                <Td>{countFromBalance()}</Td>
                                <Td>{countDuty()}</Td>
                                <Td>{countFree()}</Td>
                            </tr>
                        </tfoot>
                    </table>
                </div> : <></>}
            </div >
        </AuthenticatedLayout >
    );
}
