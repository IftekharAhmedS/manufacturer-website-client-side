import React from 'react';
import HeroBanner from './HeroBanner';
import './Home.css'
import Stats from './Stats';

const Home = () => {
    return (
        <div>
            <HeroBanner></HeroBanner>
            <div className="stat-area flex justify-center my-6">
                <Stats></Stats>
            </div>
            
        </div>
    );
};

export default Home;