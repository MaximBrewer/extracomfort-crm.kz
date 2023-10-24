import { forwardRef } from "react";
import PrimaryButton from "../PrimaryButton";
import { useRef } from "react";
import P1 from "../../../img/card/oda/p1.png"
import P2 from "../../../img/card/oda/p2.png"
import P3 from "../../../img/card/oda/p3.png"
import P4 from "../../../img/card/oda/p4.png"
import P5 from "../../../img/card/oda/p5.png"
import P6 from "../../../img/card/oda/p6.png"
import P7 from "../../../img/card/oda/p7.png"

import I1 from "../../../img/card/oda/I1.png"
import I2 from "../../../img/card/oda/I2.png"
import I3 from "../../../img/card/oda/I3.png"
import I4 from "../../../img/card/oda/I4.png"
import I5 from "../../../img/card/oda/I5.png"
import I6 from "../../../img/card/oda/I6.png"


import { useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import { Fragment } from "react";

const Th = ({ children, className, ...props }) => {
    return <th className={`border bg-white border-black font-medium px-2 py-1 ${className}`} {...props}> {children}</th>
}

const Td = ({ children, className, ...props }) => {
    return <td className={`border bg-white border-black ${className}`} {...props}> {children}</td>
}

const Input = forwardRef(function ({ onChange, value, className = '', ...props }, ref) {
    const input = ref ? ref : useRef();

    return (
        <div>
            <input
                {...props}
                onChange={onChange}
                value={value ?? ``}
                className={`border-0 bg-transparent w-full text-center ring-0 ${className}`}
                ref={input}
            />
        </div>
    );
});

export default (props) => {

    const { data, setData, errors, nextTab  } = props;

    console.log(data)

    const canvaTriggerRef = useRef(null)

    useEffect(() => {
        if (canvaTriggerRef.current && data.oda.triggers) {
            setTimeout(() => {
                canvaTriggerRef.current.simulateDrawingLines({ lines: data.oda.triggers, immediate: true })
            }, 150)
        }
    }, [canvaTriggerRef])


    const canvaViscerRef = useRef(null)

    useEffect(() => {
        if (canvaViscerRef.current && data.oda.viscers) {
            setTimeout(() => {
                canvaViscerRef.current.simulateDrawingLines({ lines: data.oda.viscers, immediate: true })
            }, 150)
        }
    }, [canvaViscerRef])

    return <>
        <div className={`bg-blue-80 rounded-lg p-5`}>
            <div className="font-medium mb-2">Мануально-мышечное тестирование во время обращения:</div>
            <table className="table-auto w-full mb-16">
                <thead>
                    <tr>
                        <th rowSpan={2} className="min-w-[200px]"></th>
                        <Th colSpan={2}>Шаг</Th>
                        <Th colSpan={2}>Патолог. шаг</Th>
                        <Th colSpan={2}>Провокация</Th>
                        <Th colSpan={2}>Постура</Th>
                    </tr>
                    <tr>
                        <Th>Левая</Th>
                        <Th>Правая</Th>
                        <Th>Левая</Th>
                        <Th>Правая</Th>
                        <Th>Левая</Th>
                        <Th>Правая</Th>
                        <Th>Левая</Th>
                        <Th>Правая</Th>
                    </tr>
                </thead>
                <tbody>


                    {[
                        {
                            title: 'Стоя', names: [
                                'm1standleft',
                                'm1standright',
                                'm2standleft',
                                'm2standright',
                                'm3standleft',
                                'm3standright',
                                'm4standleft',
                                'm4standright',
                            ]
                        },
                        {
                            title: 'Сидя', names: [
                                'm1sitleft',
                                'm1sitright',
                                'm2sitleft',
                                'm2sitright',
                                'm3sitleft',
                                'm3sitright',
                                'm4sitleft',
                                'm4sitright',
                            ]
                        },
                        {
                            title: 'Лежа', names: [
                                'm1lieleft',
                                'm1lieright',
                                'm2lieleft',
                                'm2lieright',
                                'm3lieleft',
                                'm3lieright',
                                'm4lieleft',
                                'm4lieright',
                            ]
                        }
                    ].map((cat, cdx) => <tr key={cdx}>
                        <Th className="text-left">{cat.title}</Th>
                        {cat.names.map(name => <Td key={name}>
                            <Input name={name} value={data.oda[name]}
                                onChange={e => setData(prev => {
                                    const data = { ...prev }
                                    data.oda[name] = e.target.value
                                    return data
                                })} />
                        </Td>)}
                    </tr>)}
                </tbody>
            </table>
            <div className="font-medium mb-4">Осмотр ОДА:</div>
            <div className="grid grid-cols-4 gap-8 mb-6">
                <div className="w-[226px] bg-white rounded overflow-hidden">
                    <div className="h-[304px] relative bg-center bg-cover" style={{ backgroundImage: `url('${P1}')` }}>

                    </div>
                </div>
                <div className="rounded overflow-hidden">
                    <div className="h-[304px] w-[226px] bg-white relative bg-center bg-cover" style={{ backgroundImage: `url('${P2}')` }}>

                    </div>
                </div>
                <div className="rounded overflow-hidden">
                    <div className="h-[304px] w-[226px] bg-white relative bg-center bg-cover" style={{ backgroundImage: `url('${P3}')` }}>

                    </div>
                </div>
                <div className="rounded overflow-hidden">
                    <div className="h-[304px] w-[226px] bg-white relative bg-center bg-cover" style={{ backgroundImage: `url('${P4}')` }}>

                    </div>
                </div>
                <div className="rounded overflow-hidden">
                    <div className="h-[226px] w-[226px] bg-white relative bg-center bg-cover" style={{ backgroundImage: `url('${P5}')` }}>

                    </div>
                    <div className="font-medium my-2">ШОП</div>
                </div>
                <div className="rounded overflow-hidden">
                    <div className="h-[226px] w-[226px] bg-white relative bg-center bg-cover" style={{ backgroundImage: `url('${P5}')` }}>

                    </div>
                    <div className="font-medium my-2">ПОП</div>

                </div>
            </div>


            <div className="mb-8">
                <div className="text-sm font-medium mb-2">Неврологические симптомы</div>
                <textarea
                    placeholder="Введите текст"
                    value={data.oda.nevrology ?? ``}
                    onChange={e => setData(prev => {
                        const data = { ...prev }
                        data.oda.nevrology = e.target.value
                        return data
                    })}
                    className="w-full border-0 rounded grow text-xs h-24"
                />
            </div>
            <div className="mb-8">
                <div className="font-medium mb-2">Координация/баланс:</div>
                <table className="table-auto w-full mb-16">
                    <thead>
                        <tr>
                            <Th>т. Ромберга (баланс)  </Th>
                            <Th>т. Фукунда (координация) </Th>
                            <Th>Зрительно-моторный тест</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            [
                                'coordrom1',
                                'coordfuk1',
                                'coordzm1',
                            ], [
                                'coordrom2',
                                'coordfuk2',
                                'coordzm2',
                            ]
                        ].map((cat, cdx) => <tr key={cdx}>
                            {cat.map(name => <Td key={name}>
                                <Input name={name} value={data.oda[name]}
                                    onChange={e => setData(prev => {
                                        const data = { ...prev }
                                        data.oda[name] = e.target.value
                                        return data
                                    })} />
                            </Td>)}
                        </tr>)}
                    </tbody>
                </table>
            </div>
            <div className="mb-8 flex gap-8">
                <div className="shrink-0">
                    <div className="font-medium mb-2">Триггерные точки:</div>
                    <div className="">
                        <CanvasDraw
                            ref={canvaTriggerRef}
                            lazyRadius={0}
                            hideGrid={true}
                            hideInterface={false}
                            brushRadius={5}
                            brushColor="#3A9EAA"
                            canvasWidth={425}
                            canvasHeight={304}
                            imgSrc={P6}
                            onChange={e => setData(prev => {
                                const data = { ...prev }
                                data.oda.triggers = e.lines
                                return data
                            })}
                        />
                    </div>
                    <div className="flex justify-center gap-12 py-2 items-center">
                        <button onClick={e => canvaTriggerRef.current.undo()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                            </svg>
                        </button>
                        <button onClick={e => canvaTriggerRef.current.clear()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="shrink-0 w-[150px]">
                    <div className="font-medium mb-2 text-right whitespace-nowrap flex justify-end">
                        <div>Оценка мобильности висцер. масс:</div>
                    </div>
                    <div className="">
                        <CanvasDraw
                            ref={canvaViscerRef}
                            lazyRadius={0}
                            hideGrid={true}
                            hideInterface={false}
                            brushRadius={5}
                            brushColor="#3A9EAA"
                            canvasWidth={150}
                            canvasHeight={304}
                            imgSrc={P7}
                            onChange={e => setData(prev => {
                                const data = { ...prev }
                                data.oda.viscers = e.lines
                                return data
                            })}
                        />
                    </div>
                    <div className="flex justify-center gap-12 py-2 items-center w-[150px]">
                        <button onClick={e => canvaViscerRef.current.undo()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                            </svg>
                        </button>
                        <button onClick={e => canvaViscerRef.current.clear()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>




            <div className="">
                <div className="font-medium mb-2">Дополнения</div>

                <table className="table-auto w-full mb-16">
                    <thead>
                        <tr>
                            <Th></Th>
                            <Th>I этап</Th>
                            <Th>II этап</Th>
                            <Th>III этап</Th>
                            <Th></Th>
                            <Th>I этап</Th>
                            <Th>II этап</Th>
                            <Th>III этап</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            [
                                {
                                    title: `т. Отта (ГОП –N+4-5см/-1-2см)`, names: [
                                        'addons1I',
                                        'addons1II',
                                        'addons1III',
                                    ]
                                },
                                {
                                    title: `Плече-лопаточный (N-0см)`, names: [
                                        'addons2I',
                                        'addons2II',
                                        'addons2III',
                                    ]
                                }
                            ],
                            [
                                {
                                    title: `т. Шобера (ПОП-N+5см/-1-2см)`, names: [
                                        'addons3I',
                                        'addons3II',
                                        'addons3III',
                                    ]
                                },
                                {
                                    title: `т. Адамса (сидя пальцы-стопы) N-80-90°`, names: [
                                        'addons4I',
                                        'addons4II',
                                        'addons4III',
                                    ]
                                }
                            ],
                            [
                                {
                                    title: `Экскурсия гр.кл. (вдох/выдох N+6/-3,5см)`, names: [
                                        'addons5I',
                                        'addons5II',
                                        'addons5III',
                                    ]
                                },
                                {
                                    title: `т. Томаса`, names: [
                                        'addons6I',
                                        'addons6II',
                                        'addons6III',
                                    ]
                                }
                            ],
                            [
                                {
                                    title: `т. Матиаса (до 16 лет) N - 30 с (устойчивость осанки)`, names: [
                                        'addons7I',
                                        'addons7II',
                                        'addons7III',
                                    ]
                                },
                                {
                                    title: `Экстензия (см) (лежа)`, names: [
                                        'addons8I',
                                        'addons8II',
                                        'addons8III',
                                    ]
                                }
                            ],
                            [
                                {
                                    title: `Пальцы-пол стоя наклон влево /вправо`, names: [
                                        'addons9I',
                                        'addons9II',
                                        'addons9III',
                                    ]
                                },
                                {
                                    title: `Складка Киблера`, names: [
                                        'addons10I',
                                        'addons10II',
                                        'addons10III',
                                    ]
                                }
                            ],
                        ].map((cat, cdx) => <tr key={cdx}>
                            {cat.map((ct, ctdx) => <Fragment key={`${cdx}${ctdx}`}>
                                <Th className={`text-left`}>{ct.title}</Th>
                                {ct.names.map(name => <Td key={name}>
                                    <Input name={name} value={data.oda[name]}
                                        onChange={e => setData(prev => {
                                            const data = { ...prev }
                                            data.oda[name] = e.target.value
                                            return data
                                        })} />
                                </Td>)}
                            </Fragment>)}
                        </tr>)}
                    </tbody>
                </table>
            </div>

            <div className="mb-12">
                <div className="font-medium mb-2">Заключение</div>
                <div className="mb-2">
                    <div className="mb-2">Мобилизация</div>
                    <textarea
                        placeholder="Введите текст"
                        value={data.oda.mobilisation ?? ``}
                        onChange={e => setData(prev => {
                            const data = { ...prev }
                            data.oda.mobilisation = e.target.value
                            return data
                        })}
                        className="w-full border-0 rounded grow text-xs h-24 "
                    />
                </div>
                <div className="mb-2">
                    <div className="mb-2">Стабилизация</div>
                    <textarea
                        placeholder="Введите текст"
                        value={data.oda.stabilization ?? ``}
                        onChange={e => setData(prev => {
                            const data = { ...prev }
                            data.oda.stabilization = e.target.value
                            return data
                        })}
                        className="w-full border-0 rounded grow text-xs h-24 "
                    />
                </div>
                <div className="mb-2">
                    <div className="mb-2">Укрепление</div>
                    <textarea
                        placeholder="Введите текст"
                        value={data.oda.strengthening ?? ``}
                        onChange={e => setData(prev => {
                            const data = { ...prev }
                            data.oda.strengthening = e.target.value
                            return data
                        })}
                        className="w-full border-0 rounded grow text-xs h-24 "
                    />
                </div>
            </div>








            <div className="mb-12">
                <div className="font-medium mb-2">Тесты (Kraus-Weber) на состоятельность мышц таза и туловища</div>

                <table className="table-auto w-full mb-16">
                    <thead>
                        <tr>
                            {[
                                {
                                    title: `N - 10 сек на 25°`,
                                    img: I1
                                },
                                {
                                    title: `N - 90°`,
                                    img: I2
                                },
                                {
                                    title: `N`,
                                    img: I3
                                },
                                {
                                    title: `N - 10 сек`,
                                    img: I4
                                },
                                {
                                    title: `N`,
                                    img: I5
                                },
                                {
                                    title: `N – 0 см`,
                                    img: I6
                                },
                            ].map((i, idx) => <Th key={`d${idx}`} className={`text-left align-top h-[120px] relative w-1/6`}>
                                <div className="w-1/2">{i.title}</div>
                                <div className="w-[160px] h-[70px] bg-no-repeat bg-bottom bg-contain absolute bottom-0 mb-2" style={{ backgroundImage: `url('${i.img}')` }}></div>
                            </Th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(i => <tr key={`c${i}`}>
                            {[0, 1, 2, 3, 4, 5].map(j => <Td key={`cc${i}${j}`}>
                                <Input name={`kraus[${i}][${j}]`} value={data.oda.kraus && data.oda.kraus[j] ? data.oda.kraus[j][i] : ``}
                                    onChange={e => setData(prev => {
                                        const data = { ...prev }
                                        if (!data.oda.kraus[j]) data.oda.kraus[j] = [];
                                        data.oda.kraus[j][i] = e.target.value
                                        return data
                                    })} />
                            </Td>)}
                        </tr>)}
                    </tbody>
                </table>
                <table className="table-auto w-full mb-16">
                    <thead>
                        <tr>
                            {[
                                {
                                    title: ``
                                },
                                {
                                    title: `ЛГ`
                                },
                                {
                                    title: `МФР`
                                },
                                {
                                    title: `PNF`
                                },
                                {
                                    title: `ПИР`
                                },
                                {
                                    title: `SEAS`
                                },
                                {
                                    title: `Schrott`
                                },
                            ].map((i, idx) => <Th key={`d${idx}`}>{i.title}</Th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => <tr key={`c${i}`}>
                            {[0, 1, 2, 3, 4, 5, 6].map(j => <Td key={`cc${i}${j}`}>
                                {j ? <Input name={`webber[${i}][${j - 1}]`} value={data.oda.webber && data.oda.webber[j - 1] ? data.oda.webber[j - 1][i] : ``}
                                    onChange={e => setData(prev => {
                                        const data = { ...prev }
                                        if (!data.oda.webber[j - 1]) data.oda.webber[j - 1] = [];
                                        data.oda.webber[j - 1][i] = e.target.value
                                        return data
                                    })} /> : <div className="px-8">{i + 1}</div>}
                            </Td>)}
                        </tr>)}
                    </tbody>
                </table>
            </div>





        </div>
        <div className={`flex justify-end py-8`}>
            <PrimaryButton size="sm" onClick={() => nextTab()}>Далее</PrimaryButton>
        </div>
    </>
}
