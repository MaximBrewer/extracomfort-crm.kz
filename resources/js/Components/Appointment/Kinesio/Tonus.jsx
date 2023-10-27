import Person from "@/../img/card/kinesio/i2.png"
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';


const FieldItem = ({ data, setData, fields, rounded, field, setZIndex }) => {

    const [opened, setOpened] = useState(false)

    const ref = useRef(null)

    useEffect(() => {
        setZIndex(opened ? `z-10` : `z-0`)
    }, [opened])

    const checkClick = (e) => {
        if (!ref.current.contains(e.target)) setOpened(false)
    }

    useEffect(() => {
        document.addEventListener('click', checkClick)
        return () => {
            document.removeEventListener('click', checkClick)
        }
    }, [opened])

    return <div ref={ref} className={`cursor-pointer relative text-sm flex gap-1 items-center leading-none ${rounded && fields.length > 2 ? `justify-center` : ``}`} onClick={e => setOpened(prev => !prev)}>
        <span>{field.label}</span>
        <div className="">
            <div className="text-center min-w-[1.5rem] py-1 font-medium">{data.kinesio.tonus && data.kinesio.tonus[field.name] ? ['__', 'Го', 'Гр', '+', '0'][data.kinesio.tonus[field.name]] : '__'}</div>
        </div>
        {opened ? <ul className="absolute top-full -translate-x-1/2 left-1/2 lex flex-col -translate-y-[2px] bg-white rounded z-20">
            {['__', 'Го', 'Гр', '+', '0'].map((el, edx) => <li key={edx} onClick={e => setData(prev => {
                const data = { ...prev };
                const kinesio = data.kinesio;
                if (!kinesio.tonus) kinesio.tonus = {};
                kinesio.tonus[field.name] = edx;
                return data
            })} className="px-4 text-center py-1 hover:bg-gray-50">{el}</li>)}
        </ul> : <></>}
    </div>
}


const Field = (props) => {

    const { fields, rounded, className = `` } = props;

    const [zIndex, setZIndex] = useState(`z-0`);

    const classNames = {
        wrapper: rounded ? (fields.length > 2 ? `bg-zinc-300 border border-black rounded-[100%] flex items-center justify-center px-2.5 pt-1 pb-3` : `bg-zinc-300 rounded-full border border-black w-[3.75rem] h-[3.75rem] flex items-center justify-center`) : `bg-white border border-black px-1.5 py-1.5`,
        inner: rounded ? (fields.length > 2 ? `grid grid-cols-2 gap-x-2` : `flex flex-col`) : (fields.length > 2 ? `grid grid-cols-2 gap-x-2` : (fields.length > 1 ? `flex gap-2` : ``))
    }

    return <div className={`${classNames.wrapper} ${className} ${zIndex}`}>
        <div className={`${classNames.inner}`}>
            {fields.map((f, fdx) => <FieldItem key={fdx} {...props} field={f} setZIndex={setZIndex} />)}
        </div>
    </div>
}

export default (props) => {

    const { data, setData, errors } = props;

    const [tonus, setTonus] = useState([0, 0, 0, 0, 0])

    useEffect(() => {
        if (data.kinesio && data.kinesio.tonus) {
            let tonus = [0, 0, 0, 0, 0];
            for (let [key, value] of Object.entries(data.kinesio.tonus)) {
                if (Number.isInteger(value)) {
                    ++tonus[value]
                }
            }
            setTonus(tonus)
        }
    }, [data])

    return <div className={`bg-blue-80 rounded-lg p-5 mb-8`}>

        <div className="font-medium mb-4">VII. Тип тонуса</div>
        <div className="flex gap-16">
            <div className="grow">
                <div className="flex items-center gap-1 mb-2">
                    <span>Карта тела (оценка: Го; Гр; + если есть спастичность; 0&nbsp;-&nbsp;норма)</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                    <span>ВП – верхний перекрест (</span>
                    <input
                        type="checkbox"
                        disabled
                        className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 rounded-sm'}
                        defaultChecked={true}
                    />
                    <span>если есть)</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                    <span>НП – нижний перекрест (</span>
                    <input
                        type="checkbox"
                        disabled
                        className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 rounded-sm'}
                        defaultChecked={true}
                    />
                    <span>если есть)</span>
                </div>

                <div className="font-medium mt-4 mb-2">Сумма </div>
                <label className="flex items-center gap-2 mb-2">
                    <span className="w-8">Го</span> {tonus[1]}
                </label>
                <label className="flex items-center gap-2 mb-2">
                    <span className="w-8">Гр</span> {tonus[2]}
                </label>
                <label className="flex items-center gap-2 mb-2">
                    <span className="w-8">+</span> {tonus[3]}
                </label>
                <label className="flex items-center gap-2 mb-2">
                    <span className="w-8">0</span> {tonus[4]}
                </label>
                <label className="flex items-center gap-2 mb-2">
                    <span className="w-8">Тип</span> {['__', 'Го', 'Гр', '+', '0'][tonus.indexOf(Math.max.apply(null, tonus))]}
                </label>
            </div>
            <div className="shrink-0 p-24">
                <div className="w-[411px] h-[805px] relative bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url('${Person}')` }}>
                    <svg width="274" height="160" className="absolute top-[4.25rem] left-[4.25rem]" viewBox="0 0 274 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0.9375" y1="1.36777" x2="273.559" y2="158.766" stroke="black" />
                    </svg>
                    <svg width="274" height="160" className="absolute top-[4.25rem] left-[4.25rem]" viewBox="0 0 274 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line y1="-0.5" x2="314.797" y2="-0.5" transform="matrix(-0.866025 0.5 0.5 0.866025 273.309 1.80078)" stroke="black" />
                    </svg>
                    <svg width="330" height="180" className="absolute top-[21.825rem] left-[4.175rem]" viewBox="0 0 330 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0.238958" y1="0.560797" x2="329.239" y2="179.561" stroke="black" />
                    </svg>
                    <svg width="266" height="159" className="absolute top-[21.825rem] left-[4.175rem]" viewBox="0 0 266 159" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="265.256" y1="0.429742" x2="0.255548" y2="158.034" stroke="black" />
                    </svg>
                    <div className="text-[50px] absolute top-[44rem] -left-[3rem]">Л</div>
                    <div className="text-[50px] absolute top-[44rem] -right-[3rem]">П</div>


                    <label className="flex items-center gap-2 px-4 py-1 absolute top-[3.25rem] -right-0 bg-zinc-300 border border-black">
                        <span className="w-8">ВП</span>
                        <input
                            type="checkbox"
                            id={`tonus-vp`}
                            onChange={e => setData(prev => {
                                const data = { ...prev }
                                const kinesio = data.kinesio
                                if (!kinesio.tonus) kinesio.tonus = {}
                                kinesio.tonus.vp = e.target.checked
                                return data
                            })}
                            defaultChecked={data.kinesio.tonus && data.kinesio.tonus.vp}
                            className={'leading-none block border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 rounded-sm'}
                        />
                    </label>

                    <label className="flex items-center gap-2 px-4 py-1 absolute top-[32rem] -right-[4rem] bg-zinc-300 border border-black">
                        <span className="w-8">НП</span>
                        <input
                            type="checkbox"
                            id={`tonus-np`}
                            onChange={e => setData(prev => {
                                const data = { ...prev }
                                const kinesio = data.kinesio
                                if (!kinesio.tonus) kinesio.tonus = {}
                                kinesio.tonus.np = e.target.checked
                                return data
                            })}
                            defaultChecked={data.kinesio.tonus && data.kinesio.tonus.np}
                            className={'leading-none block border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 rounded-sm'}
                        />
                    </label>


                    {/* <Field data={data} setData={setData} rounded={false} fields={[
                        { label: `р`, name: `headp` },
                        { label: `c`, name: `headc` }
                    ]} className={`absolute left-1/2 top-7 -translate-x-1/2`} /> */}

                    <Field data={data} setData={setData} rounded={true} fields={[
                        { label: `р`, name: `neckp` },
                        { label: `c`, name: `neckc` }
                    ]} className={`absolute left-1/2 top-16 mt-1 -translate-x-1/2`} />

                    {/* <Field data={data} setData={setData} rounded={false} fields={[
                        { label: `р`, name: `llshp` }
                    ]} className={`absolute left-1/2 top-[8.375rem] -translate-x-1/2 -ml-[10.5rem]`} /> */}
                    <Field data={data} setData={setData} rounded={true} fields={[
                        { label: `р`, name: `lshp` },
                        { label: `c`, name: `lshc` }
                    ]} className={`absolute left-1/2 top-[7.5rem] -translate-x-1/2 -ml-24`} />
                    <Field data={data} setData={setData} rounded={true} fields={[
                        { label: `р`, name: `rshp` },
                        { label: `c`, name: `rshc` }
                    ]} className={`absolute left-1/2 top-[7.5rem] -translate-x-1/2 ml-24`} />
                    {/* <Field data={data} setData={setData} rounded={false} fields={[
                        { label: `р`, name: `rrshp` }
                    ]} className={`absolute left-1/2 top-[8.375rem] -translate-x-1/2 ml-[10.5rem]`} /> */}

                    <Field data={data} setData={setData} rounded={true} fields={[
                        { label: `р`, name: `backp` },
                        { label: `c`, name: `backc` }
                    ]} className={`absolute left-1/2 top-40 -translate-x-1/2`} />

                    {/* <Field data={data} setData={setData} rounded={false} fields={[
                        { label: `р`, name: `bbackp` },
                        { label: `c`, name: `bbackc` }
                    ]} className={`absolute left-1/2 top-[14rem] -translate-x-1/2`} /> */}

                    {/* <Field data={data} setData={setData} rounded={false} fields={[
                        { label: `р`, name: `llelbp` },
                        { label: `c`, name: `llelbc` }
                    ]} className={`absolute left-1/2 top-[16.375rem] -translate-x-1/2 -ml-[12.5rem]`} /> */}
                    <Field data={data} setData={setData} rounded={true} fields={[
                        { label: `р`, name: `lelbp` },
                        { label: `c`, name: `lelbc` }
                    ]} className={`absolute left-1/2 top-[15.5rem] -translate-x-1/2 -ml-[7rem]`} />
                    <Field data={data} setData={setData} rounded={true} fields={[
                        { label: `р`, name: `relbp` },
                        { label: `c`, name: `relbc` }
                    ]} className={`absolute left-1/2 top-[15.5rem] -translate-x-1/2 ml-[7rem]`} />
                    {/* <Field data={data} setData={setData} rounded={false} fields={[
                        { label: `р`, name: `rrelbp` },
                        { label: `c`, name: `rrelbc` }
                    ]} className={`absolute left-1/2 top-[16.375rem] -translate-x-1/2 ml-[12.5rem]`} /> */}

                    {/* <Field data={data} setData={setData} rounded={false} fields={[
                        { label: `р`, name: `sbackp` },
                        { label: `c`, name: `sbackc` }
                    ]} className={`absolute left-1/2 top-[18.25rem] -translate-x-1/2`} /> */}

                    <Field data={data} setData={setData} rounded={true} fields={[
                        { label: `р`, name: `ccxp` },
                        { label: `c`, name: `ccxc` }
                    ]} className={`absolute left-1/2 top-[20.75rem] -translate-x-1/2`} />

                    {/* <Field data={data} setData={setData} rounded={false} fields={[
                        { label: `р`, name: `llpalmp` },
                        { label: `c`, name: `llpalmc` }
                    ]} className={`absolute left-1/2 top-[22.5rem] -translate-x-1/2 -ml-[15rem]`} /> */}
                    <Field data={data} setData={setData} rounded={true} fields={[
                        { label: `р`, name: `lpalmp` },
                        { label: `c`, name: `lpalmc` }
                    ]} className={`absolute left-1/2 top-[21.675rem] -translate-x-1/2 -ml-[9.5rem]`} />
                    <Field data={data} setData={setData} rounded={true} fields={[
                        { label: `р`, name: `rpalmp` },
                        { label: `c`, name: `rpalmc` }
                    ]} className={`absolute left-1/2 top-[21.675rem] -translate-x-1/2 ml-[9.5rem]`} />
                    {/* <Field data={data} setData={setData} rounded={false} fields={[
                        { label: `р`, name: `rrpalmp` },
                        { label: `c`, name: `rrpalmc` }
                    ]} className={`absolute left-1/2 top-[22.5rem] -translate-x-1/2 ml-[15rem]`} /> */}

                    <Field data={data} setData={setData} rounded={true} fields={[
                        { label: `р`, name: `lbuttp` },
                        { label: `c`, name: `lbuttc` },
                        { label: `нр`, name: `lbuttnp` },
                        { label: `вр`, name: `lbuttnc` }
                    ]} className={`absolute left-[3.75rem] top-[24.875rem]`} />
                    <Field data={data} setData={setData} rounded={true} fields={[
                        { label: `р`, name: `rbuttp` },
                        { label: `c`, name: `rbuttc` },
                        { label: `нр`, name: `rbuttnp` },
                        { label: `вр`, name: `rbuttnc` }
                    ]} className={`absolute right-[3.75rem] top-[24.875rem]`} />

                    <Field data={data} setData={setData} rounded={true} fields={[
                        // { label: `р`, name: `lfgrsp` },
                        { label: `c`, name: `lfgrsc` }
                    ]} className={`absolute left-1.5 top-[26.375rem]`} />
                    <Field data={data} setData={setData} rounded={true} fields={[
                        // { label: `р`, name: `rfgrsp` },
                        { label: `c`, name: `rfgrsc` }
                    ]} className={`absolute right-1.5 top-[26.375rem]`} />

                    {/* <Field data={data} setData={setData} rounded={false} fields={[
                        { label: `р`, name: `lhipsp` },
                        { label: `c`, name: `lhipsc` },
                        { label: `о`, name: `lhipso` },
                        { label: `пр`, name: `lhipspr` }
                    ]} className={`absolute left-[5.25rem] top-[28.875rem]`} />
                    <Field data={data} setData={setData} rounded={false} fields={[
                        { label: `р`, name: `rhipsp` },
                        { label: `c`, name: `rhipsc` },
                        { label: `нр`, name: `rhipso` },
                        { label: `вр`, name: `rhipspr` }
                    ]} className={`absolute right-[5.25rem] top-[28.875rem]`} /> */}


                    {/* <Field data={data} setData={setData} rounded={false} fields={[
                        { label: `р`, name: `llkneep` },
                        { label: `c`, name: `llkneec` }
                    ]} className={`absolute left-1/2 top-[34.5rem] -translate-x-1/2 -ml-[8rem]`} /> */}
                    <Field data={data} setData={setData} rounded={true} fields={[
                        { label: `р`, name: `lkneep` },
                        { label: `c`, name: `lkneec` }
                    ]} className={`absolute left-1/2 top-[33.675rem] -translate-x-1/2 -ml-[3rem]`} />
                    <Field data={data} setData={setData} rounded={true} fields={[
                        { label: `р`, name: `rkneep` },
                        { label: `c`, name: `rkneec` }
                    ]} className={`absolute left-1/2 top-[33.675rem] -translate-x-1/2 ml-[3rem]`} />
                    {/* <Field data={data} setData={setData} rounded={false} fields={[
                        { label: `р`, name: `rrkneep` },
                        { label: `c`, name: `rrkneec` }
                    ]} className={`absolute left-1/2 top-[34.5rem] -translate-x-1/2 ml-[8rem]`} /> */}


                    {/* <Field data={data} setData={setData} rounded={false} fields={[
                        { label: `р`, name: `llanklep` },
                        { label: `c`, name: `llanklec` }
                    ]} className={`absolute left-1/2 top-[44.5rem] -translate-x-1/2 -ml-[8rem]`} /> */}
                    <Field data={data} setData={setData} rounded={true} fields={[
                        { label: `р`, name: `lanklep` },
                        { label: `c`, name: `lanklec` }
                    ]} className={`absolute left-1/2 top-[43.675rem] -translate-x-1/2 -ml-[3rem]`} />
                    <Field data={data} setData={setData} rounded={true} fields={[
                        { label: `р`, name: `ranklep` },
                        { label: `c`, name: `ranklec` }
                    ]} className={`absolute left-1/2 top-[43.675rem] -translate-x-1/2 ml-[3rem]`} />
                    {/* <Field data={data} setData={setData} rounded={false} fields={[
                        { label: `р`, name: `rranklep` },
                        { label: `c`, name: `rranklec` }
                    ]} className={`absolute left-1/2 top-[44.5rem] -translate-x-1/2 ml-[8rem]`} /> */}

                    {/* <Field data={data} setData={setData} rounded={false} fields={[
                        { label: `р`, name: `llfeetp` },
                        { label: `c`, name: `llfeetc` }
                    ]} className={`absolute left-1/2 top-[48.5rem] -translate-x-1/2 -ml-[9rem]`} /> */}
                    <Field data={data} setData={setData} rounded={true} fields={[
                        // { label: `р`, name: `lfeetp` },
                        { label: `c`, name: `lfeetc` }
                    ]} className={`absolute left-1/2 top-[47.675rem] -translate-x-1/2 -ml-[4rem]`} />
                    <Field data={data} setData={setData} rounded={true} fields={[
                        // { label: `р`, name: `rfeetp` },
                        { label: `c`, name: `rfeetc` }
                    ]} className={`absolute left-1/2 top-[47.675rem] -translate-x-1/2 ml-[4rem]`} />
                    {/* <Field data={data} setData={setData} rounded={false} fields={[
                        { label: `р`, name: `rrfeetp` },
                        { label: `c`, name: `rrfeetc` }
                    ]} className={`absolute left-1/2 top-[48.5rem] -translate-x-1/2 ml-[9rem]`} /> */}

                </div>
            </div>
        </div>
        {/* <div className="flex items-center gap-16 my-4">
            <div className="flex items-center gap-2">
                <div className="">В точке F</div>
                <Select
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
                                <label htmlFor={`gmfcs-${field.name}`} className="leading-none">{field.label}</label>
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
                                    <label htmlFor={`gmfcs-${field.name}`} className="leading-none">{field.label}</label>
                                </td>
                                <td className="py-1 px-1">
                                    <input
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
                                <td className="py-1 px-1">
                                    <input
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
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div> */}
    </div>
}
