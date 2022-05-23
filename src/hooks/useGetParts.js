import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useGetParts = () => {
    const [parts, setParts] = useState([]);
    useEffect(()=>{
        const getItems = async () => {
            const { data } = await axios.get('http://localhost:5000/parts', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessKey')}`
                }
            });
            setParts(data)
        }
        getItems()
    }, [])
    return [parts];
};

export default useGetParts;