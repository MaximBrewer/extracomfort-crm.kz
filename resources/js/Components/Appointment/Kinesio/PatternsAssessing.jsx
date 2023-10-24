import Grafik from "@/../img/card/kinesio/i1.png"
import { useRef } from "react";
import { useEffect } from "react";
import CanvasDraw from "react-canvas-draw";

export default (props) => {

    const { data, setData, errors } = props;

    const canvaRef = useRef(null)

    useEffect(() => {
        if (canvaRef.current && data.kinesio.patterns) {
            setTimeout(() => {
                canvaRef.current.simulateDrawingLines({ lines: data.kinesio.patterns, immediate: true })
            }, 150)
        }
    }, [canvaRef])

    return <div className={`bg-blue-80 rounded-lg p-5 mb-8`}>

        <div className="font-medium mb-4">III. Оценка паттернoв движения маленького ребенка</div>

        <CanvasDraw
            ref={canvaRef}
            lazyRadius={0}
            hideGrid={true}
            hideInterface={false}
            brushRadius={6}
            brushColor="#3A9EAA"
            canvasWidth={1047}
            canvasHeight={768}
            imgSrc={Grafik}
            onChange={e => setData(prev => {
                const data = { ...prev }
                data.kinesio.patterns = e.lines
                return data
            })}
        />
        <div className="flex justify-center gap-12 py-2 items-center">
            <button onClick={e => canvaRef.current.undo()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
            </button>
            <button onClick={e => canvaRef.current.clear()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
    </div>
}
