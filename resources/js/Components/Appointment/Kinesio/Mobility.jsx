import { usePage } from "@inertiajs/react"

const fields = [
    { label: `Гипер`, name: `hyper` },
    { label: `Норма`, name: `norm` },
    { label: `Гипо`, name: `hypo` },
]

const fields1 = [
    {
        label: `Вращательное движение`,
        name: `mobilityrotation`,
        fields: fields
    }
]

const Th = ({ children, className, ...props }) => {
    return <th className={`font-normal text-left pl-0 px-2 py-1 ${className}`} {...props}> {children}</th>
}

const Td = ({ children, className, ...props }) => {
    return <td className={` px-2 py-1 ${className}`} {...props}> {children}</td>
}

export default (props) => {

    const { data, setData, errors } = props;

    const { disabled = false } = usePage().props

    return <div className={`bg-blue-80 rounded-lg p-5 mb-8`}>

        <div className="font-medium mb-4">V. Подвижность</div>
        <div className="my-4">
            <table className="table-auto w-full">
                <tbody>
                    {fields1.map((cat, cdx) => <tr key={cdx}>
                        <Th>{cat.label}</Th>
                        {cat.fields.map((field, ndx) => <Td key={ndx}>
                            <label className="w-full flex items-center justify-center gap-2">
                                <input
                                    disabled={disabled}
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
