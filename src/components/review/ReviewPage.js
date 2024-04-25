import React, { Component } from 'react';
import CustomerLove from './CustomerLove'; 
import hardik from "../../assets/images/clients/hardikp.jpeg";
import maitreya from "../../assets/images/clients/maitreyap.jpeg";

import Solitaire from "../../assets/images/bestseller/Solitaire.jpg";



class ReviewPage extends Component {
    render() {
        return (
            <div>
                <CustomerLove reviews={[
                    {
                        profilePicture: hardik,
                        customerName: 'Hardik Ananwala',
                        review: `A diamond toggle bracelet was my very first purchase at BlueStone. I was so impressed by BlueStone's designs and their commitment to making the purchase as smooth as possible that I enrolled for the Gold Mine 10 + 1 Plan and have been a regular ever since!`,
                        productImage: Solitaire,
                        productName: 'Solitaire Bracelets'
                    },
                    {
                        profilePicture: maitreya,
                        customerName: 'Maitreya Korekar',
                        review: `A diamond toggle bracelet was my very first purchase at BlueStone. I was so impressed by BlueStone's designs and their commitment to making the purchase as smooth as possible that I enrolled for the Gold Mine 10 + 1 Plan and have been a regular ever since!`,
                        productImage: Solitaire,
                        productName: 'Solitaire Bracelets'
                    },
                ]} />
            </div>
        );
    }
}

export default ReviewPage;
