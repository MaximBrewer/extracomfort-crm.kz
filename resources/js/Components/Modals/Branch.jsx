import { useLayout } from "@/Contexts/LayoutContext";
import { useForm } from "@inertiajs/react";
import InputError from "../InputError"
import InputLabel from "../InputLabel";
import PrimaryButton from "../PrimaryButton";
import TextInput from "../TextInput"

export default (props) => {

    const { branch = null, localities } = props

    const { setModal } = useLayout()

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        id: branch ? branch.id : null,
        sort: branch ? branch.sort : 100,
        title: branch ? branch.title : ``,
        locality_id: branch && branch.locality_id ? branch.locality_id : localities.data[0].id,
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        if (branch && branch.id)
            patch(route('admin.branches.update', {
                branch: branch.id
            }), {
                onSuccess: () => {
                    setModal(null)
                }
            });
        else
            post(route('admin.branches.store'), {
                onSuccess: () => {
                    setModal(null)
                }
            });
    }

    return <div>
        <h2 className={`font-bold text-xl text-center mb-4`}>Филиал</h2>
        <form onSubmit={submit} className={`min-w-[24rem]`}>


            <div className="mb-4">
                <InputLabel htmlFor="locality_id" value="Населенный пункт" color={`text-gray-200`} weight={`normal`} />
                <select value={data.locality_id} onChange={e => setData('locality_id', e.target.value)} className={`w-full rounded bg-white border border-gray-900 border-opacity-[.12] ring-0 mt-1 block w-full`}>
                    {localities.data.map((locality, ldx) => <option value={locality.id} key={ldx}>{locality.title}</option>)}
                </select>
                <InputError message={errors.locality_id} className="mt-2" />
            </div>

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