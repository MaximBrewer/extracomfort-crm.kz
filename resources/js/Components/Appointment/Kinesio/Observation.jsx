import { Fragment } from "react";
import { useState } from "react";
import { useRef } from "react";
import { forwardRef } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import { useEffect } from "react";
import moment from "moment";

setDefaultLocale(ru);
registerLocale('ru', ru);

const fields = [
    `Пропорции тела`,
    `Внутриматочныe факторы`,
    `Черепная форма`,
    `Морфология лица`,
    `Форма живота`,
    `Цвет кожи`,
    `Отслеживание глазами`,
    `Особенности недоношенного ребенка`,
    `Эмоциональное развитие`,
    `Связь с близкими`,
    `Интерес к внешней среде`,
    `Активность орофациальной зоны (язык, тики, гримасы, странные звуки, питание)`,
    `Развитие речи`,
    `Поведение во время обследования`,
]


const Th = ({ children, className, ...props }) => {
    return <th className={`border border-black font-medium px-2 py-1 ${className}`} {...props}> {children}</th>
}

const Td = ({ children, className, ...props }) => {
    return <td className={`border border-black px-2 py-1 ${className}`} {...props}> {children}</td>
}


const CustomInput = forwardRef((props, ref) => {
    return <input {...props} ref={ref} className="text-sm bg-transparent border-0 py-1 px-0 text-center w-full" />;
});

export default (props) => {

    const { data, setData, errors } = props;

    const [startDate1, setStartDate1] = useState(!!data.kinesio.observation.date1 ? new Date(data.kinesio.observation.date1) : null);
    const [startDate2, setStartDate2] = useState(!!data.kinesio.observation.date2 ? new Date(data.kinesio.observation.date2) : null);
    const [startDate3, setStartDate3] = useState(!!data.kinesio.observation.date3 ? new Date(data.kinesio.observation.date3) : null);

    useEffect(() => {
        setData(prev => {
            const data = { ...prev }
            data.kinesio.observation.date1 = startDate1 ? moment(startDate1).format('YYYY-MM-DD 00:00:00') : null
            data.kinesio.observation.date2 = startDate2 ? moment(startDate2).format('YYYY-MM-DD 00:00:00') : null
            data.kinesio.observation.date3 = startDate3 ? moment(startDate3).format('YYYY-MM-DD 00:00:00') : null
            return data
        })
    }, [startDate1, startDate2, startDate3])

    const count = (index) => {
        let cnt = [``, ``, ``, ``, ``, ``]
        if (data.kinesio.observation.table) {
            for (let tr of data.kinesio.observation.table) {
                for (let tdIndex in tr) {
                    if (tr[tdIndex]) cnt[tdIndex] = 1 * cnt[tdIndex] + 1
                }
            }
        }
        return cnt[index]
    }

    return <div className={`bg-blue-80 rounded-lg p-5 mb-8`}>

        <div className="font-medium mb-4">II. Наблюдение (соматические и поведенческие параметры)</div>
        <table className="w-full table-auto mb-12 text-sm">
            <thead>
                <tr>
                    <th>

                    </th>
                    <Th colSpan={2} className={`font-normal`}>
                        <DatePicker
                            customInput={<CustomInput />}
                            selected={startDate1}
                            placeholderText="__.__.____"
                            dateFormat={`dd.MM.yyyy`}
                            onChange={(date) => setStartDate1(date)}
                        />
                    </Th>
                    <Th colSpan={2} className={`font-normal`}>
                        <DatePicker
                            customInput={<CustomInput />}
                            selected={startDate2}
                            placeholderText="__.__.____"
                            dateFormat={`dd.MM.yyyy`}
                            onChange={(date) => setStartDate2(date)}
                        />
                    </Th>
                    <Th colSpan={2} className={`font-normal`}>
                        <DatePicker
                            customInput={<CustomInput />}
                            selected={startDate3}
                            placeholderText="__.__.____"
                            dateFormat={`dd.MM.yyyy`}
                            onChange={(date) => setStartDate3(date)}
                        />
                    </Th>
                </tr>
                <tr>
                    <th>

                    </th>
                    <Th className={`w-20 font-normal`}>Хорошо</Th>
                    <Th className={`w-20 font-normal`}>Плохо</Th>
                    <Th className={`w-20 font-normal`}>Хорошо</Th>
                    <Th className={`w-20 font-normal`}>Плохо</Th>
                    <Th className={`w-20 font-normal`}>Хорошо</Th>
                    <Th className={`w-20 font-normal`}>Плохо</Th>
                </tr>
            </thead>
            <tbody>
                {fields.map((label, index) => <tr key={index}>
                    <Td>{label}</Td>
                    {[0, 1, 2, 3, 4, 5].map(item => <Td key={item} className={`pt-0 pb-0 pl-0 pr-0`}>
                        <label className="w-full flex items-center justify-center">
                            <input
                                type="radio"
                                name={`observation-table-${index}-${item < 2 ? 0 : (item < 4 ? 1 : 2)}`}
                                className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 '}
                                defaultChecked={
                                    data.kinesio.observation.table
                                        && data.kinesio.observation.table[index]
                                        ? !!data.kinesio.observation.table[index][item]
                                        : false
                                }
                                onChange={e => setData(prev => {
                                    const data = { ...prev }
                                    let kinesio = data.kinesio
                                    if (!kinesio.observation.table) kinesio.observation.table = fields.map(() => [false, false, false, false, false, false])
                                    kinesio.observation.table[index][item] = e.target.checked
                                    if (item % 2) kinesio.observation.table[index][item - 1] = !e.target.checked
                                    else kinesio.observation.table[index][item + 1] = !e.target.checked
                                    data.kinesio = kinesio
                                    return data
                                })}
                            />
                        </label>
                    </Td>)}
                </tr>)}
            </tbody>
            <tfoot>
                <tr className="text-center font-medium">
                    <Th className={`text-right border-b-0 border-l-0`}>Сумма</Th>
                    <Td className={`border-b-0`}>{count(0)}</Td>
                    <Td className={`border-b-0`}>{count(1)}</Td>
                    <Td className={`border-b-0`}>{count(2)}</Td>
                    <Td className={`border-b-0`}>{count(3)}</Td>
                    <Td className={`border-b-0`}>{count(4)}</Td>
                    <Td className={`border-b-0`}>{count(5)}</Td>
                </tr>
            </tfoot>
        </table>

        <div className="mb-8">
            <div className="text-sm font-medium mb-2">Замечания</div>
            <textarea
                placeholder="Введите текст"
                value={data.kinesio.observationtext ?? ``}
                onChange={e => setData(prev => {
                    const data = { ...prev }
                    data.kinesio.observationtext = e.target.value
                    return data
                })}
                className="w-full border-0 rounded grow text-xs h-24"
            />
        </div>
    </div>
}
