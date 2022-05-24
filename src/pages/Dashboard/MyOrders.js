import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const MyOrders = () => {
  const [user, loading, error] = useAuthState(auth);
  const [purchaseData, setPurchaseData] = useState([]);
  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/purchase?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setPurchaseData(data));
    }
  }, [user]);
  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Product</th>
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
              <td>
                ${purchases?.partPrice}
              </td>
              <td>{(purchases.status === 'unpaid' && <div className="badge badge-md badge-error ">{purchases?.status}</div>) || (purchases.status === 'paid' && <div className="badge badge-md badge-success ">{purchases?.status}</div>) || (purchases.status === 'pending' && <div className="badge badge-md badge-warning ">{purchases?.status}</div>) }</td>
              <th>
                <button className="btn btn-primary btn-md">Pay now</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
