import { useLayout } from "@/Contexts/LayoutContext";
import PrimaryButton from "../PrimaryButton";
import { router } from '@inertiajs/react'

export default (props) => {

    const { file, url } = props

    const { setModal } = useLayout()

    return <div className={`min-w-[20rem]`}>
        <h2 className={`font-bold text-xl text-center mb-4`}>Вы уверены что хотите удалить файл?</h2>
        <div className={`flex flex-col space-y-3 mt-5`}>
            <PrimaryButton
                type={`button`}
                className={`justify-center`}
                onClick={e => {
                    router.delete(url)
                    setModal(null)
                }}
            >Да</PrimaryButton>
            <div className={`text-center`}>
                <a href={`#`}
                    className={`text-red-500 underline hover:underline-none`}
                    onClick={e => {
                        e.preventDefault();
                        setModal(null)
                    }}>Отменить</a>
            </div>
        </div>
    </div>
}