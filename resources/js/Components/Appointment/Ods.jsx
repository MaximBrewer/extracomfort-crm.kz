import Person from "../../../img/ods.webp"
import CanvasDraw from "react-canvas-draw";
import { useEffect, useRef, useState } from "react";
import PrimaryButton from "../PrimaryButton";

import React from 'react';
import Select, { components } from 'react-select';
import { Fragment } from "react";
import Checkbox from "../Checkbox";

import parse from "html-react-parser"

const IIVOptions = [
    '-',
    '0-I',
    'I',
    'I-II',
    'II',
    'II-III',
    'III',
    'III-IV',
    'IV'
]

const customStyles = {
    control: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return ({
            ...styles,
            minHeight: `2.625rem`,
            borderRadius: 0,
            outline: `none`,
            borderColor: `transparent`,
            boxShadow: `none`,
            backgroundColor: `transparent`
        })
    },
    indicatorSeparator: (styles, { data, isDisabled, isFocused, isSelected }) => ({ ...styles, backgroundColor: `transparent` }),
    singleValue: (styles, { data, isDisabled, isFocused, isSelected }) => ({ ...styles, whiteSpace: `normal` }),
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

const customStylesII = {
    control: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return ({
            ...styles,
            borderRadius: `.5rem`,
            minHeight: `1rem`,
            outline: `none`,
            borderColor: `transparent`,
            boxShadow: `none`,
            flexWrap: `nowrap`,
            backgroundColor: `#56326E`
        })
    },
    singleValue: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return ({
            ...styles,
            color: `#ffffff`,
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
            whiteSpace: `nowrap`
        })
    },
    indicatorSeparator: (styles, { data, isDisabled, isFocused, isSelected }) => ({
        ...styles,
        backgroundColor: `transparent`
    }),
};

const DropdownIndicatorII = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <svg className="w-2.5 h-auto text-white" viewBox="0 0 16 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.63656 5.35044L0.214103 0.86339C-0.241616 0.545002 0.0811491 0.000608444 0.725521 0.000608444L14.5935 0.000608444C15.238 0.000608444 15.5607 0.545002 15.105 0.86339L8.68252 5.35044C8.11757 5.74517 7.2015 5.74517 6.63656 5.35044Z" fill="currentColor" />
            </svg>
        </components.DropdownIndicator>
    );
};

const tableClassses = {
    grid: `grid grid-cols-[16fr_10fr_10fr_10fr]`
}

const Th = ({ children, className = "", ...props }) => {
    return <div className={`px-5 py-2 border-l first:border-l-0 border-zinc-500 text-left ${className}`} {...props}>{children}</div>
}

const Td = ({ children, padding = true, className = "", ...props }) => {
    return <div className={`${padding ? `px-2 py-0.5` : ``} min-h-[2.5rem] flex border-r border-b first:border-l border-zinc-500 ${className}`} {...props}>
        <div className="w-full">{children}</div>
    </div>
}

const Heading = ({ children, toggleOpen, opened, className = "" }) => {
    return <div className={`${tableClassses.grid} px-5 py-2 bg-slate-100 border-b border-r border-l border-zinc-500 ${className}`} onClick={e => toggleOpen(prev => !prev)}>
        <div className="col-span-4">
            <div className="flex items-center cursor-pointer">
                <span className="grow font-semibold">{children}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-2.5 shrink-0 text-gray-700 transition ${opened ? `rotate-180` : ``}`} viewBox="0 0 16 10" fill="none">
                    <path d="M7.071 5.65735L12.728 0.000351349L14.142 1.41435L7.071 8.48535L-3.09083e-07 1.41435L1.414 0.000351844L7.071 5.65735Z" fill="currentColor" />
                </svg>
            </div>
        </div>
    </div>
}

const SelectItem = (props) => {

    const { data, setData, formitem, dynamic = false } = props

    const val = data.ods[`${formitem.name}${dynamic ? `_dyn` : `_option`}`];

    if (formitem.options.length < 3) {
        return <>
            {formitem.options.map((el, edx) => <Fragment key={edx}>
                <label className="flex items-center py-0.5 px-2">
                    <Checkbox
                        name={`${formitem.name}${dynamic ? `_dyn` : `_option`}`}
                        value={edx}
                        checked={val === edx}
                        onChange={e => setData(prev => {
                            const data = { ...prev }
                            data.ods[`${formitem.name}${dynamic ? `_dyn` : `_option`}`] = e.target.checked ? edx : null
                            return data
                        })}
                    />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>{el}</span>
                    </span>
                </label>
            </Fragment>)}
        </>
    }

    return <Select
        styles={customStyles}
        components={{ DropdownIndicator }}
        isSearchable={false}
        isMulti={!!formitem.multiple}
        isClearable={!0}
        placeholder="Не выбрано"
        defaultValue={val !== null ? (
            Array.isArray(val) ? val.map(el => ({ value: el, label: formitem.options[el] })) : {
                value: val,
                label: formitem.options[val]
            }
        ) : (formitem.multiple ? [] : null)}
        options={formitem.options.map((el, edx) => ({
            value: edx,
            label: el
        }))}
        onChange={(value) => setData(prev => {
            const data = { ...prev }
            data.ods[`${formitem.name}${dynamic ? `_dyn` : `_option`}`] = Array.isArray(value) ? (value.map(el => el.value)) : (value ? value.value : ``)
            return data
        })}
    />
}

const SelectItemII = (props) => {

    const { data, setData, formitem = {}, row = {}, dynamic = false } = props

    const val = data.ods[`${row.name}_${formitem.name}${dynamic ? `_dyn` : `_option`}`];

    return <>
        {formitem.type === 'select' ? <div className="grid grid-cols-2 gap-2">
            <div className="grid grid-cols-2 gap-2 select2-wapper">
                <div>{formitem.title}</div>
                <Select
                    styles={customStylesII}
                    components={{ DropdownIndicator: DropdownIndicatorII }}
                    isSearchable={false}
                    isClearable={false}
                    placeholder="-"
                    defaultValue={val !== null ? (
                        Array.isArray(val) ? val.map(el => ({ value: el, label: formitem.options[el] })) : {
                            value: val,
                            label: formitem.options[val]
                        }
                    ) : (formitem.multiple ? [] : {
                        value: 0,
                        label: '-'
                    })}
                    options={formitem.options.map((el, edx) => ({
                        value: edx,
                        label: el
                    }))}
                    onChange={(value) => setData(prev => {
                        const data = { ...prev }
                        data.ods[`${row.name}_${formitem.name}${dynamic ? `_dyn` : `_option`}`] = Array.isArray(value) ? (value.map(el => el.value)) : (value ? value.value : ``)
                        return data
                    })}
                />
            </div>
        </div> : <></>}
        {formitem.type === 'selects' ? <div>
            {formitem.title ? <div>{formitem.title}</div> : ``}
            <div className="grid grid-cols-2 gap-2 select2-wapper">
                {formitem.subitems.map((subitem, sdx) => <div key={sdx} className="grid grid-cols-2 gap-2">
                    <div>{subitem.title}</div>
                    <Select
                        styles={customStylesII}
                        components={{ DropdownIndicator: DropdownIndicatorII }}
                        isSearchable={false}
                        isClearable={false}
                        placeholder="-"
                        defaultValue={data.ods[`${row.name}_${formitem.name}_${subitem.name}${dynamic ? `_dyn` : ``}`] ? {
                            value: data.ods[`${row.name}_${formitem.name}_${subitem.name}${dynamic ? `_dyn` : ``}`],
                            label: subitem.options[data.ods[`${row.name}_${formitem.name}_${subitem.name}${dynamic ? `_dyn` : ``}`]]
                        } : {
                            value: 0,
                            label: '-'
                        }}
                        options={subitem.options.map((el, edx) => ({
                            value: edx,
                            label: el
                        }))}
                        onChange={(value) => setData(prev => {
                            const data = { ...prev }
                            data.ods[`${row.name}_${formitem.name}_${subitem.name}${dynamic ? `_dyn` : ``}`] = Array.isArray(value) ? (value.map(el => el.value)) : (value ? value.value : ``)
                            return data
                        })}
                    />
                </div>)}
            </div>
        </div> : <></>}
    </>
}

const BooleanItem = (props) => {

    const { data, setData, formitem, dynamic = false } = props

    const val = data.ods[`${formitem.name}${dynamic ? `_dyn` : `_option`}`];

    return <label className="flex items-center py-0.5 px-2">
        <Checkbox
            name={`${formitem.name}${dynamic ? `_dyn` : `_option`}`}
            value={1}
            checked={!!val}
            onChange={e => setData(prev => {
                const data = { ...prev }
                data.ods[`${formitem.name}${dynamic ? `_dyn` : `_option`}`] = e.target.checked
                return data
            })}
        />
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Да</span>
        </span>
    </label>
}


const BooleanItemII = (props) => {

    const { data, setData, formitem, row, dynamic = false } = props

    return formitem.type === 'boolean' ? <label className="grid grid-cols-4 gap-2 py-0.5 px-2">
        <div className="col-span-3">{formitem.title}</div>
        <div className="flex items-center">
            <Checkbox
                name={`${row.name}_${formitem.name}${dynamic ? `_dyn` : `_option`}`}
                value={1}
                defaultChecked={!!(1 * data.ods[`${row.name}_${formitem.name}${dynamic ? `_dyn` : `_option`}`])}
                onChange={e => setData(prev => {
                    const data = { ...prev }
                    data.ods[`${row.name}_${formitem.name}${dynamic ? `_dyn` : `_option`}`] = e.target.checked
                    return data
                })}
            />
        </div>
    </label> : <></>
}

const TextareaItem = (props) => {

    const { data, setData, formitem, dynamic = false } = props

    const val = data.ods[`${formitem.name}${dynamic ? `_dyn` : `_option`}`];

    return <label className="flex items-center py-0.5 px-2">
        <textarea
            name={`${formitem.name}${dynamic ? `_dyn` : `_option`}`}
            value={data.ods[`${formitem.name}${dynamic ? `_dyn` : `_option`}`] ?? ``}
            className="w-full block border-0 bg-transparent h-[2.5rem] focus:outline-none"
            onChange={e => setData(prev => {
                const data = { ...prev }
                data.ods[`${formitem.name}${dynamic ? `_dyn` : `_option`}`] = e.target.value
                return data
            })}
        />
    </label>
}


const Item = (props) => {

    const { data, setData, formitem, selectType = 1 } = props

    return <>
        {formitem.type === 'select' || formitem.type === 'selects' ? <>
            <Td padding={selectType == 2} className="text-sm">
                {selectType == 2 ? <SelectItemII {...props} /> : <SelectItem {...props} />}
            </Td>
            <Td padding={selectType == 2} className="text-sm">
                {selectType == 2 ? <SelectItemII {...props} dynamic={true} /> : <SelectItem {...props} dynamic={true} />}
            </Td>
        </> : <></>}
        {formitem.type === 'boolean' ? <>
            <Td padding={false} className="text-sm">
                {selectType == 2 ? <BooleanItemII {...props} /> : <BooleanItem {...props} />}
            </Td>
            <Td padding={false} className="text-sm">
                {selectType == 2 ? <BooleanItemII {...props} dynamic={true} /> : <BooleanItem {...props} />}
            </Td>
        </> : <></>}
        {formitem.type === 'textarea' ? <>
            <Td padding={false} className="text-sm">
                <TextareaItem {...props} />
            </Td>
            <Td padding={false} className="text-sm">
                <TextareaItem {...props}  dynamic={true}/>
            </Td>
        </> : <></>}
        {formitem.type === 'heading' ? <></> : <>
            <Td padding={false}>
                <textarea
                    name={`${formitem.name}_note`}
                    value={data.ods[`${formitem.name}_note`] ?? ``}
                    onChange={e => setData(prev => {
                        const data = { ...prev }
                        data.ods[`${formitem.name}_note`] = e.target.value
                        return data
                    })}
                    className="w-full block border-0 bg-transparent h-[2.5rem] focus:outline-none"
                />
            </Td>
        </>}
    </>
}

export default (props) => {

    const { data, setData, errors, nextTab } = props;

    const canvaRef = useRef(null)

    const [common, setCommon] = useState(true)
    const [tonus, setTonus] = useState(false)
    const [chest, setChest] = useState(false)
    const [tests, setTests] = useState(false)
    const [notes, setNotes] = useState(false)

    useEffect(() => {
        if (canvaRef.current && data.ods.lines) {
            setTimeout(() => {
                canvaRef.current.simulateDrawingLines({ lines: data.ods.lines, immediate: true })
            }, 150)
        }
    }, [canvaRef])

    return <>
        <div className={`bg-white rounded-lg pt-8`}>
            <div>
                <div className="flex justify-center">
                    <CanvasDraw
                        ref={canvaRef}
                        lazyRadius={6}
                        hideGrid={true}
                        hideInterface={false}
                        brushRadius={3}
                        brushColor="#3A9EAA"
                        canvasWidth={303}
                        canvasHeight={463}
                        imgSrc={Person}
                        onChange={e => setData(prev => {
                            const data = { ...prev }
                            data.ods.lines = e.lines
                            return data
                        })}
                    />
                </div>
                <div className="flex justify-center gap-12 py-4 items-center">
                    <button onClick={e => canvaRef.current.undo()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                        </svg>
                    </button>
                    <button onClick={e => canvaRef.current.clear()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`${tableClassses.grid} bg-purple-900 text-white font-bold rounded-t-lg border border-purple-900 overflow-hidden`}>
                <Th>Признаки нарушения осанки</Th>
                <Th>Наличие признака</Th>
                <Th>Динамика</Th>
                <Th>Примечание</Th>
            </div>
            <Heading toggleOpen={setCommon} opened={common}>Общие признаки</Heading>
            {[{
                type: `select`,
                name: 'posture',
                title: 'Осанка',
                options: [
                    'вялая',
                    'сутулая',
                    'кифотическая',
                    'лордотоническая',
                    'плосковогнутая',
                    'кругловогнутая'
                ]
            }, {
                type: `select`,
                name: 'head',
                title: 'Голова',
                multiple: true,
                options: [
                    'наклон вправо',
                    'наклон влево',
                    'наклон вперед',
                    'разворот по оси против часовой стр.',
                    'разворот по оси по часовой стр.'
                ]
            }, {
                type: `select`,
                name: 'shoulder_asymmetry',
                title: 'Асимметрия стояния надплечий',
                options: [
                    'Правое ниже',
                    'Правое выше'
                ]
            }, {
                type: `select`,
                name: 'blades_asymmetry',
                title: 'Асимметрия состояний лопаток',
                options: [
                    'Правое ниже',
                    'Правое выше'
                ]
            }, {
                type: `boolean`,
                title: `Крыловидные лопатки`,
                name: `pterygoid_scapulae`
            }, {
                type: `boolean`,
                title: `Усиленный шейный лордоз`,
                name: `increased_cervical_lordosis`
            }, {
                type: `boolean`,
                title: `Сглажение шейного лордоза`,
                name: `smoothing_cervical_lordosis`
            }, {
                type: `boolean`,
                title: `Усиление грудного кифоза`,
                name: `increased_thoracic_kyphosis`
            }, {
                type: `boolean`,
                title: `Сглажение грудного кифоза`,
                name: `smoothing_thoracic_kyphosis`
            }, {
                type: `boolean`,
                title: `Усиление поясничного лордоза`,
                name: `increased_lumbar_lordosis`
            }, {
                type: `boolean`,
                title: `Сглажение поясничного лордоза`,
                name: `smoothing_lumbar_lordosis`
            }, {
                type: `select`,
                name: 'waist_triangles_asymmetry',
                title: 'Асимметрия треугольников талии',
                options: [
                    'Справа больше',
                    'Справа меньше'
                ]
            }, {
                type: `select`,
                name: 'muscle_ridges_back_asymmetry',
                title: 'Асимметричные мышечные валики на спине',
                options: [
                    'Справа больше',
                    'Справа меньше'
                ]
            }, {
                type: `select`,
                name: 'rib_hump_back',
                title: 'Реберный горб на спине',
                options: [
                    'Справа',
                    'Cлева'
                ]
            }, {
                type: `heading`,
                title: 'Отклонение оси позвоночника от прямой линии',
            }, {
                type: `select`,
                name: 'deviation_axis_chest',
                title: '<div className="pl-8">- в грудном</div>',
                options: [
                    'Вправо',
                    'Влево'
                ]
            }, {
                type: `select`,
                name: 'deviation_axis_lumbar',
                title: '<div className="pl-8">- в поясничном</div>',
                options: [
                    'Вправо',
                    'Влево'
                ]
            }, {
                type: `select`,
                name: 'hull_asymmetry',
                title: 'Асимметрия корпуса',
                options: [
                    'Вправо',
                    'Влево'
                ]
            }, {
                type: `select`,
                name: 'pelvic_tilt',
                title: 'Перекос таза',
                options: [
                    'Вправо',
                    'Влево'
                ]
            }, {
                type: `select`,
                name: 'sacral_fossae',
                title: 'Крестцовые ямки',
                options: [
                    'Вправо',
                    'Влево'
                ]
            }, {
                type: `select`,
                name: 'sitting_pelvic_tilt',
                title: 'Перекос таза сидя',
                options: [
                    'Вправо',
                    'Влево'
                ]
            }, {
                type: `select`,
                name: 'axial_rotation_pelvis',
                title: 'Разворот таза по оси',
                options: [
                    'Разворот по оси против часовой стр.',
                    'Разворот по оси по часовой стр.'
                ]
            }, {
                type: `select`,
                name: 'axial_rotation_hull',
                title: 'Разворот корпуса по оси',
                options: [
                    'Разворот по оси против часовой стр.',
                    'Разворот по оси по часовой стр.'
                ]
            }, {
                type: `select`,
                name: 'gluteal_folds_asymmetry',
                title: 'Асимметрия ягодичных складок',
                options: [
                    'Справа ниже',
                    'Справа выше'
                ]
            }, {
                type: `select`,
                name: 'popliteal_folds_asymmetry',
                title: 'Асимметрия подколенных складок',
                options: [
                    'Справа ниже',
                    'Справа выше'
                ]
            }

            ].map((formitem, fdx) => <div key={fdx} className={`${tableClassses.grid} transition ${common ? `max-h-none` : `max-h-0 overflow-hidden`}`}>
                <Td className={`${formitem.type === 'heading' ? `col-span-4` : ``}`}><div className="py-2">{parse(formitem.title ?? ``)}</div></Td>
                <Item data={data} setData={setData} formitem={formitem} />
            </div>)}
            <Heading toggleOpen={setTonus} opened={tonus}>Состояние мышечного тонуса</Heading>
            {[
                {
                    title: 'Шейный отдел',
                    className: 'row-span-4',
                    name: 'cervical',
                    items: [
                        {
                            type: `selects`,
                            name: 'hypertonicity',
                            title: `Гипертонус паравертебральный`,
                            subitems: [
                                {
                                    type: `select`,
                                    name: 'right',
                                    title: 'Справа',
                                    options: IIVOptions
                                },
                                {
                                    type: `select`,
                                    name: 'left',
                                    title: 'Слева',
                                    options: IIVOptions
                                }
                            ]
                        },
                        {
                            type: `selects`,
                            title: `Гипотонус паравертебральный`,
                            name: 'hypotonic',
                            subitems: [
                                {
                                    type: `select`,
                                    name: 'right',
                                    title: 'Справа',
                                    options: IIVOptions
                                },
                                {
                                    type: `select`,
                                    name: 'left',
                                    title: 'Слева',
                                    options: IIVOptions
                                }
                            ]
                        },
                        {
                            type: `boolean`,
                            title: `Функциональная кожная складка`,
                            name: `skin_fold`
                        },
                        {
                            type: `select`,
                            name: 'edema',
                            title: 'Отек',
                            options: IIVOptions
                        },
                    ]
                },
                {
                    title: 'Верхний грудной отдел',
                    className: 'row-span-2',
                    name: 'topchest',
                    items: [
                        {
                            name: 'hypertonicity',
                            type: `selects`,
                            title: `Гипертонус`,
                            subitems: [
                                {
                                    type: `select`,
                                    name: 'right',
                                    title: 'Справа',
                                    options: IIVOptions
                                },
                                {
                                    type: `select`,
                                    name: 'left',
                                    title: 'Слева',
                                    options: IIVOptions
                                }
                            ]
                        },
                        {
                            name: 'hypotonic',
                            type: `selects`,
                            title: `Гипотонус`,
                            subitems: [
                                {
                                    type: `select`,
                                    name: 'right',
                                    title: 'Справа',
                                    options: IIVOptions
                                },
                                {
                                    type: `select`,
                                    name: 'left',
                                    title: 'Слева',
                                    options: IIVOptions
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Грудной отдел',
                    className: 'row-span-2',
                    name: 'chest',
                    items: [
                        {
                            type: `selects`,
                            title: `Гипертонус паравертебральный`,
                            name: 'hypertonicity',
                            subitems: [
                                {
                                    type: `select`,
                                    name: 'right',
                                    title: 'Справа',
                                    options: IIVOptions
                                },
                                {
                                    type: `select`,
                                    name: 'left',
                                    title: 'Слева',
                                    options: IIVOptions
                                }
                            ]
                        },
                        {
                            type: `selects`,
                            name: 'hypotonic',
                            title: `Гипотонус паравертебральный`,
                            subitems: [
                                {
                                    type: `select`,
                                    name: 'right',
                                    title: 'Справа',
                                    options: IIVOptions
                                },
                                {
                                    type: `select`,
                                    name: 'left',
                                    title: 'Слева',
                                    options: IIVOptions
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Поясничный отдел',
                    className: 'row-span-3',
                    name: 'lumbar',
                    items: [
                        {
                            type: `selects`,
                            title: `Гипертонус паравертебральный`,
                            name: 'hypertonicity',
                            subitems: [
                                {
                                    type: `select`,
                                    name: 'right',
                                    title: 'Справа',
                                    options: IIVOptions
                                },
                                {
                                    type: `select`,
                                    name: 'left',
                                    title: 'Слева',
                                    options: IIVOptions
                                }
                            ]
                        },
                        {
                            type: `selects`,
                            title: `Гипотонус паравертебральный`,
                            name: 'hypotonic',
                            subitems: [
                                {
                                    type: `select`,
                                    name: 'right',
                                    title: 'Справа',
                                    options: IIVOptions
                                },
                                {
                                    type: `select`,
                                    name: 'left',
                                    title: 'Слева',
                                    options: IIVOptions
                                }
                            ]
                        },
                        {
                            type: `select`,
                            name: 'edema',
                            title: 'Отек',
                            options: IIVOptions
                        },
                    ]
                },
                {
                    title: 'Ягодичная область',
                    className: 'row-span-2',
                    name: 'gluteal',
                    items: [
                        {
                            type: `selects`,
                            title: `Гипертонус`,
                            name: 'hypertonicity',
                            subitems: [
                                {
                                    type: `select`,
                                    name: 'right',
                                    title: 'Справа',
                                    options: IIVOptions
                                },
                                {
                                    type: `select`,
                                    name: 'left',
                                    title: 'Слева',
                                    options: IIVOptions
                                }
                            ]
                        },
                        {
                            type: `selects`,
                            title: `Гипотонус`,
                            name: 'hypotonic',
                            subitems: [
                                {
                                    type: `select`,
                                    name: 'right',
                                    title: 'Справа',
                                    options: IIVOptions
                                },
                                {
                                    type: `select`,
                                    name: 'left',
                                    title: 'Слева',
                                    options: IIVOptions
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'Икроножные мышцы',
                    className: 'row-span-2',
                    name: 'calf',
                    items: [
                        {
                            type: `selects`,
                            name: 'hypertonicity',
                            title: `Гипертонус`,
                            subitems: [
                                {
                                    type: `select`,
                                    name: 'right',
                                    title: 'Справа',
                                    options: IIVOptions
                                },
                                {
                                    type: `select`,
                                    name: 'left',
                                    title: 'Слева',
                                    options: IIVOptions
                                }
                            ]
                        },
                        {
                            type: `selects`,
                            title: `Гипотонус`,
                            name: 'hypotonic',
                            subitems: [
                                {
                                    type: `select`,
                                    name: 'right',
                                    title: 'Справа',
                                    options: IIVOptions
                                },
                                {
                                    type: `select`,
                                    name: 'left',
                                    title: 'Слева',
                                    options: IIVOptions
                                }
                            ]
                        }
                    ]
                }, {
                    title: 'Ахиллово сухожилие',
                    className: 'row-span-1',
                    name: 'achilles',
                    items: [
                        {
                            type: `selects`,
                            title: null,
                            name: `tendon`,
                            subitems: [
                                {
                                    type: `select`,
                                    name: 'right',
                                    title: 'Справа',
                                    options: IIVOptions
                                },
                                {
                                    type: `select`,
                                    name: 'left',
                                    title: 'Слева',
                                    options: IIVOptions
                                }
                            ]
                        },
                    ]
                },
            ].map((row, rdx) => <div key={rdx} className={`${tableClassses.grid} transition ${tonus ? `max-h-none` : `max-h-0 overflow-hidden`}`}>
                <Td className={`font-bold ${row.className}`}><div className="py-2">{row.title}</div></Td>
                {row.items.map((formitem, fdx) => <Fragment key={fdx}>
                    <Item data={data} setData={setData} row={row} formitem={formitem} selectType={2} />
                </Fragment>)}
            </div>)}

            <Heading toggleOpen={setChest} opened={chest}>Со стороны груди</Heading>
            {[
                {
                    title: 'Асимметрия стояния надплечий',
                    className: 'row-span-2',
                    name: 'chest_shoulder_asymmetry',
                    type: `select`,
                    options: [
                        'Справа выше',
                        'Справа ниже'
                    ]
                },
                {
                    title: 'Деформация грудной клетки',
                    className: 'row-span-1',
                    name: 'chest_deformity',
                    type: `textarea`
                },
                {
                    title: 'Асимметрия молочных желез',
                    name: 'mammary_glands_asymmetry',
                    className: 'row-span-2',
                    type: `select`,
                    options: [
                        'Справа выше',
                        'Справа ниже'
                    ]
                },
                {
                    title: 'Асимметрия реберных дуг',
                    className: 'row-span-1',
                    name: 'costal_arches_asymmetry',
                    type: `textarea`
                },
                {
                    title: 'Отклонение пупочного кольца от средней линии',
                    className: 'row-span-1',
                    name: `deviation_umbilical`,
                    type: `select`,
                    options: [
                        'Вправо',
                        'Влево'
                    ]
                },
            ].map((formitem, rdx) => <div key={rdx} className={`${tableClassses.grid} transition ${chest ? `max-h-none` : `max-h-0 overflow-hidden`}`}>
                <Td className={`font-bold ${formitem.className}`}>{formitem.title}</Td>
                <Item data={data} setData={setData} formitem={formitem} />
            </div>)}

            <Heading toggleOpen={setTests} opened={tests}>Тесты</Heading>

            {[
                {
                    title: 'Флексионный',
                    className: 'row-span-1',
                    name: 'test',
                    items: [
                        {
                            name: 'flexion',
                            type: `textarea`
                        }
                    ]
                },
                {
                    title: 'Экстензионный',
                    className: 'row-span-1',
                    name: 'test',
                    items: [
                        {
                            name: 'extensional',
                            type: `textarea`
                        }
                    ]
                },
                {
                    title: 'Тест Адамса',
                    className: 'row-span-1',
                    name: 'test',
                    items: [
                        {
                            name: 'adams',
                            type: `boolean`,
                            title: `+`
                        },
                    ]
                },
                {
                    title: 'Тест Дерболовского (анатом.укороч.)',
                    className: 'row-span-1',
                    name: 'test',
                    items: [
                        {
                            name: 'derbl',
                            type: `boolean`,
                            title: `+`
                        },
                    ]
                },
                {
                    title: 'Тест Тределенбурга',
                    className: 'row-span-1',
                    name: 'test',
                    items: [
                        {
                            type: `radios`,
                            title: null,
                            name: `tredelen`,
                            subitems: [
                                {
                                    type: `radio`,
                                    title: `Cправа`,
                                    value: `Cправа`,
                                },
                                {
                                    type: `radio`,
                                    title: `Слева`,
                                    value: `Слева`,
                                },
                            ]
                        }
                    ]
                },
            ].map((row, rdx) => <div key={rdx} className={`${tableClassses.grid} transition ${tests ? `max-h-none` : `max-h-0 overflow-hidden`}`}>
                <Td className={`font-bold ${row.className}`}>{row.title}</Td>
                {row.items.map((formitem, fdx) => <Fragment key={fdx}>
                    <Td className="text-sm small-select">
                        {formitem.type === 'select' ? <div className="grid grid-cols-2 gap-2">
                            <div className="grid grid-cols-2 gap-2">
                                <div>{formitem.title}</div>
                                <Select
                                    styles={customStylesII}
                                    components={{ DropdownIndicator: DropdownIndicatorII }}
                                    isSearchable={false}
                                    isClearable={false}
                                    placeholder="-"
                                    defaultValue={data.ods[`${row.name}_${formitem.name}_option`] ? {
                                        value: data.ods[`${row.name}_${formitem.name}_option`],
                                        label: data.ods[`${row.name}_${formitem.name}_option`]
                                    } : {
                                        value: '-',
                                        label: '-'
                                    }}
                                    options={formitem.options.map(el => ({
                                        value: el,
                                        label: el
                                    }))}
                                    onChange={(value) => setData(prev => {
                                        const data = { ...prev }
                                        data.ods[`${row.name}_${formitem.name}_option`] = value ? value.value : ``
                                        return data
                                    })}
                                />
                            </div>
                        </div> : (
                            formitem.type === 'selects' ? <div>
                                {formitem.title ? <div className="font-bold">{formitem.title}</div> : ``}
                                <div className="grid grid-cols-2 gap-2">
                                    {formitem.subitems.map((subitem, sdx) => <div key={sdx} className="grid grid-cols-2 gap-2">
                                        <div>{subitem.title}</div>
                                        <Select
                                            styles={customStylesII}
                                            components={{ DropdownIndicator: DropdownIndicatorII }}
                                            isSearchable={false}
                                            isClearable={false}
                                            placeholder="-"
                                            defaultValue={data.ods[`${row.name}_${formitem.name}_${subitem.name}`] ? {
                                                value: data.ods[`${row.name}_${formitem.name}_${subitem.name}`],
                                                label: data.ods[`${row.name}_${formitem.name}_${subitem.name}`]
                                            } : {
                                                value: '-',
                                                label: '-'
                                            }}
                                            options={subitem.options.map(el => ({
                                                value: el,
                                                label: el
                                            }))}
                                            onChange={(value) => setData(prev => {
                                                const data = { ...prev }
                                                data.ods[`${row.name}_${formitem.name}_${subitem.name}`] = value ? value.value : ``
                                                return data
                                            })}
                                        />
                                    </div>)}
                                </div>
                            </div> : (
                                formitem.type === 'boolean' ? <label className="flex items-center gap-2">
                                    <div className="flex items-center">
                                        <Checkbox
                                            name={`${formitem.name}_option`}
                                            value={1}
                                            defaultChecked={!!(1 * data.ods[`${row.name}_${formitem.name}_option`])}
                                            onChange={e => setData(prev => {
                                                const data = { ...prev }
                                                data.ods[`${row.name}_${formitem.name}_option`] = e.target.checked
                                                return data
                                            })}
                                        />
                                    </div>
                                    <div className="col-span-3">{formitem.title}</div>
                                </label> : (
                                    formitem.type === 'textarea' ? <div className="-mx-2"><textarea
                                        value={data.ods[`${row.name}_${formitem.name}_option`] ?? ``}
                                        onChange={e => setData(prev => {
                                            const data = { ...prev }
                                            data.ods[`${row.name}_${formitem.name}_option`] = e.target.value
                                            return data
                                        })}
                                        className=" w-full block border-0 bg-transparent h-[2.5rem] focus:outline-none"
                                    />
                                    </div> : (
                                        formitem.type === 'radios' ? <div>
                                            <div className="grid grid-cols-2 gap-2">
                                                {formitem.subitems.map((subitem, sdx) => <label key={sdx} className="flex items-center gap-2">
                                                    <div className="flex items-center">
                                                        <input type="radio"
                                                            className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 '}
                                                            name={`${row.name}_${formitem.name}_option`}
                                                            value={subitem.value}
                                                            defaultChecked={data.ods[`${row.name}_${formitem.name}_option`] == sdx}
                                                            onChange={e => setData(prev => {
                                                                const data = { ...prev }
                                                                data.ods[`${row.name}_${formitem.name}_option`] = sdx
                                                                return data
                                                            })}
                                                        />
                                                    </div>
                                                    <div className="col-span-3">{subitem.title}</div>
                                                </label>)}
                                            </div>
                                        </div> : ``
                                    )
                                )
                            )
                        )}
                    </Td>
                    <Td className="text-sm small-select">
                        {formitem.type === 'select' ? <div className="grid grid-cols-2 gap-2">
                            <div className="grid grid-cols-2 gap-2">
                                <div>{formitem.title}</div>
                                <Select
                                    styles={customStylesII}
                                    components={{ DropdownIndicator: DropdownIndicatorII }}
                                    isSearchable={false}
                                    isClearable={false}
                                    placeholder="-"
                                    defaultValue={data.ods[`${row.name}_${formitem.name}_dyn`] ? {
                                        value: data.ods[`${row.name}_${formitem.name}_dyn`],
                                        label: data.ods[`${row.name}_${formitem.name}_dyn`]
                                    } : {
                                        value: '-',
                                        label: '-'
                                    }}
                                    options={formitem.options.map(el => ({
                                        value: el,
                                        label: el
                                    }))}
                                    onChange={(value) => setData(prev => {
                                        const data = { ...prev }
                                        data.ods[`${row.name}_${formitem.name}_dyn`] = value ? value.value : ``
                                        return data
                                    })}
                                />
                            </div>
                        </div> : (
                            formitem.type === 'selects' ? <div>
                                {formitem.title ? <div className="font-bold">{formitem.title}</div> : ``}
                                <div className="grid grid-cols-2 gap-2">
                                    {formitem.subitems.map((subitem, sdx) => <div key={sdx} className="grid grid-cols-2 gap-2">
                                        <div>{subitem.title}</div>
                                        <Select
                                            styles={customStylesII}
                                            components={{ DropdownIndicator: DropdownIndicatorII }}
                                            isSearchable={false}
                                            isClearable={false}
                                            placeholder="-"
                                            defaultValue={data.ods[`${row.name}_${formitem.name}_${subitem.name}`] ? {
                                                value: data.ods[`${row.name}_${formitem.name}_${subitem.name}`],
                                                label: data.ods[`${row.name}_${formitem.name}_${subitem.name}`]
                                            } : {
                                                value: '-',
                                                label: '-'
                                            }}
                                            options={subitem.options.map(el => ({
                                                value: el,
                                                label: el
                                            }))}
                                            onChange={(value) => setData(prev => {
                                                const data = { ...prev }
                                                data.ods[`${row.name}_${formitem.name}_${subitem.name}`] = value ? value.value : ``
                                                return data
                                            })}
                                        />
                                    </div>)}
                                </div>
                            </div> : (
                                formitem.type === 'boolean' ? <label className="flex items-center gap-2">
                                    <div className="flex items-center">
                                        <Checkbox
                                            name={`${formitem.name}_dyn`}
                                            value={1}
                                            defaultChecked={!!(1 * data.ods[`${row.name}_${formitem.name}_dyn`])}
                                            onChange={e => setData(prev => {
                                                const data = { ...prev }
                                                data.ods[`${row.name}_${formitem.name}_dyn`] = e.target.checked
                                                return data
                                            })}
                                        />
                                    </div>
                                    <div className="col-span-3">{formitem.title}</div>
                                </label> : (
                                    formitem.type === 'textarea' ? <div className="-mx-2"><textarea
                                        value={data.ods[`${row.name}_${formitem.name}_dyn`] ?? ``}
                                        onChange={e => setData(prev => {
                                            const data = { ...prev }
                                            data.ods[`${row.name}_${formitem.name}_dyn`] = e.target.value;
                                            return data
                                        })}
                                        className=" w-full block border-0 bg-transparent h-[2.5rem] focus:outline-none"
                                    />
                                    </div> : (
                                        formitem.type === 'radios' ? <div>
                                            <div className="grid grid-cols-2 gap-2">
                                                {formitem.subitems.map((subitem, sdx) => <label key={sdx} className="flex items-center gap-2">
                                                    <div className="flex items-center">
                                                        <input type="radio"
                                                            className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 '}
                                                            name={`${row.name}_${formitem.name}_dyn`}
                                                            value={sdx}
                                                            checked={data.ods[`${row.name}_${formitem.name}_dyn`] == sdx}
                                                            onChange={e => setData(prev => {
                                                                const data = { ...prev }
                                                                data.ods[`${row.name}_${formitem.name}_dyn`] = sdx
                                                                return data
                                                            })}
                                                        />
                                                    </div>
                                                    <div className="col-span-3">{subitem.title}</div>
                                                </label>)}
                                            </div>
                                        </div> : ``
                                    )
                                )
                            )
                        )}
                    </Td>
                    <Td padding={false}>
                        <textarea
                            value={data.ods[`${row.name}_${formitem.name}_note`] ?? ``}
                            onChange={e => setData(prev => {
                                const data = { ...prev }
                                data.ods[`${row.name}_${formitem.name}_note`] = e.target.value
                                return data
                            })}
                            className="w-full block border-0 bg-transparent h-[2.5rem] focus:outline-none"
                        />
                    </Td>
                </Fragment>)}
            </div>)}
            <Heading toggleOpen={setNotes} opened={notes} className={`${notes ? `` : `rounded-b-lg`}`}>Примечания</Heading>
            <div className={`${tableClassses.grid} transition overflow-hidden ${notes ? `max-h-none` : `max-h-0`}`}>
                <div className="col-span-4 rounded-b-lg border-zinc-500 border-l border-r border-b">

                    <textarea
                        placeholder="Введите текст"
                        value={data.ods.notes ?? ``}
                        onChange={e => setData(prev => {
                            const data = { ...prev }
                            data.ods.notes = e.target.value
                            return data
                        })}
                        className="w-full min-h-[16rem] border-0 block rounded-b-lg"
                    />
                </div>
            </div>
        </div>
        <div className={`flex justify-end py-8`}>
            <PrimaryButton size="sm" onClick={() => nextTab()}>Далее</PrimaryButton>
        </div>
    </>
}
