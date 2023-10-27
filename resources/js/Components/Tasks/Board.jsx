import React, { useEffect, useState } from 'react';

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import CardsContainer from './Cards/CardsContainer';
import CustomDragLayer from './CustomDragLayer';
import { useTasks } from '@/Contexts/TasksContext';
import { useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

export default (props) => {

    const { lists, auth } = useTasks();

    const [isDragging, setIsDragging] = useState(false);
    const [currentItem, setCurrentItem] = useState(false);
    const [initialOffset, setInitialOffset] = useState(false);
    const [currentOffset, setCurrentOffset] = useState(false);

    const { setLists, setModal } = useTasks();

    const { data, setData, patch } = useForm({
        _method: 'patch',
        'item': null,
        'status_id': null
    });

    const moveCard = (item, status_id) => {
        setData({
            item: item,
            status_id: status_id
        })
    }

    useEffect(() => {
        if (data.item && data.status_id) {
            setLists(prev => {
                const newLists = [...prev];
                newLists.forEach(el => {
                    let taskIndex = el.tasks.data.findIndex(el => el.id === data.item.id);
                    taskIndex > -1 && el.tasks.data.splice(taskIndex, 1)
                })
                newLists.find(el => el.status_id === data.status_id).tasks.data.push(data.item)
                return newLists;
            })
            patch(route(`${auth.user.role.name}.tasks.status`, {
                task: data.item.id
            }), {
                onSuccess: ({ props }) => {
                    props && props.lists && setLists(props.lists)
                }
            })
        }
    }, [data])

    return (
        <div className="flex gap-6 h-full">
            <CustomDragLayer
                snapToGrid={false}
                isDragging={isDragging}
                item={currentItem}
                initialOffset={initialOffset}
                currentOffset={currentOffset}
            />
            <DndProvider backend={HTML5Backend}>
                {lists.map(item =>
                    <CardsContainer
                        key={`tasks${item.status_id}`}
                        id={item.status_id}
                        item={item}
                        setCurrentItem={setCurrentItem}
                        setIsDragging={setIsDragging}
                        setInitialOffset={setInitialOffset}
                        setCurrentOffset={setCurrentOffset}
                        isDragging={isDragging}
                        moveCard={moveCard}
                        status_id={item.status_id}
                    />
                )}
            </DndProvider>
        </div>
    );
}
