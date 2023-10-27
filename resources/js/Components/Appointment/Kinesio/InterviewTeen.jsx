import { Fragment } from "react";
import { useState } from "react";
import { useRef } from "react";
import { forwardRef } from "react";

const fields = [
    {
        label: `1. Ожидание пациента`,
        fields: [
            {
                name: `waiting`
            }
        ]
    },
    {
        label: `2. Интервью`,
        fields: [
            {
                label: `2.1. Ребенок родился недоношенным?`,
                afterlabel: `На какой неделе беременности родился? Какой был вес?`,
                name: `bornpremature`,
                yesno: true,
                fields: [
                    {
                        label: `Неделя`,
                        name: `bornprematureweek`,
                    },
                    {
                        label: `Вес`,
                        name: `bornprematureweight`,
                    }
                ]
            },
            {
                label: `2.2. Есть ли у ребенка проблемы с питанием?`,
                name: `childfeedingproblems`,
                yesno: true
            },
            {
                label: `2.3. Были ли в семье какие-либо генетические, метаболические или неврологические заболевания?`,
                name: `neurologicaldiseasesfamily`,
            },
            {
                label: `2.4. Показывает ли ребенок улучшение/ухудшение своих функций?`,
                name: `motordevelopmentprogressed`,
                fields: [
                    {
                        label: `Улучшение`,
                        value: 0,
                        name: `motordevelopmentprogress`,
                        type: `radio`

                    },
                    {
                        label: `Ухудшение`,
                        value: 1,
                        name: `motordevelopmentprogress`,
                        type: `radio`
                    }
                ]
            },
            {
                label: `2.5. В каком периоде развития у ребенка был самый высокий уровень двигательных навыков?`,
                name: `periodhighestlevelmotorskills`
            },
            {
                label: `2.6. С какими функциями у ребенка в настоящее время самая большая проблема?`,
                name: `biggestproblemfunctions`
            },
            {
                label: `2.7. Есть ли у ребенка болевые симптомы? Если да, то в какой области тела?`,
                name: `havepainsymptoms`,
                yesno: true,
            },
            {
                label: `2.8. Как проходил процесс лечения ребенка до сих пор?`,
                name: `treatmentbeenfar`,
                fields: [
                    {
                        label: `реабилитационное`,
                        name: `reablech`,
                        type: `checkbox`

                    },
                    {
                        label: `фармакологическое`,
                        name: `farmlech`,
                        type: `checkbox`
                    },
                    {
                        label: `хирургическое лечение`,
                        name: `hirurglech`,
                        type: `checkbox`
                    }
                    
                ],
            },
            {
                label: `2.9. Лечился ли ребенок ботулотоксином? Когда была последняя инъекция?`,
                name: `treatedbotulinum`,
                yesno: true,
            },
            {
                label: `2.10. Если была использована терапия ботулотоксином, какой был результат?`,
                name: `treatedbotulinumresult`
            },
            {
                label: `2.11. Какие специальные обследования были проведены до сих пор?`,
                name: `specialexaminations`
            },
            {
                label: `2.12. Были ли рентгеновские снимки тазобедренных суставов?`,
                name: `xrayshipjoints`,
                yesno: true,
            },
            {
                label: `2.13. Каков уровень интеллектуального развития ребенка?`,
                name: `intellectualdevelopment`,
            },
            {
                label: `2.14. Какую форму общения с окружающей средой использует ребенок?`,
                name: `communicationenvironment`,
            },
            {
                label: `2.15. В какой степени ребенок нуждается помощи в повседневной деятельности?`,
                name: `extentassistance`,
            },
            {
                label: `Замечания`,
                name: `notes`,
            },
        ]
    }
]

const Textarea = forwardRef(function ({ data, setData, onChange, value, name, fields = [], yesno = false, className = '', type = 'textarea', label = ``, afterlabel = ``, ...props }, ref) {
    const input = ref ? ref : useRef();

    const [checked, setChecked] = useState(!!value)

    return <>

        {label ? <div className="flex items-center gap-4 mb-2">
            <span>{label}</span>
            {yesno ? <>
                <label htmlFor={`yes-${name}`} className="flex items-center gap-2 text-sm">
                    <input type="radio"
                        className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 '}
                        name={`${name}checked`}
                        checked={checked}
                        id={`yes-${name}`}
                        onChange={e => {
                            if (e.target.checked) {
                                input.current.focus()
                                setChecked(e.target.checked)
                            }
                        }}
                    />
                    <span>да</span>
                </label>
                <label htmlFor={`no-${name}`} className="flex items-center gap-2 text-sm">
                    <input type="radio"
                        className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 '}
                        name={`${name}checked`}
                        id={`no-${name}`}
                        checked={!checked}
                        onChange={e => {
                            if (e.target.checked) {
                                onChange({
                                    target: {
                                        value: ``
                                    }
                                })
                                setChecked(false)
                            }
                        }}
                    />
                    <span>нет</span>
                </label>
            </> : ``}
        </div> : ``}
        {afterlabel ? <div>{afterlabel}</div> : <></>}
        {fields.length ? <div className="my-2 flex items-center gap-6 text-sm">
            {fields.map((f, fdx) => <div key={fdx} className="my-2 flex items-center gap-2">
                {f.type == 'radio' ? <label className="flex items-center gap-2">
                    <input
                        name={f.name}
                        type={`radio`}
                        value={f.value}
                        onChange={e => setData(prev => {
                            const data = { ...prev }
                            data.kinesio.interview[f.name] = f.value
                            return data
                        })}
                        defaultChecked={data.kinesio.interview[f.name] == f.value}
                        className={`border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 `}
                        ref={input}
                    />
                    <span>{f.label}</span>
                </label> : f.type == 'checkbox' ? <label htmlFor={f.name} className="flex items-center gap-2">
                    <input
                        id={f.name}
                        name={f.name}
                        type={`checkbox`}
                        onChange={e => setData(prev => {
                            const data = { ...prev }
                            data.kinesio.interview[f.name] = e.target.checked
                            return data
                        })}
                        defaultChecked={!!data.kinesio.interview[f.name]}
                        className={`rounded border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 `}
                        ref={input}
                    />
                    <span>{f.label}</span>
                </label> : <>
                    <label>{f.label}</label>
                    <input
                        name={f.name}
                        onChange={e => setData(prev => {
                            const data = { ...prev }
                            data.kinesio.interview[f.name] = e.target.value
                            return data
                        })} value={data.kinesio.interview[f.name]}
                        className={`border-0 bg-white rounded ring-0 text-xs py-1.5`}
                        ref={input}
                    />
                </>}
            </div>)}
        </div> : ``}
        <textarea
            {...props}
            name={name}
            onChange={e => {
                setChecked(true)
                onChange(e)
            }}
            value={value ?? ``}
            className={`border-0 bg-white h-36 mb-2 w-full rounded ring-0 ${className}`}
            ref={input}
        />
    </>;
});

export default (props) => {

    const { data, setData, handleOnChange, errors } = props;

    return <div className={`bg-blue-80 rounded-lg p-5 mb-8`}>

        <div className="font-medium mb-4">I. Интервью - старшие дети</div>
        {fields.map((cat, cdx) => <div key={cdx} className="mb-4">
            <div className="mb-2">{cat.label}</div>
            {cat.fields.map((item, index) => <Textarea {...item} data={data} setData={setData} onChange={e => setData(prev => {
                const data = { ...prev }
                data.kinesio.interview[item.name] = e.target.value
                return data
            })} value={data.kinesio.interview[item.name]} key={index} />)}
        </div>)}
    </div>
}
