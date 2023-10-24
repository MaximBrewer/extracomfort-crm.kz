import { useEffect } from "react";
import InputError from "../InputError";
import InputLabel from "../InputLabel";
import PrimaryButton from "../PrimaryButton";
import TextArea from "../TextArea";

const elements = [
    {
        code: `сomplaints`,
        title: `Жалобы`,
        height: `h-12`
    },
    {
        code: `anmorbi`,
        title: `An.morbi`,
        height: `h-12`
    },
    {
        code: `anvitae`,
        title: `An.vitae`,
        height: `h-12`
    },
    {
        code: `stlocalic`,
        title: `St.localis`,
        height: `h-12`
    },
    {
        code: `traumasurgery`,
        title: `Хирургические вмешательства или травмы`,
        height: `h-12`
    },
    {
        code: `laboratorydata`,
        title: `Данные лабораторных/инструментальных методов обследования`,
        height: `h-12`
    },
    {
        code: `adddiagnosticexam`,
        title: `Дополнительное диагностическое обследование`,
        height: `h-12`
    },
    {
        code: `consultspecialists`,
        title: `Конультация специалистов`,
        height: `h-12`
    },
    {
        code: `conclusion`,
        title: `Заключение`,
        height: `h-24`
    },
    {
        code: `recommendations`,
        title: `Рекомендации`,
        height: `h-24`
    },
]

export default (props) => {

    const { data, setData, errors, nextTab  } = props;

    const handleOnChange = (event) => {
        setData(prev => {
            let data = { ...prev };
            data[event.target.name] = event.target.type === 'checkbox' ? event.target.checked : event.target.value
            return data;
        });
    };

    useEffect(() => {
        setData(prev => ({
            ...prev,
            current: `consult`
        }))
        return () => {
        }
    }, [])

    useEffect(() => {
        () => {
            formRef.current && formRef.current.submit()
        }
    }, [])

    return <>
        <div className={`bg-blue-80 rounded-lg p-5`}>
            {elements.map((el, edx) => <div key={edx} className="mb-4">
                <InputLabel htmlFor={el.code} value={el.title} color={`text-black`} weight={`font-semibold`} size={`text-sm`} />
                <TextArea
                    id={el.code}
                    type="text"
                    name={el.code}
                    placeholder=""
                    bg="bg-white"
                    border="border-0"
                    rounded="rounded-lg"
                    value={data[el.code]}
                    className={`mt-1 block w-full ${el.height}`}
                    onChange={handleOnChange}
                />
                <InputError message={errors[el.code]} className="mt-2" />
            </div>)}
        </div>
        <div className={`flex justify-end py-8`}>
            <PrimaryButton size="sm" onClick={() => nextTab()}>Далее</PrimaryButton>
        </div>
    </>
}

