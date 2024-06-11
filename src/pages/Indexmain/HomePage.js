import React, { Suspense } from 'react';
import Section from '../Indexmain/component/section';
import Bestseller from '../../components/ProductDisplay/Best_Products';
import Contact from '../../components/Contact/contact';
import Category from '../../components/Categories/ViewCategory';
import Trending from '../../components/ProductDisplay/Trend_product';
import NewArrivals from '../../components/ProductDisplay/NewArrivals';
import CustomerLove from '../../components/review/CustomerLove';

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
                <Section startIndex={0} endIndex={2} category={'general'}/>
                <Category />
                <NewArrivals/>
                <Section startIndex={2} endIndex={4} category={'general'} />
                <Bestseller />
                <Trending/>
                <CustomerLove/>
                <Contact />
            </Suspense>
        </React.Fragment>
    );
};

export default HomePage;