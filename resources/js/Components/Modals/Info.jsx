import { useLayout } from "@/Contexts/LayoutContext";
import { useForm } from "@inertiajs/react";
import InputError from "../InputError"
import InputLabel from "../InputLabel";
import PrimaryButton from "../PrimaryButton";
import TextInput from "../TextInput"

const colors = {
    success: `text-green-500`,
    info: `text-red-500`,
    danger: `text-red-500`,
}

const icons = {
    success: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 mb-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    ,
    info: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 mb-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    danger: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 mb-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
}

export default (props) => {

    const { status = `info`, message = `` } = props

    return <div className={`${colors[status]} flex flex-col items-center justify-center`}>
        {icons[status]}
        <h2 className={`font-medium text-xl text-center mb-4`}>{message}</h2>
    </div>
}