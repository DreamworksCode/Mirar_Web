"use client"
import React, { useEffect, useRef, useState } from "react";
import "./TestVerify.css";
import MirarCover from '@/public/Mirar-Cover@3x.png';
import MirarVertical from '@/public/Mirar_Vertical_Logo.png';
import Error from '@/public/errors.png';
import WelcomeAboard from '@/public/Welcome_aboard.png';
import Image from "next/image";
import { getEmailVerifyService } from "@/app/Services/Services";
import { useSearchParams } from 'next/navigation';


const Page = ({params}) => {
  const { token } = params;
  console.log(token);
  const [verified, setVerified] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState("pending"); // Possible values: "pending", "success", "expired"
  const [error, setErrors] = useState("");
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      getVerifyEmail();
    }
  }, []);

  const getVerifyEmail = async () => {
    try {
      const res = await getEmailVerifyService(token);
      console.log(res.data);
      if (res.data.statusCode === 200) {
        setVerificationStatus("success");
      } else {
        setVerificationStatus("expired");
      }
    } catch (err) {
      setVerificationStatus("expired");
      setErrors("This link has been expired");
      console.log(err);
    }
  };

  return (
    <>
      {verificationStatus === "success" ? (
        verified ? (
          <>
            <div className="laptop_varient">
              <div className="image_container">
                <Image
                  className="mirar-cover"
                  src={MirarCover}
                  alt="The cover pic for Mirar page"
                />
                <div className="mirar_container">
                  <Image
                    className="mirar-logo"
                    src={MirarVertical}
                    alt="The logo of our Mirar app"
                  />
                  <div className="account-verified-text">Account Verified!</div>
                </div>
              </div>
              <div className="text-container">
                <div className="bottom_text">
                  Congratulations! You have successfully verified your account
                </div>
                <button className="app_button">
                  <a href="https://devapi.mirar.ai">Go to App</a>
                </button>
              </div>
            </div>
            <div className="mobile_varient">
              <div className="mobile_top_cover">
                <img
                  className="mobile-mirar-cover"
                  src="../../../assets/images/Banner Welcome Fan@3x.png"
                  alt="The cover pic for Mirar page"
                />
                <div className="mobile_verified">
                  <img
                    className="mobile_mirar_logo"
                    src="../../../assets/images/Mirar_Vertical_Logo.png"
                    alt="The logo of our Mirar app"
                  />
                  <div className="mobile_verified_text">Account Verified!</div>
                </div>
              </div>
              <div className="mobile_text-container">
                <div className="mobile_bottom_text">
                  Congratulations! You have successfully verified your account
                </div>
                <button className="mobile_app_button">
                  <a href="https://devapi.mirar.ai">Go to App</a>
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className=" poppins-medium">
              <div className="wc_top">
                <Image
                  src={WelcomeAboard}
                  alt="Image"
                />
                <div className="wc_welcome">
                  <div className="account-verified-text">Welcome aboard!</div>
                  <Image
                    className="mirar-logo"
                    src={MirarVertical}
                    alt="The logo of our Mirar app"
                  />
                </div>
              </div>
              <div className="wc_content">
                <div>
                  <p>Hello Donald,</p>
                  <p>
                    Welcome aboard! You’re almost ready to explore endless
                    conversations on Mirar. We just need to confirm it’s really
                    you:
                  </p>
                  <div>
                    <button 
                    onClick={() => setVerified(true)}
                    >
                      VERIFY EMAIL ADDRESS
                    </button>
                  </div>
                  <p>
                    By verifying your email, you’re stepping into a world of
                    unparalleled connection with AI companions tailored just for
                    you. If you have any questions or need a bit of guidance,
                    we’re here for you.
                  </p>
                  <p>
                    Welcome to the future of interaction, where every
                    conversation is an adventure.
                  </p>
                  <p>Warm regards,</p>
                  <h3>The Mirar Team</h3>
                </div>
              </div>
            </div>
          </>
        )
      ) : verificationStatus === "expired" ? (
        <>
          <div className="error_box">
            <Image src={Error} alt="Error icon" />
            <br />
            <h2 className="maintitle AthleticsFont">
              Verification Link Expired!
            </h2>
            <p className="mainDescription AthleticsFont">{error}</p>
          </div>
        </>
      ) : (
        <div>Deletedcontent</div>
      )}
    </>
  );
};

export default Page;
