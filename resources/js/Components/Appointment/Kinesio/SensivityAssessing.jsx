
const fields = [
    { label: `Гипер`, name: `hyper` },
    { label: `Норма`, name: `norm` },
    { label: `Гипо`, name: `hypo` },
]

const fields1 = [
    {
        label: `Верхние конечности`,
        name: `top`,
        fields: fields
    },
    {
        label: `Лицо`,
        name: `face`,
        fields: fields
    },
    {
        label: `Нижние конечности`,
        name: `bottom`,
        fields: fields
    }
]

const fields2 = [
    {
        label: `Линейное движение`,
        name: `line`,
        fields: fields
    },
    {
        label: `Вращательное движение`,
        name: `rotate`,
        fields: fields
    }
]

const Th = ({ children, className, ...props }) => {
    return <th className={`font-normal text-left pl-6 px-2 py-1 ${className}`} {...props}> {children}</th>
}

const Td = ({ children, className, ...props }) => {
    return <td className={` px-2 py-1 ${className}`} {...props}> {children}</td>
}

export default (props) => {

    const { data, setData, errors } = props;

    return <div className={`bg-blue-80 rounded-lg p-5 mb-8`}>

        <div className="font-medium mb-4">IV. Оценка чувствительности сенсорных систем</div>
        <div className="my-4">
            <table className="table-auto w-full">
                <tbody>
                    <tr>
                        <Td colSpan={4}>
                            <div className="mb-4 font-medium">Оценка толерантности к тактильным раздражителям</div>
                        </Td>
                    </tr>
                    {fields1.map((cat, cdx) => <tr key={cdx}>
                        <Th>{cat.label}</Th>
                        {cat.fields.map((field, ndx) => <Td key={ndx}>
                            <label className="w-full flex items-center justify-center gap-2">
                                <input
                                    type="radio"
                                    name={`sensivity-${cat.name}`}
                                    className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 '}
                                    defaultChecked={
                                        data.kinesio.sensivity
                                            && data.kinesio.sensivity[cat.name]
                                            ? data.kinesio.sensivity[cat.name] == field.name
                                            : false
                                    }
                                    onChange={e => setData(prev => {
                                        const data = { ...prev }
                                        let kinesio = data.kinesio
                                        if (!kinesio.sensivity) kinesio.sensivity = {
                                            top: null,
                                            face: null,
                                            bottom: null,
                                            line: null,
                                            rotate: null,
                                        }
                                        kinesio.sensivity[cat.name] = field.name
                                        data.kinesio = kinesio
                                        return data
                                    })}
                                />
                                <span>{field.label}</span>
                            </label>
                        </Td>)}
                    </tr>)}
                    <tr>
                        <Td colSpan={4}>
                            <div className="my-4 font-medium">Оценка толерантности к вестибулярным раздражителям</div>
                        </Td>
                    </tr>
                    {fields2.map((cat, cdx) => <tr key={cdx}>
                        <Th>{cat.label}</Th>
                        {cat.fields.map((field, ndx) => <Td key={ndx}>
                            <label className="w-full flex items-center justify-center gap-2">
                                <input
                                    type="radio"
                                    name={`sensivity-${cat.name}`}
                                    className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 '}
                                    defaultChecked={
                                        data.kinesio.sensivity
                                            && data.kinesio.sensivity[cat.name]
                                            ? data.kinesio.sensivity[cat.name] == field.name
                                            : false
                                    }
                                    onChange={e => setData(prev => {
                                        const data = { ...prev }
                                        let kinesio = data.kinesio
                                        if (!kinesio.sensivity) kinesio.sensivity = {
                                            top: null,
                                            face: null,
                                            bottom: null,
                                            line: null,
                                            rotate: null,
                                        }
                                        kinesio.sensivity[cat.name] = field.name
                                        data.kinesio = kinesio
                                        return data
                                    })}
                                />
                                <span>{field.label}</span>
                            </label>
                        </Td>)}
                    </tr>)}
                </tbody>
            </table>
        </div>
    </div>
}
