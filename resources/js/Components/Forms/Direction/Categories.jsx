import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Services from "./Services";

export default (props) => {

    const { data, setData } = props;

    const handleOnChange = (event, index, type) => {
        setData(prev => {
            let categories = prev.categories.slice()
            categories[index][type] = event.target.value
            return {
                ...prev,
                categories: categories
            }
        })
    };

    return <>
        <InputLabel htmlFor="title" value="Категории" color={`text-gray-200 mb-2`} weight={`normal`} />
        {data.categories.map((item, index) => <div key={index} className={`border p-2 rounded-xl border-gray-900 border-opacity-[.12] bg-white mb-2 `}>
            <div className="flex items-center gap-4">
                <TextInput
                    type="number"
                    bg="bg-white"
                    border="border border-gray-900 border-opacity-[.12]"
                    className="mt-1 block w-full max-w-[5rem]"
                    value={item.sort}
                    onChange={e => handleOnChange(e, index, 'sort')}
                />
                <TextInput
                    type="text"
                    wrapClass="flex flex-col items-start grow"
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
                            prev.categories.splice(index, 1)
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
            </div>
            <div className="pl-3 pt-3">
                <Services setData={setData} data={data} index={index} />
            </div>
        </div>)}
        <a href={`#`} onClick={e => {
            e.preventDefault();
            setData(prev => {
                let categories = prev.categories.slice()
                categories.push({
                    title: ``,
                    sort: (categories.length + 1) * 100,
                    services: []
                })
                return {
                    ...prev,
                    categories: categories
                }
            })
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </a>
    </>
}