import React from "react";
import styles from "@/Styles/Account_Verified.module.css";
import Account from "@/public/Account.png";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.account_image}>
          <Image src={Account} alt="Account image" />
        </div>
        <div className={styles.text}>
          <h1>Account Verified!</h1>
          <p>Congratulations! You have successfully verified your account.</p>
        </div>
        <div className={styles.account_button}>
        <Link href="/signin"><button >OK</button></Link>
        </div>
      </div>
    </div>
  );
};

export default page;
