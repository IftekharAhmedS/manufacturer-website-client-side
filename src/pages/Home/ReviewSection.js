import React, { useEffect, useState } from "react";
import ReviewCards from "./ReviewCards";

const ReviewSection = () => {
  const [review, setReview] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/reviews", {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessKey")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, []);
  return (
    <div className="review-cards grid grid-cols-1 sm:grid-cols-3 gap-6 mx-auto w-10/12">
        {review.map(data => <ReviewCards key={data._id} data={data}></ReviewCards>)}
    </div>
  );
};

export default ReviewSection;
