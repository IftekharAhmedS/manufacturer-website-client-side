import React from 'react';
import HeroBanner from './HeroBanner';
import './Home.css'
import ReviewSection from './ReviewSection';
import ShowParts from './ShowParts';
import Stats from './Stats';

const Home = () => {
    return (
        <div>
            <HeroBanner></HeroBanner>
            <div className="stat-area flex justify-center my-6">
                <Stats></Stats>
            </div>
            <div className="part-cards-area">
                <h1 className='text-center text-3xl my-4 font-semibold underline'>Our Collection</h1>
                <ShowParts></ShowParts>
            </div>
            <div className="review-cards-area my-6">
                <h1 className='text-center text-3xl my-4 font-semibold underline'>Our Reviews</h1>
                <ReviewSection></ReviewSection>
            </div>
        </div>
    );
};

export default Home;