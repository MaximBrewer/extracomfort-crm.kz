import { useLayout } from "@/Contexts/LayoutContext";
import { useForm } from "@inertiajs/react";
import InputError from "../InputError"
import InputLabel from "../InputLabel";
import PrimaryButton from "../PrimaryButton";
import TextInput from "../TextInput"

export default (props) => {

    const { locality = null } = props

    const { setModal } = useLayout()

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        id: locality ? locality.id : null,
        sort: locality ? locality.sort : 100,
        title: locality ? locality.title : ``
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        if (locality && locality.id)
            patch(route('admin.localities.update', {
                locality: locality.id
            }), {
                onSuccess: () => {
                    setModal(null)
                }
            });
        else
            post(route('admin.localities.store'), {
                onSuccess: () => {
                    setModal(null)
                }
            });
    }

    return <div>
        <h2 className={`font-bold text-xl text-center mb-4`}>Населенный пункт</h2>
        <form onSubmit={submit} className={`min-w-[24rem]`}>
            <div className="mb-4">
                <InputLabel htmlFor="sort" value="Порядок" color={`text-gray-200`} weight={`normal`} />
                <TextInput
                    id="sort"
                    type="number"
                    name="sort"
                    bg="bg-gray-50"
                    value={data.sort}
                    className="mt-1 block w-full text-xl"
                    onChange={handleOnChange}
                />
                <InputError message={errors.sort} className="mt-2" />
            </div>


            <div className="mb-4">
                <InputLabel htmlFor="title" value="Наименование" color={`text-gray-200`} weight={`normal`} />

                <TextInput
                    id="title"
                    type="text"
                    name="title"
                    bg="bg-gray-50"
                    value={data.title}
                    className="mt-1 block w-full text-xl"
                    onChange={handleOnChange}
                />

                <InputError message={errors.title} className="mt-2" />
            </div>
            <PrimaryButton className={`w-full my-4 justify-center text-lg font-semibold`}>Отправить</PrimaryButton>
            <div className={`text-center`}>
                <a href="#" className={`text-red-500 underline hover:no-underline`} onClick={e => {
                    e.preventDefault();
                    setModal(null)
                }}>Отменить</a>
            </div>
        </form>
    </div>
}