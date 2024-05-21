import React from 'react';
import styles from '@/Styles/Account_Verified.module.css';
import Email from '@/public/Email.png';
import Image from 'next/image';
import Link from 'next/link';

const page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div className={styles.account_image}>
            <Image src={Email} alt='Email icon'/>
        </div>
        <div className={styles.text}>
            <h1>Check Your Email!</h1>
            <p>We have already sent a link to your email to verify your account.</p>
        </div>
        <div className={styles.account_button}><Link href="/signin"><button>OK</button></Link></div>
      </div>
    </div>
  )
}

export default page
