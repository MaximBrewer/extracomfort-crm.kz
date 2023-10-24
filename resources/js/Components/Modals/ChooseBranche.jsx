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

export default (props) => {

    const { user, localities, auth } = props

    const { setModal } = useLayout()

    const [locality, setLocality] = useState(auth.user && auth.user.locality ? localities.data.find(el => el.id === auth.user.locality.id) : localities.data[0])

    const { data, setData, setError, get, post, patch, processing, errors, reset, transform } = useForm({
        user: user.id,
        branch: null,
    });

    useEffect(() => {
        setData(prev => {
            return {
                ...prev,
                branch: locality && locality.branches.length ? (
                    auth.user && auth.user.branch
                        ? locality.branches.find(el => el.id === auth.user.branch.id)
                        : locality.branches[0]
                ) : null
            }
        })
    }, [locality, auth])

    transform((data) => ({
        user: data.user.id,
        branch: data.branch.id,
    }))

    const submit = (e) => {
        e.preventDefault();
        if (!data.branch)
            setError('branch', "Выберите филиал")
        else {
            setModal(null)
            router.visit(route(`${auth.user.role.name}.book.branch`, {
                patient: user.id,
                branch: data.branch.id
            }));
        }
    }

    return <form onSubmit={submit} className={`min-w-[20rem]`}>
        <h2 className={`font-bold text-xl text-center mb-4`}>{`Филиал`}</h2>
        <div className="mb-4">
            <InputLabel htmlFor="locality" value="Город" color={`text-gray-200`} weight={`normal`} />
            <Select
                styles={customStyles}
                defaultValue={locality}
                isSearchable={false}
                isClearable={false}
                name="locality"
                options={localities.data}
                placeholder={``}
                getOptionLabel={item => item.title}
                getOptionValue={item => item.id}
                onChange={(value) => setLocality(value)}
            // className="basic-multi-select"
            // classNamePrefix="select"
            />
            <InputError message={errors.locality} className="mt-2" />
        </div>
        {locality ? <div className="mb-4">
            <InputLabel htmlFor="branch" value="Филиал" color={`text-gray-200`} weight={`normal`} />
            <Select
                styles={customStyles}
                value={data.branch}
                isSearchable={false}
                isClearable={false}
                name="branch"
                noOptionsMessage={() => <>Нет филиалов</>}
                options={locality.branches}
                placeholder={``}
                getOptionLabel={item => item.title}
                getOptionValue={item => item.id}
                onChange={(value) => {
                    setError('branch', null)
                    setData('branch', value)
                }}
            // className="basic-multi-select"
            // classNamePrefix="select"
            />
            <InputError message={errors.branch} className="mt-2" />
        </div> : ``}
        <div className={`flex flex-col space-y-3 mt-5`}>
            <PrimaryButton type={`submit`} className={`justify-center`}>Выбрать</PrimaryButton>
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