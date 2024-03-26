"use client";
import Image from "next/image";
import Share from "@/public/Share icon.png";
import Fave from "@/public/Fave icon.png";
import image0 from "@/public/tiktok.png";
import image1 from "@/public/ig.png";
import image2 from "@/public/x.png";
import image3 from "@/public/OF icon.png";
import Styles from "@/Styles/Profile.module.css";
import Link from "next/link";
import API from "./api";
import { useEffect } from "react";

export default  async function Home() {
  let authToken;
  useEffect(()=>{
    authToken=localStorage.getItem('token');
  },[]);
  let content;
  const influencer = "65f91744da497c8e1086c8af";
    try {
      const response = await API.getAPICalling(
        `/auth/getInfluencer/${influencer}`
    );
    content = response.data;
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
  const images = [image0, image1, image2, image3];
  let valueOfImage0=0;
  let valueOfImage1=0;
  let valueOfImage2=0;
  let valueOfImage3=0;
  let indexOfImage0=null;
  let indexOfImage1=null;
  let indexOfImage2=null;
  let indexOfImage3=null;

 for(let i=0; i<4;i++){
  if(content.socialInfo[i] && content.socialInfo[i].type==0){
    valueOfImage0=1;
    indexOfImage0=i;
  }
  else if(content.socialInfo[i] && content.socialInfo[i].type==1){
    valueOfImage1=1;
    indexOfImage1=i;
  }
  else if(content.socialInfo[i] && content.socialInfo[i].type==2){
    valueOfImage2=1;
    indexOfImage2=i;
  }
  else if(content.socialInfo[i] && content.socialInfo[i].type==3){
    valueOfImage3=1;
    indexOfImage3=i;
  }
 }



  return (
    <div className={Styles.profile_container}>
      <div className=" TOP_BOX_PROFILE bg-[linear-gradient(180deg,#74e5e6,#367fea)] h-[220px]">
        {/* <div className="absolute top-[145px] ml-24">
          <Image src={content.avatarImageUrl} height={150} width={150} alt="Profile image" />
        </div> */}
        <div className={Styles.profile_image}>
          <Image
            src={content.avatarImageUrl}
            width={150}
            height={150}
            className={Styles.main_profile_image}
            alt="Profile image"
          />
        </div>
      </div>
      <div className="SHARE_FAVE_ICON h-[75px] ">
        <div className="flex pt-2 space-x-2 md:space-x-6 lg:space-x-6 2xl:space-x-6 xl:space-x-6 justify-end items-end md:mx-20 lg:mx-20 xl:mx-20 2xl:mx-20">
          <Image src={Fave} height={54} width={54} alt="Favourite" />
          <Image src={Share} height={54} width={54} alt="Share" />
        </div>
      </div>
      <div className="AI_DETAILS ml-24">
        <div className="text-xl font-semibold  w-[150px] text-center">
          {content.fullName}
        </div>
        <div className="font-extralight">
          {" "}
          <span className="mr-4"> {content.userName}</span>{" "}
          <span> Available Now</span>
        </div>
      </div>
      <div className={Styles.link}>
        <div className={Styles.link_images}>
          {/* <div className={Styles.images}>
            <Image src={Tiktok} alt="tiktok image" />
          </div>
          <div className={Styles.images}>
            <Image src={IG} alt="instagram image" />
          </div>
          <div className={Styles.images}>
            <Image src={X} alt="x image"/>
          </div>
          <div className={Styles.images}>
            <Image src={OF} alt="only fans image"/>
          </div> */} 
          {valueOfImage0 ? (
            <div className={Styles.images}>
              <a href={content.socialInfo[indexOfImage0].link} target="_blank">
                <Image src={image0} alt="TikTok image"/>
              </a>
            </div>
          ) : (
            <div className={Styles.images}>
              <Image src={image0} className={Styles.blurred_image} alt="TikTok image" />
            </div>
          )}

          {valueOfImage1 ? (
            <div className={Styles.images}>
              <a href={content.socialInfo[indexOfImage1].link} target="_blank">
                <Image src={image1} alt="instagram image" />
              </a>
            </div>
          ) : (
            <div className={Styles.images}>
              <Image src={image1} className={Styles.blurred_image} alt="instagram image" />
            </div>
          )}

          {valueOfImage2 ? (
            <div className={Styles.images}>
              <a href={content.socialInfo[indexOfImage2].link} target="_blank">
                <Image src={image2} alt="X image" />
              </a>
            </div>
          ) : (
            <div className={Styles.images}>
              <Image src={image2} className={Styles.blurred_image} alt="X image" />
            </div>
          )}

          {valueOfImage3 ? (
            <div className={Styles.images}>
              <a href={content.socialInfo[indexOfImage3].link} target="_blank">
                <Image src={image3} alt="Only Fans image" />
              </a>
            </div>
          ) : (
            <div className={Styles.images}>
              <Image src={image3} className={Styles.blurred_image} alt="Only Fans image" />
            </div>
          )}

          {/* {content.socialInfo.map((social, index) => (
            <div key={index} className={Styles.images}>
              <a href={social.link}>
                <Image src={images[social.type]} alt="instagram image" />
              </a>
            </div>
          ))} */}
        </div>
        <div className={Styles.link_content}>{content.bio?content.bio:"To be added later..."}</div>
      </div>
      <div className={Styles.BUTTON}>
        <Link href={authToken?'/welcome':'/signin'}>
          <button className={Styles.starting_button}>Start</button>
        </Link>
      </div>
    </div>
  );
}
