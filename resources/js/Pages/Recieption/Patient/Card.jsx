
import { useLayout } from '@/Contexts/LayoutContext';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ChooseBranche from '@/Components/Modals/ChooseBranche';
import PatientCard from '@/Components/Cards/Patient';


export default (props) => {

    const { pagetitle, patient } = props

    const { setModal } = useLayout();

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            heading={
                <div className={`flex space-x-4 items-center`}>
                    <h1 className="font-semibold text-3xl text-gray-800 leading-tight">{pagetitle}</h1>
                    <a
                        href={`#`}
                        onClick={e => {
                            e.preventDefault()
                            setModal(<ChooseBranche {...props} user={patient} />)
                        }}
                        className={`text-blue-400 underline text-xl hover:no-underline`}>Записать на прием</a>
                </div>
            }
        >
            <PatientCard />
        </AuthenticatedLayout>
    );
}
