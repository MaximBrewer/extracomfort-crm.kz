import { useLayout } from "@/Contexts/LayoutContext";
import { Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import CancelButton from "../CancelButton";
import DangerButton from "../DangerButton";
import InputError from "../InputError"
import InputLabel from "../InputLabel";
import PrimaryButton from "../PrimaryButton";
import SuccessButton from "../SuccessButton";
import TextInput from "../TextInput"
import Select from 'react-select';
import Categories from "./Direction/Categories";


export default (props) => {

    const direction = props.direction.data

    console.log(direction)

    const { data, setData, post, patch, processing, errors, reset, transform } = useForm({
        id: direction ? direction.id : null,
        title: direction && direction.title ? direction.title : ``,
        sort: direction && direction.sort ? direction.sort : 100,
        categories: direction && direction.categories ? direction.categories : []
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        if (direction && direction.id)
            patch(route('admin.directions.update', {
                direction: direction.id
            }), {
                onSuccess: () => {

                }
            });
        else
            post(route('admin.directions.store'), {
                onSuccess: () => {

                }
            });
    }

    return <form onSubmit={submit}>
        <div className="mb-4">
            <InputLabel htmlFor="sort" value="Порядок" color={`text-gray-200`} weight={`normal`} />
            <TextInput
                id="sort"
                type="number"
                name="sort"
                bg="bg-white"
                border="border border-gray-900 border-opacity-[.12]"
                className="mt-1 block w-full"
                value={data.sort}
                onChange={handleOnChange}
            />
            <InputError message={errors.sort} className="mt-2" />
        </div>


        <div className="mb-4">
            <InputLabel htmlFor="title" value="Наименование" color={`text-gray-200`} weight={`normal`} />

            <TextInput
                id="title"
                type="text"
                bg="bg-white"
                border="border border-gray-900 border-opacity-[.12]"
                className="mt-1 block w-full"
                value={data.title}
                onChange={handleOnChange}
            />

            <InputError message={errors.title} className="mt-2" />
        </div>

        <div className="mb-4">
            <Categories setData={setData} data={data} />
        </div>

        <div className={`flex space-x-8 items-center justify-end`}>
            <Link href={route('admin.directions.index')}>
                <CancelButton className={`my-4 justify-center text-lg font-semibold`} size={`wide`}>Отменить</CancelButton>
            </Link>
            <SuccessButton type={`submit`} className={`my-4 justify-center text-lg font-semibold`} size={`wide`}>Сохранить</SuccessButton>
        </div>
    </form>
}