import React, { useState, useEffect, Suspense } from 'react';
import HomePage from './HomePage';

const IndexMain = () => {
    const [pos, setPos] = useState(document.documentElement.scrollTop);

    useEffect(() => {
        const scrollNavigation = () => {
            var scrollup = document.documentElement.scrollTop;
            if (scrollup > pos) {
            } else {
            }
            setPos(scrollup);
        };

        window.addEventListener("scroll", scrollNavigation, true);
        return () => {
            window.removeEventListener("scroll", scrollNavigation, true);
        };
    }, [pos]);

    const Loader = () => {
        return (
            <div id="preloader">
                <div id="status">
                    <div className="spinner">Loading...</div>
                </div>
            </div>
        );
    };

    return (
        <React.Fragment>
            <Suspense fallback={<Loader />} >
                <HomePage />
            </Suspense>
        </React.Fragment>
    );
};

export default IndexMain;
