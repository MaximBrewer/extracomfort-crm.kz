import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Patient from '@/Components/Forms/Patient';


export default (props) => {

    const { pagetitle } = props

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            heading={<h1 className="font-semibold text-3xl text-gray-800 leading-tight">{pagetitle}</h1>}
        >
            <Patient />
        </AuthenticatedLayout>
    );
}
