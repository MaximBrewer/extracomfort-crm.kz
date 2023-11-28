import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


export default (props) => {

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            heading={false}
        >
        </AuthenticatedLayout >
    );
}
