export default (props) => {

    const { data, setData, errors } = props;

    return <div className={`bg-blue-80 rounded-lg p-5 mb-8`}>
        <div className="font-medium mb-6">XIII. Прогноз</div>
        <textarea
            className="min-h-[30rem] bg-white rounded-md w-full"
            placeholder="Введите текст"
            onChange={e => setData(prev => {
                const data = { ...prev }
                const kinesio = data.kinesio
                kinesio.forecast = e.target.value
                return data
            })}
            value={data.kinesio.forecast ?? ``}
        />
    </div>
}