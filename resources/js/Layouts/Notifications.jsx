
import Phone from '@/Components/Phone';
import Clock from '@/Components/Clock';
import CalendarIcon from '@/Components/Calendar';
import LinkIcon from '@/Components/Link';

export default (props) => {
    return <div className={`absolute top-full left-0 z-20 ml-[90px] -translate-x-full w-[374px] -mt-4`} onClick={e => e.stopPropagation()}>
        <div className="h-8 w-8 origin-bottom-left rotate-45 transform border border-white bg-white ml-[274px]"></div>
        <div className={`bg-white rounded-xl bg-white py-6 px-6 z-1 relative`}>
            <div className={`text-lg font-semibold mb-5`}>Следующий прием</div>
            <div className={`flex space-x-5 items-center mb-5`}>
                <div className={`shrink-0 w-10 h-10 bg-cover rounded bg-center`} style={{ backgroundImage: `url('${auth.user.gender})` }}></div>
                <div className={`grow`}>
                    <div className={`text-sm text-violet-500`}>Имя Фамилия Специалиста</div>
                    <div className={`font-medium`}>Назначение приема</div>
                </div>
                <div className={`shrink-0 bg-slate-100 flex items-center justify-center rounded-full w-10 h-10`}>
                    <Phone className={`w-6 h-6 text-gray-600`} />
                </div>
            </div>
            <hr className={`border-dashed border-blue-200 my-5`} />
            <div className={`flex font-medium items-center space-x-2 mb-5`}>
                <div className={`flex items-center`}>
                    <Clock className={`w-4 h-auto mr-1`} />
                    <span>9:30</span>
                </div>
                <div className={`flex items-center`}>
                    <CalendarIcon className={`w-5 h-auto mr-1`} />
                    <span>31.05.2022</span>
                </div>
            </div>

            <div className={`text-lg font-semibold mb-4`}>Магазин</div>
            <div className={`flex items-center text-sm mb-1`}>
                <LinkIcon className={`w-4 h-auto mr-1`} />
                <span className={`text-violet-500`}>Имя Фамилия продавца</span>
            </div>
            <div className={`font-medium mb-4`}>Сообщение о готовности стелек/обуви</div>
            <div className={`flex justify-between text-violet-500 text-sm`}>
                <div className={`bg-slate-100 rounded-lg px-2`}>Подробнее</div>
                <div className={`bg-slate-100 rounded-lg px-2`}>Телефон пациента</div>
                <div className={`bg-slate-100 rounded-lg px-2`}>История</div>
            </div>

            <div className={`text-lg font-semibold mb-4`}>Магазин</div>
            <div className={`flex items-center text-sm mb-1`}>
                <LinkIcon className={`w-4 h-auto mr-1`} />
                <span className={`text-violet-500`}>Имя Фамилия продавца</span>
            </div>
            <div className={`font-medium mb-4`}>Сообщение о готовности стелек/обуви</div>
            <div className={`flex justify-between text-violet-500 text-sm`}>
                <div className={`bg-slate-100 rounded-lg px-2`}>Подробнее</div>
                <div className={`bg-slate-100 rounded-lg px-2`}>Телефон пациента</div>
                <div className={`bg-slate-100 rounded-lg px-2`}>История</div>
            </div>

            <div className={`text-lg font-semibold mb-4`}>Ресепшн</div>
            <div className={`flex items-center text-sm mb-1`}>
                <LinkIcon className={`w-4 h-auto mr-1`} />
                <span className={`text-violet-500`}>Имя Фамилия специалиста</span>
            </div>
            <div className={`font-medium mb-4`}>Имя Фамилия специалиста</div>
            <div className={`flex justify-between text-violet-500 text-sm`}>
                <div className={`bg-slate-100 rounded-lg px-2`}>Подробнее</div>
                <div className={`bg-slate-100 rounded-lg px-2`}>Расписание</div>
            </div>
        </div>
    </div>
}