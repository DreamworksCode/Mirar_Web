"use client";
import React from "react";
import styles from "@/Styles/Verify_Identity.module.css";
import Verified from "@/public/Verified.png";
import Profile from "@/public/Profile.png";
import Email from "@/public/Email.png";
import Circle from "@/public/VerificationPageCircle.png";

import Image from "next/image";
import API from "../api";

const page = () => {
  // const handleSubmit = async () => {
  //   const token =
  //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNocmF2YW41MnVAZ21haWwuY29tIiwidXNlcklkIjozMCwiX2lkIjoiNjVlMTY3MGY0NmMwNmJlZDY0MDcyZjBjIiwiYWNjb3VudFR5cGUiOiJVU0VSIiwiaWF0IjoxNzExMDA3MjQ2LCJleHAiOjE3MTEzNTI4NDZ9.2wvZX8OkvETLS94RsIr7uybWIVHhOnQeHVy-qAEvbag";
  //   const influencer = "65f86e77da497c8e10868cad";
  //   try {
  //     const response = await API.getAPICalling(
  //       "/auth/getInfluencer/65f86e77da497c8e10868cad"
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.image_container}>
          <div className={styles.profile_image}>
            <Image src={Profile} alt="Profile pic image" />
          </div>

          <div className={styles.verified_image}>
            <Image src={Verified} alt="Verified icon image" />
          </div>
        </div>
        <div className={styles.text_container}>
          <h1>Verify Your Identity</h1>
          <p>
            To help you protect from fraud and identity theft, and to comply
            with federal regulations.
          </p>
          <div className={styles.verification_box}>
            <div className={styles.box_content}>
              <div className={styles.image_text}>
                <div className={styles.email_image}>
                  <Image src={Email} alt="Email icon image" />
                </div>
                <div>
                  <h1>Email</h1>
                  <p>Verify with email</p>
                </div>
              </div>
              <div className={styles.circe_image}>
                <Image src={Circle} alt="Circl image" />
              </div>
            </div>
          </div>
          <div className={styles.next_button}>
            <button >NEXT</button>
          </div>
        </div>
      </div>
      <div className={styles.mobile_container}>
        <div className={styles.mobile_image_container}>
          <div className={styles.mobile_profile_image}>
            <Image src={Profile} alt="Profile icon image" />
          </div>
          <div className={styles.mobile_verified_image}>
            <Image src={Verified} alt="Verified icon image" />
          </div>
        </div>
        <div className={styles.mobile_text_container}>
          <h1>Verify your identity</h1>
          <p>
            To help you protect from fraud and identity theft, and to comply
            with federal regulations.
          </p>
          <div className={styles.mobile_verification_box}>
            <div className={styles.box_content}>
              <div className={styles.image_text}>
                <div className={styles.email_image}>
                  <Image src={Email} alt="Email icon image" />
                </div>
                <div>
                  <h1>Email</h1>
                  <p>Verify with email</p>
                </div>
              </div>
              <div className={styles.circe_image}>
                <Image src={Circle} alt="Circle icon image" />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mobile_button}>
          <button>NEXT</button>
        </div>
      </div>
    </>
  );
};

export default page;
