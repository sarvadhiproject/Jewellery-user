import React, { Suspense, useState } from 'react';
import NavbarPage from '../../components/Navbar/Navbar_Page';
import Footer from '../../components/Footer/footer';
import Section from '../Indexmain/component/section';
import Bestseller from '../../components/bestseller/Best_Products';
import Trending from '../../components/trending/Trend_product';
import Contact from '../../components/Contact/contact';
import ReviewPage from '../../components/review/ReviewPage';

import banner1 from "../../assets/images/banner1.png";
import banner2 from "../../assets/images/banner2.png";
import banner3 from "../../assets/images/banner3.png";
import banner4 from "../../assets/images/banner4.png";
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
    const [activeComponent, setActiveComponent] = useState(null);
    const slides1 = [
        { image: banner1, link: "#" }, 
        { image: banner2, link: "#" }, 
    ];

    const slides2 = [
        { image: banner3, link: "#" }, 
        { image: banner4, link: "#" }, 
    ];

    return (
        <React.Fragment>
            <Suspense fallback={<Loader />}>
                <NavbarPage setActiveComponent={setActiveComponent} />
                <Section slides={slides1} />
                <Category />
                <Bestseller />
                <Trending />
                <Section slides={slides2} />
                <ReviewPage />
                <Contact />
                <Footer />
            </Suspense>
        </React.Fragment>
    );
};

export default HomePage;