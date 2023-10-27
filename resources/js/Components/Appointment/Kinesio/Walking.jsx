import Person2 from "@/../img/card/kinesio/i3.png"
import Person1 from "@/../img/card/kinesio/i4.png"

const Checkbox = (props) => {

    const { data = {}, setData = () => { }, name = false, defaultChecked = false, disabled = false, onChange = () => { } } = props

    return <label className={props.className}>
        <input
            type="checkbox"
            className="hidden peer"
            name={name}
            disabled={disabled}
            onChange={e => name ? setData(prev => {
                const data = { ...prev }
                const kinesio = data.kinesio
                if (!kinesio.walking) kinesio.walking = {}
                kinesio.walking[name] = e.target.checked
                return data
            }) : void (0)}
            defaultChecked={name ? (data.kinesio.walking && data.kinesio.walking[name]) : defaultChecked}
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
            <circle cx="25" cy="25" r="24.5" transform="matrix(-1 0 0 1 50 0)" fill="#D9D9D9" stroke="black" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" className="absolute top-0 left-0 hidden peer-checked:block text-violet-500" viewBox="0 0 50 50" fill="none">
            <circle cx="25" cy="25" r="25" fill="currentColor" />
            <path d="M22.0014 26.9983L34.001 15L38 18.9994L22.0014 35L11 23.9973L15.0018 19.9979L22.0014 26.9983Z" fill="white" />
        </svg>
    </label>
}

export default (props) => {

    const { data, setData, errors } = props;

    return <div className={`bg-blue-80 rounded-lg p-5 mb-8`}>
        <div className="font-medium mb-6">XI. Ходьба</div>
        <div className="flex gap-4 items-center -mb-6">
            <div>Следует отметить особенности походки</div>
            <Checkbox
                className={`relative`}
                defaultChecked={true}
                disabled={true}
            />
        </div>
        <div className="flex justify-end mb-12">
            <div className="flex relative px-12 leading-tight">
                <div className="relative w-[289px] h-[481px] relative bg-contain bg-center bg-no-repeat mb-4" style={{ backgroundImage: `url('${Person1}')` }}>
                    <Checkbox
                        className="absolute top-[310px] left-2"
                        data={data}
                        setData={setData}
                        name={`lsrknee`}
                    />
                    <Checkbox
                        className="absolute top-[364px] -left-2.5"
                        data={data}
                        setData={setData}
                        name={`lsp`}
                    />
                    <Checkbox
                        className="absolute top-[276px] right-5"
                        data={data}
                        setData={setData}
                        name={`lsgnee`}
                    />
                    <Checkbox
                        className="absolute top-[336px] right-7"
                        data={data}
                        setData={setData}
                        name={`lvnnee`}
                    />
                    <Checkbox
                        className="absolute top-[404px] right-3"
                        data={data}
                        setData={setData}
                        name={`lnp`}
                    />
                    <Checkbox
                        className="absolute top-[460px] right-3"
                        data={data}
                        setData={setData}
                        name={`lcs`}
                    />
                    <div className="absolute top-[268px] -left-3">сгиб./разгиб.<br />колена</div>
                    <div className="absolute top-[428px] -left-3">стопа падает</div>
                </div>
                <div className="flex flex-col justify-end items-center gap-3 translate-y-3">
                    <div className="text-center min-h-[3rem] flex items-center">
                        сгиб./гиперэкст.<br />
                        колена
                    </div>
                    <div className="text-center min-h-[3rem] flex items-center">в.poт./ н.poт. <br />колена</div>
                    <div className="text-center min-h-[3rem] flex items-center">на пальцах</div>
                    <div className="text-center min-h-[3rem] flex items-center">целая стопа</div>
                </div>
                <div className="w-[289px] h-[481px] relative bg-contain bg-center bg-no-repeat mb-4" style={{ backgroundImage: `url('${Person2}')` }}>
                    <Checkbox
                        className="absolute top-[310px] right-2"
                        data={data}
                        setData={setData}
                        name={`rsrknee`}
                    />
                    <Checkbox
                        className="absolute top-[364px] -right-2.5"
                        data={data}
                        setData={setData}
                        name={`rsp`}
                    />
                    <Checkbox
                        className="absolute top-[276px] left-5"
                        data={data}
                        setData={setData}
                        name={`rsgnee`}
                    />
                    <Checkbox
                        className="absolute top-[336px] left-7"
                        data={data}
                        setData={setData}
                        name={`rvnnee`}
                    />
                    <Checkbox
                        className="absolute top-[404px] left-3"
                        data={data}
                        setData={setData}
                        name={`rnp`}
                    />
                    <Checkbox
                        className="absolute top-[460px] left-3"
                        data={data}
                        setData={setData}
                        name={`rcs`}
                    />
                    <div className="absolute top-[268px] -right-3">сгиб./разгиб.<br />колена</div>
                    <div className="absolute top-[428px] -right-3">стопа падает</div>
                </div>
            </div>
        </div>
        <div className="flex gap-12">
            <div className="w-2/5">
                <div className="font-medium mb-4">Дополнительные черты:</div>
                <table className="table-auto w-full">
                    <tbody>
                        <tr>
                            <td className="pr-2 py-1">Чрезмерные движения тул. и верхних кон.</td>
                            <td className="py-1">
                                <div className="flex items-center gap-2 justify-end">
                                    <span>&nbsp;</span>
                                    <Checkbox
                                        className={`relative`}
                                        data={data}
                                        setData={setData}
                                        name={`chdtvk`}
                                    />
                                </div>
                            </td>
                            <td className="py-1">
                            </td>
                        </tr>
                        <tr>
                            <td className="pr-2 py-1">Опускание таза</td>
                            <td className="py-1">
                                <div className="flex items-center gap-2 justify-end">
                                    <span>П</span>
                                    <Checkbox
                                        className={`relative`}
                                        data={data}
                                        setData={setData}
                                        name={`otp`}
                                    />
                                </div>
                            </td>
                            <td className="py-1">
                                <div className="flex items-center gap-2 justify-end">
                                    <span>Л</span>
                                    <Checkbox
                                        className={`relative`}
                                        data={data}
                                        setData={setData}
                                        name={`otl`} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="pr-2 py-1">Опорная плоскость</td>
                            <td className="py-1">
                                <div className="flex items-center gap-2 justify-end">
                                    <span>широкая</span>
                                    <Checkbox
                                        className={`relative`}
                                        data={data}
                                        setData={setData}
                                        name={`opw`}
                                    />
                                </div>
                            </td>
                            <td className="py-1">
                                <div className="flex items-center gap-2 justify-end">
                                    <span>узкая</span>
                                    <Checkbox
                                        className={`relative`}
                                        data={data}
                                        setData={setData}
                                        name={`opt`}
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="w-3/5">
                <div className="font-medium mb-4">Замечания</div>
                <textarea
                    className="min-h-[10rem] bg-white rounded-md w-full"
                    placeholder="Введите текст"
                    onChange={e => setData(prev => {
                        const data = { ...prev }
                        const kinesio = data.kinesio
                        if (!kinesio.walking) kinesio.walking = {}
                        kinesio.walking.txt = e.target.value
                        return data
                    })}
                    value={data.kinesio.walking && data.kinesio.walking.txt ? data.kinesio.walking.txt : ``}
                />
            </div>
        </div>
    </div>
}