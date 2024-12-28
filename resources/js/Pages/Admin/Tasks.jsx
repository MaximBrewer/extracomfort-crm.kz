import Archive from '@/Components/Archive';
import PrimaryButton from '@/Components/PrimaryButton';
import SuccessButton from '@/Components/SuccessButton';
import Board from '@/Components/Tasks/Board';
import { TasksProvider } from '@/Contexts/TasksContext';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';


export default (props) => {

    const { pagetitle, lists = [], executors = [] } = props

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
        >
            <div className="pb-12 overflow-hidden flex flex-col">
                <div className={`flex items-center justify-between`}>
                    <ul className={`flex z-1 relative`}>
                        <li className={`relative`}>
                            <span className={`block rounded-t-lg py-2.5 px-6 shadow-bb font-medium text-3xl bg-white`}>Задачи</span>
                            <div className={`absolute top-full h-2 left-0 w-full bg-white`}></div>
                        </li>
                    </ul>
                    {/* <div>
                        <SuccessButton className="pt-2 pb-2 rounded-[.5rem]">
                            <Archive className={`w-5 h-auto shrink-0 mr-2`} />
                            <span className="text-base leading-none">Архив задач</span>
                        </SuccessButton>
                    </div> */}
                </div>
                <div className={`shadow-bb rounded-lg bg-white py-5 px-4 overflow-hidden flex flex-col`}>
                    <TasksProvider lists={lists} executors={executors.data} auth={props.auth}>
                        <Board {...props} />
                    </TasksProvider>
                </div>
            </div>
        </AuthenticatedLayout >
    );
}
