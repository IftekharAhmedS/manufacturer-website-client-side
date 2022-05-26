import React from 'react';

const Portfolio = () => {
    return (
        <div className='text-center'>
            <h1 className='text-2xl text-center'>Iftekhar Ahmed Santonu</h1>
            <p>ahamedsantonu@gmail.com</p>
            <h2 className='text-lg font-bold'>Technologies I know:</h2>
            <ul>
                <li>HTML5</li>
                <li>CSS3</li>
                <li>JavaScript</li>
                <li>React JS</li>
                <li>Express JS</li>
                <li>MongoDB</li>
            </ul>
            <h2 className='text-lg font-bold'>Project Links:</h2>
            <ul>
                <li><a href="https://min3rs.netlify.app">https://min3rs.netlify.app</a></li>
                <li><a href="https://warehouse-manageme-nt.web.app/">https://warehouse-manageme-nt.web.app/</a></li>
                <li><a href="https://mobile-d0kan.netlify.app">https://mobile-d0kan.netlify.app</a></li>
            </ul>
        </div>
    );
};

export default Portfolio;