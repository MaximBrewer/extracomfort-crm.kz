import Sale from '@/Components/Forms/Sale';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';


export default (props) => {

    const { pagetitle } = props

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            heading={<h1 className="font-semibold text-3xl text-gray-800 leading-tight">{pagetitle}</h1>}
        >
            <div className="pb-12 pt-5">
                <Sale {...props} />
            </div>
        </AuthenticatedLayout>
    );
}
