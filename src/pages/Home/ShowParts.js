import React from 'react';
import PartCards from '../../components/PartCards/PartCards';
import useGetParts from '../../hooks/useGetParts';

const ShowParts = () => {
    const [parts] = useGetParts()
    return (
        <div>
            <div className="item-cards grid grid-cols-1 sm:grid-cols-3  gap-6 mx-auto w-10/12">
                {parts.map(data => <PartCards key={data._id} data={data}></PartCards>)}
            </div>
        </div>
    );
};

export default ShowParts;