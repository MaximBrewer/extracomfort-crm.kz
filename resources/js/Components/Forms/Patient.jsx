
import { useLayout } from '@/Contexts/LayoutContext';
import { usePage } from '@inertiajs/react';
import { Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import SuccessButton from '@/Components/SuccessButton';
import CancelButton from "@/Components/CancelButton";
import InputError from "@/Components/InputError"
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput"

const monthes = [
    {
        days: 31,
        title: `Января`
    },
    {
        days: 28,
        title: `Февраля`
    },
    {
        days: 31,
        title: `Марта`
    },
    {
        days: 30,
        title: `Апреля`
    },
    {
        days: 31,
        title: `Мая`
    },
    {
        days: 30,
        title: `Июня`
    },
    {
        days: 31,
        title: `Июля`
    },
    {
        days: 31,
        title: `Августа`
    },
    {
        days: 30,
        title: `Сентября`
    },
    {
        days: 31,
        title: `Октября`
    },
    {
        days: 30,
        title: `Ноября`
    },
    {
        days: 31,
        title: `Декабря`
    },
];


export default () => {

    const { auth, genders, localities, hears, patient = null } = usePage().props

    const { zeroPad } = useLayout();

    const [month, setMonth] = useState(patient && patient.birthdate ? (new Date(patient.birthdate)).getMonth() : 0)
    const [year, setYear] = useState(patient && patient.birthdate ? (new Date(patient.birthdate)).getFullYear() : 1980)
    const [day, setDay] = useState(patient && patient.birthdate ? (new Date(patient.birthdate)).getDate() : 1)

    const { data, setData, post, patch, processing, errors, reset, transform } = useForm({
        id: patient ? patient.id : null,
        name: patient && patient.name ? patient.name : ``,
        lastname: patient && patient.lastname ? patient.lastname : ``,
        surname: patient && patient.surname ? patient.surname : ``,
        birthdate: patient && patient.birthdate ? patient.birthdate : '01.01.1980',
        tin: patient && patient.tin ? `${patient.tin}` : ``,
        email: patient && patient.email ? patient.email : ``,
        phone: patient && patient.phone ? patient.phone : ``,
        addon: patient && patient.addon ? patient.addon : ``,
        gender: patient && patient.gender ? patient.gender : `male`,
        locality_id: patient && patient.locality_id ? patient.locality_id : localities.data[0].id,
        hear_id: patient && patient.hear_id ? patient.hear_id : hears.data[0].id,
    });

    useEffect(() => {
        setData('birthdate', `${zeroPad(day, 2)}.${zeroPad(1 + 1 * month, 2)}.${year}`)
    }, [day, year, month])

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        if (patient && patient.id)
            patch(route(`${auth.user.role.name}.patients.update`, {
                patient: patient.id
            }), {
                onSuccess: () => {

                }
            });
        else
            post(route(`${auth.user.role.name}.patients.store`), {
                onSuccess: () => {

                }
            });
    }

    return <div className="pb-12 pt-5">
        <form onSubmit={submit}>
            <div className={`grid grid-cols-2 gap-16`}>
                <div>
                    <div className="mb-4">
                        <InputLabel htmlFor="name" value="Имя*" color={`text-gray-200`} weight={`normal`} />
                        <TextInput
                            id="name"
                            type="text"
                            placeholder="Иван"
                            name="name"
                            bg="bg-white"
                            border="border border-gray-900 border-opacity-[.12]"
                            rounded="rounded"
                            value={data.name}
                            className="mt-1 block w-full"
                            onChange={handleOnChange}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <InputLabel htmlFor="lastname" value="Фамилия*" color={`text-gray-200`} weight={`normal`} />
                        <TextInput
                            id="lastname"
                            type="text"
                            rounded="rounded"
                            placeholder="Иванов"
                            border="border border-gray-900 border-opacity-[.12]"
                            name="lastname"
                            bg="bg-white"
                            value={data.lastname}
                            className="mt-1 block w-full"
                            onChange={handleOnChange}
                        />
                        <InputError message={errors.lastname} className="mt-2" />
                    </div>
                    <div className={`grid grid-cols-2 gap-12`}>
                        <div className="mb-4">
                            <InputLabel htmlFor="surname" value="Отчество (если имеется)" color={`text-gray-200`} weight={`normal`} />
                            <TextInput
                                id="surname"
                                type="text"
                                name="surname"
                                placeholder="Иванович"
                                bg="bg-white"
                                border="border border-gray-900 border-opacity-[.12]"
                                rounded="rounded"
                                value={data.surname}
                                className="mt-1 block w-full"
                                onChange={handleOnChange}
                            />
                            <InputError message={errors.surname} className="mt-2" />
                        </div>
                        <div className="mb-4">
                            <InputLabel htmlFor="phone" value="Phone*" color={`text-gray-200`} weight={`normal`} />
                            <TextInput
                                id="phone"
                                type="text"
                                name="phone"
                                bg="bg-white"
                                placeholder="+77777777777"
                                border="border border-gray-900 border-opacity-[.12]"
                                rounded="rounded"
                                value={data.phone}
                                className="mt-1 block w-full"
                                onChange={handleOnChange}
                            />
                            <InputError message={errors.phone} className="mt-2" />
                        </div>
                    </div>
                    <div className={`grid grid-cols-2 gap-12`}>
                        <div className="mb-4">
                            <InputLabel htmlFor="tin" value="ИИН" color={`text-gray-200`} weight={`normal`} />

                            <IMaskInput
                                mask={`0000 0000 0000`}
                                value={data.tin}
                                unmask={true} // true|false|'typed'
                                // ref={ref}
                                // inputRef={inputRef}  // access to nested input
                                // // DO NOT USE onChange TO HANDLE CHANGES!
                                // // USE onAccept INSTEAD
                                onAccept={
                                    // depending on prop above first argument is
                                    // `value` if `unmask=false`,
                                    // `unmaskedValue` if `unmask=true`,
                                    // `typedValue` if `unmask='typed'`
                                    (value, mask) => {
                                        handleOnChange({
                                            target: {
                                                value: value,
                                                name: `tin`
                                            }
                                        })
                                    }
                                }
                                className={`rounded bg-white border border-gray-900 border-opacity-[.12] ring-0 mt-1 block w-full`}
                                // ...and more mask props in a guide
                                type={`text`}
                            // input props also available
                            // placeholder='0000 0000 0000'
                            />
                            <InputError message={errors.tin} className="mt-2" />
                        </div>
                        <div className="mb-4">
                            <InputLabel htmlFor="email" value="E-mail*" color={`text-gray-200`} weight={`normal`} />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                bg="bg-white"
                                placeholder="example@mail.com"
                                border="border border-gray-900 border-opacity-[.12]"
                                rounded="rounded"
                                value={data.email}
                                className="mt-1 block w-full"
                                onChange={handleOnChange}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col`}>
                    <div className="mb-4">
                        <InputLabel htmlFor="birthdate" value="Дата рождения*" color={`text-gray-200`} weight={`normal`} />
                        <div className={`grid grid-cols-11 gap-4`}>
                            <div className="col-span-3">
                                <select onChange={e => setDay(e.target.value)} defaultValue={day} className={`w-full rounded bg-white border border-gray-900 border-opacity-[.12] ring-0 mt-1 block w-full`}>
                                    {(new Array(!(year % 4) && month == 1 ? (monthes[month].days + 1) : monthes[month].days).fill(null)).map((item, ddx) => <option value={ddx + 1} key={ddx + 1}>{ddx + 1}</option>)}
                                </select>
                            </div>
                            <div className="col-span-5">
                                <select onChange={e => setMonth(e.target.value)} defaultValue={month} className={`w-full rounded bg-white border border-gray-900 border-opacity-[.12] ring-0 mt-1 block w-full`}>
                                    {monthes.map((month, mdx) => <option value={mdx} key={mdx}>{month.title}</option>)}
                                </select>
                            </div>
                            <div className="col-span-3">
                                <select onChange={e => setYear(e.target.value)} defaultValue={year} className={`w-full rounded bg-white border border-gray-900 border-opacity-[.12] ring-0 mt-1 block w-full`}>
                                    {(new Array(70).fill(null)).map((item, ydx) => <option value={ydx + 1950} key={ydx + 1950}>{ydx + 1950}</option>)}
                                </select>
                            </div>
                        </div>
                        <InputError message={errors.birthdate} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <div className={`grid grid-cols-3 gap-8`}>
                            <div className="">
                                <InputLabel htmlFor="gender" value="Пол*" color={`text-gray-200`} weight={`normal`} />
                                <select value={data.gender} onChange={e => setData(`gender`, e.target.value)} className={`w-full rounded bg-white border border-gray-900 border-opacity-[.12] ring-0 mt-1 block w-full`}>
                                    {genders.map((gender, gdx) => <option value={gender.value} key={gdx}>{gender.label}</option>)}
                                </select>
                                <InputError message={errors.gender} className="mt-2" />
                            </div>
                            <div className="">
                                <InputLabel htmlFor="locality_id" value="Населенный пункт" color={`text-gray-200`} weight={`normal`} />
                                <select value={data.locality_id} onChange={e => setData('locality_id', e.target.value)} className={`w-full rounded bg-white border border-gray-900 border-opacity-[.12] ring-0 mt-1 block w-full`}>
                                    {localities.data.map((locality, ldx) => <option value={locality.id} key={ldx}>{locality.title}</option>)}
                                </select>
                                <InputError message={errors.locality_id} className="mt-2" />
                            </div>
                            <div className="">
                                <InputLabel htmlFor="hear_id" value="Откуда о нас узнали" color={`text-gray-200`} weight={`normal`} />
                                <select value={data.hear_id} onChange={e => setData('hear_id', e.target.value)} className={`w-full rounded bg-white border border-gray-900 border-opacity-[.12] ring-0 mt-1 block w-full`}>
                                    {hears.data.map((hear, hdx) => <option value={hear.id} key={hdx}>{hear.name}</option>)}
                                </select>
                                <InputError message={errors.locality_id} className="mt-2" />
                            </div>
                        </div>
                    </div>
                    <div className="grow mb-4 flex flex-col">
                        <InputLabel htmlFor="addon" value="Дополнительная информация" color={`text-gray-200`} weight={`normal`} />
                        <textarea value={data.addon} onChange={e => setData('addon', e.target.value)} className="w-full rounded bg-white border border-gray-900 border-opacity-[.12] ring-0 mt-1 block w-full grow" />
                        <InputError message={errors.birthdate} className="mt-2" />
                    </div>
                </div>
            </div>
            <div className={`flex space-x-8 items-center justify-end`}>
                <Link href={route(`${auth.user.role.name}.patients`)}>
                    <CancelButton className={`my-4 justify-center text-lg font-semibold`} size={`wide`}>Отменить</CancelButton>
                </Link>
                <SuccessButton type={`submit`} className={`my-4 justify-center text-lg font-semibold`} size={`wide`}>Сохранить</SuccessButton>
            </div>
        </form>
    </div>
}
