import { usePage } from "@inertiajs/react";
import DangerButton from "../DangerButton";

export default (props) => {
    const { data, setData, errors, nextTab } = props;

    const { disabled = false } = usePage().props

    return <>
        <div className={`bg-blue-80 rounded-lg p-5`}>
            <textarea
                disabled={disabled}
                className="w-full min-h-[40rem] border-0 rounded"
                onChange={e => setData('other', e.target.value)}
                value={data.other}
            />
        </div>
        {disabled ? <></> : <div className={`flex justify-end py-8`}>
            <DangerButton size="sm" onClick={e => nextTab()}>Завершить</DangerButton>
        </div>}
    </>
}
