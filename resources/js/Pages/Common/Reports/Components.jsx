import { forwardRef } from 'react';
import { components } from 'react-select';
import { router } from '@inertiajs/react';
import Select from 'react-select';


export function Navigate({ reports, title, branches, branch }) {

    console.log(reports)
    return <>
        <div className="grid grid-cols-2 gap-6">
            <Select
                getOptionLabel={el => el.title}
                getOptionValue={el => el.href}
                styles={customStyles}
                components={{ DropdownIndicator }}
                options={reports}
                value={reports.find(el => el.active)}
                onChange={value => router.visit(value.href)}
                placeholder="Выбрать из списка"
            />
            <Select
                getOptionLabel={el => el.title}
                getOptionValue={el => el.href}
                styles={customStyles}
                components={{ DropdownIndicator }}
                options={branches}
                value={branches.find(el => el.id === branch.data.id)}
                onChange={value => router.visit(value.href)}
                placeholder="Выбрать из списка"
            />
        </div>

        <h1 className="my-6 text-xl font-semibold">{title}</h1>
    </>
}

export const customStyles = {
    control: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return ({
            ...styles,
            borderRadius: `.25rem`,
            minHeight: `1.125rem`,
            outline: `none`,
            borderColor: `gray`,
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

export const Th = ({ children, className, ...props }) => {
    return <th className={`border bg-white border-black font-medium px-2 py-1 ${className}`} {...props}> {children}</th>
}

export const Td = ({ children, className, ...props }) => {
    return <td className={`px-2 py-1 border bg-white border-black ${className}`} {...props}> {children}</td>
}

export const CustomInput = forwardRef((props, ref) => {
    return <input {...props} ref={ref} className="text-sm bg-transparent border-1 shadow-none rounded outline-none py-2 px-4 w-full" />;
});

export const DropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <svg width="16" height="6" className="text-purple-900" viewBox="0 0 16 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.63656 5.35044L0.214103 0.86339C-0.241616 0.545002 0.0811491 0.000608444 0.725521 0.000608444L14.5935 0.000608444C15.238 0.000608444 15.5607 0.545002 15.105 0.86339L8.68252 5.35044C8.11757 5.74517 7.2015 5.74517 6.63656 5.35044Z" fill="currentColor" />
            </svg>
        </components.DropdownIndicator>
    );
};