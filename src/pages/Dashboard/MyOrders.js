import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import auth from "../../firebase.init";

const MyOrders = () => {
  const [user, loading, error] = useAuthState(auth);
  const [purchaseData, setPurchaseData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      fetch(
        `https://manufacturer-site.herokuapp.com/purchase?email=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessKey")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => setPurchaseData(data));
    }
  }, [user]);

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Do you really want to cancel the order?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const { data } = await axios.delete(
          `https://manufacturer-site.herokuapp.com/purchase/${id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessKey")}`,
            },
          }
        );
        if (data.deletedCount > 0) {
          const filterItems = purchaseData.filter((item) => item._id !== id);
          setPurchaseData(filterItems);
        }

        swal("Your order has been canceled", {
          icon: "success",
        });
      } else {
        swal("Your order is safe", {
          icon: "error",
        });
      }
    });
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Product</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Status</th>
            <th>Transaction ID</th>
          </tr>
        </thead>
        <tbody>
          {purchaseData.map((purchases) => (
            <tr key={purchases._id}>
              <td>
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="font-bold">{purchases?.partName}</div>
                  </div>
                </div>
              </td>
              <td>{purchases?.minimum}x</td>
              <td>${purchases?.partPrice}</td>
              <td>
                {(purchases.status === "unpaid" && (
                  <div className="badge badge-md badge-error ">
                    {purchases?.status}
                  </div>
                )) ||
                  (purchases.status === "paid" && (
                    <div className="badge badge-md badge-success ">
                      {purchases?.status}
                    </div>
                  )) ||
                  (purchases.status === "pending" && (
                    <div className="badge badge-md badge-warning ">
                      {purchases?.status}
                    </div>
                  ))}
              </td>
              <th>
                {purchases.status === "pending" ? (
                  <>
                    <p>{purchases?.transactionId}</p>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        navigate(`/dashboard/payment/${purchases._id}`)
                      }
                      className="btn btn-primary btn-md"
                    >
                      Pay now
                    </button>
                    <button
                      onClick={() => handleDelete(purchases._id)}
                      className="btn btn-warning btn-md ml-2"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
