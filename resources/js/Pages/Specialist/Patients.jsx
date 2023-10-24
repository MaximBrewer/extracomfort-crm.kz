import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';


export default (props) => {

    const { pagetitle } = props

    const [tab, setTab] = useState(`specialists`)

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            heading={<h1 className="font-semibold text-3xl text-gray-800 leading-tight">{pagetitle}</h1>}
        >
            <Head title={pagetitle} />

            <div className="pt-5 pb-5">
                <div className={`shadow-bb rounded-lg bg-white py-5 px-6`}>
                    <div className={`flex space-x-5 items-center mb-5 p-5 rounded-lg bg-blue-50 hover:bg-white hover:shadow-block`}>
                        <div className={`w-[20%]`}>
                            <div className={`font-medium`}>Владимир Архипов</div>
                            <div className={`text-sm`}>30 лет</div>
                        </div>
                        <div className={`grow`}>
                            <div className={``}>+7 123 456 7890</div>
                        </div>
                        <div>
                            <PrimaryButton className={`min-w-[150px] justify-center`} size={`sm`}>
                                <span>Записать</span>
                            </PrimaryButton>
                        </div>
                    </div>
                    <div className={`flex space-x-5 items-center mb-5 p-5 rounded-lg bg-blue-50 hover:bg-white hover:shadow-block`}>
                        <div className={`w-[20%]`}>
                            <div className={`font-medium`}>Владимир Архипов</div>
                            <div className={`text-sm`}>30 лет</div>
                        </div>
                        <div className={`grow`}>
                            <div className={``}>+7 123 456 7890</div>
                        </div>
                        <div>
                            <PrimaryButton className={`min-w-[150px] justify-center`} size={`sm`}>
                                <span>Записать</span>
                            </PrimaryButton>
                        </div>
                    </div>
                    <div className={`flex space-x-5 items-center mb-5 p-5 rounded-lg bg-blue-50 hover:bg-white hover:shadow-block`}>
                        <div className={`w-[20%]`}>
                            <div className={`font-medium`}>Владимир Архипов</div>
                            <div className={`text-sm`}>30 лет</div>
                        </div>
                        <div className={`grow`}>
                            <div className={``}>+7 123 456 7890</div>
                        </div>
                        <div>
                            <PrimaryButton className={`min-w-[150px] justify-center`} size={`sm`}>
                                <span>Записать</span>
                            </PrimaryButton>
                        </div>
                    </div>
                    <div className={`flex space-x-5 items-center mb-5 p-5 rounded-lg bg-blue-50 hover:bg-white hover:shadow-block`}>
                        <div className={`w-[20%]`}>
                            <div className={`font-medium`}>Владимир Архипов</div>
                            <div className={`text-sm`}>30 лет</div>
                        </div>
                        <div className={`grow`}>
                            <div className={``}>+7 123 456 7890</div>
                        </div>
                        <div>
                            <PrimaryButton className={`min-w-[150px] justify-center`} size={`sm`}>
                                <span>Записать</span>
                            </PrimaryButton>
                        </div>
                    </div>
                    <div className={`flex space-x-5 items-center mb-5 p-5 rounded-lg bg-blue-50 hover:bg-white hover:shadow-block`}>
                        <div className={`w-[20%]`}>
                            <div className={`font-medium`}>Владимир Архипов</div>
                            <div className={`text-sm`}>30 лет</div>
                        </div>
                        <div className={`grow`}>
                            <div className={``}>+7 123 456 7890</div>
                        </div>
                        <div>
                            <PrimaryButton className={`min-w-[150px] justify-center`} size={`sm`}>
                                <span>Записать</span>
                            </PrimaryButton>
                        </div>
                    </div>
                    <div className={`flex space-x-5 items-center mb-5 p-5 rounded-lg bg-blue-50 hover:bg-white hover:shadow-block`}>
                        <div className={`w-[20%]`}>
                            <div className={`font-medium`}>Владимир Архипов</div>
                            <div className={`text-sm`}>30 лет</div>
                        </div>
                        <div className={`grow`}>
                            <div className={``}>+7 123 456 7890</div>
                        </div>
                        <div>
                            <PrimaryButton className={`min-w-[150px] justify-center`} size={`sm`}>
                                <span>Записать</span>
                            </PrimaryButton>
                        </div>
                    </div>
                    <div className={`flex space-x-5 items-center mb-5 p-5 rounded-lg bg-blue-50 hover:bg-white hover:shadow-block`}>
                        <div className={`w-[20%]`}>
                            <div className={`font-medium`}>Владимир Архипов</div>
                            <div className={`text-sm`}>30 лет</div>
                        </div>
                        <div className={`grow`}>
                            <div className={``}>+7 123 456 7890</div>
                        </div>
                        <div>
                            <PrimaryButton className={`min-w-[150px] justify-center`} size={`sm`}>
                                <span>Записать</span>
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
