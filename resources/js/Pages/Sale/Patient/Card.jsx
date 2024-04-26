
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Patient from '@/Components/Cards/Patient';


export default (props) => {

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
        >
            <Patient />
        </AuthenticatedLayout>
    );
}
