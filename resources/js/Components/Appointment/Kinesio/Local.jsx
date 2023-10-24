const fields = [
    {
        name: 'pgps',
        label: 'Поднимание головы в положении на спине',
        fields: [
            {
                name: 'c',
                label: <span>&nbsp;</span>
            }
        ]
    },
    {
        name: 'tgps',
        label: 'Повороты головы в положении на спине',
        fields: [
            {
                name: 'l',
                label: 'Л'
            },
            {
                name: 'p',
                label: 'П'
            },
        ]
    },
    {
        name: 'atpn',
        label: 'Активный тест поднимания ноги',
        fields: [
            {
                name: 'l',
                label: 'Л'
            },
            {
                name: 'p',
                label: 'П'
            },
        ]
    },
    {
        name: 'schm',
        label: 'Сила четырехглавой мышцы',
        fields: [
            {
                name: 'l',
                label: 'Л'
            },
            {
                name: 'p',
                label: 'П'
            },
        ]
    },
    {
        name: 'sbbm',
        label: 'Сила большеберцовой мышцы',
        fields: [
            {
                name: 'l',
                label: 'Л'
            },
            {
                name: 'p',
                label: 'П'
            },
        ]
    },
    {
        name: 'ssbp',
        label: 'Сила сгибателя большого пальца',
        fields: [
            {
                name: 'l',
                label: 'Л'
            },
            {
                name: 'p',
                label: 'П'
            },
        ]
    },
    {
        name: 'otbs',
        label: 'Отведение тазобедренного сустава',
        fields: [
            {
                name: 'l',
                label: 'Л'
            },
            {
                name: 'p',
                label: 'П'
            },
        ]
    },
    {
        name: 'vtbs',
        label: 'Выпрямление тазобедренного сустава',
        fields: [
            {
                name: 'l',
                label: 'Л'
            },
            {
                name: 'p',
                label: 'П'
            },
        ]
    },
    {
        name: 'vrpz',
        label: 'Выпрямление рук в положении на животе',
        fields: [
            {
                name: 'l',
                label: 'Л'
            }
        ]
    },
]



export default (props) => {

    const { data, setData, errors } = props;

    return <div className={`bg-blue-80 rounded-lg p-5 mb-8`}>
        <div className="font-medium mb-6">IX. Локальная оценка мышечной функции</div>
        {fields.map((field, fdx) => <div key={fdx} className="mb-4 flex">
            <label className="w-1/2">{1 + fdx}. {field.label}</label>
            <div className="w-1/2">
                <div key={fdx} className="flex items-start">
                    <div className="w-1/2 flex flex-col gap-1.5 self-center">
                        {field.fields.map((f, ffdx) => <div key={ffdx} className="flex gap-3 items-center text-sm">
                            <div className="w-[2rem]">{f.label}</div>
                            <label className="flex gap-2 items-center">
                                <input type="radio" name={`${field.name}-${f.name}`} value={0}
                                    className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 '}
                                    defaultChecked={data.kinesio.local && data.kinesio.local[field.name] && data.kinesio.local[field.name][f.name] == 0}
                                    onChange={e => setData(prev => {
                                        const data = { ...prev }
                                        const kinesio = data.kinesio
                                        if (!kinesio.local) kinesio.local = {}
                                        if (!kinesio.local[field.name]) kinesio.local[field.name] = {}
                                        kinesio.local[field.name][f.name] = e.target.value
                                        return data
                                    })}
                                />
                                <span>0</span>
                            </label>
                            <label className="flex gap-2 items-center">
                                <input type="radio" name={`${field.name}-${f.name}`} value={0.5}
                                    className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 '}
                                    defaultChecked={data.kinesio.local && data.kinesio.local[field.name] && data.kinesio.local[field.name][f.name] == 0.5}
                                    onChange={e => setData(prev => {
                                        const data = { ...prev }
                                        const kinesio = data.kinesio
                                        if (!kinesio.local) kinesio.local = {}
                                        if (!kinesio.local[field.name]) kinesio.local[field.name] = {}
                                        kinesio.local[field.name][f.name] = e.target.value
                                        return data
                                    })}
                                />
                                <span>½</span>
                            </label>
                            <label className="flex gap-2 items-center">
                                <input type="radio" name={`${field.name}-${f.name}`} value={1}
                                    className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 '}
                                    defaultChecked={data.kinesio.local && data.kinesio.local[field.name] && data.kinesio.local[field.name][f.name] == 1}
                                    onChange={e => setData(prev => {
                                        const data = { ...prev }
                                        const kinesio = data.kinesio
                                        if (!kinesio.local) kinesio.local = {}
                                        if (!kinesio.local[field.name]) kinesio.local[field.name] = {}
                                        kinesio.local[field.name][f.name] = e.target.value
                                        return data
                                    })}
                                />
                                <span>1</span>
                            </label>
                        </div>)}
                    </div>
                    <div className="w-1/2 border-b">
                        <input
                            type="text"
                            name=""
                            className="w-full py-1  bg-transparent border-transparent focus:outline-transparent focus:shadow-none"
                            value={data.kinesio.local && data.kinesio.local[field.name] && data.kinesio.local[field.name].txt ? data.kinesio.local[field.name].txt : ``}
                            onChange={e => setData(prev => {
                                const data = { ...prev }
                                const kinesio = data.kinesio
                                if (!kinesio.local) kinesio.local = {}
                                if (!kinesio.local[field.name]) kinesio.local[field.name] = {}
                                kinesio.local[field.name].txt = e.target.value
                                return data
                            })}
                        />
                    </div>
                </div>
            </div>
        </div>)}
    </div>
}