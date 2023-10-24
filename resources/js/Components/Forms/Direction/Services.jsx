import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

export default (props) => {

    const { data, setData } = props;

    const handleOnChange = (event, index, type) => {
        setData(prev => {
            let services = prev.services.slice()
            services[index][type] = event.target.value
            return {
                ...prev,
                services: services
            }
        })
    };

    return <>
        <InputLabel htmlFor="title" value="Услуги" color={`text-gray-200 mb-2`} weight={`normal`} />
        {data.services.map((item, index) => <div key={index} className={`border p-2 rounded-xl border-gray-900 border-opacity-[.12] bg-white mb-2 `}>
            <TextInput
                type="number"
                bg="bg-white"
                border="border border-gray-900 border-opacity-[.12]"
                className="mt-1 block w-full"
                value={item.sort}
                onChange={e => handleOnChange(e, index, 'sort')}
            />
            <TextInput
                type="text"
                bg="bg-white"
                border="border border-gray-900 border-opacity-[.12]"
                className="mt-1 block w-full"
                value={item.title}
                onChange={e => handleOnChange(e, index, 'title')}
            />
            <div className={`flex justify-end`}>
                <a href={`#`} onClick={e => {
                    e.preventDefault();
                    setData(prev => {
                        prev.services.splice(index, 1)
                        return {
                            ...prev
                        }
                    })
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>
                </a>
            </div>
        </div>)}
        <a href={`#`} onClick={e => {
            e.preventDefault();
            setData(prev => {
                let services = prev.services.slice()
                services.push({
                    title: ``,
                    sort: (services.length + 1) * 100
                })
                return {
                    ...prev,
                    services: services
                }
            })
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </a>
    </>
}