import Accountant from '@/Components/Forms/Accountant';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default (props) => {

    const { pagetitle } = props

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            heading={<h1 className="font-semibold text-3xl text-gray-800 leading-tight">{pagetitle}</h1>}
        >
            <div className="pb-12 pt-5">
                <Accountant {...props} />
            </div>
        </AuthenticatedLayout>
    );
}
