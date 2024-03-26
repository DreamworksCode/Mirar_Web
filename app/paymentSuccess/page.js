import Image from "next/image";
import React from "react";
import paymentMobile from "@/public/payment_mobile.png";
import styles from "@/Styles/PaymentSuccess.module.css";
import Shine from "@/public/Shine.png";
import Star from "@/public/Star.png";
import Welcome from "@/public/WelcomePageDesktop.png";
const page = () => {
  return (
    <>
      <div className={styles.container}>
        <Image src={Welcome} alt="Welcome image" />
        <div className={styles.star_container}>
          <div className={styles.shine_image}>
            <Image src={Shine} alt="Shine Image"/>
          </div>
          <div className={styles.star_image}>
            <Image src={Star} alt="Star image" />
          </div>
        </div>
      </div>
      <div className={styles.mobile_container}>
        <div className={styles.mobile_image_container}>
          <Image src={paymentMobile} alt="Payment Mobile Image" />
          <div className={styles.mobile_star_container}>
            <div className={styles.mobile_shine_image}>
              <Image src={Shine} alt="Shine Image"/>
            </div>
            <div className={styles.mobile_star_image}>
              <Image src={Star} alt="star Image" />
            </div>
          </div>
          <div className={styles.mobile_text_container}>
            <h1>You’re now subscribed to monthly access!</h1>
            <p>
              Get ready for endless chats and exclusive content. Dive in and
              enjoy the ultimate fan experience!
            </p>
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
