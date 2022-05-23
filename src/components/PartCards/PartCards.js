import React from "react";

const PartCards = (props) => {
  const {
    _id,
    name,
    description,
    mOrderQuantity,
    availableQuantity,
    price,
    url,
  } = props.data;
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img src={url} alt="parts" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{`${description.slice(0,250)}...`}</p>
        <p className="font-semibold text-xl">${price}</p>
        <p className="font-semibold">Minimum order quantity: {mOrderQuantity} piece</p>
        <p className="font-semibold">Available: {availableQuantity} piece</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default PartCards;
