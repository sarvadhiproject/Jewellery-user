import React, { Suspense } from 'react';
import Section from '../Indexmain/component/section';
// import Bestseller from '../../components/bestseller/Best_Products';
import Trending from '../../components/trending/Trend_product';
import Contact from '../../components/Contact/contact';
import ReviewPage from '../../components/review/ReviewPage';
import Category from '../../components/Categories/ViewCategory';

const Loader = () => {
    return (
        <div id="preloader">
            <div id="status">
                <div className="spinner">Loading...</div>
            </div>
        </div>
    );
};

const HomePage = () => {
    return (
        <React.Fragment>
            <Suspense fallback={<Loader />}>
                <Section startIndex={0} endIndex={2} />
                <Category />
                {/* <Bestseller /> */}
                <Trending />
                <Section startIndex={2} endIndex={4} />
                <ReviewPage />
                <Contact />
            </Suspense>
        </React.Fragment>
    );
};

export default HomePage;