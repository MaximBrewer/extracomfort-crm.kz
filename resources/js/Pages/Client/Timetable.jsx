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
            <Head title={pagetitle} />

            <div className="pb-12 pt-5">
                <div className={`rounded-lg shadow-block bg-white`}>
                    <div className={`py-5 px-6`}>
                        <div className={`w-[24rem]`}>
                            <Select options={options} styles={styles} isSearchable={false} defaultValue={options[4]} />
                        </div>
                    </div>
                    <div className={`p-[.125rem]`}>
                        <div className={`rounded-lg overflow-hidden grid grid-cols-[20px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] text-center bg-slate-100`}>
                            <div className={``}></div>
                            <div className={`p-5`}>Понедельник</div>
                            <div className={`p-5 border-l border-gray-400`}>Вторник</div>
                            <div className={`p-5 border-l border-gray-400`}>Среда</div>
                            <div className={`p-5 border-l border-gray-400`}>Четверг</div>
                            <div className={`p-5 border-l border-gray-400 bg-violet-500 text-white`}>Пятница</div>
                            <div className={`p-5 border-l border-gray-400`}>Суббота</div>
                            <div className={`p-5 border-l border-gray-400`}>Воскресенье</div>
                        </div>
                        <div className={`grid grid-cols-[20px_1fr_1fr_1fr_1fr_1fr_1fr_1fr]`}>
                            <div className={`h-2.5`}></div>
                            <div className={`h-2.5`}></div>
                            <div className={`h-2.5 border-l border-gray-400`}></div>
                            <div className={`h-2.5 border-l border-gray-400`}></div>
                            <div className={`h-2.5 border-l border-gray-400`}></div>
                            <div className={`h-2.5 border-l border-gray-400`}></div>
                            <div className={`h-2.5 border-l border-gray-400`}></div>
                            <div className={`h-2.5 border-l border-gray-400`}></div>
                        </div>
                        <div className={`grid grid-cols-[20px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] rounded-l-lg overflow-hidden text-xl text-gray-600`}>
                            <div className={`bg-slate-100 border-b border-gray-400`}></div>
                            <div className={`bg-blue-50 border-b border-gray-400 h-[100px] py-4 px-5`}>26 Апрель</div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 h-[100px] py-4 px-5`}>27</div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 h-[100px] py-4 px-5`}>28</div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 h-[100px] py-4 px-5`}>29</div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 h-[100px] py-4 px-5`}>30</div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 h-[100px] py-4 px-5`}>31</div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 h-[100px] py-4 px-5 bg-disabled text-gray-100 bg-cover`}>1 Мая</div>

                            <div className={`bg-violet-500 border-b border-gray-400`}></div>
                            <div className={`bg-blue-50 border-b border-gray-400 h-[100px] py-4 px-5`}>2</div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 h-[100px] py-4 px-5`}>3</div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 h-[100px] py-4 px-5 text-gray-100`}>4</div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 h-[100px] py-4 px-5`}>5</div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 h-[100px] py-4 px-5`}>Сегодня</div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 h-[100px] py-4 px-5 text-gray-100`}>7</div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 h-[100px] py-4 px-5`}>8</div>

                            <div className={`bg-slate-100 border-b border-gray-400`}></div>
                            <div className={`bg-orange-500 border-b border-gray-400 pb-[.2rem] h-[100px] flex`}>
                                <div className={`bg-blue-50 mix-blend-luminosity py-4 px-5 grow`}>
                                    <div>9</div>
                                    <div className={`text-center text-sm text-center`}>Обследование</div>
                                </div>
                            </div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 pb-[.2rem] h-[100px] flex py-4 px-5`}>
                                <div>10</div>
                            </div>
                            <div className={`bg-violet-600 border-l border-b border-gray-400 pb-[.2rem] h-[100px] flex`}>
                                <div className={`bg-blue-50 mix-blend-luminosity py-4 px-5 grow`}>
                                    <div>11</div>
                                    <div className={`text-center text-sm text-center`}>Массаж</div>
                                </div>
                            </div>
                            <div className={`bg-violet-600 border-l border-b border-gray-400 pb-[.2rem] h-[100px] flex`}>
                                <div className={`bg-blue-50 mix-blend-luminosity py-4 px-5 grow`}>
                                    <div>12</div>
                                    <div className={`text-center text-sm text-center`}>Массаж</div>
                                </div>
                            </div>
                            <div className={`bg-violet-600 border-l border-b border-gray-400 pb-[.2rem] h-[100px] flex`}>
                                <div className={`bg-blue-50 mix-blend-luminosity py-4 px-5 grow`}>
                                    <div>13</div>
                                    <div className={`text-center text-sm text-center`}>Массаж</div>
                                </div>
                            </div>
                            <div className={`bg-violet-600 border-l border-b border-gray-400 pb-[.2rem] h-[100px] flex`}>
                                <div className={`bg-blue-50 mix-blend-luminosity py-4 px-5 grow`}>
                                    <div>14</div>
                                    <div className={`text-center text-sm text-center`}>Массаж</div>
                                </div>
                            </div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 h-[100px] py-4 px-5 bg-disabled text-gray-100 bg-cover`}>15</div>

                            <div className={`bg-slate-100 border-b border-gray-400`}></div>
                            <div className={`bg-violet-600 border-l border-b border-gray-400 pb-[.2rem] h-[100px] flex`}>
                                <div className={`bg-blue-50 mix-blend-luminosity py-4 px-5 grow`}>
                                    <div>16</div>
                                    <div className={`text-center text-sm text-center`}>Массаж</div>
                                </div>
                            </div>
                            <div className={`bg-violet-600 border-l border-b border-gray-400 pb-[.2rem] h-[100px] flex`}>
                                <div className={`bg-blue-50 mix-blend-luminosity py-4 px-5 grow`}>
                                    <div>17</div>
                                    <div className={`text-center text-sm text-center`}>Массаж</div>
                                </div>
                            </div>
                            <div className={`bg-violet-600 border-l border-b border-gray-400 pb-[.2rem] h-[100px] flex`}>
                                <div className={`bg-blue-50 mix-blend-luminosity py-4 px-5 grow`}>
                                    <div>18</div>
                                    <div className={`text-center text-sm text-center`}>Массаж</div>
                                </div>
                            </div>
                            <div className={`bg-violet-600 border-l border-b border-gray-400 pb-[.2rem] h-[100px] flex`}>
                                <div className={`bg-blue-50 mix-blend-luminosity py-4 px-5 grow`}>
                                    <div>19</div>
                                    <div className={`text-center text-sm text-center`}>Массаж</div>
                                </div>
                            </div>
                            <div className={`bg-violet-600 border-l border-b border-gray-400 pb-[.2rem] h-[100px] flex`}>
                                <div className={`bg-blue-50 mix-blend-luminosity py-4 px-5 grow`}>
                                    <div>20</div>
                                    <div className={`text-center text-sm text-center`}>Массаж</div>
                                </div>
                            </div>
                            <div className={`bg-violet-600 border-l border-b border-gray-400 pb-[.2rem] h-[100px] flex`}>
                                <div className={`bg-blue-50 mix-blend-luminosity py-4 px-5 grow`}>
                                    <div>21</div>
                                    <div className={`text-center text-sm text-center`}>Массаж</div>
                                </div>
                            </div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 h-[100px] py-4 px-5 bg-disabled text-gray-100 bg-cover`}>22</div>

                            <div className={`bg-slate-100 border-b border-gray-400`}></div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 pb-[.2rem] h-[100px] flex py-4 px-5`}>
                                <div>23</div>
                            </div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 pb-[.2rem] h-[100px] flex py-4 px-5`}>
                                <div>24</div>
                            </div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 pb-[.2rem] h-[100px] flex py-4 px-5`}>
                                <div>25</div>
                            </div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 pb-[.2rem] h-[100px] flex py-4 px-5`}>
                                <div>26</div>
                            </div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 pb-[.2rem] h-[100px] flex py-4 px-5`}>
                                <div>27</div>
                            </div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 pb-[.2rem] h-[100px] flex py-4 px-5`}>
                                <div>28</div>
                            </div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 h-[100px] py-4 px-5 bg-disabled text-gray-100 bg-cover`}>29</div>


                            <div className={`bg-slate-100 border-b border-gray-400`}></div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 pb-[.2rem] h-[100px] flex py-4 px-5`}>
                                <div>30</div>
                            </div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 pb-[.2rem] h-[100px] flex py-4 px-5`}>
                                <div>31</div>
                            </div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 pb-[.2rem] h-[100px] flex py-4 px-5`}>
                                <div>1 Июнь</div>
                            </div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 pb-[.2rem] h-[100px] flex py-4 px-5`}>
                                <div>2</div>
                            </div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 pb-[.2rem] h-[100px] flex py-4 px-5`}>
                                <div>3</div>
                            </div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 pb-[.2rem] h-[100px] flex py-4 px-5`}>
                                <div>4</div>
                            </div>
                            <div className={`bg-blue-50 border-l border-b border-gray-400 h-[100px] py-4 px-5 bg-disabled text-gray-100 bg-cover`}>5</div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
