import { Fragment } from "react";
import PrimaryButton from "../PrimaryButton";
import Select, { components } from 'react-select';
import { Link } from "@inertiajs/react";
import { useLayout } from "@/Contexts/LayoutContext";

import Img1 from "../../../img/card/reabilitation/i1.jpg"
import Img2 from "../../../img/card/reabilitation/i2.jpg"
import { useRef } from "react";
import { useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import { useState } from "react";

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

export default (props) => {

    const { data, setData, errors, nextTab, appointment } = props;

    const canvaRef1 = useRef(null)

    useEffect(() => {
        if (canvaRef1.current && data.reabilitation.lines1) {
            setTimeout(() => {
                canvaRef1.current.simulateDrawingLines({ lines: data.reabilitation.lines1, immediate: true })
            }, 150)
        }
    }, [canvaRef1])

    const canvaRef2 = useRef(null)

    useEffect(() => {
        if (canvaRef2.current && data.reabilitation.lines1) {
            setTimeout(() => {
                canvaRef2.current.simulateDrawingLines({ lines: data.reabilitation.lines2, immediate: true })
            }, 150)
        }
    }, [canvaRef2])

    const [brush2, setbBrush2] = useState(2)

    return <>
        <div className={`bg-violet-200 rounded-lg`}>
            <div className="flex">
                <div className="grow text-sm p-5">
                    {[
                        {
                            name: `ms`,
                            label: `Массаж лечебный (при необход. - контроль АД)`,
                            options: [
                                'спина',
                                'спина+ноги',
                                'ноги+пояснично-крестцовый отдел',
                                'лимфодренажный (ноги+пояснично-крестцовый отдел)',
                                'лимфодренажный (общий)',
                                'воротниковая зона',
                                'руки+воротниковая зона',
                                'общий (спина+руки+ноги+живот+грудная клетка+голова)',
                                'висцеральный массаж',
                                'доп.зона: грудная клетка',
                                'доп.зона: живот',
                                'доп.зона: руки',
                                'доп.зона по мобилизационным техникам: грудной',
                                'доп.зона по мобилизационным техникам: грудо-поясничный',
                                'доп.зона по мобилизационным техникам: поясничный'
                            ].map((el, edx) => ({
                                value: edx,
                                label: el
                            })),
                            txt: true,
                        },
                        {
                            name: `mn`,
                            label: `Мануальная терапия`,
                            txt: true,
                        },
                        {
                            name: `ft`,
                            label: `Физиотерапия`,
                            options: [
                                'ДДТ',
                                'СМТ',
                                'интерфернцтерапия',
                                'электрофорез',
                                'ультразвук',
                                'магнитотерапия',
                                'импульсная терапия',
                                'лимфодренаж',
                                'мышечная стимуляция',
                                'электросон'
                            ].map((el, edx) => ({
                                value: edx,
                                label: el
                            })),
                            txt: true,
                        },
                        {
                            name: `tp`,
                            label: `Тейпирование`,
                            txt: true,
                        },
                        {
                            name: `kt`,
                            label: `Кинезотерапия`,
                            txt: true,
                        },
                        {
                            name: `op`,
                            label: `Ортопедическая подушка`,
                            checkboxes: [
                                {
                                    name: `ds`,
                                    label: `Для сна`
                                },
                                {
                                    name: `pp`,
                                    label: `Под поясницу`
                                },
                                {
                                    name: `st`,
                                    label: `На сиденье`
                                },
                            ],
                        },
                        {
                            name: `bz`,
                            label: `Бандаж`,
                            txt: true,
                            radios: [
                                {
                                    name: `po`,
                                    label: `Поясничного отдела`
                                },
                                {
                                    name: `go`,
                                    label: `Грудопоясничного отдела`
                                },
                                {
                                    name: `kr`,
                                    label: `Пояснично-крестцовый`
                                },
                            ],
                        },
                        {
                            name: `om`,
                            label: `Ортопедический матрас`,
                            radios: [
                                {
                                    name: `ev`,
                                    label: `С эффектом вытяжки`
                                },
                                {
                                    name: `ep`,
                                    label: `С эффектом памяти`
                                },
                            ],
                        },
                        {
                            name: `fx`,
                            label: `Фиксатор`,
                            txt: true,
                        },
                        {
                            name: `vs`,
                            label: `Воротник Шанца`,
                        },
                        {
                            name: `ko`,
                            label: `Корсет`,
                            txt: true,
                            radios: [
                                {
                                    name: `go`,
                                    label: `Грудного отдела`
                                },
                                {
                                    name: `gp`,
                                    label: `Грудопоясничного отдела`
                                },
                                {
                                    name: `sh`,
                                    label: `Шено`
                                },
                            ],
                            selects: [
                                {
                                    name: `szp`,
                                    label: `С затяжкой плеча`,
                                    values: [
                                        `Левого`,
                                        `Правого`
                                    ]
                                },
                                {
                                    name: `szr`,
                                    label: `С затяжкой ремня по корпусу`,
                                    values: [
                                        `слева`,
                                        `справа`
                                    ]
                                },
                                {
                                    name: `ugo`,
                                    label: `С дополнительным ремнем утяжки грудного отдела`,
                                    values: [
                                        `слева`,
                                        `справа`
                                    ]
                                },
                                {
                                    name: `upo`,
                                    label: `С дополнительным ремнем утяжки пояснического отдела`,
                                    values: [
                                        `слева`,
                                        `справа`
                                    ]
                                },
                            ]
                        },
                        {
                            name: `other`,
                            label: `Другое`,
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
                                        data.reabilitation || (data.reabilitation = {})
                                        data.reabilitation[`${item.name}_check`] = e.target.checked
                                        return data
                                    })}
                                    defaultChecked={data.reabilitation && data.reabilitation[`${item.name}_check`]}
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
                                    value={item.options.find(el => el.value == data.reabilitation[`${item.name}_opt`])}
                                    onChange={value => setData(prev => {
                                        const data = { ...prev }
                                        data.reabilitation || (data.reabilitation = {})
                                        data.reabilitation[`${item.name}_opt`] = value.value
                                        return data
                                    })}
                                />
                            </div> : <></>}
                        </div>
                        {item.radios ? <div className="flex gap-4 mb-4 items-center">
                            {item.radios.map((r, rdx) => <label key={rdx} className="flex gap-2 items-center">
                                <input
                                    type="radio"
                                    name={`${item.name}_radio`}
                                    value={r.name}
                                    defaultChecked={data.reabilitation && data.reabilitation[`${item.name}_radio`] == r.name}
                                    onChange={e => setData(prev => {
                                        const data = { ...prev }
                                        data.reabilitation || (data.reabilitation = {})
                                        data.reabilitation[`${item.name}_radio`] = e.target.value
                                        return data
                                    })}
                                    className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900'}
                                />
                                <span>{r.label}</span>
                            </label>)}
                        </div> : <></>}
                        {item.checkboxes ? <div className="flex gap-4 mb-4 items-center">
                            {item.checkboxes.map((r, rdx) => <label key={rdx} className="flex gap-2 items-center">
                                <input
                                    type="checkbox"
                                    name={`${item.name}_${r.name}`}
                                    defaultChecked={data.reabilitation && data.reabilitation[`${item.name}_${r.name}`]}
                                    onChange={e => setData(prev => {
                                        const data = { ...prev }
                                        data.reabilitation || (data.reabilitation = {})
                                        data.reabilitation[`${item.name}_${r.name}`] = e.target.checked
                                        return data
                                    })}
                                    className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900'}
                                />
                                <span>{r.label}</span>
                            </label>)}
                        </div> : <></>}
                        {item.txt ? <div className="mb-4">
                            <textarea
                                className="bg-white rounded-lg border-white w-full h-[3.5rem]"
                                onChange={e => setData(prev => {
                                    const data = { ...prev }
                                    data.reabilitation || (data.reabilitation = {})
                                    data.reabilitation[`${item.name}_txt`] = e.target.value
                                    return data
                                })}
                                value={data.reabilitation ? (data.reabilitation[`${item.name}_txt`] ?? ``) : ``}
                            />
                        </div> : <></>}
                        {item.selects ? <div className="flex flex-col gap-4 mb-4">
                            {item.selects.map((r, rdx) => <label key={rdx} className="flex gap-2 items-center">
                                <span className="w-1/2">{r.label}</span>
                                <Select
                                    styles={customStyles}
                                    components={{ DropdownIndicator }}
                                    options={r.values.map((v, vdx) => ({
                                        label: v,
                                        value: vdx
                                    }))}
                                    placeholder={`Выбрать из списка`}
                                    // value={null}
                                    isSearchable={false}
                                    isClearable={false}
                                // onChange={value => setData(prev => {
                                //     const data = { ...prev }
                                //     data.reabilitation || (data.reabilitation = {})
                                //     data.reabilitation[`${item.name}_opt`] = value.value
                                //     return data
                                // })}
                                />
                            </label>)}
                        </div> : <></>}
                    </div>)}
                </div>
                <div className="p-5">
                    <div className="mb-5 rounded-lg overflow-hidden">
                        <CanvasDraw
                            ref={canvaRef1}
                            lazyRadius={0}
                            hideGrid={true}
                            hideInterface={false}
                            brushRadius={6}
                            brushColor="#3A9EAA"
                            canvasWidth={276}
                            canvasHeight={288}
                            imgSrc={Img1}
                            onChange={e => setData(prev => {
                                const data = { ...prev }
                                data.reabilitation.lines1 = e.lines
                                return data
                            })}
                        />
                        <div className="flex justify-center gap-12 py-2 items-center">
                            <button onClick={e => canvaRef1.current.undo()}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                </svg>
                            </button>
                            <button onClick={e => canvaRef1.current.clear()}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="mb-5 rounded-lg overflow-hidden">
                        <CanvasDraw
                            ref={canvaRef2}
                            lazyRadius={3}
                            hideGrid={true}
                            hideInterface={false}
                            brushRadius={brush2}
                            brushColor="#56326E"
                            canvasWidth={276}
                            canvasHeight={288}
                            imgSrc={Img2}
                            onChange={e => setData(prev => {
                                const data = { ...prev }
                                data.reabilitation.lines2 = e.lines
                                return data
                            })}
                        />
                        <div className="flex justify-center gap-12 pt-2 items-center">
                            <button onClick={e => canvaRef2.current.undo()}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                </svg>
                            </button>
                            <button onClick={e => canvaRef2.current.clear()}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center gap-4 py-2 items-center">
                            <div className={`w-10 h-6 flex justify-center items-center cursor-pointer border-b-2 ${brush2 === 2 ? `border-violet-500` : `border-transparent`}`} onClick={e => setbBrush2(2)}>
                                <div className="rounded-full h-1 w-1 bg-violet-500" />
                            </div>
                            <div className={`w-10 h-6 flex justify-center items-center cursor-pointer border-b-2 ${brush2 === 6 ? `border-violet-500` : `border-transparent`}`} onClick={e => setbBrush2(6)}>
                                <div className="rounded-full h-2 w-2 bg-violet-500" />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <PrimaryButton size="sm" onClick={() => { }}>Отправить на ресепшн</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
        <div className={`flex justify-end py-8`}>
            <PrimaryButton size="sm" onClick={() => nextTab()}>Далее</PrimaryButton>
        </div>
    </>
}
