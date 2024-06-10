import React, { Suspense } from 'react';
import Section from '../Indexmain/component/section';
import Bestseller from '../../components/ProductDisplay/Best_Products';
import Contact from '../../components/Contact/contact';
import ReviewPage from '../../components/review/ReviewPage';
import Category from '../../components/Categories/ViewCategory';
import Trending from '../../components/ProductDisplay/Trend_product';
import NewArrivals from '../../components/ProductDisplay/NewArrivals';

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
                <NewArrivals/>
                <Section startIndex={2} endIndex={4} />
                <Bestseller />
                <Trending/>
                <ReviewPage />
                <Contact />
            </Suspense>
        </React.Fragment>
    );
};

export default HomePage;