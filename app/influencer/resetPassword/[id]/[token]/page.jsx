"use client";
import React, { useState } from 'react';
import './ResetPassword.css';
import { resetPasswordService } from '@/app/Services/Services';
import PasswordChangeSuccessfull from './PasswordChangeSuccessfull';
import { resetPasswordValidation } from '@/app/Validaton/Validation';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';

 
const ResetPassword = ({params}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordChangeSuccessfull, setpasswordChangeSuccessfull] = useState(false);
  const { id, token } = params;


 

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const validate = await resetPasswordValidation(password, confirmPassword);
      setErrors(validate);
      if (Object.keys(validate).length === 0) {
        const userDetails = { password, confirmPassword };
        const res = await resetPasswordService(userDetails, id, token);
        if (res.data && res.data.message) {
          setpasswordChangeSuccessfull(true);
        }
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      if (err.response ) {
        const { statusCode, message } = err.response.data;
        if (statusCode === 400 || statusCode === 403 ||statusCode === 404 || statusCode === 409 ) {
          toast.error(message, {position: toast.POSITION.TOP_RIGHT,});
          console.log(err);
        } else if (statusCode === 401) {
          toast.error(message, { position: toast.POSITION.TOP_RIGHT, });
          console.log(err);
        } else {
          console.log(err);
          toast.error(message, {position: toast.POSITION.TOP_RIGHT,});
        }
      }
    }
  };


      const isNextDisabled = () => {
        if (!password || !confirmPassword) {
          return true;
        }
        return false;
      };

  return (
    <div className="login-header">
      {passwordChangeSuccessfull ? (
        <PasswordChangeSuccessfull />
       ) : ( 
        <div className="container-fluid chooosePasswordMaincontainer">
          <div className="row chooosePasswordMaincontainerRow">
            <div className="col-md-6  mainLeftSideImage"></div>
            <div className="col-md-6 d-flex mainRightDiv">
              <div className="d-flex align-items-center inputwidthmanage">
                <div className="container mainSiteContainer">
                  <h2 className="AthleticsFont mainHeading">
                    Choose a new password
                  </h2>
                  <p className="mainDescription AthleticsFont">
                    To continue, input your new password
                  </p>
                  <form onSubmit={handleSubmit} className="edit_form">
                    <div className="mb-3 handle_input">
                      <label>Password :</label>
                      <input
                        type="password"
                        placeholder="Enter a new password"
                        className={`form-control AthleticsFont ${
                          errors.password && !password
                            ? "error-border red-placeholder"
                            : ""
                        }`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {errors && (
                      <span className="errors ">{errors.password}</span>
                    )}
                    <div className="mb-3 handle_input form-group ">
                      <label >Confirm Password :</label>
                      <input
                        type="password"
                        placeholder="Confirm your password"
                        className={`form-control form-control-lg  AthleticsFont ${
                          errors.confirmPassword && !confirmPassword
                            ? "error-border red-placeholder"
                            : ""
                        }`}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      </div>
                       {errors && (
                        <span className="errors ">
                          {errors.confirmPassword}
                        </span>
                      )}
                    <button
                      type="submit"
                      disabled={isNextDisabled()}
                      className="btn btn-primary full-width-button choosePasswordMainButton py-3 AthleticsFont"
                    >
                      Next
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
