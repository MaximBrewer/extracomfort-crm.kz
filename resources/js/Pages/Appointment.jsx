import Addon from '@/Components/Appointment/Addon';
import Consult from '@/Components/Appointment/Consult';
import Kinesio from '@/Components/Appointment/Kinesio';
import Ods from '@/Components/Appointment/Ods';
import Other from '@/Components/Appointment/Other';
import Painmap from '@/Components/Appointment/Painmap';
import Podiatry from '@/Components/Appointment/Podiatry';
import Reabilitation from '@/Components/Appointment/Reabilitation';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const menu = {
    data: [
        {
            title: "Консультация",
            code: "consult",
        },
        {
            title: "ОДС",
            code: "ods",
        },
        {
            title: "Карта боли",
            code: "painmap",
        },
        {
            title: "Доп. исследования",
            code: "addon",
        },
        {
            title: "Кинезотерапия",
            code: "kinesio",
        },
        {
            title: "Подиатрия",
            code: "podiatry",
        },
        {
            title: "План реабилитации",
            code: "reabilitation",
        },
        {
            title: "Другое",
            code: "other",
        },
    ]
}

export default (props) => {

    const { pagetitle, appointment, auth } = props

    console.log(auth.user.role.name)

    let tabstate = appointment.data.current ? menu.data.find(el => el.code === appointment.data.current) : menu.data[0];

    if (auth.user.role.name === 'recieption') tabstate = menu.data.find(el => el.code === `reabilitation`);
    else if (auth.user.role.name === 'sale') tabstate = menu.data.find(el => el.code === `podiatry`);

    const [tab, setTab] = useState(tabstate)

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            scrollpage={true}
            heading={<h1 className="font-semibold text-3xl text-gray-800 leading-tight">{pagetitle}</h1>}
        >
            <div className="flex flex-col mb-12">
                <ul className={`flex z-1 relative text-center items-strech leading-none`}>
                    {menu.data.map((it, idx) => <li key={idx} className={`relative flex ${it.code === tab.code ? `z-10` : ``}`}>
                        <a href="#" onClick={e => {
                            e.preventDefault()
                            setTab(it)
                        }} className={`flex items-center rounded-t-lg px-2 py-1 shadow-bb font-medium ${it.code === tab.code ? `bg-white` : `bg-blue-50 text-blue-20`}`}>{it.title}</a>
                        <div className="absolute top-full h-2 left-0 w-full bg-white"></div>
                    </li>)}
                </ul>
                <div className={`shadow-bb rounded-lg bg-white py-5 px-6`}>
                    {tab.code === `consult` ? <Consult
                        data={{ ...appointment.data }}
                        setData={() => { }}
                        errors={{}}
                    /> : ``}
                    {tab.code === `ods` ? <Ods
                        data={{ ...appointment.data }}
                        setData={() => { }}
                        transform={() => { }}
                        errors={{}}
                    /> : ``}
                    {tab.code === `painmap` ? <Painmap
                        data={{ ...appointment.data }}
                        setData={() => { }}
                        errors={{}}
                    /> : ``}
                    {tab.code === `addon` ? <Addon
                        data={{ ...appointment.data }}
                        setData={() => { }}
                        errors={{}}
                        appointment={appointment}
                    /> : ``}
                    {tab.code === `kinesio` ? <Kinesio
                        data={{ ...appointment.data }}
                        setData={() => { }}
                        transform={() => { }}
                        errors={{}}
                    /> : ``}
                    {tab.code === `podiatry` ? <Podiatry
                        data={{ ...appointment.data }}
                        setData={() => { }}
                        errors={{}}
                        appointment={appointment}
                    /> : ``}
                    {tab.code === `reabilitation` ? <Reabilitation
                        data={{ ...appointment.data }}
                        setData={() => { }}
                        errors={{}}
                    /> : ``}
                    {tab.code === `other` ? <Other
                        data={{ ...appointment.data }}
                        setData={() => { }}
                        errors={{}}
                    /> : ``}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
