import ChevronDown from '@/Components/ChevronDown';
import ChevronLeft from '@/Components/ChevronLeft';
import ChevronRight from '@/Components/ChevronRight';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { IMaskInput } from 'react-imask';

export default (props) => {

    const { pagetitle, auth } = props

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={props.errors}
            heading={<h1 className="font-semibold text-3xl text-gray-800 leading-tight">{pagetitle}</h1>}
        >
            <Head title={pagetitle} />

            <div className="pb-12 pt-5">
                <div className={`rounded-lg shadow-block bg-white px-6 py-6 mb-5`}>
                    <div className={`flex`}>
                        <div className={`grow border-black border-r border-opacity-50 pr-5`}>
                            <div className={`font-bold text-2xl text-black`}>{auth.user.name}</div>
                            <hr className={`border-black my-2 border-opacity-50`} />
                            <div className={`grid grid-cols-2`}>
                                <div className={`border-black border-r border-opacity-50 pb-2`}>
                                    <div className={`pr-6`}>
                                        <input name={`name`} placeholder={`Дата рождения`} className={`placeholder:opacity-50 font-semibold outline-none border-b w-full border-black py-1 border-opacity-50`} />
                                    </div>
                                    <div className={`pr-6`}>
                                        <IMaskInput
                                            className={`placeholder:opacity-50 outline-none border-b w-full border-black py-1 border-opacity-50`}
                                            mask={`+{7} (000) 000 00 00`}
                                            value=""
                                            // unmask={true} // true|false|'typed'
                                            // ref={ref}
                                            // inputRef={inputRef}  
                                            // access to nested input
                                            // DO NOT USE onChange TO HANDLE CHANGES!
                                            // USE onAccept INSTEAD
                                            onAccept={
                                                // depending on prop above first argument is
                                                // `value` if `unmask=false`,
                                                // `unmaskedValue` if `unmask=true`,
                                                // `typedValue` if `unmask='typed'`
                                                (value, mask) => console.log(value)
                                            }
                                            // ...and more mask props in a guide

                                            // input props also available
                                            placeholder='+7 (777) 777 77 77'
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className={`pl-6`}>
                                        <input name={`name`} placeholder={`ИИН`} className={`placeholder:opacity-50 outline-none border-b w-full border-black py-1 border-opacity-50`} />
                                    </div>
                                    <div className={`pl-6`}>
                                        <input name={`name`} placeholder={`E-mail`} className={`placeholder:opacity-50 outline-none border-b w-full border-black py-1 border-opacity-50`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`shrink-0 pl-2`}>
                            <textarea className={`h-full border rounded-lg w-[372px] border-black border-opacity-50`} placeholder={`Дополнительная информация`} />
                        </div>
                    </div>
                </div>
                <div className={`rounded-lg shadow-block bg-white px-6 py-6 mb-5`}>
                    <h2 className={`text-xl font-medium mb-4`}>История</h2>
                    <div className={`flex items-center justify-between`}>
                        <div className={`flex items-center space-x-[.125rem] text-violet-500`}>
                            <div className={`bg-white shadow-block w-24 h-10 flex items-center justify-center rounded-l-lg`}>
                                <span>Неделя</span>
                            </div>
                            <div className={`bg-blue-50 w-24 h-10 flex items-center justify-center`}>
                                <span>Месяц</span>
                            </div>
                            <div className={`bg-blue-50 w-24 h-10 flex items-center justify-center rounded-r-lg`}>
                                <span>Год</span>
                            </div>
                        </div>
                        <div className={`flex items-center justify-between w-40 rounded-lg bg-blue-50 h-10`}>
                            <a href="#" className={`py-2.5 px-2 flex items-center`}>
                                <ChevronLeft className={`w-2 h-auto`} />
                            </a>
                            <div>Период</div>
                            <a href="#" className={`py-2.5 px-2 flex items-center`}>
                                <ChevronRight className={`w-2 h-auto`} />
                            </a>
                        </div>
                    </div>
                    <div className={`relative my-4`}>
                        <div className={`absolute -left-6 -right-6 top-1/2 border border-dashed border-blue-200`}></div>
                        <div className={`flex`}>
                            <div className={`bg-white px-2 relative z-1 text-xs uppercase font-medium`}>Последние результаты</div>
                        </div>
                    </div>
                    <ul className={`flex flex-col space-y-2.5`}>
                        <li className={`rounded-lg px-6 py-6 bg-blue-50 relative`}>
                            <div className={`text-violet-500 text-sm`}>Доктор ФИО</div>
                            <hr className={`border-dashed border-blue-200 my-1`} />
                            <div className={`font-medium`}>Наименование приема</div>
                            <div className={`text-sm`}>13.05.2022</div>
                            <a href="#" className={`absolute -translate-y-1/2 top-1/2 right-6`} >
                                <ChevronDown className={`w-4 h-auto`} />
                            </a>
                        </li>
                        <li className={`rounded-lg px-6 py-6 bg-blue-50 relative`}>
                            <div className={`text-violet-500 text-sm`}>Доктор ФИО</div>
                            <hr className={`border-dashed border-blue-200 my-1`} />
                            <div className={`font-medium`}>Наименование приема</div>
                            <div className={`text-sm`}>13.05.2022</div>
                            <a href="#" className={`absolute -translate-y-1/2 top-1/2 right-6`} >
                                <ChevronDown className={`w-4 h-auto`} />
                            </a>
                        </li>
                        <li className={`rounded-lg px-6 py-6 bg-blue-50 relative`}>
                            <div className={`text-violet-500 text-sm`}>Доктор ФИО</div>
                            <hr className={`border-dashed border-blue-200 my-1`} />
                            <div className={`font-medium`}>Наименование приема</div>
                            <div className={`text-sm`}>13.05.2022</div>
                            <a href="#" className={`absolute -translate-y-1/2 top-1/2 right-6`} >
                                <ChevronDown className={`w-4 h-auto`} />
                            </a>
                        </li>
                        <li className={`rounded-lg px-6 py-6 bg-blue-50 relative`}>
                            <div className={`text-violet-500 text-sm`}>Доктор ФИО</div>
                            <hr className={`border-dashed border-blue-200 my-1`} />
                            <div className={`font-medium`}>Наименование приема</div>
                            <div className={`text-sm`}>13.05.2022</div>
                            <a href="#" className={`absolute -translate-y-1/2 top-1/2 right-6`} >
                                <ChevronDown className={`w-4 h-auto`} />
                            </a>
                        </li>
                        <li className={`rounded-lg px-6 py-6 bg-blue-50 relative`}>
                            <div className={`text-violet-500 text-sm`}>Доктор ФИО</div>
                            <hr className={`border-dashed border-blue-200 my-1`} />
                            <div className={`font-medium`}>Наименование приема</div>
                            <div className={`text-sm`}>13.05.2022</div>
                            <a href="#" className={`absolute -translate-y-1/2 top-1/2 right-6`} >
                                <ChevronDown className={`w-4 h-auto`} />
                            </a>
                        </li>
                        <li className={`rounded-lg px-6 py-6 bg-blue-50 relative`}>
                            <div className={`text-violet-500 text-sm`}>Доктор ФИО</div>
                            <hr className={`border-dashed border-blue-200 my-1`} />
                            <div className={`font-medium`}>Наименование приема</div>
                            <div className={`text-sm`}>13.05.2022</div>
                            <a href="#" className={`absolute -translate-y-1/2 top-1/2 right-6`} >
                                <ChevronDown className={`w-4 h-auto`} />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
