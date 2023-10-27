
import PrimaryButton from "../PrimaryButton";
import PatternsAssessing from "./Kinesio/PatternsAssessing";
import InterviewTeen from "./Kinesio/InterviewTeen";
import InterviewYoung from "./Kinesio/InterviewYoung";
import Observation from "./Kinesio/Observation";
import SensivityAssessing from "./Kinesio/SensivityAssessing";
import Mobility from "./Kinesio/Mobility";
import Gmfcs from "./Kinesio/Gmfcs";
import Tonus from "./Kinesio/Tonus";
import StaticPelvis from "./Kinesio/StaticPelvis";
import Local from "./Kinesio/Local";
import Global from "./Kinesio/Global";
import Walking from "./Kinesio/Walking";
import Doptest from "./Kinesio/Doptest";
import Forecast from "./Kinesio/Forecast";
import Oda from "./Oda";

const types = [
    {
        value: `adult`,
        label: `Взрослые`,
    },
    {
        value: `teen`,
        label: `Cтаршие дети`,
    },
    {
        value: `young`,
        label: `Младшие дети`,
    },
]


export default (props) => {

    const { data, setData, errors, nextTab } = props;

    return <>
        <div className={`p-5`}>
            <div className="flex gap-8">
                {types.map((type, tdx) => <label key={tdx} className="flex items-center gap-2">
                    <input type="radio"
                        className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 '}
                        name={`type`}
                        value={type.value}
                        defaultChecked={data.kinesio.type == type.value}
                        onChange={e => e.target.checked && setData(prev => {
                            const data = { ...prev }
                            data.kinesio.type = type.value
                            return data
                        })}
                    />
                    <div className="col-span-3">{type.label}</div>
                </label>)}
            </div>
        </div>
        {data.kinesio.type && data.kinesio.type === `young` ? <>
            <InterviewYoung {...props} />

            <Observation {...props} />
            <PatternsAssessing {...props} />
            <SensivityAssessing {...props} />
            <Mobility {...props} />
            <Gmfcs {...props} />
            <Tonus {...props} />
            <StaticPelvis {...props} />

            <Local {...props} />
            <Global {...props} />
            <Walking {...props} />
            <Doptest {...props} />
            <Forecast {...props} />
        </> : <></>}

        {data.kinesio.type && data.kinesio.type === `teen` ? <>
            <InterviewTeen {...props} />

            <Observation {...props} />
            <PatternsAssessing {...props} />
            <SensivityAssessing {...props} />
            <Mobility {...props} />
            <Gmfcs {...props} />
            <Tonus {...props} />
            <StaticPelvis {...props} />

            <Local {...props} />
            <Global {...props} />
            <Walking {...props} />
            <Doptest {...props} />
            <Forecast {...props} />
        </> : <></>}

        {data.kinesio.type && data.kinesio.type === `adult` ? <>
            <Oda {...props} />
        </> : <></>}


        <div className={`flex justify-end py-8`}>
            <PrimaryButton size="sm" onClick={() => nextTab()}>Далее</PrimaryButton>
        </div>
    </>
}
