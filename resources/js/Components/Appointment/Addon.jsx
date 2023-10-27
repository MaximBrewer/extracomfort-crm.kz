import { Fragment } from "react";
import PrimaryButton from "../PrimaryButton";
import Select, { components } from 'react-select';
import { Link } from "@inertiajs/react";
import AddonFile from "../Modals/AddonFile";
import { useLayout } from "@/Contexts/LayoutContext";
import DeleteFile from "../Modals/DeleteFile";

const customStyles = {
    control: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return ({
            ...styles,
            borderRadius: `.25rem`,
            minHeight: `1.125rem`,
            outline: `none`,
            borderColor: `transparent`,
            boxShadow: `none`,
            flexWrap: `nowrap`
        })
    },
    placeholder: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return ({
            ...styles,
            whiteSpace: `nowrap`,
        })
    },
    singleValue: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return ({
            ...styles,
            fontWeight: 500,
        })
    },
    indicatorContainer: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return ({
            ...styles,
            padding: 2
        })
    },
    ValueContainer2: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return ({
            ...styles,
            padding: 0
        })
    },
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return ({
            ...styles,
            paddingTop: `2px`,
            paddingBottom: `2px`,
        })
    },
    indicatorSeparator: (styles, { data, isDisabled, isFocused, isSelected }) => ({
        ...styles,
        backgroundColor: `transparent`
    }),
};

const DropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <svg width="16" height="6" className="text-purple-900" viewBox="0 0 16 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.63656 5.35044L0.214103 0.86339C-0.241616 0.545002 0.0811491 0.000608444 0.725521 0.000608444L14.5935 0.000608444C15.238 0.000608444 15.5607 0.545002 15.105 0.86339L8.68252 5.35044C8.11757 5.74517 7.2015 5.74517 6.63656 5.35044Z" fill="currentColor" />
            </svg>
        </components.DropdownIndicator>
    );
};

export default (props) => {

    const { data, setData, errors, nextTab, appointment } = props;

    const { setModal } = useLayout();

    return <>
        <div className={`bg-blue-80 rounded-lg`}>
            <div className="grid grid-cols-[4fr_3fr]">
                {[
                    {
                        name: `rentgen`,
                        label: `Рентгенография`,
                        options: [
                            'шейный отдел позвоночника',
                            'грудной отдел позвоночника',
                            'грудо–поясничный отдел позвоночника',
                            'пояснично-крестцовый отдел позвоночника',
                            'крестцово-копчиковой отдел позвоночника'
                        ].map((el, edx) => ({
                            value: edx,
                            label: el
                        }))
                    },
                    {
                        name: `uzi`,
                        label: `УЗИ`,
                        options: [
                            'шейного отдела',
                            'поясничного отдела',
                            'сустава',
                            'сосудов'
                        ].map((el, edx) => ({
                            value: edx,
                            label: el
                        }))
                    },
                    {
                        name: `ot`,
                        label: `Оптическая топография`
                    },
                    {
                        name: `mrt`,
                        label: `МРТ`,
                        options: [
                            'шейный отдел позвоночника',
                            'грудной отдел позвоночника ',
                            'поясничный отдел позвоночника',
                            'пояснично-крестцовый отдел позвоночника',
                            'крестцово-копчиковый отдел позвоночника'
                        ].map((el, edx) => ({
                            value: edx,
                            label: el
                        }))
                    },
                    {
                        name: `other`,
                        label: `Другие исследования`
                    },
                    {
                        name: `kuc`,
                        label: `Консультация узких специалистов`
                    }
                ].map((item, index) => <Fragment key={index}>
                    <div className="border-b border-r border-dashed border-blue-200 p-4 pl-5">
                        <div className="flex gap-4 items-center mb-4">
                            <label className="flex gap-3 items-center grow">
                                <input
                                    type="checkbox"
                                    className={'border-gray-300 text-purple-900 shadow-sm focus:ring-purple-900 rounded-sm'}
                                    onChange={e => setData(prev => {
                                        const data = { ...prev }
                                        data.addon || (data.addon = {})
                                        data.addon[`${item.name}_check`] = e.target.checked
                                        return data
                                    })}
                                    defaultChecked={data.addon && data.addon[`${item.name}_check`]}
                                />
                                <div className="text-sm font-semibold">{item.label}</div>
                            </label>
                            {item.options ? <div className="w-2/3">
                                <Select
                                    styles={customStyles}
                                    components={{ DropdownIndicator }}
                                    options={item.options}
                                    placeholder={`Выбрать из списка`}
                                    isSearchable={false}
                                    isClearable={false}
                                    value={item.options.find(el => el.value == data.addon[`${item.name}_opt`])}
                                    onChange={value => setData(prev => {
                                        const data = { ...prev }
                                        data.addon || (data.addon = {})
                                        data.addon[`${item.name}_opt`] = value.value
                                        return data
                                    })}
                                />
                            </div> : <></>}
                        </div>
                        <div>
                            <textarea
                                className="bg-white rounded-lg border-white w-full h-[3.5rem]"
                                onChange={e => setData(prev => {
                                    const data = { ...prev }
                                    data.addon || (data.addon = {})
                                    data.addon[`${item.name}_txt`] = e.target.value
                                    return data
                                })}
                                value={data.addon ? (data.addon[`${item.name}_txt`] ?? ``) : ``}
                            />
                        </div>
                    </div>
                    <div className="border-b border-dashed border-blue-200 p-4 pr-5">
                        <ul className="grid grid-cols-5 gap-6">
                            {appointment.data.files.map((file, fdx) => <Fragment key={fdx}>
                                {file.category_id === index ? <li className="relative">
                                    <a target="_blank" href={file.link} className="flex flex-col items-start">
                                        <div className="bg-zinc-300 rounded p-2 mb-1 relative">
                                            <div
                                                onClick={e => {
                                                    e.preventDefault()
                                                    setModal(<DeleteFile file={file} url={route(`specialist.file.delete`, {
                                                        file: file.id,
                                                        redirect: route(`specialist.appointment`, {
                                                            book: appointment.data.book_id
                                                        })
                                                    })} />)
                                                }}
                                                className="absolute -right-1 -top-1 rounded-full bg-red-500 w-3.5 h-3.5 cursor-pointer flex items-center justify-center text-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-2.5 h-2.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                            <div className="relative pl-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                </svg>
                                                <div className="absolute bg-black py-0 px-0.5 text-[.375rem] top-[.825rem] font-bold text-white">{file.ext}</div>
                                            </div>
                                        </div>
                                        <div className="text-xs leading-tight">{file.title}</div>
                                    </a>
                                </li> : <></>}
                            </Fragment>)}
                        </ul>
                    </div>
                </Fragment>)}
                <div className="border-r border-dashed border-blue-200"></div>
                <div className="p-3 flex justify-end pt-6">
                    <button
                        onClick={e => setModal(<AddonFile {...props} />)}
                        type="button"
                        className="px-5 py-2 bg-purple-900 rounded-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M4 19H20V12H22V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V12H4V19ZM13 9V16H11V9H6L12 3L18 9H13Z" fill="white" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div className={`flex justify-end py-8`}>
            <PrimaryButton size="sm" onClick={() => nextTab()}>Далее</PrimaryButton>
        </div>
    </>
}
