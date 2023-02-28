import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { Otp } from "../Redux/Actions/userActions";
import Header from "./../components/Header";

const OTP = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [Otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(OTP(OTP));
  };

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}

        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <input
         
            type="Number"
            placeholder="OTP"
            value={Otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button type="submit">Submit</button>
          <p>
            <Link to={redirect ? `/getOTP?redirect=${redirect}` : "/getOTP"}>
              Didn't Recieve yet<strong>Resend it</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default OTP;