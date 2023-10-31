import { usePage } from '@inertiajs/react';
import Select, { components } from 'react-select';

const customStyles = {
    control: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return ({
            ...styles,
            borderRadius: `.5rem`,
            minHeight: `1.125rem`,
            outline: `none`,
            borderColor: `#56326E`,
            boxShadow: `none`,
            flexWrap: `nowrap`,
            backgroundColor: `white`
        })
    },
    singleValue: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return ({
            ...styles,
            color: `#56326E`,
            fontWeight: 500,
            textAlign: `center`,
            minWidth: `1.25rem`
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

const DropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <svg width="16" height="6" className="text-violet-900" viewBox="0 0 16 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.63656 5.35044L0.214103 0.86339C-0.241616 0.545002 0.0811491 0.000608444 0.725521 0.000608444L14.5935 0.000608444C15.238 0.000608444 15.5607 0.545002 15.105 0.86339L8.68252 5.35044C8.11757 5.74517 7.2015 5.74517 6.63656 5.35044Z" fill="currentColor" />
            </svg>
        </components.DropdownIndicator>
    );
};

const fields1 = [
    { label: `Повороты`, name: `turns` },
    { label: `Ползание`, name: `crawling` },
    { label: `Сиденье`, name: `seat` },
    { label: `На четвереньках`, name: `onallfours` },
    { label: `На коленях`, name: `onknees` },
    { label: `Стоя с помощью`, name: `standingwith` },
    { label: `Стоя без помощи`, name: `standing` },
]

const fields2 = [
    { label: `По лестнице с помощью (расстояние)`, name: `stairswith`, field: true },
    { label: `Бег (расстояние)`, name: `run`, field: true },
    { label: `Походка с помощью (расстояние)`, name: `gaitwith`, field: true },
    { label: `Походка без помощи (расстояние)`, name: `gait`, field: true },
    { label: `По лестнице без помощи (расстояние)`, name: `stairs`, field: true },
    { label: `Прыжки`, name: `jumping`, field: false },
]

export default (props) => {

    const { data, setData, errors } = props;

    const { disabled = false } = usePage().props

    return <div className={`bg-blue-80 rounded-lg p-5 mb-8`}>

        <div className="font-medium mb-4">VI. GMFCS</div>
        <div className="flex items-center gap-16 my-4">
            <div className="flex items-center gap-2">
                <div className="">В точке F</div>
                <Select
                    isDisabled={disabled}
                    styles={customStyles}
                    components={{ DropdownIndicator }}
                    isSearchable={false}
                    isClearable={false}
                    placeholder="1-5"
                    defaultValue={data.kinesio.gmfcs && data.kinesio.gmfcs.indotf ? {
                        value: data.kinesio.gmfcs.indotf,
                        label: data.kinesio.gmfcs.indotf
                    } : null}
                    options={[1, 2, 3, 4, 5].map(el => ({
                        value: el,
                        label: el
                    }))}
                    onChange={value => setData(prev => {
                        const data = { ...prev }
                        const kinesio = data.kinesio
                        if (!kinesio.gmfcs) kinesio.gmfcs = {}
                        kinesio.gmfcs.indotf = value.value
                        return data
                    })}
                />
            </div>
            <div className="flex items-center gap-2">
                <div className="">Текущий</div>
                <Select
                    isDisabled={disabled}
                    styles={customStyles}
                    components={{ DropdownIndicator }}
                    isSearchable={false}
                    isClearable={false}
                    placeholder="1-5"
                    defaultValue={data.kinesio.gmfcs && data.kinesio.gmfcs.current ? {
                        value: data.kinesio.gmfcs.current,
                        label: data.kinesio.gmfcs.current
                    } : null}
                    options={[1, 2, 3, 4, 5].map(el => ({
                        value: el,
                        label: el
                    }))}
                    onChange={value => setData(prev => {
                        const data = { ...prev }
                        const kinesio = data.kinesio
                        if (!kinesio.gmfcs) kinesio.gmfcs = {}
                        kinesio.gmfcs[`current`] = value.value
                        return data
                    })}
                />
            </div>
        </div>
        <div className="flex gap-6 my-4">
            <div>
                <div className="flex items-center gap-1 mb-4">
                    <span>Каковы ТЕКУЩИЕ позиции активности? (отметьте</span>
                    <input
                        type="checkbox"
                        disabled
                        className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 rounded-sm'}
                        defaultChecked={true}
                    />
                    <span>)</span>
                </div>
                <table>
                    <tbody>
                        {fields1.map((field, fdx) => <tr key={fdx} style={{ verticalAlign: `middle` }}>
                            <td className="py-1 px-1">
                                <input
                                    type="checkbox"
                                    disabled={disabled}
                                    id={`gmfcs-${field.name}`}
                                    onChange={e => setData(prev => {
                                        const data = { ...prev }
                                        const kinesio = data.kinesio
                                        if (!kinesio.gmfcs) kinesio.gmfcs = {}
                                        kinesio.gmfcs[field.name] = e.target.checked
                                        return data
                                    })}
                                    defaultChecked={data.kinesio.gmfcs && data.kinesio.gmfcs[field.name]}
                                    className={'leading-none block border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 rounded-sm'}
                                />
                            </td>
                            <td className="py-1 px-1">
                                <label
                                    htmlFor={`gmfcs-${field.name}`} className="leading-none"
                                    onClick={e => setData(prev => {
                                        const data = { ...prev }
                                        const kinesio = data.kinesio
                                        if (!kinesio.gmfcs) kinesio.gmfcs = {}
                                        kinesio.gmfcs.dominate = field.name
                                        return data
                                    })}
                                >
                                    <span className={`${data.kinesio && data.kinesio.gmfcs && field.name === data.kinesio.gmfcs.dominate ? `underline` : ``}`}>{field.label}</span>
                                </label>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
            <div>
                <div className="mb-4">Какая из этих позиций доминирует? (подчеркнуть)</div>
                <div className="my-4">
                    <table>
                        <tbody>
                            {fields2.map((field, fdx) => <tr key={fdx} style={{ verticalAlign: `middle` }}>
                                <td className="py-1 px-1">
                                    <label htmlFor={`gmfcs-${field.name}`} className="leading-none"
                                        onClick={e => setData(prev => {
                                            const data = { ...prev }
                                            const kinesio = data.kinesio
                                            if (!kinesio.gmfcs) kinesio.gmfcs = {}
                                            kinesio.gmfcs.dominate = field.name
                                            return data
                                        })}
                                    >
                                        <span className={`${data.kinesio && data.kinesio.gmfcs && field.name === data.kinesio.gmfcs.dominate ? `underline` : ``}`}>{field.label}</span>
                                    </label>
                                </td>
                                {field.field ? <td className="py-1 px-1">
                                    <input
                                        disabled={disabled}
                                        name={`gmfcs-${field.name}-text`}
                                        value={data.kinesio.gmfcs && data.kinesio.gmfcs[`${field.name}text`] ? data.kinesio.gmfcs[`${field.name}text`] : ``}
                                        onChange={e => setData(prev => {
                                            const data = { ...prev }
                                            const kinesio = data.kinesio
                                            if (!kinesio.gmfcs) kinesio.gmfcs = {}
                                            kinesio.gmfcs[`${field.name}text`] = e.target.value
                                            return data
                                        })}
                                        className="ounded text-sm w-[81px] rounded-md border border-purple-900 py-0.5 leading-none"
                                    />
                                </td> : <td></td>}
                                <td className="py-1 px-1">
                                    <input
                                        disabled={disabled}
                                        type="checkbox"
                                        id={`gmfcs-${field.name}`}
                                        onChange={e => setData(prev => {
                                            const data = { ...prev }
                                            const kinesio = data.kinesio
                                            if (!kinesio.gmfcs) kinesio.gmfcs = {}
                                            kinesio.gmfcs[field.name] = e.target.checked
                                            return data
                                        })}
                                        defaultChecked={data.kinesio.gmfcs && data.kinesio.gmfcs[field.name]}
                                        className={'block border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 rounded-sm'}
                                    />
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
}
