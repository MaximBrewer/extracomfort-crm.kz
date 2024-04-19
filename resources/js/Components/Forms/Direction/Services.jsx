import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

export default (props) => {

    const { data, setData, index } = props;

    const handleOnChange = (event, idx, type) => {
        setData(prev => {
            let categories = prev.categories.slice();
            let services = categories[index].services
            services[idx][type] = event.target.value
            return {
                ...prev,
                categories: categories
            }
        })
    };

    return <>
        <InputLabel htmlFor="title" value="Услуги" color={`text-gray-200 mb-2`} weight={`normal`} />
        {data.categories[index].services.map((item, gdx) => <div key={gdx} className={`mb-2`}>
            <div className="flex items-center gap-4">
                <TextInput
                    type="number"
                    bg="bg-white"
                    placeholder="Порядок"
                    border="border border-gray-900 border-opacity-[.12]"
                    className="mt-1 block w-full max-w-[5rem]"
                    value={item.sort}
                    onChange={e => handleOnChange(e, gdx, 'sort')}
                />
                <div className="flex items-center gap-4 grow">
                    <TextInput
                        type="text"
                        wrapClass="flex flex-col items-start grow"
                        bg="bg-white"
                        placeholder="Наименование"
                        border="border border-gray-900 border-opacity-[.12]"
                        className="mt-1 block w-full"
                        value={item.title}
                        onChange={e => handleOnChange(e, gdx, 'title')}
                    />
                    <TextInput
                        type="number"
                        wrapClass="flex flex-col items-start w-full max-w-[10rem]"
                        bg="bg-white"
                        placeholder="Цена"
                        border="border border-gray-900 border-opacity-[.12]"
                        className="mt-1 block w-full"
                        value={item.price}
                        onChange={e => handleOnChange(e, gdx, 'price')}
                    />
                </div>
                <div className={`flex justify-end shrink-0`}>
                    <a href={`#`} onClick={e => {
                        e.preventDefault();
                        setData(prev => {
                            prev.categories[index].services.splice(index, 1)
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
        </div>)}
        <a href={`#`} onClick={e => {
            e.preventDefault();
            setData(prev => {
                let categories = prev.categories.slice();
                let services = categories[index].services
                services.push({
                    title: ``,
                    sort: (services.length + 1) * 100
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