import React from 'react'
import styles from '@/Styles/Chat.module.css';
import Mirar from '@/public/WhiteMirarLogo.png';
import Image from 'next/image';
import NavHome from '@/public/Chat/navHome.png';
import NavNotifcs from '@/public/Chat/NavNotifs.png';
import NavMessages from '@/public/Chat/NavMessages.png';
import NavSubscription from '@/public/Chat/NavSubscription.png';
import NavProfile from '@/public/Chat/NavProfile.png';

const Navbar = () => {
  return (
    <div className={styles.navbar_container}>
      <div className={styles.mirar_logo}><Image src={Mirar}/></div>
      <div className={styles.nav_items}>
        <div><Image src={NavHome} alt='Navigation items'/></div>
        <div><Image src={NavNotifcs} alt='Navigation items'/></div>
        <div><Image src={NavMessages} alt='Navigation items'/></div>
        <div><Image src={NavSubscription} alt='Navigation items'/></div>
        <div><Image src={NavProfile} alt='Navigation items'/></div>
      </div>
    </div>
  )
}

export default Navbar
