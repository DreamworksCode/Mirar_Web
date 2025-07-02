"use client"
import React from "react";
import "./PasswordChangeSuccessfull.css";
import Success from '@/public/success.png';
import Image from "next/image";
// import { Link } from "react-router-dom";

const PasswordChangeSuccessfull = () => {
  return (
    <div className="container-fluid chooosePasswordMaincontainer">
      <div className="row chooosePasswordMaincontainerRow">
        <div className="col-md-6 mainLeftSideImage"></div>
        <div className="col-md-6 d-flex mainRightDiv">
          <div className="d-flex align-items-center inputwidthmanage">
            <div className="container passwordchangedcontainer">
              <Image
                src={Success}
                alt="Success image"
              />
              <br />
              <h2 className="maintitle AthleticsFont">Password changed!</h2>
              <p className="mainDescription AthleticsFont">
                Your password has been changed successfully.
              </p>
              {/* <p className="loginlink AthleticsFont">
                <a href="#"> Continue to Login</a>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangeSuccessfull;
