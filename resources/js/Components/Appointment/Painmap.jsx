import { useEffect } from "react";
import Person from "../../../img/pain.webp"
import Level1 from "../../../img/painlevels/fine.png"
import Level2 from "../../../img/painlevels/good.png"
import Level3 from "../../../img/painlevels/norm.png"
import Level4 from "../../../img/painlevels/nogood.png"
import Level5 from "../../../img/painlevels/bad.png"
import Level6 from "../../../img/painlevels/worst.png"
import { useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import Select, { components } from 'react-select';
import { useState } from "react";
import PrimaryButton from "../PrimaryButton";
import { Fragment } from "react";

const pf = [
    `постоянная`,
    `периодическая`
].map(item => ({
    label: item,
    value: item
}))

const pu = [
    `при движении`,
    `в покое`,
    `при глубоком дыхании`,
    `другое`
].map(item => ({
    label: item,
    value: item
}))

const pomed = [
    `Наркотические анальгетики`,
    `Ненаркотические анальгетики`,
    `Спазмолитические препараты`,
    `Анестетические препараты`,
    `Другое`
]

const ponomed = [
    `Упражнения`,
    `Иммобилизация`,
    `Придание возвышенного положения`,
    `Смена положения тела`,
    `Психологическая поддержка`,
    `Обучение`,
    `Массаж`,
    `Горячие компрессы`,
    `Холодные компрессы`,
    `Отвлекающая терапия`,
    `Другое`
]

const sideeffects = [
    `Аллергические реакции`,
    `Привыкание`,
    `Тошнота`,
    `Рвота`,
    `Боли в желудке`,
    `Угнетение дыхания`,
    `Запор`,
    `Другое`,
]

const therapyeffects = [
    `Минимальное - Снижение на 10-20%`,
    `Умеренное - Снижение на 30%`,
    `Существенное - Снижение на 50%`
];

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

const levels = [
    Level1,
    Level2,
    Level3,
    Level4,
    Level5,
    Level6,
]

const characters = [
    `Жгучая`,
    `Острая`,
    `Режущая`,
    `Стреляющая`,
    `Пульсирующая`,
    `Схваткообразная`,
    `Колющая`,
    `Ноющая`,
    `Тянущая`,
    `Тупая`,
    `Другое`
]

const departments = [
    { label: 'Шейный отдел', value: 'cervical' },
    { label: 'Грудной отдел', value: 'thoracic' },
    { label: 'Грудопоясничный отдел', value: 'thoracolumbar' },
    { label: 'Поясничный отдел', value: 'lumbar' },
    { label: 'Пояснично-крестцовый отдел', value: 'lumbosacral' },
    { label: 'Крестцово-копчиковой отдел', value: 'sacrococcygeal' },
]

const painlevels = [
    { label: 'Боли нет', value: 'nop' },
    { label: 'Боль незначительная', value: 'minor' },
    { label: 'Боль умеренная', value: 'moderate' },
    { label: 'Боль выраженная', value: 'expressed' },
    { label: 'Боль невыносимая', value: 'unbearable' },
]

const painnumlevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
    { label: i, value: i }
))


const PainMetter = ({ painData, painDatas, setPainDatas = () => { }, index, hide = false, prefix = false }) => {

    return <div className="grow">
        <div className="flex gap-4 items-center mb-8">
            <div className="font-semibold shrink-0">Уровень боли</div>
            <div className={`grid grid-cols-3 gap-4 text-sm ${index < 0 ? `grow` : ``}`}>
                <Select
                    key={`${prefix ? `${prefix}-` : ``}department${index < 0 ? `` : `-${index}`}-${painData.department}`}
                    styles={customStyles}
                    components={{ DropdownIndicator }}
                    options={departments}
                    value={departments.find(el => el.value == painData.department)}
                    onChange={value => {
                        setPainDatas(prev => {
                            const data = [...prev]
                            data[index].department = value.value
                            return data
                        })
                    }}
                />
                <Select
                    styles={customStyles}
                    key={`${prefix ? `${prefix}-` : ``}painlevel${index < 0 ? `` : `-${index}`}-${painData.painlevel}`}
                    components={{ DropdownIndicator }}
                    options={painlevels}
                    value={painlevels.find(el => el.value == painData.painlevel)}
                    onChange={value => {
                        setPainDatas(prev => {
                            const data = [...prev]
                            data[index].painlevel = value.value
                            return data
                        })
                    }}
                    placeholder="Выбрать из списка"
                />
                <Select
                    styles={customStyles}
                    key={`${prefix ? `${prefix}-` : ``}painnumlevel${index < 0 ? `` : `-${index}`}-${painData.painnumlevel}`}
                    components={{ DropdownIndicator }}
                    options={painnumlevels}
                    value={painnumlevels.find(el => el.value == painData.painnumlevel)}
                    onChange={value => {
                        setPainDatas(prev => {
                            const data = [...prev]
                            data[index].painnumlevel = value.value
                            return data
                        })
                    }}
                    placeholder="Выберите от 0 до 10"
                />
            </div>
            {index == painDatas.length - 1 ? <div className="w-4 h-4 shrink-0 cursor-pointer flex items-center justify-center bg-violet-900 rounded-sm text-white leading-none font-medium" onClick={e => {
                setPainDatas(prev => [...prev, { ...painData }])
            }}><div>+</div></div> : <div className="w-4 h-4 shrink-0 cursor-pointer flex items-center justify-center bg-violet-900 rounded-sm text-white leading-none font-medium" onClick={e => {
                setPainDatas(prev => {
                    const data = [...prev]
                    data.splice(index, 1)
                    return data
                })
            }}><div>-</div></div>}
        </div>
        <div className="flex grow mb-8 -mx-3">
            {[`боли нет`, `боль незначительная`, `боль умеренная`, `боль терпимая`, `боль выраженная`, `боль невыносимая`]
                .map((label, ldx) => <label key={ldx} htmlFor={`${prefix ? `${prefix}-` : ``}painlevel-${1 + ldx}${index > -1 ? `-${index}` : ``}`} className="w-1/6 px-3 flex flex-col gap-4 shrink-0 items-center">
                    <img src={levels[ldx]} alt={``} className="w-24 h-auto" />
                    <input
                        type="radio"
                        name={`${prefix ? `${prefix}-` : ``}painlevel${index > -1 ? `-${index}` : ``}`}
                        value={1 + ldx}
                        checked={painData.level ? (1 + ldx) == painData.level : ldx == 0}
                        onChange={e => {
                            if (!e.target.checked) return
                            setPainDatas(prev => {
                                const data = [...prev]
                                data[index].level = (1 + ldx)
                                return data
                            })
                        }}
                        id={`${prefix ? `${prefix}-` : ``}painlevel-${1 + ldx}${index > -1 ? `-${index}` : ``}`}
                        className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 '}
                    />
                    <div className="w-full font-medium text-sm text-center">{label}</div>
                </label>)}
        </div>
        {hide ? `` : <>
            <div className="mb-8">
                <div className="font-semibold mb-4">Характер боли</div>
                <div className="flex flex-wrap gap-4 items-center">
                    {characters.map((item, idx) => <label key={idx} htmlFor={`character-${idx}${index > -1 ? `-${index}` : ``}`} className="flex gap-2 items-center">
                        <input
                            type="checkbox"
                            name={`character${index > -1 ? `-${index}` : ``}`}
                            value={1 + idx}
                            onChange={e => {
                                if (!e.target.checked) return
                                setPainDatas(prev => {
                                    const data = [...prev]
                                    data[index].character = 1 + idx
                                    return data
                                })
                            }}
                            checked={painData.character ? idx == painData.character - 1 : idx == 0}
                            id={`character-${idx}${index > -1 ? `-${index}` : ``}`}
                            className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 '}
                        />
                        <div>{item}</div>
                    </label>)}
                </div>
            </div>
            <div className="mb-4">
                <input
                    name={`text${index > -1 ? `-${index}` : ``}`}
                    placeholder="Введите текст"
                    value={painData.text ?? ``}
                    onChange={e => setPainDatas(prev => {
                        const data = [...prev]
                        data[index].text = e.target.value
                        return data
                    })}
                    className="w-full border-0 rounded"
                />
            </div>
        </>}
    </div>
}

export default (props) => {

    const { data, setData, errors, nextTab } = props;

    const painDataDefault = {
        level: 1,
        character: 1,
        text: ``,
        department: `cervical`,
        painlevel: null,
        painnumlevel: null
    }

    const [painDatas, setPainDatas] = useState(data.painmap.paindata ?? [painDataDefault])
    const [repeatPainDatas, setRepeatPainDatas] = useState(data.painmap.repeatpaindata ?? [painDataDefault])
    const [dynamicPainDatas, setDynamicPainDatas] = useState(data.painmap.dynamicpaindata ?? [painDataDefault])

    const canvaRef = useRef(null)

    useEffect(() => {
        if (canvaRef.current && data.painmap.lines) {
            setTimeout(() => {
                canvaRef.current.simulateDrawingLines({ lines: data.painmap.lines, immediate: true })
            }, 150)
        }
    }, [canvaRef])

    // painData => setPainDatas(prev => {
    //     console.log(prev)
    //     const painDatas = [...prev];
    //     painDatas[index] = painData;
    //     return painData;
    // })

    useEffect(() => {
        setData(prev => {
            const data = { ...prev }
            data.painmap.paindata = painDatas
            return data
        })
    }, [painDatas])

    useEffect(() => {
        setData(prev => {
            const data = { ...prev }
            data.painmap.repeatpaindata = repeatPainDatas
            return data
        })
    }, [repeatPainDatas])

    useEffect(() => {
        setData(prev => {
            const data = { ...prev }
            data.painmap.dynamicpaindata = dynamicPainDatas
            return data
        })
    }, [dynamicPainDatas])

    return <>
        <div className={`bg-blue-80 rounded-lg p-5 mb-4`}>
            <div className="flex gap-4 mb-0">
                <div className="shrink-0">
                    <div className="flex justify-center">
                        <CanvasDraw
                            ref={canvaRef}
                            lazyRadius={3}
                            hideGrid={true}
                            hideInterface={false}
                            brushRadius={2}
                            brushColor="#3A9EAA"
                            canvasWidth={353}
                            canvasHeight={368}
                            imgSrc={Person}
                            onChange={e => setData(prev => {
                                const data = { ...prev }
                                data.painmap.lines = e.lines
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
                <PainMetter painData={painDatas[painDatas.length - 1]} setPainDatas={setPainDatas} painDatas={painDatas} index={painDatas.length - 1} />
            </div>


            <div className="mb-8">
                <div className="text-sm font-medium mb-2">Локализация боли</div>
                <textarea
                    placeholder="Введите текст"
                    value={data.painmap.localisation ?? ``}
                    onChange={e => setData(prev => {
                        const data = { ...prev }
                        data.painmap.localisation = e.target.value
                        return data
                    })}
                    className="w-full border-0 rounded grow text-xs h-24"
                />
            </div>
            
            <ul className="flex flex-col-reverse mb-8">
                {painDatas.map((item, index) => <Fragment key={index}>
                    {index < painDatas.length - 1 ? <li>
                        <PainMetter painData={item} setPainDatas={setPainDatas} painDatas={painDatas} index={index} />
                    </li> : ``}
                </Fragment>)}
            </ul>
            <div className="mb-8">
                <div className="text-sm font-medium mb-2">Частота </div>
                <div className="grid grid-cols-[1fr_2fr] gap-8 text-xs">
                    <div>
                        <Select
                            styles={customStyles}
                            components={{ DropdownIndicator }}
                            options={pf}
                            placeholder={`Выбрать из списка`}
                            value={pf.find(el => el.value == data.painmap.frequency)}
                            onChange={value => setData(prev => {
                                const data = { ...prev }
                                data.painmap.frequency = value.value
                                return data
                            })}
                        />
                    </div>
                    <div>
                        <input
                            placeholder="Введите текст"
                            value={data.painmap.frequencytext ?? ``}
                            onChange={e => setData(prev => {
                                const data = { ...prev }
                                data.painmap.frequencytext = e.target.value
                                return data
                            })}
                            className="w-full border-0 rounded text-xs"
                        />
                    </div>
                </div>
            </div>
            <div className="mb-8">
                <div className="text-sm font-medium mb-2">Боль усугубляется</div>
                <div className="grid grid-cols-[1fr_2fr] gap-8 text-xs">
                    <div>
                        <Select
                            styles={customStyles}
                            components={{ DropdownIndicator }}
                            options={pu}
                            placeholder={`Выбрать из списка`}
                            value={pu.find(el => el.value == data.painmap.worsing)}
                            onChange={value => setData(prev => {
                                const data = { ...prev }
                                data.painmap.worsing = value.value
                                return data
                            })}
                        />
                    </div>
                    <div>
                        <input
                            placeholder="Введите текст"
                            value={data.painmap.worsingtext ?? ``}
                            onChange={e => setData(prev => {
                                const data = { ...prev }
                                data.painmap.worsingtext = e.target.value
                                return data
                            })}
                            className="w-full border-0 rounded text-xs"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-12 mb-8">
                <div className="text-sm font-medium mb-4">Обычно облегчается</div>
                <div className="text-sm mb-2">Медикаментозно</div>

                <div className="flex flex-wrap gap-4 items-center mb-4 text-xs whitespace-nowrap">
                    {pomed.map((item, idx) => <label key={idx} htmlFor={`pomed-${idx}`} className={`flex gap-2 items-center ${idx == pomed.length - 1 ? `w-full` : ``}`}>
                        <div className="shrink-0 flex gap-2 items-center">
                            <input
                                type="radio"
                                name={`pomed`}
                                id={`pomed-${idx}`}
                                value={1 + idx}
                                onChange={e => {
                                    if (!e.target.checked) return
                                    setData(prev => {
                                        const data = { ...prev }
                                        data.painmap.pomed = item
                                        return data
                                    })
                                }}
                                checked={data.painmap.pomed == item}
                                className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 '}
                            />
                            <div>{item}</div>
                        </div>
                        {idx == pomed.length - 1 ? <input
                            placeholder="Введите текст"
                            value={data.painmap.pomedtext ?? ``}
                            onChange={e => setData(prev => {
                                const data = { ...prev }
                                data.painmap.pomedtext = e.target.value
                                return data
                            })}
                            className="w-full border-0 rounded grow text-xs"
                        /> : ``}
                    </label>)}
                </div>
                <div className="text-sm mb-2">Немедикаментозно</div>

                <div className="flex flex-wrap gap-4 items-center mb-8 text-xs whitespace-nowrap">
                    {ponomed.map((item, idx) => <label key={idx} htmlFor={`ponomed-${idx}`} className={`flex gap-2 items-center ${idx == ponomed.length - 1 ? `w-full` : ``}`}>
                        <div className="shrink-0 flex gap-2 items-center">
                            <input
                                type="radio"
                                name={`ponomed`}
                                id={`ponomed-${idx}`}
                                value={1 + idx}
                                onChange={e => {
                                    if (!e.target.checked) return
                                    setData(prev => {
                                        const data = { ...prev }
                                        data.painmap.ponomed = item
                                        return data
                                    })
                                }}
                                checked={data.painmap.ponomed == item}
                                className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 '}
                            />
                            <div>{item}</div>
                        </div>
                        {idx == ponomed.length - 1 ? <input
                            placeholder="Введите текст"
                            value={data.painmap.ponomedtext ?? ``}
                            onChange={e => setData(prev => {
                                const data = { ...prev }
                                data.painmap.ponomedtext = e.target.value
                                return data
                            })}
                            className="w-full border-0 rounded grow text-xs"
                        /> : ``}
                    </label>)}
                </div>
            </div>

            <div className="mb-8">
                <div className="text-sm font-medium mb-2">Побочные эффекты обезболивающих препаратов</div>
                <div className="flex flex-wrap gap-6 grow mb-8 text-xs whitespace-nowrap">
                    {sideeffects.map((item, idx) => <label key={idx} htmlFor={`sideeffect-${idx}`} className={`flex gap-2 items-center ${idx == sideeffects.length - 1 ? `w-full` : ``}`}>
                        <input
                            type="checkbox"
                            name={`sideeffects[]`}
                            id={`sideeffect-${idx}`}
                            value={1 + idx}
                            onChange={e => setData(prev => {
                                const data = { ...prev }
                                const sideeffects = data.painmap.sideeffects ? [...data.painmap.sideeffects] : []
                                console.log(sideeffects)
                                const sdIndex = sideeffects.findIndex(el => el == item)
                                if (sdIndex > -1) sideeffects.splice(sdIndex, 1)
                                else sideeffects.push(item)
                                data.painmap.sideeffects = sideeffects
                                return data
                            })}
                            defaultChecked={data.painmap.sideeffects && data.painmap.sideeffects.indexOf(item) > -1}
                            className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 rounded-sm'}
                        />
                        <div>{item}</div>
                        {idx == sideeffects.length - 1 ? <input
                            placeholder="Введите текст"
                            value={data.painmap.sideeffecttext ?? ``}
                            onChange={e => setData(prev => {
                                const data = { ...prev }
                                data.painmap.sideeffecttext = e.target.value
                                return data
                            })}
                            className="w-full border-0 rounded grow text-xs"
                        /> : ``}
                    </label>)}
                </div>
            </div>


            <div className="mb-8">
                <div className="text-sm font-medium mb-2">Повторная оценка боли</div>
                <ul className="flex flex-col mb-8">
                    {repeatPainDatas.map((item, index) => <li key={index}>
                        <PainMetter painData={item} setPainDatas={setRepeatPainDatas} painDatas={repeatPainDatas} index={index} hide={true} prefix={`rep`} />
                    </li>)}
                </ul>
            </div>


            <div className="mb-8">
                <div className="text-sm font-medium mb-4">Эффект проведенной терапии</div>
                <div className="flex flex-col gap-4 text-xs">
                    {therapyeffects.map((item, idx) => <label key={idx} htmlFor={`therapyeffect-${idx}`} className={`flex gap-2 items-center`}>
                        <input
                            type="radio"
                            name={`therapyeffect`}
                            id={`therapyeffect-${idx}`}
                            value={1 + idx}
                            onChange={e => {
                                if (!e.target.checked) return
                                setData(prev => {
                                    const data = { ...prev }
                                    data.painmap.therapyeffect = item
                                    return data
                                })
                            }}
                            defaultChecked={data.painmap.therapyeffect == item}
                            className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900'}
                        />
                        <div>{item}</div>
                    </label>)}
                </div>
            </div>


            <div className="mb-8">
                <div className="text-sm font-medium mb-2">Комментарий</div>
                <textarea
                    placeholder="Введите текст"
                    value={data.painmap.comment ?? ``}
                    onChange={e => setData(prev => {
                        const data = { ...prev }
                        data.painmap.comment = e.target.value
                        return data
                    })}
                    className="w-full border-0 rounded grow text-xs h-24"
                />
            </div>


        </div>
        <div className={`bg-blue-80 rounded-lg p-5 mb-4`}>
            <div className="mb-8">
                <div className="text-sm font-medium mb-2">Динамика</div>
                <ul className="flex flex-col mb-8">
                    {dynamicPainDatas.map((item, index) => <li key={index}>
                        <PainMetter painData={item} setPainDatas={setDynamicPainDatas} painDatas={dynamicPainDatas} index={index} hide={true} prefix={`dyn`} />
                    </li>)}
                </ul>
            </div>
        </div>


        <div className={`flex justify-end py-8`}>
            <PrimaryButton size="sm" onClick={() => nextTab()}>Далее</PrimaryButton>
        </div>
    </>
}
