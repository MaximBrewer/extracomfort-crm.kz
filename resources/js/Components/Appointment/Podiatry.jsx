import { Fragment } from "react";
import PrimaryButton from "../PrimaryButton";
import Select, { components } from 'react-select';
import { Link } from "@inertiajs/react";
import { useLayout } from "@/Contexts/LayoutContext";

import Img1 from "../../../img/card/podiatry/i1.jpg"
import Img2 from "../../../img/card/podiatry/i2.jpg"
import Img3 from "../../../img/card/podiatry/i3.jpg"
import Img4 from "../../../img/card/podiatry/i4.jpg"
import Img5 from "../../../img/card/podiatry/i5.jpg"
import { useRef } from "react";
import { useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import { useState } from "react";
import File from "@/Icons/File";

const customStyles = {
    control: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return ({
            ...styles,
            borderRadius: `.25rem`,
            minHeight: `1.125rem`,
            outline: `none`,
            borderColor: `transparent`,
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

const DropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <svg width="16" height="6" className="text-purple-900" viewBox="0 0 16 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.63656 5.35044L0.214103 0.86339C-0.241616 0.545002 0.0811491 0.000608444 0.725521 0.000608444L14.5935 0.000608444C15.238 0.000608444 15.5607 0.545002 15.105 0.86339L8.68252 5.35044C8.11757 5.74517 7.2015 5.74517 6.63656 5.35044Z" fill="currentColor" />
            </svg>
        </components.DropdownIndicator>
    );
};

const ieoptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(el => ({
    label: el,
    value: el
}))

const fpiptions = [`-2`, `-1`, `0`, `+1`, `+2`].map((el, edx) => ({
    label: el,
    value: edx
}))

const Element = (props) => {

    const { data, setData, formitem, jsonname } = props

    const [count, setCount] = useState(data.podiatry
        && data.podiatry[jsonname]
        && data.podiatry[jsonname][`${formitem.name}`] ? data.podiatry
        && data.podiatry[jsonname]
    && data.podiatry[jsonname][`${formitem.name}`].length : 1)

    return (new Array(count).fill(null)).map((dr, drx) => <div key={drx} className="flex items-center gap-4 justify-between mb-1.5">
        <div className="text-sm flex gap-1 items-center justify-between w-[9.5rem]">
            <div>{drx ? `` : formitem.title}</div>
            {formitem.multiple ? (
                drx ? <div
                    className="cursor-pointer w-4 h-4 bg-purple-900 rounded flex items-center justify-center leading-none font-bold text-white"
                    onClick={e => setCount(prev => --prev)}
                >-</div> : <div
                    className="cursor-pointer w-4 h-4 bg-purple-900 rounded flex items-center justify-center leading-none font-bold text-white"
                    onClick={e => setCount(prev => ++prev)}
                >+</div>) : <></>}
        </div>
        <div className="flex items-center gap-8">
            {formitem.items.map((item, ddx) => <div key={ddx} className="flex items-center gap-2">
                <div className="text-sm w-16">{item.title}</div>
                <div className="w-20">
                    <Select
                        styles={customStyles}
                        components={{ DropdownIndicator }}
                        options={ieoptions}
                        placeholder={`-`}
                        value={
                            data.podiatry
                                && data.podiatry[jsonname]
                                && data.podiatry[jsonname][`${formitem.name}`]
                                && data.podiatry[jsonname][`${formitem.name}`][drx]
                                && data.podiatry[jsonname][`${formitem.name}`][drx][item.name]
                                ? ieoptions.find(el => el.value == data.podiatry[jsonname][`${formitem.name}`][drx][item.name])
                                : null
                        }
                        isSearchable={false}
                        isClearable={false}
                        onChange={value => setData(prev => {
                            const data = { ...prev }
                            data.podiatry || (data.podiatry = {})
                            data.podiatry[jsonname] || (data.podiatry[jsonname] = {})
                            data.podiatry[jsonname][formitem.name] || (data.podiatry[jsonname][formitem.name] = [])
                            data.podiatry[jsonname][formitem.name][drx] || (data.podiatry[jsonname][formitem.name][drx] = {})
                            data.podiatry[jsonname][`${formitem.name}`][drx][item.name] = value.value
                            return data
                        })}
                    />
                </div>
            </div>)}
        </div>
    </div>)
}

export default (props) => {

    const { data, setData, errors, nextTab, appointment } = props;

    const canvaTriggerRef = useRef(null)

    useEffect(() => {
        if (canvaTriggerRef.current && data.podiatry.insoleslines) {
            setTimeout(() => {
                canvaTriggerRef.current.simulateDrawingLines({ lines: data.podiatry.insoleslines, immediate: true })
            }, 150)
        }
    }, [canvaTriggerRef])

    const canvaViscerRef = useRef(null)

    useEffect(() => {
        if (canvaViscerRef.current && data.podiatry.shoeslines) {
            setTimeout(() => {
                canvaViscerRef.current.simulateDrawingLines({ lines: data.podiatry.shoeslines, immediate: true })
            }, 150)
        }
    }, [canvaViscerRef])


    return <>
        <div className={`bg-violet-200 rounded-lg px-5 py-4 mb-4`}>
            <div className="font-semibold mb-4">Ортопедические стельки</div>
            <div className="flex gap-8">
                <div className="grow">
                    <div className="text-sm font-semibold mb-4">Корректоры стопы:</div>
                    <div className="mb-4">
                        <textarea
                            className="bg-white rounded-lg border-white w-full h-[3.5rem]"
                            onChange={e => setData(prev => {
                                const data = { ...prev }
                                data.podiatry || (data.podiatry = {})
                                data.podiatry[`heading`] = e.target.value
                                return data
                            })}
                            value={data.podiatry ? (data.podiatry[`heading`] ?? ``) : ``}
                        />
                    </div>
                    <div className="text-sm font-semibold mb-4">Элементы коррекции:</div>
                    <div>
                        {[
                            {
                                title: `Коски вальгусные`,
                                name: `kskvlg`,
                                multiple: true,
                                items: [
                                    {
                                        title: `Левый`,
                                        name: `l`
                                    },
                                    {
                                        title: `Правый`,
                                        name: `r`
                                    }
                                ]
                            },
                            {
                                title: `Коски варусные`,
                                name: `kskvar`,
                                multiple: true,
                                items: [
                                    {
                                        title: `Левый`,
                                        name: `l`
                                    },
                                    {
                                        title: `Правый`,
                                        name: `r`
                                    }
                                ]
                            },
                            {
                                title: `Пронатор`,
                                name: `pron`,
                                multiple: true,
                                items: [
                                    {
                                        title: `Левый`,
                                        name: `l`
                                    },
                                    {
                                        title: `Правый`,
                                        name: `r`
                                    }
                                ]
                            },
                            {
                                title: `Супинатор`,
                                name: `sup`,
                                multiple: true,
                                items: [
                                    {
                                        title: `Слева`,
                                        name: `l`
                                    },
                                    {
                                        title: `Справа`,
                                        name: `r`
                                    }
                                ]
                            },
                            {
                                title: `Клин`,
                                name: `clin`,
                                multiple: true,
                                items: [
                                    {
                                        title: `Слева`,
                                        name: `l`
                                    },
                                    {
                                        title: `Справа`,
                                        name: `r`
                                    }
                                ]
                            },
                            {
                                title: `Подпяточник`,
                                name: `pdp`,
                                multiple: false,
                                items: [
                                    {
                                        title: `Слева`,
                                        name: `l`
                                    },
                                    {
                                        title: `Справа`,
                                        name: `r`
                                    }
                                ]
                            },
                            {
                                title: `Колодец`,
                                name: `col`,
                                multiple: true,
                                items: [
                                    {
                                        title: ``,
                                        name: `c`
                                    }
                                ]
                            },
                        ].map((formitem, fdx) => <Element key={fdx} formitem={formitem} data={data} setData={setData} jsonname="insoleselements" />)}
                    </div>
                    <div className="pl-4 pr-5 py-2.5 bg-slate-100 rounded-lg items-center gap-2 flex text-gray-700 text-sm relative my-4">
                        <File className="w-5 h-5 shrink-0" />
                        <div className="">{data.podiatry.file ? data.podiatry.file.name : `Прикрепить файл`}</div>
                        <input
                            type="file"
                            className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                            onChange={e => setData(prev => {
                                const data = { ...prev }
                                data.podiatry || (data.podiatry = {})
                                data.podiatry.file = e.target.files.length ? e.target.files[0] : null;
                                return data
                            })}
                        />
                        {data.podiatry.file && data.podiatry.file.href ? <a className="underline hover:no-undrline text-primary-500 relative" href={data.podiatry.file.href} target="_blank">Смотреть</a> : ``}
                    </div>

                    <div className="text-sm font-semibold mb-2">FPI</div>
                    <div className="mb-4">
                        {[0, 1, 2].map((fpiitem, fdx) => <div key={fdx} className="flex text-center">
                            {[`l`, `r`].map((side, sdx) => <div key={sdx} className="w-20">
                                <Select
                                    styles={{
                                        ...customStyles,
                                        control: (styles, { data, isDisabled, isFocused, isSelected }) => {
                                            return ({
                                                ...styles,
                                                textAlign: `center`,
                                                borderRadius: 0,
                                                borderColor: `black`
                                            })
                                        },
                                    }}
                                    components={{ DropdownIndicator }}
                                    options={fpiptions}
                                    placeholder={`-`}
                                    value={
                                        data.podiatry
                                            && data.podiatry.fpi
                                            && data.podiatry.fpi[fpiitem]
                                            && data.podiatry.fpi[fpiitem][side] !== undefined
                                            ? fpiptions.find(el => el.value == data.podiatry.fpi[fpiitem][side])
                                            : null
                                    }
                                    isSearchable={false}
                                    isClearable={false}
                                    onChange={value => setData(prev => {
                                        const data = { ...prev }
                                        data.podiatry || (data.podiatry = {})
                                        data.podiatry.fpi || (data.podiatry.fpi = [])
                                        data.podiatry.fpi[fpiitem] || (data.podiatry.fpi[fpiitem] = {})
                                        data.podiatry.fpi[fpiitem][side] = value.value
                                        return data
                                    })}
                                />
                            </div>)}
                        </div>)}
                    </div>

                    <div className="text-sm font-semibold mb-4">Примечание:</div>
                    <div className="mb-4">
                        <textarea
                            className="bg-white rounded-lg border-white w-full h-[5rem]"
                            onChange={e => setData(prev => {
                                const data = { ...prev }
                                data.podiatry || (data.podiatry = {})
                                data.podiatry[`insolesnote`] = e.target.value
                                return data
                            })}
                            value={data.podiatry ? (data.podiatry[`insolesnote`] ?? ``) : ``}
                        />
                    </div>
                </div>
                <div className="shrink-0">
                    <div className="rounded-lg overflow-hidden realtive" style={{ transform: `translate3d(0,0,0)` }}>
                        <CanvasDraw
                            ref={canvaTriggerRef}
                            lazyRadius={0}
                            hideGrid={true}
                            hideInterface={false}
                            brushRadius={5}
                            brushColor="#3A9EAA"
                            canvasWidth={320}
                            canvasHeight={333}
                            imgSrc={Img1}
                            onChange={e => setData(prev => {
                                const data = { ...prev }
                                data.podiatry || (data.podiatry = {})
                                data.podiatry.insoleslines = e.lines
                                return data
                            })}
                        />
                    </div>
                    <div className="flex justify-center gap-12 py-2 items-center">
                        <button onClick={e => canvaTriggerRef.current.undo()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                            </svg>
                        </button>
                        <button onClick={e => canvaTriggerRef.current.clear()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className={`bg-violet-200 rounded-lg px-5 py-4 mb-4`}>
            <div className="font-semibold mb-4">Ортопедическая обувь</div>
            {[
                {
                    name: `medical`,
                    label: `Лечебная `,
                    options: [
                        'нейтральная', 'усиленная', 'тутор', 'AV', 'СД'
                    ].map((el, edx) => ({
                        value: edx,
                        label: el
                    })),
                    txt: true,
                },
                {
                    name: `semi`,
                    label: `Полу-лечебная`,
                    txt: true,
                },
                {
                    name: `stable`,
                    label: `Формоустойчивая`,
                    txt: true,
                }
            ].map((item, index) => <div key={index} className="mb-5">
                <div className="flex gap-4 items-center mb-2">
                    <label className="flex gap-3 items-center">
                        <input
                            type="checkbox"
                            className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 rounded-sm'}
                            onChange={e => setData(prev => {
                                const data = { ...prev }
                                data.podiatry || (data.podiatry = {})
                                data.podiatry[`${item.name}_check`] = e.target.checked
                                return data
                            })}
                            defaultChecked={data.podiatry && data.podiatry[`${item.name}_check`]}
                        />
                        <div className="text-sm font-semibold whitespace-nowrap">{item.label}</div>
                    </label>
                    {item.options ? <div className="grow">
                        <Select
                            styles={customStyles}
                            components={{ DropdownIndicator }}
                            placeholder={`Выбрать из списка`}
                            isSearchable={false}
                            isClearable={false}
                            options={item.options}
                            value={item.options.find(el => el.value == data.podiatry[`${item.name}_opt`])}
                            onChange={value => setData(prev => {
                                const data = { ...prev }
                                data.podiatry || (data.podiatry = {})
                                data.podiatry[`${item.name}_opt`] = value.value
                                return data
                            })}
                        />
                    </div> : <></>}
                </div>
                {item.txt ? <div className="mb-4">
                    <textarea
                        className="bg-white rounded-lg border-white w-full h-[3.5rem]"
                        onChange={e => setData(prev => {
                            const data = { ...prev }
                            data.podiatry || (data.podiatry = {})
                            data.podiatry[`${item.name}_txt`] = e.target.value
                            return data
                        })}
                        value={data.podiatry ? (data.podiatry[`${item.name}_txt`] ?? ``) : ``}
                    />
                </div> : <></>}
            </div>)}

            <div className="text-sm font-semibold mb-4">Наращивание подошвы:</div>

            <div className="flex justify-between gap-4 mb-12">
                {[`Накат`, `Клин`, `Передний отдел`].map((ttl, edx) => <div key={edx} className="max-w-[20rem] grow">
                    <label className="flex gap-2 items-center mb-3">
                        <input
                            type="radio"
                            onChange={e => setData(prev => {
                                const data = { ...prev }
                                data.podiatry || (data.podiatry = {})
                                data.podiatry.extensions || (data.podiatry.extensions = [])
                                data.podiatry.extensions[0] || (data.podiatry.extensions[0] = {})
                                data.podiatry.extensions[1] || (data.podiatry.extensions[1] = {})
                                data.podiatry.extensions[2] || (data.podiatry.extensions[2] = {})
                                data.podiatry.extensions[0].checked = false
                                data.podiatry.extensions[1].checked = false
                                data.podiatry.extensions[2].checked = false
                                data.podiatry.extensions[edx].checked = e.target.checked
                                return data
                            })}
                            checked={
                                data.podiatry
                                && data.podiatry.extensions
                                && data.podiatry.extensions[edx]
                                && data.podiatry.extensions[edx].checked
                            }
                            className="border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900"
                            name="extension"
                        />
                        <span>{ttl}</span>
                    </label>
                    <div className="bg-white rounded-lg overflow-hidden pb-8 px-6">
                        <div className="relative">
                            <div className="flex -mx-6 px-4">
                                <img src={Img3} alt={``} className="w-full h-auto" />
                            </div>
                            <div className="flex">
                                <div className="bg-purple-900 rounded-sm flex flex-col items-center">
                                    <div
                                        className="h-5 w-full shrink-0 text-white font-bold leading-none flex items-center justify-center cursor-pointer"
                                        onClick={e => setData(prev => {
                                            const data = { ...prev }
                                            data.podiatry || (data.podiatry = {})
                                            data.podiatry.extensions || (data.podiatry.extensions = [])
                                            data.podiatry.extensions[edx] || (data.podiatry.extensions[edx] = {})
                                            data.podiatry.extensions[edx].left = data.podiatry.extensions[edx].left ? ++data.podiatry.extensions[edx].left : 1
                                            return data
                                        })}
                                    ><span>+</span></div>
                                    <div className="w-5 h-5 shrink-0">
                                        <input
                                            type="number"
                                            max="99"
                                            onChange={e => setData(prev => {
                                                const data = { ...prev }
                                                data.podiatry || (data.podiatry = {})
                                                data.podiatry.extensions || (data.podiatry.extensions = [])
                                                data.podiatry.extensions[edx] || (data.podiatry.extensions[edx] = {})
                                                data.podiatry.extensions[edx].left = e.target.value
                                                return data
                                            })}
                                            value={
                                                data.podiatry
                                                    && data.podiatry.extensions
                                                    && data.podiatry.extensions[edx]
                                                    ? data.podiatry.extensions[edx].left : 0
                                            }
                                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-5 p-0 bg-white h-5 text-xs font-medium text-center focus:outline-none"
                                        />
                                    </div>
                                    <div
                                        className="h-5 w-full shrink-0 text-white font-bold leading-none flex items-center justify-center cursor-pointer"
                                        onClick={e => setData(prev => {
                                            const data = { ...prev }
                                            data.podiatry || (data.podiatry = {})
                                            data.podiatry.extensions || (data.podiatry.extensions = [])
                                            data.podiatry.extensions[edx] || (data.podiatry.extensions[edx] = {})
                                            data.podiatry.extensions[edx].left = data.podiatry.extensions[edx].left ? --data.podiatry.extensions[edx].left : 0
                                            return data
                                        })}
                                    ><span>-</span></div>
                                </div>
                                {edx === 0 ? <div className="grow relative overflow-hidden bg-neutral-400" /> : <></>}
                                {edx === 1 ? <div className="grow relative overflow-hidden">
                                    <div className="w-0 h-0 absolute top-0 left-0
                                    border-t-[60px] border-t-neutral-400
                                    border-l-[254px] border-l-transparent"/>
                                </div> : <></>}
                                {edx === 2 ? <div className="grow relative overflow-hidden">
                                    <div className="w-0 h-0 absolute top-0 left-0
                                    border-t-[60px] border-t-neutral-400
                                    border-r-[174px] border-r-transparent"/>
                                </div> : <></>}
                                <div className="bg-purple-900 rounded-sm flex flex-col items-center">
                                    <div
                                        className="h-5 w-full shrink-0 text-white font-bold leading-none flex items-center justify-center cursor-pointer"
                                        onClick={e => setData(prev => {
                                            const data = { ...prev }
                                            data.podiatry || (data.podiatry = {})
                                            data.podiatry.extensions || (data.podiatry.extensions = [])
                                            data.podiatry.extensions[edx] || (data.podiatry.extensions[edx] = {})
                                            data.podiatry.extensions[edx].right = data.podiatry.extensions[edx].right ? ++data.podiatry.extensions[edx].right : 1
                                            return data
                                        })}
                                    ><span>+</span></div>
                                    <div className="w-5 h-5 shrink-0">
                                        <input
                                            type="number"
                                            size={2}
                                            onChange={e => setData(prev => {
                                                const data = { ...prev }
                                                data.podiatry || (data.podiatry = {})
                                                data.podiatry.extensions || (data.podiatry.extensions = [])
                                                data.podiatry.extensions[edx] || (data.podiatry.extensions[edx] = {})
                                                data.podiatry.extensions[edx].right = e.target.value
                                                return data
                                            })}
                                            value={
                                                data.podiatry
                                                    && data.podiatry.extensions
                                                    && data.podiatry.extensions[edx]
                                                    ? data.podiatry.extensions[edx].right : 0
                                            }
                                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-5 p-0 bg-white h-5 text-xs font-medium text-center focus:outline-none"
                                        />
                                    </div>
                                    <div
                                        className="h-5 w-full shrink-0 text-white font-bold leading-none flex items-center justify-center cursor-pointer"
                                        onClick={e => setData(prev => {
                                            const data = { ...prev }
                                            data.podiatry || (data.podiatry = {})
                                            data.podiatry.extensions || (data.podiatry.extensions = [])
                                            data.podiatry.extensions[edx] || (data.podiatry.extensions[edx] = {})
                                            data.podiatry.extensions[edx].right = data.podiatry.extensions[edx].right ? --data.podiatry.extensions[edx].right : 0
                                            return data
                                        })}
                                    ><span>-</span></div>
                                </div>
                            </div>
                            {edx === 1 ? <div className="absolute top-4 bottom-0 left-5 w-px bg-black" /> : <></>}
                            {edx === 2 ? <div className="absolute top-4 bottom-0 left-[194px] w-px bg-black" /> : <></>}
                        </div>
                    </div>
                </div>)}
            </div>


            <div className="flex gap-8">
                <div className="grow">
                    <div className="text-sm font-semibold mb-4">Элементы:</div>
                    <div>
                        {[
                            {
                                title: `Коски вальгусные`,
                                name: `kskvlg`,
                                multiple: true,
                                items: [
                                    {
                                        title: `Левый`,
                                        name: `l`
                                    },
                                    {
                                        title: `Правый`,
                                        name: `r`
                                    }
                                ]
                            },
                            {
                                title: `Коски варусные`,
                                name: `kskvar`,
                                multiple: true,
                                items: [
                                    {
                                        title: `Левый`,
                                        name: `l`
                                    },
                                    {
                                        title: `Правый`,
                                        name: `r`
                                    }
                                ]
                            },
                            {
                                title: `Пронатор`,
                                name: `pron`,
                                multiple: true,
                                items: [
                                    {
                                        title: `Левый`,
                                        name: `l`
                                    },
                                    {
                                        title: `Правый`,
                                        name: `r`
                                    }
                                ]
                            },
                            {
                                title: `Супинатор`,
                                name: `sup`,
                                multiple: true,
                                items: [
                                    {
                                        title: `Слева`,
                                        name: `l`
                                    },
                                    {
                                        title: `Справа`,
                                        name: `r`
                                    }
                                ]
                            },
                            {
                                title: `Подпяточник`,
                                name: `pdp`,
                                multiple: false,
                                items: [
                                    {
                                        title: `Слева`,
                                        name: `l`
                                    },
                                    {
                                        title: `Справа`,
                                        name: `r`
                                    }
                                ]
                            }
                        ].map((formitem, fdx) => <Element key={fdx} formitem={formitem} data={data} setData={setData} jsonname={`shoeselements`} />)}
                    </div>



                    <div className="text-sm font-semibold mb-4">Примечание:</div>
                    <div className="mb-4">
                        <textarea
                            className="bg-white rounded-lg border-white w-full h-[5rem]"
                            onChange={e => setData(prev => {
                                const data = { ...prev }
                                data.podiatry || (data.podiatry = {})
                                data.podiatry[`insolesnote`] = e.target.value
                                return data
                            })}
                            value={data.podiatry ? (data.podiatry[`insolesnote`] ?? ``) : ``}
                        />
                    </div>
                </div>
                <div className="shrink-0">
                    <div className="rounded-lg overflow-hidden realtive" style={{ transform: `translate3d(0,0,0)` }}>
                        <CanvasDraw
                            ref={canvaViscerRef}
                            lazyRadius={0}
                            hideGrid={true}
                            hideInterface={false}
                            brushRadius={5}
                            brushColor="#3A9EAA"
                            canvasWidth={320}
                            canvasHeight={333}
                            imgSrc={Img2}
                            onChange={e => setData(prev => {
                                const data = { ...prev }
                                data.podiatry || (data.podiatry = {})
                                data.podiatry.shoeslines = e.lines
                                return data
                            })}
                        />
                    </div>
                    <div className="flex justify-center gap-12 py-2 items-center">
                        <button onClick={e => canvaViscerRef.current.undo()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                            </svg>
                        </button>
                        <button onClick={e => canvaViscerRef.current.clear()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>



            <div className="text-sm font-semibold mb-4">Выступы:</div>
            <div className="flex justify-between gap-4 mb-12">
                {[`Левый`, `Правый`].map((ttl, edx) => <div key={edx} className="max-w-[20rem] grow">
                    <div className="text-sm mb-2">{ttl}</div>
                    <div className="flex gap-8">
                        <label className="flex gap-2 items-center mb-3">
                            <input
                                type="checkbox"
                                onChange={e => setData(prev => {
                                    const data = { ...prev }
                                    data.podiatry || (data.podiatry = {})
                                    data.podiatry.ledges || (data.podiatry.ledges = [])
                                    data.podiatry.ledges[edx] || (data.podiatry.ledges[edx] = {})
                                    data.podiatry.ledges[edx].outer = e.target.checked
                                    return data
                                })}
                                checked={
                                    data.podiatry
                                    && data.podiatry.ledges
                                    && data.podiatry.ledges[edx]
                                    && data.podiatry.ledges[edx].outer
                                }
                                className="border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 rounded"
                                name="extension"
                            />
                            <span>Внешний</span>
                        </label>
                        <label className="flex gap-2 items-center mb-3">
                            <input
                                type="checkbox"
                                onChange={e => setData(prev => {
                                    const data = { ...prev }
                                    data.podiatry || (data.podiatry = {})
                                    data.podiatry.ledges || (data.podiatry.ledges = [])
                                    data.podiatry.ledges[edx] || (data.podiatry.ledges[edx] = {})
                                    data.podiatry.ledges[edx].inner = e.target.checked
                                    return data
                                })}
                                checked={
                                    data.podiatry
                                    && data.podiatry.ledges
                                    && data.podiatry.ledges[edx]
                                    && data.podiatry.ledges[edx].inner
                                }
                                className="border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 rounded"
                                name="extension"
                            />
                            <span>Внутренний</span>
                        </label>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden">
                        <div className="relative">
                            <div className="flex">
                                <img src={edx ? Img5 : Img4} alt={``} className="w-full h-auto" />
                            </div>
                            <div className="absolute left-0 top-0 h-full px-10 py-2">
                                <div className="flex flex-col h-full">
                                    <div className="bg-purple-900 rounded-sm flex items-center">
                                        <div
                                            className="h-5 w-5 shrink-0 text-white font-bold leading-none flex items-center justify-center cursor-pointer"
                                            onClick={e => setData(prev => {
                                                const data = { ...prev }
                                                data.podiatry || (data.podiatry = {})
                                                data.podiatry.ledges || (data.podiatry.ledges = [])
                                                data.podiatry.ledges[edx] || (data.podiatry.ledges[edx] = {})
                                                data.podiatry.ledges[edx].lt = data.podiatry.ledges[edx].lt ? --data.podiatry.ledges[edx].lt : 0
                                                return data
                                            })}
                                        ><span>-</span></div>
                                        <div className="w-5 h-5 shrink-0">
                                            <input
                                                type="number"
                                                max="99"
                                                onChange={e => setData(prev => {
                                                    const data = { ...prev }
                                                    data.podiatry || (data.podiatry = {})
                                                    data.podiatry.ledges || (data.podiatry.ledges = [])
                                                    data.podiatry.ledges[edx] || (data.podiatry.ledges[edx] = {})
                                                    data.podiatry.ledges[edx].lt = e.target.value
                                                    return data
                                                })}
                                                value={
                                                    data.podiatry
                                                        && data.podiatry.ledges
                                                        && data.podiatry.ledges[edx]
                                                        ? data.podiatry.ledges[edx].lt : 0
                                                }
                                                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-5 p-0 bg-white h-5 text-xs font-medium text-center focus:outline-none"
                                            />
                                        </div>
                                        <div
                                            className="h-5 w-5 shrink-0 text-white font-bold leading-none flex items-center justify-center cursor-pointer"
                                            onClick={e => setData(prev => {
                                                const data = { ...prev }
                                                data.podiatry || (data.podiatry = {})
                                                data.podiatry.ledges || (data.podiatry.ledges = [])
                                                data.podiatry.ledges[edx] || (data.podiatry.ledges[edx] = {})
                                                data.podiatry.ledges[edx].lt = data.podiatry.ledges[edx].lt ? ++data.podiatry.ledges[edx].lt : 1
                                                return data
                                            })}
                                        ><span>+</span></div>
                                    </div>
                                    <div className="grow relative overflow-hidden bg-neutral-400" />
                                    <div className="bg-purple-900 rounded-sm flex items-center">
                                        <div
                                            className="h-5 w-5 shrink-0 text-white font-bold leading-none flex items-center justify-center cursor-pointer"
                                            onClick={e => setData(prev => {
                                                const data = { ...prev }
                                                data.podiatry || (data.podiatry = {})
                                                data.podiatry.ledges || (data.podiatry.ledges = [])
                                                data.podiatry.ledges[edx] || (data.podiatry.ledges[edx] = {})
                                                data.podiatry.ledges[edx].lb = data.podiatry.ledges[edx].lb ? --data.podiatry.ledges[edx].lb : 0
                                                return data
                                            })}
                                        ><span>-</span></div>
                                        <div className="w-5 h-5 shrink-0">
                                            <input
                                                type="number"
                                                size={2}
                                                onChange={e => setData(prev => {
                                                    const data = { ...prev }
                                                    data.podiatry || (data.podiatry = {})
                                                    data.podiatry.ledges || (data.podiatry.ledges = [])
                                                    data.podiatry.ledges[edx] || (data.podiatry.ledges[edx] = {})
                                                    data.podiatry.ledges[edx].lb = e.target.value
                                                    return data
                                                })}
                                                value={
                                                    data.podiatry
                                                        && data.podiatry.ledges
                                                        && data.podiatry.ledges[edx]
                                                        ? data.podiatry.ledges[edx].lb : 0
                                                }
                                                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-5 p-0 bg-white h-5 text-xs font-medium text-center focus:outline-none"
                                            />
                                        </div>
                                        <div
                                            className="h-5 w-5 shrink-0 text-white font-bold leading-none flex items-center justify-center cursor-pointer"
                                            onClick={e => setData(prev => {
                                                const data = { ...prev }
                                                data.podiatry || (data.podiatry = {})
                                                data.podiatry.ledges || (data.podiatry.ledges = [])
                                                data.podiatry.ledges[edx] || (data.podiatry.ledges[edx] = {})
                                                data.podiatry.ledges[edx].lb = data.podiatry.ledges[edx].lb ? ++data.podiatry.ledges[edx].lb : 1
                                                return data
                                            })}
                                        ><span>+</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute right-0 top-0 h-full px-10 py-2">
                                <div className="flex flex-col h-full">
                                    <div className="bg-purple-900 rounded-sm flex items-center">
                                        <div
                                            className="h-5 w-5 shrink-0 text-white font-bold leading-none flex items-center justify-center cursor-pointer"
                                            onClick={e => setData(prev => {
                                                const data = { ...prev }
                                                data.podiatry || (data.podiatry = {})
                                                data.podiatry.ledges || (data.podiatry.ledges = [])
                                                data.podiatry.ledges[edx] || (data.podiatry.ledges[edx] = {})
                                                data.podiatry.ledges[edx].rt = data.podiatry.ledges[edx].rt ? --data.podiatry.ledges[edx].rt : 0
                                                return data
                                            })}
                                        ><span>-</span></div>
                                        <div className="w-5 h-5 shrink-0">
                                            <input
                                                type="number"
                                                max="99"
                                                onChange={e => setData(prev => {
                                                    const data = { ...prev }
                                                    data.podiatry || (data.podiatry = {})
                                                    data.podiatry.ledges || (data.podiatry.ledges = [])
                                                    data.podiatry.ledges[edx] || (data.podiatry.ledges[edx] = {})
                                                    data.podiatry.ledges[edx].rt = e.target.value
                                                    return data
                                                })}
                                                value={
                                                    data.podiatry
                                                        && data.podiatry.ledges
                                                        && data.podiatry.ledges[edx]
                                                        ? data.podiatry.ledges[edx].rt : 0
                                                }
                                                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-5 p-0 bg-white h-5 text-xs font-medium text-center focus:outline-none"
                                            />
                                        </div>
                                        <div
                                            className="h-5 w-5 shrink-0 text-white font-bold leading-none flex items-center justify-center cursor-pointer"
                                            onClick={e => setData(prev => {
                                                const data = { ...prev }
                                                data.podiatry || (data.podiatry = {})
                                                data.podiatry.ledges || (data.podiatry.ledges = [])
                                                data.podiatry.ledges[edx] || (data.podiatry.ledges[edx] = {})
                                                data.podiatry.ledges[edx].rt = data.podiatry.ledges[edx].rt ? ++data.podiatry.ledges[edx].rt : 1
                                                return data
                                            })}
                                        ><span>+</span></div>
                                    </div>
                                    <div className="grow relative overflow-hidden bg-neutral-400" />
                                    <div className="bg-purple-900 rounded-sm flex items-center">
                                        <div
                                            className="h-5 w-5 shrink-0 text-white font-bold leading-none flex items-center justify-center cursor-pointer"
                                            onClick={e => setData(prev => {
                                                const data = { ...prev }
                                                data.podiatry || (data.podiatry = {})
                                                data.podiatry.ledges || (data.podiatry.ledges = [])
                                                data.podiatry.ledges[edx] || (data.podiatry.ledges[edx] = {})
                                                data.podiatry.ledges[edx].rb = data.podiatry.ledges[edx].rb ? --data.podiatry.ledges[edx].rb : 0
                                                return data
                                            })}
                                        ><span>-</span></div>
                                        <div className="w-5 h-5 shrink-0">
                                            <input
                                                type="number"
                                                size={2}
                                                onChange={e => setData(prev => {
                                                    const data = { ...prev }
                                                    data.podiatry || (data.podiatry = {})
                                                    data.podiatry.ledges || (data.podiatry.ledges = [])
                                                    data.podiatry.ledges[edx] || (data.podiatry.ledges[edx] = {})
                                                    data.podiatry.ledges[edx].rb = e.target.value
                                                    return data
                                                })}
                                                value={
                                                    data.podiatry
                                                        && data.podiatry.ledges
                                                        && data.podiatry.ledges[edx]
                                                        ? data.podiatry.ledges[edx].rb : 0
                                                }
                                                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-5 p-0 bg-white h-5 text-xs font-medium text-center focus:outline-none"
                                            />
                                        </div>
                                        <div
                                            className="h-5 w-5 shrink-0 text-white font-bold leading-none flex items-center justify-center cursor-pointer"
                                            onClick={e => setData(prev => {
                                                const data = { ...prev }
                                                data.podiatry || (data.podiatry = {})
                                                data.podiatry.ledges || (data.podiatry.ledges = [])
                                                data.podiatry.ledges[edx] || (data.podiatry.ledges[edx] = {})
                                                data.podiatry.ledges[edx].rb = data.podiatry.ledges[edx].rb ? ++data.podiatry.ledges[edx].rb : 1
                                                return data
                                            })}
                                        ><span>+</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
                <div className="max-w-[20rem] grow"></div>
            </div>
            <div className="text-sm font-semibold mb-4">Примечание:</div>
            <div className="mb-8 flex items-end gap-16">
                <div className="grow max-w-[3xl]">
                    <textarea
                        className="bg-white rounded-lg border-white w-full h-[5rem]"
                        onChange={e => setData(prev => {
                            const data = { ...prev }
                            data.podiatry || (data.podiatry = {})
                            data.podiatry[`insolesnote`] = e.target.value
                            return data
                        })}
                        value={data.podiatry ? (data.podiatry[`insolesnote`] ?? ``) : ``}
                    />
                </div>
                <div className="flex justify-end whitespace-nowrap pb-4">
                    <PrimaryButton size="sm" onClick={() => { }}>Отправить в магазин</PrimaryButton>
                </div>
            </div>
        </div >
        <div className={`flex justify-end py-8`}>
            <PrimaryButton size="sm" onClick={() => nextTab()}>Далее</PrimaryButton>
        </div>
    </>
}
