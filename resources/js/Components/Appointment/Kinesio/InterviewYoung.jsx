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
                label: `2.1. Были ли какие-либо факторы, влияющие на беременность?`,
                name: `pregnancyfactors`,
                yesno: true
            },
            {
                label: `2.2. Были ли какие-либо отклонения от нормы во время родов?`,
                name: `abnormalitiesbirth`,
                yesno: true
            },
            {
                label: `2.3. Какое было общее состояние ребенка после рождения?`,
                name: `conditionafterbirth`
            },
            {
                label: `2.4. Какой был вес ребенка при рождении?`,
                name: `babyweight`,
                className: `h-[3rem]`
            },
            {
                label: `2.5. Были ли проблемы с дыханием? Если да, то как долго ребенок нуждался в поддержке дыхания?`,
                name: `childbreathingsupport`,
                yesno: true
            },
            {
                label: `2.6. Какие проблемы у родителей наблюдаются у ребенка?`,
                name: `problemsparentschild`
            },
            {
                label: `2.7. Какие формы лечения применялись у ребенка до сих пор?`,
                name: `formstreatmentusedfar`
            },
            {
                label: `2.8. Есть ли у ребенка проблемы с питанием?`,
                name: `childfeedingproblems`,
                yesno: true
            },
            {
                label: `2.9. Есть ли у ребенка проблемы со сном?`,
                name: `childsleepingproblems`,
                yesno: true
            },
            {
                label: `2.10. Как ребенок справляется с процедурами ухода?`,
                name: `childcopeprocedures`,
            },
            {
                label: `2.11. Какие моторные навыки в настоящее время преобладают в спонтанной активности?`,
                name: `motorskilldominate`,
            },
            {
                label: `2.12. Как продвинулось моторное развитие ребенка?`,
                name: `motordevelopmentprogressed`,
            },
            {
                label: `2.13. Есть ли в семье какие-либо генетические, метаболические или неврологические заболевания?`,
                name: `neurologicaldiseasesfamily`,
            },
            {
                label: `Замечания`,
                name: `notes`,
            },
        ]
    }
]

const Textarea = forwardRef(function ({ onChange, value, name, yesno = false, className = '', type = 'textarea', label = ``, ...props }, ref) {
    const input = ref ? ref : useRef();

    const [checked, setChecked] = useState(!!value)

    return <>

        {label ? <div className="flex items-center gap-4 mb-2">
            <span>{label}</span>
            {yesno ? <>
                <label htmlFor={`yes-${name}`} className="flex items-center gap-4">
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
                <label htmlFor={`no-${name}`} className="flex items-center gap-4">
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

        <div className="font-medium mb-4">I. Интервью - младшие дети</div>
        {fields.map((cat, cdx) => <div key={cdx} className="mb-4">
            <div className="mb-2">{cat.label}</div>
            {cat.fields.map((item, index) => <Textarea
                {...item}
                onChange={e => setData(prev => {
                    const data = { ...prev }
                    data.kinesio.interview[item.name] = e.target.value
                    return data
                })} value={data.kinesio.interview[item.name]} key={index} />)}
        </div>)}
    </div>
}
