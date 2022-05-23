import React from 'react';
import HeroBanner from './HeroBanner';
import './Home.css'
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
                <ShowParts></ShowParts>
            </div>
            
        </div>
    );
};

export default Home;