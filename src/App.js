import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import AddNewParts from "./pages/AddNewParts/AddNewParts";
import AddReview from "./pages/Dashboard/AddReview";
import Dashboard from "./pages/Dashboard/Dashboard";
import MyOrders from "./pages/Dashboard/MyOrders";
import MyProfile from "./pages/Dashboard/MyProfile";
import Payment from "./pages/Dashboard/Payment";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PurchasePart from "./pages/PurchasePart/PurchasePart";
import Register from "./pages/Register/Register";

function App() {
  return (
    <div>
      <Header></Header>
      <div className="page-content min-h-screen">
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route
            path="/forget-password"
            element={<ForgetPassword></ForgetPassword>}
          ></Route>
          <Route
            path="/add-new-part"
            element={<AddNewParts></AddNewParts>}
          ></Route>
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard></Dashboard>
              </RequireAuth>
            }
          >
            <Route index element={<MyOrders></MyOrders>}></Route>
            <Route path="my-profile" element={<MyProfile></MyProfile>}></Route>
            <Route path="payment/:id" element={<Payment></Payment>}></Route>
            <Route path="add-a-review" element={<AddReview></AddReview>}></Route>
          </Route>
          <Route
            path="/purchase/:id"
            element={
              <RequireAuth>
                <PurchasePart></PurchasePart>
              </RequireAuth>
            }
          ></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
