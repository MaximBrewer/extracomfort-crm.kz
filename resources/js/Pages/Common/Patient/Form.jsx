
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Form from "@/Components/Forms/Patient";

export default (props) => {

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            heading={<h1 className="font-semibold text-3xl text-gray-800 leading-tight">{props.pagetitle}</h1>}
        >
            <Form />
        </AuthenticatedLayout>
    );
}
