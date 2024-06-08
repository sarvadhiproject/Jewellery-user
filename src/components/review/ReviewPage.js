import React, { Component } from 'react';
import CustomerLove from './CustomerLove'; 


class ReviewPage extends Component {
    render() {
        return (
            <div>
                <CustomerLove reviews={[
                    {
                        customerName: 'Lissa Jhon',
                        review: `A diamond toggle bracelet was my very first purchase at BlueStone. I was so impressed by BlueStone's designs and their commitment to making the purchase as smooth as possible that I enrolled for the Gold Mine 10 + 1 Plan and have been a regular ever since!`,
                    },
                    {
                        customerName: 'Nachiket Patel',
                        review: `A diamond toggle bracelet was my very first purchase at BlueStone. I was so impressed by BlueStone's designs and their commitment to making the purchase as smooth as possible that I enrolled for the Gold Mine 10 + 1 Plan and have been a regular ever since!`,
                    },
                ]} />
            </div>
        );
    }
}

export default ReviewPage;
