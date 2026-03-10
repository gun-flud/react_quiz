import { createContext, useContext, useEffect, useMemo, useState } from "react";

const SCREENSIZE = Object.freeze({
    mobile: 768,
    tablet: 1024,
    desktop: 1280,
});

const ResponsiveContext = createContext(null);

const isClient = typeof window !== "undefined";
const windowWidth = isClient ? window.innerWidth : 0;

//робимо перерви між перевірками
const debounce = (fn, delay = 150) => {
    let timeoutId;

    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

const ResponsiveProvider = ({ children, delay = 150 }) => {
    const [width, setWidth] = useState(windowWidth);

    useEffect(() => {
        if (!isClient) return;

        const handleResize = debounce(() => {
            setWidth(window.innerWidth);
        }, delay);
        setWidth(window.innerWidth);

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [delay]);

    const value = useMemo(() => {
        return {
            width,
            isMobile: width < SCREENSIZE.mobile,
            isTablet: width >= SCREENSIZE.mobile && width < SCREENSIZE.tablet,
            isDesktop: width >= SCREENSIZE.tablet,
        };
    }, [width]);

    return (
        <ResponsiveContext.Provider value={value}>
            {children}
        </ResponsiveContext.Provider>
    );
};

const useResponsive = () => {
    const context = useContext(ResponsiveContext);

    if (context === null) {
        throw new Error(
            "useResponsive must be used within a ResponsiveProvider"
        );
    }
    return context;
};

export { ResponsiveProvider, useResponsive, SCREENSIZE };