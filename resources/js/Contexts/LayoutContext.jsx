import React, { useState, useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { Inertia } from "@inertiajs/inertia";
import numberFormat from "./numberFormat"
import moment from 'moment';
import ru from "./moment.ru"
moment.locale('ru', ru);

const LayoutContext = React.createContext();

LayoutContext.propTypes = {
    children: PropTypes.element.isRequired
};


const LayoutProvider = (props) => {
    const { children } = props

    const [mobile, setMobile] = useState(false)

    const [flash, setFlash] = useState(null)
    const [modal, setModal] = useState(null)

    const checkMobile = () => {
        const windowInnerWidth = window.innerWidth
        const windowtInnerHeight = window.innerWidth
        if (windowInnerWidth < 1024) {
            setMobile(true)
        } else {
            setMobile(false)
        }
    }

    const getWeekNumber = (currentDate = new Date()) => {
        let startDate = new Date(currentDate.getFullYear(), 0, 1);
        let days = Math.floor((currentDate - startDate) /
            (24 * 60 * 60 * 1000));
        let weekNumber = Math.floor(days / 7);
        return weekNumber;
    }

    const numWord = (value, words) => {
        value = Math.abs(value) % 100;
        var num = value % 10;
        if (value > 10 && value < 20) return words[2];
        if (num > 1 && num < 5) return words[1];
        if (num == 1) return words[0];
        return words[2];
    }

    const age = (patient) => {
        if(!patient.age) return "";
        return patient.age + ` ` + numWord(patient.age, [`год`, `года`, `лет`])
    }

    useEffect(() => {
        checkMobile()
        if (document.addEventListener) {
            window.addEventListener('resize', checkMobile)
        }
        return () => {
            if (document.addEventListener) {
                window.removeEventListener('resize', checkMobile)
            }
        };
    }, []);

    const zeroPad = (num, places) => String(num).padStart(places, '0')

    const priceFormat = (price) => {
        return (numberFormat(price, 0, ',', ' ') + ' ₸');
    }

    const [location, setLocation] = useState(window.document.location)

    Inertia.on('finish', (event) => {
    })

    Inertia.on('start', (event) => {
    })

    return <LayoutContext.Provider
        value={{
            mobile,
            location,
            setFlash,
            setModal,
            zeroPad,
            age,
            numWord,
            moment,
            priceFormat,
            getWeekNumber
        }}
    >
        <div className={`h-screen min-h-[30rem]`}>
            {children}
        </div>
        {

            modal ? <div className={`flex items-center justify-center fixed overflow-y-auto top-0 left-0 w-full h-full bg-black bg-opacity-50 z-100`} onClick={() => setModal(null)} >
                <div className={`mx-2 relative mx-auto max-h-screen py-8 px-8 bg-white rounded-2xl flex flex-col justify-center`} onClick={(e) => {
                    document.dispatchEvent(new Event('clickinmodal'))
                    e.stopPropagation()
                }}>
                    <div>
                        {modal}
                    </div>
                </div>
            </div> : ``
        }
    </LayoutContext.Provider>
}

const useLayout = () => {
    const context = React.useContext(LayoutContext);

    if (context === undefined) {
        throw new Error(`useLayout must be used within a LayoutProvider`);
    }

    return context;
}

export { LayoutProvider, useLayout };
