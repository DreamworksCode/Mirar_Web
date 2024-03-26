import React from "react";
import styles from "@/Styles/Account_Verified.module.css";
import Card from "@/public/Card.png";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.account_image}>
          <Image src={Card} alt="Card image" />
        </div>
        <div className={styles.text}>
          <h1>Card added!</h1>
          <p>Now you can freely pay and shop, enjoy!</p>
        </div>
        <div className={styles.account_button}>
        <Link href="/welcome"><button >PAY NOW</button></Link>
        </div>
      </div>
    </div>
  );
};

export default page;
