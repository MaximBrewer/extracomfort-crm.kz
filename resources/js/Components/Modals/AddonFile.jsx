import { useLayout } from "@/Contexts/LayoutContext";
import { useForm } from "@inertiajs/react";
import InputError from "../InputError"
import InputLabel from "../InputLabel";
import PrimaryButton from "../PrimaryButton";
import Select from "react-select"
import TextInput from "../TextInput";
import { useEffect, useState } from "react";
import { router } from '@inertiajs/react'

const customStyles = {
    control: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return ({
            ...styles,
            minHeight: `2.625rem`,
            borderRadius: `.25rem`,
            outline: `none`,
            borderColor: `transparent`,
            boxShadow: `none`,
            backgroundColor: `#F4F4F4`
        })
    },
    indicatorSeparator: (styles, { data, isDisabled, isFocused, isSelected }) => ({ ...styles, backgroundColor: `transparent` }),
};

const categories = [
    {
        value: 0,
        label: `Рентгенография`
    },
    {
        value: 1,
        label: `УЗИ`
    },
    {
        value: 2,
        label: `Оптическая топография`
    },
    {
        value: 3,
        label: `МРТ`
    },
    {
        value: 4,
        label: `Другие исследования`
    },
    {
        value: 5,
        label: `Консультация узких специалистов`
    }
]

export default (props) => {

    const { appointment } = props

    const { setModal } = useLayout()

    const { data, setData, setError, get, post, patch, processing, errors, reset, transform } = useForm({
        category_id: categories[0],
        filename: ``,
        file: null
    });

    transform((data) => ({
        ...data,
        category_id: data.category_id.value,
    }))

    const submit = (e) => {
        e.preventDefault();
        if (!data.file) return setError('file', "Выберите файл")
        if (!data.filename) return setError('filename', "Введите название файла")

        setModal(null)
        post(route(`specialist.appointment.file`, {
            book: appointment.data.book_id
        }), {
            preserveScroll: true,
            preserveState: true
        });
    }

    return <form onSubmit={submit} className={`min-w-[20rem]`} encType="multipart/formdata">
        <h2 className={`font-bold text-xl text-center mb-4`}>Добавить файл</h2>
        <div className="mb-4">
            <InputLabel htmlFor="category_id" value="Категория" color={`text-gray-200`} weight={`normal`} />
            <Select
                styles={customStyles}
                value={data.category_id}
                isSearchable={false}
                isClearable={false}
                name="category_id"
                options={categories}
                placeholder={``}
                onChange={(value) => setData(`category_id`, value)}
            />
            <InputError message={errors.category_id} className="mt-2" />
        </div>
        <div className="mb-4">
            <InputLabel htmlFor="filename" value="Название" color={`text-gray-200`} weight={`normal`} />
            <input
                type="text"
                name="filename"
                className="bg-zinc-100 rounded-lg border-zinc-100 w-full"
                placeholder={``}
                onChange={(e) => setData(`filename`, e.target.value)}
            />
            <InputError message={errors.filename} className="mt-2" />
        </div>
        <div className="mb-4">
            <InputLabel htmlFor="file" value="Файл" color={`text-gray-200`} weight={`normal`} />
            <input
                type="file"
                name="file"
                onChange={(e) => setData(`file`, e.target.files.length ? e.target.files[0] : null)}
            />
            <InputError message={errors.file} className="mt-2" />
        </div>
        <div className={`flex flex-col space-y-3 mt-5`}>
            <PrimaryButton type={`submit`} className={`justify-center`}>Добавить</PrimaryButton>
            <div className={`text-center`}>
                <a href={`#`}
                    className={`text-red-500 underline hover:underline-none`}
                    onClick={e => {
                        e.preventDefault();
                        setModal(null)
                    }}>Отменить</a>
            </div>
        </div>
    </form>
}