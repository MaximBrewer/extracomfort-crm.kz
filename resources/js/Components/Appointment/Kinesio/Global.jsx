const fields = [
    {
        name: 'sppv',
        label: 'Сидeние прямо, плечи вперед',
        fields: [
            {
                name: 'c',
                label: <span>&nbsp;</span>
            }
        ]
    },
    {
        name: 'slps',
        label: 'Сидя из лежачего положения на спине',
        fields: [
            {
                name: 'c',
                label: <span>&nbsp;</span>
            }
        ]
    },
    {
        name: 'psks',
        label: 'Подъем с колен на стоя',
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
        name: 'sn1n',
        label: 'Стоя на 1 ноге',
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
        name: 'pn1n',
        label: 'Прыжки на 2 ногах',
        fields: [
            {
                name: 'c',
                label: <span>&nbsp;</span>
            }
        ]
    },
    {
        name: 'pn1n',
        label: 'Прыжки на 1 ноге',
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
        name: 'psng',
        label: 'Постучание ногой',
        fields: [
            {
                name: 'c',
                label: <span>&nbsp;</span>
            }
        ]
    },
    {
        name: 'psde',
        label: 'Приседание',
        fields: [
            {
                name: 'l',
                label: 'Л'
            },
        ]
    }
]



export default (props) => {

    const { data, setData, errors } = props;

    return <div className={`bg-blue-80 rounded-lg p-5 mb-8`}>
        <div className="font-medium mb-6">X. Глобальная оценка мышечной функции</div>
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
                                    defaultChecked={data.kinesio.global && data.kinesio.global[field.name] && data.kinesio.global[field.name][f.name] == 0}
                                    onChange={e => setData(prev => {
                                        const data = { ...prev }
                                        const kinesio = data.kinesio
                                        if (!kinesio.global) kinesio.global = {}
                                        if (!kinesio.global[field.name]) kinesio.global[field.name] = {}
                                        kinesio.global[field.name][f.name] = e.target.value
                                        return data
                                    })}
                                />
                                <span>0</span>
                            </label>
                            <label className="flex gap-2 items-center">
                                <input type="radio" name={`${field.name}-${f.name}`} value={0.5}
                                    className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 '}
                                    defaultChecked={data.kinesio.global && data.kinesio.global[field.name] && data.kinesio.global[field.name][f.name] == 0.5}
                                    onChange={e => setData(prev => {
                                        const data = { ...prev }
                                        const kinesio = data.kinesio
                                        if (!kinesio.global) kinesio.global = {}
                                        if (!kinesio.global[field.name]) kinesio.global[field.name] = {}
                                        kinesio.global[field.name][f.name] = e.target.value
                                        return data
                                    })}
                                />
                                <span>½</span>
                            </label>
                            <label className="flex gap-2 items-center">
                                <input type="radio" name={`${field.name}-${f.name}`} value={1}
                                    className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 '}
                                    defaultChecked={data.kinesio.global && data.kinesio.global[field.name] && data.kinesio.global[field.name][f.name] == 1}
                                    onChange={e => setData(prev => {
                                        const data = { ...prev }
                                        const kinesio = data.kinesio
                                        if (!kinesio.global) kinesio.global = {}
                                        if (!kinesio.global[field.name]) kinesio.global[field.name] = {}
                                        kinesio.global[field.name][f.name] = e.target.value
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
                            value={data.kinesio.global && data.kinesio.global[field.name] && data.kinesio.global[field.name].txt ? data.kinesio.global[field.name].txt : ``}
                            onChange={e => setData(prev => {
                                const data = { ...prev }
                                const kinesio = data.kinesio
                                if (!kinesio.global) kinesio.global = {}
                                if (!kinesio.global[field.name]) kinesio.global[field.name] = {}
                                kinesio.global[field.name].txt = e.target.value
                                return data
                            })}
                        />
                    </div>
                </div>
            </div>
        </div>)}
    </div>
}