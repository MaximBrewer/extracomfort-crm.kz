import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import moment from 'moment';
import ru from "./moment.ru"
import Task from "@/Components/Modals/TaskForm";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from 'react-tooltip'

moment.locale('ru', ru);

const TasksContext = React.createContext();

TasksContext.propTypes = {
    children: PropTypes.element.isRequired
};

const TasksProvider = (props) => {

    const intervalRef = useRef(null);

    const { children, executors, auth } = props

    const [modal, setModal] = useState(null)

    const [lists, setLists] = useState(props.lists);

    const { data, setData, delete: destroy } = useForm();

    const addTask = () => {
        setModal(<Task task={null} executors={executors} auth={auth} />)
    }

    const editTask = (task) => {
        setModal(<Task task={task} executors={executors} auth={auth} />)
    }

    const dropTask = (id) => {
        destroy(route(`${auth.user.role.name}.tasks.destroy`, {
            task: id
        }), {
            onSuccess: ({ props }) => {
                props && props.lists && setLists(props.lists)
                setModal(null)
            }
        });
    }

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            router.reload({ only: ['lists'] }, {
                onSuccess: (props) => {
                    setLists(props.lists)
                }
            })
        }, 15000)
        return () => {
            clearInterval(intervalRef.current)
        }
    }, [])

    useEffect(() => {
        setLists(props.lists)
    }, [props.lists])

    return <TasksContext.Provider
        value={{
            auth,
            addTask,
            editTask,
            dropTask,
            lists,
            setModal,
            setLists,
            executors
        }}
    >
        <div className={`h-full overflow-y-auto`}>
            {children}
        </div>
        {

            modal ? <div className={`flex flex-col items-center fixed overflow-y-auto top-0 left-0 w-full h-full bg-black bg-opacity-50 z-100 py-6`} onClick={() => setModal(null)} >
                <div className={`mx-2 relative mx-auto py-8 px-8 bg-white rounded-2xl flex flex-col`} onClick={(e) => {
                    document.dispatchEvent(new Event('clickinmodal'))
                    e.stopPropagation()
                }}>
                    <div>
                        {modal}
                        <Tooltip id="modaltooltip" />
                    </div>
                </div>
            </div> : ``
        }
        <Tooltip id="tooltip" />
    </TasksContext.Provider>
}

const useTasks = () => {
    const context = React.useContext(TasksContext);

    if (context === undefined) {
        throw new Error(`useTasks must be used within a TasksProvider`);
    }

    return context;
}

export { TasksProvider, useTasks };
