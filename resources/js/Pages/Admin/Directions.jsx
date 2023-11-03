import Pencil from '@/Components/Pencil';
import PrimaryButton from '@/Components/PrimaryButton';
import Plus from '@/Components/Plus';
import DirectionModal from '@/Components/Modals/Direction';
import InfoModal from '@/Components/Modals/Info';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useLayout } from '@/Contexts/LayoutContext';
import Trash from '@/Components/Trash';
import { useEffect } from 'react';
import Services from '@/Icons/Services';


export default (props) => {

    const { pagetitle, directions, errors = {} } = props

    const { setModal } = useLayout();

    const { data, post } = useForm({
        _method: `delete`
    });

    const destroy = (direction) => {
        post(route('admin.directions.destroy', {
            direction: direction.id
        }))
    }

    useEffect(() => {
        if (errors && errors.message) {
            setModal(<InfoModal message={errors.message} status={`error`} />)
        }
    }, [errors])

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            heading={<h1 className="font-semibold text-3xl text-gray-800 leading-tight">{pagetitle}</h1>}
        >
            <div className="pb-12 overflow-hidden flex flex-col">
                <div className={`flex`}>
                    <PrimaryButton className={`mb-4`} onClick={e => setModal(<DirectionModal />)}>
                        <span>Добавить</span>
                        <Plus className={`w-6 h-auto ml-3`} />
                    </PrimaryButton>
                </div>
                <div className={`rounded-lg shadow-block bg-white px-3 pt-5 overflow-y-auto`}>

                    {directions.map((direction, ldx) => <div key={ldx} className="flex space-x-5 items-center mb-5 p-5 rounded-lg bg-blue-50 hover:bg-white hover:shadow-block">
                        <div className="grow">
                            <div className="font-medium text-violet-500">{direction.title}</div>
                        </div>
                        <div className={`flex items-center space-x-4`}>
                            <Link href={route('admin.directions.edit', {
                                direction: direction.id
                            })} className={`text-violet-500`}>
                                <Pencil className={`w-6 h-auto`} />
                            </Link>
                            <a href="#" className={`text-red-500`} onClick={e => {
                                e.preventDefault()
                                destroy(direction)
                            }}>
                                <Trash className={`w-6 h-auto`} />
                            </a>
                        </div>
                    </div>)}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
