import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Select from 'react-select'


export default (props) => {

    const { pagetitle } = props

    const styles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderWidth: 0,
            backgroundColor: `#FAFBFD`,
            borderRadius: `.5rem`,
            minHeight: `40px`,
            boxShadow: `none`
        }),
        indicatorSeparator: (baseStyles, state) => ({
            ...baseStyles,
            display: `none`
        }),
        singleValue: (baseStyles, state) => ({
            ...baseStyles,
            color: `#414D55`
        }),
    }

    const options = [
        { value: 'Январь 2023', label: 'Январь 2023' },
        { value: 'Февраль 2023', label: 'Февраль 2023' },
        { value: 'Март 2023', label: 'Март 2023' },
        { value: 'Апрель 2023', label: 'Апрель 2023' },
        { value: 'Май 2023', label: 'Май 2023' },
        { value: 'Июнь 2023', label: 'Июнь 2023' },
        { value: 'Июль 2023', label: 'Июль 2023' },
        { value: 'Август 2023', label: 'Август 2023' },
        { value: 'Сентябрь 2023', label: 'Сентябрь 2023' },
        { value: 'Октябрь 2023', label: 'Октябрь 2023' },
        { value: 'Ноябрь 2023', label: 'Ноябрь 2023' },
        { value: 'Декабрь 2023', label: 'Декабрь 2023' },
    ]

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            heading={<h1 className="font-semibold text-3xl text-gray-800 leading-tight">{pagetitle}</h1>}
        >
            <div className="pb-12 pt-5">
                <div className={`rounded-lg shadow-block bg-white`}>
                    <div className={`py-5 px-6`}>
                        <div className={`w-[24rem]`}>
                            <Select options={options} styles={styles} isSearchable={false} placeholder={`Выберите период`} />
                        </div>
                    </div>
                    <div className="pb-5 px-6">
                        <div className="relative mb-4">
                            <div className="absolute -left-6 -right-6 top-1/2 border border-dashed border-blue-200"></div>
                            <div className="flex">
                                <div className={`w-[60%] flex`}>
                                    <div className="bg-white px-2 relative z-1 text-xs uppercase font-medium ">27.04.2022</div>
                                </div>
                                <div className={`w-[10%] flex justify-center`}>
                                    <div className="bg-white px-2 relative z-1 text-xs font-medium ">6 200 тг</div>
                                </div>
                            </div>
                        </div>


                        <div className={`flex space-x-5 items-center mb-5 rounded-lg py-5 bg-blue-50 hover:bg-white hover:shadow-block`}>
                            <div className={`w-[60%] flex space-x-5 items-center pl-5`}>
                                <div className={`shrink-0 w-10 h-10 bg-cover rounded bg-center`} style={{ backgroundImage: `url(/storage/female.jpg)` }}></div>
                                <div className={`grow`}>
                                    <div className={`font-medium text-violet-500`}>Ткач Олег Викторович</div>
                                    <div className={`text-sm`}>Ортореабилитолог</div>
                                </div>
                            </div>
                            <div className={`text-sm w-[10%] flex justify-center`}>
                                <span className={`text-red-600`}>- 5 000 тг</span>
                            </div>
                            <div className={`text-sm w-[30%] flex justify-center pr-5`}>
                                <span className={`text-violet-500`}>Изготовление стельки</span>
                            </div>
                        </div>

                        <div className={`flex space-x-5 items-center mb-5 rounded-lg py-5 bg-blue-50 hover:bg-white hover:shadow-block`}>
                            <div className={`w-[60%] flex space-x-5 items-center pl-5`}>
                                <div className={`shrink-0 w-10 h-10 bg-cover rounded bg-center`} style={{ backgroundImage: `url(/storage/female.jpg)` }}></div>
                                <div className={`grow`}>
                                    <div className={`font-medium text-violet-500`}>Ткач Олег Викторович</div>
                                    <div className={`text-sm`}>Ортореабилитолог</div>
                                </div>
                            </div>
                            <div className={`text-sm w-[10%] flex justify-center`}>
                                <span className={`text-red-600`}>- 5 000 тг</span>
                            </div>
                            <div className={`text-sm w-[30%] flex justify-center pr-5`}>
                                <span className={`text-violet-500`}>Изготовление стельки</span>
                            </div>
                        </div>

                        <div className={`flex space-x-5 items-center mb-5 rounded-lg py-5 bg-blue-50 hover:bg-white hover:shadow-block`}>
                            <div className={`w-[60%] flex space-x-5 items-center pl-5`}>
                                <div className={`shrink-0 w-10 h-10 bg-cover rounded bg-center`} style={{ backgroundImage: `url(/storage/female.jpg)` }}></div>
                                <div className={`grow`}>
                                    <div className={`font-medium text-violet-500`}>Ткач Олег Викторович</div>
                                    <div className={`text-sm`}>Ортореабилитолог</div>
                                </div>
                            </div>
                            <div className={`text-sm w-[10%] flex justify-center`}>
                                <span className={`text-red-600`}>- 5 000 тг</span>
                            </div>
                            <div className={`text-sm w-[30%] flex justify-center pr-5`}>
                                <span className={`text-violet-500`}>Изготовление стельки</span>
                            </div>
                        </div>

                        <div className={`flex space-x-5 items-center mb-5 rounded-lg py-5 bg-blue-50 hover:bg-white hover:shadow-block`}>
                            <div className={`w-[60%] flex space-x-5 items-center pl-5`}>
                                <div className={`shrink-0 w-10 h-10 bg-cover rounded bg-center`} style={{ backgroundImage: `url(/storage/female.jpg)` }}></div>
                                <div className={`grow`}>
                                    <div className={`font-medium text-violet-500`}>Ткач Олег Викторович</div>
                                    <div className={`text-sm`}>Ортореабилитолог</div>
                                </div>
                            </div>
                            <div className={`text-sm w-[10%] flex justify-center`}>
                                <span className={`text-red-600`}>- 5 000 тг</span>
                            </div>
                            <div className={`text-sm w-[30%] flex justify-center pr-5`}>
                                <span className={`text-violet-500`}>Изготовление стельки</span>
                            </div>
                        </div>

                        <div className="relative mb-4">
                            <div className="absolute -left-6 -right-6 top-1/2 border border-dashed border-blue-200"></div>
                            <div className="flex">
                                <div className={`w-[60%] flex`}>
                                    <div className="bg-white px-2 relative z-1 text-xs uppercase font-medium ">27.04.2022</div>
                                </div>
                                <div className={`w-[10%] flex justify-center`}>
                                    <div className="bg-white px-2 relative z-1 text-xs font-medium ">6 200 тг</div>
                                </div>
                            </div>
                        </div>

                        <div className={`flex space-x-5 items-center mb-5 rounded-lg py-5 bg-blue-50 hover:bg-white hover:shadow-block`}>
                            <div className={`w-[60%] flex space-x-5 items-center pl-5`}>
                                <div className={`shrink-0 w-10 h-10 bg-cover rounded bg-center`} style={{ backgroundImage: `url(/storage/female.jpg)` }}></div>
                                <div className={`grow`}>
                                    <div className={`font-medium text-violet-500`}>Ткач Олег Викторович</div>
                                    <div className={`text-sm`}>Ортореабилитолог</div>
                                </div>
                            </div>
                            <div className={`text-sm w-[10%] flex justify-center`}>
                                <span className={`text-red-600`}>- 5 000 тг</span>
                            </div>
                            <div className={`text-sm w-[30%] flex justify-center pr-5`}>
                                <span className={`text-violet-500`}>Изготовление стельки</span>
                            </div>
                        </div>

                        <div className={`flex space-x-5 items-center mb-5 rounded-lg py-5 bg-blue-50 hover:bg-white hover:shadow-block`}>
                            <div className={`w-[60%] flex space-x-5 items-center pl-5`}>
                                <div className={`shrink-0 w-10 h-10 bg-cover rounded bg-center`} style={{ backgroundImage: `url(/storage/female.jpg)` }}></div>
                                <div className={`grow`}>
                                    <div className={`font-medium text-violet-500`}>Ткач Олег Викторович</div>
                                    <div className={`text-sm`}>Ортореабилитолог</div>
                                </div>
                            </div>
                            <div className={`text-sm w-[10%] flex justify-center`}>
                                <span className={`text-red-600`}>- 5 000 тг</span>
                            </div>
                            <div className={`text-sm w-[30%] flex justify-center pr-5`}>
                                <span className={`text-violet-500`}>Изготовление стельки</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
