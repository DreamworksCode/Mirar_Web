import React from "react";
import WelcomeDesktop from "@/public/WelcomePageDesktop.png";
import WelcomeMobile from "@/public/WelcomePageMobile.png";
import Image from "next/image";
import Logo from "@/public/Mirar_Logo.png";
import styles from "@/Styles/Welcome.module.css";
import Link from "next/link";
import { urbanistRegular,urbanistBold } from "../fonts";
const page = () => {
  return (
    <>
      <div className="hidden sm:block md:block lg:block xl:block 2xl:block">
        <div className={styles.welcome_image_container}> 
          <Image src={WelcomeDesktop} className={styles.welcome_image} alt="Welcome image desktop"/>
        </div>
        <div className={styles.welcome_content}>
          <div className={urbanistRegular.className}>Welcome to</div>
          <div >
            <Image className={styles.image} src={Logo} alt="Mirar logo" />
          </div>
          <div>
            <Link href="/chatWeb"><button className={urbanistBold.className}>START</button></Link>
          </div>
        </div>
      </div>
      <div className=" sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden"> 
        <div>
          <Image src={WelcomeMobile} alt="Welcome image mobile" />
        </div>
        <div className={styles.mobile_welcome_content}>
          <div>Welcome to</div>
          <div className={styles.mobile_image}>
            <Image src={Logo} alt="Mirar logo mobile" />
          </div> 
        </div>
        <div className={`${styles.start_button} ${urbanistBold.className}`}>
            <button><Link href="/chatWeb">Start</Link></button>
        </div>
      </div>
    </>
  );
};

export default page;
