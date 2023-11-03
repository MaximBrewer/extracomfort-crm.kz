import ChevronLeft from '@/Components/ChevronLeft';
import ChevronRight from '@/Components/ChevronRight';
import Pencil from '@/Components/Pencil';
import PrimaryButton from '@/Components/PrimaryButton';
import Trash from '@/Components/Trash';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';


export default (props) => {

    const { pagetitle } = props

    const [tab, setTab] = useState(`today`)

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            heading={false}
        >
            <div className="pb-12">
                <ul className={`flex z-1 relative`}>
                    <li className={`relative`}>
                        <a href="#"
                            className={`block rounded-t-lg py-2.5 px-6 shadow-bb font-medium text-3xl ${tab === `today` ? `bg-white` : `bg-blue-50 text-blue-20`}`}
                            onClick={e => {
                                e.preventDefault();
                                setTab(`today`);
                            }}>Сегодня</a>
                        <div className={`absolute top-full h-2 left-0 w-full bg-white`}></div>
                    </li>
                    <li className={`relative`}>
                        <a href="#"
                            className={`block rounded-t-lg py-2.5 px-6 shadow-bb font-medium text-3xl ${tab === `week` ? `bg-white` : `bg-blue-50 text-blue-20`}`}
                            onClick={e => {
                                e.preventDefault();
                                setTab(`week`);
                            }}>Неделя</a>
                        <div className={`absolute top-full h-2 left-0 w-full bg-white`}></div>
                    </li>
                </ul>
                {tab === `today` ? <div className={`shadow-bb rounded-lg bg-white py-5 px-4`}>
                    <div className={`text-lg font-medium mb-5`}>Понедельник, Июнь 13</div>
                    <div className={`flex items-center bg-slate-100 rounded-lg -mx-3`}>
                        <a href="#" className={`flex items-center shrink-0 py-4 px-4`}>
                            <ChevronLeft className={`h-4 w-auto`} />
                        </a>
                        <ul className={`grow grid grid-cols-7 text-center py-1.5`}>
                            {[
                                { weekday: 'ПН', date: '26' },
                                { weekday: 'вт', date: '27' },
                                { weekday: 'ср', date: '28' },
                                { weekday: 'чт', date: '29' },
                                { weekday: 'пт', date: '30' },
                                { weekday: 'сб', date: '31' },
                                { weekday: 'вс', date: '1' }
                            ].map((item, idx) => <li key={idx} className={`flex justify-center`}>
                                <div className={`py-3 px-3 rounded-lg hover:bg-white hover:shadow-block cursor-pointer`}>
                                    <div className={`text-violet-500`}>{item.date}</div>
                                    <div className={`text-[.625rem] uppercase text-gray-600`}>{item.weekday}</div>
                                </div>
                            </li>)}
                        </ul>
                        <a href="#" className={`flex items-center shrink-0 py-4 px-4`}>
                            <ChevronRight className={`h-4 w-auto`} />
                        </a>
                    </div>
                    <div className={`relative my-4`}>
                        <div className={`absolute -left-4 -right-4 top-1/2 border border-dashed border-blue-200`}></div>
                        <div className={`flex`}>
                            <div className={`bg-white px-2 relative z-1 text-xs uppercase font-medium`}>09:00</div>
                        </div>
                    </div>

                    <div className={`flex space-x-5 items-center mb-5 rounded-lg overflow-hidden py-3 bg-blue-50 hover:bg-white hover:shadow-block`}>
                        <div className={`w-[40%] flex space-x-5 items-center pl-5`}>
                            <div className={`grow`}>
                                <div className={`font-medium`}>Олег Викторович</div>
                                <div className={``}>+7 123 456 7890</div>
                            </div>
                        </div>
                        <div className={`text-sm w-[40%]`}>
                            <span className={`text-violet-500 font-medium`}>Консультация</span>
                        </div>
                        <div className={`text-sm w-[20%] flex justify-end -my-3`}>
                            <div className={`pr-5`}>
                                <div className={`h-10 flex items-center justify-end`}>
                                    <div className={`text-blue-400`}>Подтвержденная</div>
                                </div>
                                <div className={`h-10 flex items-center justify-end`}>
                                    <div className={`text-gray-300`}>5000 ₸</div>
                                </div>
                            </div>
                            <div className={``}>
                                <div className={`bg-violet-500 w-20 h-10 flex items-center justify-center text-white`}>
                                    <Pencil className={`w-5 h-auto`} />
                                </div>
                                <div className={`bg-red-700 w-20 h-10 flex items-center justify-center text-white`}>
                                    <Trash className={`w-5 h-auto`} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`relative my-4`}>
                        <div className={`absolute -left-4 -right-4 top-1/2 border border-dashed border-blue-200`}></div>
                        <div className={`flex`}>
                            <div className={`bg-white px-2 relative z-1 text-xs uppercase font-medium`}>09:00</div>
                        </div>
                    </div>

                    <div className={`flex space-x-5 items-center mb-5 rounded-lg overflow-hidden py-3 bg-blue-50 hover:bg-white hover:shadow-block`}>
                        <div className={`w-[40%] flex space-x-5 items-center pl-5`}>
                            <div className={`grow`}>
                                <div className={`font-medium`}>Олег Викторович</div>
                                <div className={``}>+7 123 456 7890</div>
                            </div>
                        </div>
                        <div className={`text-sm w-[40%]`}>
                            <span className={`text-violet-500 font-medium`}>Консультация</span>
                        </div>
                        <div className={`text-sm w-[20%] flex justify-end -my-3`}>
                            <div className={`pr-5`}>
                                <div className={`h-10 flex items-center justify-end`}>
                                    <div className={`text-blue-400`}>Подтвержденная</div>
                                </div>
                                <div className={`h-10 flex items-center justify-end`}>
                                    <div className={`text-gray-300`}>5000 ₸</div>
                                </div>
                            </div>
                            <div className={``}>
                                <div className={`bg-violet-500 w-20 h-10 flex items-center justify-center text-white`}>
                                    <Pencil className={`w-5 h-auto`} />
                                </div>
                                <div className={`bg-red-700 w-20 h-10 flex items-center justify-center text-white`}>
                                    <Trash className={`w-5 h-auto`} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`relative my-4`}>
                        <div className={`absolute -left-4 -right-4 top-1/2 border border-dashed border-blue-200`}></div>
                        <div className={`flex`}>
                            <div className={`bg-white px-2 relative z-1 text-xs uppercase font-medium`}>09:00</div>
                        </div>
                    </div>

                    <div className={`flex space-x-5 items-center mb-5 rounded-lg overflow-hidden py-3 bg-blue-50 hover:bg-white hover:shadow-block`}>
                        <div className={`w-[40%] flex space-x-5 items-center pl-5`}>
                            <div className={`grow`}>
                                <div className={`font-medium`}>Олег Викторович</div>
                                <div className={``}>+7 123 456 7890</div>
                            </div>
                        </div>
                        <div className={`text-sm w-[40%]`}>
                            <span className={`text-violet-500 font-medium`}>Консультация</span>
                        </div>
                        <div className={`text-sm w-[20%] flex justify-end -my-3`}>
                            <div className={`pr-5`}>
                                <div className={`h-10 flex items-center justify-end`}>
                                    <div className={`text-blue-400`}>Подтвержденная</div>
                                </div>
                                <div className={`h-10 flex items-center justify-end`}>
                                    <div className={`text-gray-300`}>5000 ₸</div>
                                </div>
                            </div>
                            <div className={``}>
                                <div className={`bg-violet-500 w-20 h-10 flex items-center justify-center text-white`}>
                                    <Pencil className={`w-5 h-auto`} />
                                </div>
                                <div className={`bg-red-700 w-20 h-10 flex items-center justify-center text-white`}>
                                    <Trash className={`w-5 h-auto`} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`relative my-4`}>
                        <div className={`absolute -left-4 -right-4 top-1/2 border border-dashed border-blue-200`}></div>
                        <div className={`flex`}>
                            <div className={`bg-white px-2 relative z-1 text-xs uppercase font-medium`}>09:00</div>
                        </div>
                    </div>

                    <div className={`flex space-x-5 items-center mb-5 rounded-lg overflow-hidden py-3 bg-blue-50 hover:bg-white hover:shadow-block`}>
                        <div className={`w-[40%] flex space-x-5 items-center pl-5`}>
                            <div className={`grow`}>
                                <div className={`font-medium`}>Олег Викторович</div>
                                <div className={``}>+7 123 456 7890</div>
                            </div>
                        </div>
                        <div className={`text-sm w-[40%]`}>
                            <span className={`text-violet-500 font-medium`}>Консультация</span>
                        </div>
                        <div className={`text-sm w-[20%] flex justify-end -my-3`}>
                            <div className={`pr-5`}>
                                <div className={`h-10 flex items-center justify-end`}>
                                    <div className={`text-blue-400`}>Подтвержденная</div>
                                </div>
                                <div className={`h-10 flex items-center justify-end`}>
                                    <div className={`text-gray-300`}>5000 ₸</div>
                                </div>
                            </div>
                            <div className={``}>
                                <div className={`bg-violet-500 w-20 h-10 flex items-center justify-center text-white`}>
                                    <Pencil className={`w-5 h-auto`} />
                                </div>
                                <div className={`bg-red-700 w-20 h-10 flex items-center justify-center text-white`}>
                                    <Trash className={`w-5 h-auto`} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`relative my-4`}>
                        <div className={`absolute -left-4 -right-4 top-1/2 border border-dashed border-blue-200`}></div>
                        <div className={`flex`}>
                            <div className={`bg-white px-2 relative z-1 text-xs uppercase font-medium`}>09:00</div>
                        </div>
                    </div>

                    <div className={`flex space-x-5 items-center mb-5 rounded-lg overflow-hidden py-3 bg-blue-50 hover:bg-white hover:shadow-block`}>
                        <div className={`w-[40%] flex space-x-5 items-center pl-5`}>
                            <div className={`grow`}>
                                <div className={`font-medium`}>Олег Викторович</div>
                                <div className={``}>+7 123 456 7890</div>
                            </div>
                        </div>
                        <div className={`text-sm w-[40%]`}>
                            <span className={`text-violet-500 font-medium`}>Консультация</span>
                        </div>
                        <div className={`text-sm w-[20%] flex justify-end -my-3`}>
                            <div className={`pr-5`}>
                                <div className={`h-10 flex items-center justify-end`}>
                                    <div className={`text-blue-400`}>Подтвержденная</div>
                                </div>
                                <div className={`h-10 flex items-center justify-end`}>
                                    <div className={`text-gray-300`}>5000 ₸</div>
                                </div>
                            </div>
                            <div className={``}>
                                <div className={`bg-violet-500 w-20 h-10 flex items-center justify-center text-white`}>
                                    <Pencil className={`w-5 h-auto`} />
                                </div>
                                <div className={`bg-red-700 w-20 h-10 flex items-center justify-center text-white`}>
                                    <Trash className={`w-5 h-auto`} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div> : ``}
                {tab === `week` ? <div className={`shadow-bb rounded-lg bg-white py-5 px-6`}>
                    Неделя
                </div> : ``}
            </div>
        </AuthenticatedLayout>
    );
}
