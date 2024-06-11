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
import ProfileCover from "@/public/Chat/profile_cover_image.webp";
import { useEffect, useState, version } from "react";
import Loader from "@/Components/Animations/Loader";
import AI from "@/public/AI.png";
import VerifiedAccount from "@/public/VerifiedAccount.png";
import Head from "next/head";
import { urbanistRegular,urbanistMedium,urbanistBold } from "./fonts";

export default function Home() {
  // const router=useRouter();
  // const {id}=router.query;
  // console.log(id);
  const [content, setContent] = useState(null);
  const [influencer, setInfluencer] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState("");
  // const influencer = "65f91744da497c8e1086c8af";
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");

    console.log("ID:", id);
    setInfluencer(id);
    if (id !== null) {
      localStorage.setItem("influencer", id);
    }
    const item = localStorage.getItem("token");
    setAuthToken(item);
    const fetchData = async () => {
      try {
        const response = await API.getAPICalling(
          `/auth/getInfluencer/${influencer}`
        );
        setContent(response.data);
        console.log(response.data);
        // setIsLoading(false);
        let a = response.data.youTubeUrl.slice(17);
        let b = a.split("?");
        setUrl(b[0]);

        let timeout = setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        return () => {
          clearTimeout(timeout);
        };
        // console.log(response.data);
      } catch (error) {
        // localStorage.setItem('influencer',null);
        console.log(error);
        // setIsLoading(false);

        let timeout = setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        return () => {
          clearTimeout(timeout);
        };
      }
    };
    fetchData();
  }, [influencer]);

  const images = [image0, image1, image2, image3];
  let valueOfImage0 = 0;
  let valueOfImage1 = 0;
  let valueOfImage2 = 0;
  let valueOfImage3 = 0;
  let indexOfImage0 = null;
  let indexOfImage1 = null;
  let indexOfImage2 = null;
  let indexOfImage3 = null;

  if (content) {
    for (let i = 0; i < 4; i++) {
      if (content.socialInfo[i] && content.socialInfo[i].type == 0) {
        valueOfImage0 = 1;
        indexOfImage0 = i;
      } else if (content.socialInfo[i] && content.socialInfo[i].type == 1) {
        valueOfImage1 = 1;
        indexOfImage1 = i;
      } else if (content.socialInfo[i] && content.socialInfo[i].type == 2) {
        valueOfImage2 = 1;
        indexOfImage2 = i;
      } else if (content.socialInfo[i] && content.socialInfo[i].type == 3) {
        valueOfImage3 = 1;
        indexOfImage3 = i;
      }
    }
  }

  return (
    <>
      {content ? (
        <div className={Styles.profile_container}>
          <div className=" TOP_BOX_PROFILE bg-[linear-gradient(180deg,#74e5e6,#367fea)] h-[220px]">
            {/* <div className="absolute top-[145px] ml-24">
          <Image src={content.avatarImageUrl} height={150} width={150} alt="Profile image" />
        </div> */}
            <div className={Styles.profile_image}>
              <Image
                // src={content ? content.avatarImageUrl : ProfileCover}
                src={
                  content
                    ? content.avatarImages && content.avatarImages.length > 0
                      ? content.avatarImages[0].avatarImageUrl
                      : content.avatarImageUrl
                    : ProfileCover
                }
                // src={ProfileCover}
                fill
                className={Styles.main_profile_image}
                alt="Profile image"
              />
              <Image src={AI} className={Styles.ai_icon} />
            </div>
          </div>
          <div className="SHARE_FAVE_ICON h-[75px] ">
            <div className=" hidden  pt-2 space-x-2 md:space-x-6 lg:space-x-6 2xl:space-x-6 xl:space-x-6 justify-end items-end md:mx-20 lg:mx-20 xl:mx-20 2xl:mx-20">
              <Image src={Fave} height={54} width={54} alt="Favourite" />
              <Image src={Share} height={54} width={54} alt="Share" />
            </div>
          </div>
          <div className="AI_DETAILS ml-24 xl:pt-6 2xl:pt-6 3xl:pt-6 pt-3 ">
            <div
              className={`text-2xl   font-[500]   text-center flex gap-2  ${urbanistMedium.className} `}
            >
              {content
                ? 
                  content.fullName === ""
                  ? "{NAME}"
                  : content.fullName
                : 
                  "{NAME}"}
                  {/* Olivia Rodrigo */}
              <Image
                src={VerifiedAccount}
                className={Styles.verifiedAccount}
                alt="verified"
              />
            </div>
            <div className={`font-extralight ${urbanistRegular}`}>
              {" "}
              <span className="mr-4">
                {" "}
                {content ? ` @${content.userName}` : ""}
                {/* @purplelivia.ai */}
              </span>{" "}
              <span> Available Now</span>
            </div>
          </div>
          <div className={Styles.link}>
            <div className={Styles.link_images}>
              {valueOfImage0 ? (
                <div className={Styles.images}>
                  <a
                    href={content.socialInfo[indexOfImage0].link}
                    target="_blank"
                  >
                    <Image src={image0} alt="TikTok image" />
                  </a>
                </div>
              ) : (
                <div className={Styles.images}>
                  <Image
                    src={image0}
                    className={Styles.blurred_image}
                    alt="TikTok image"
                  />
                </div>
              )}

              {valueOfImage1 ? (
                <div className={Styles.images}>
                  <a
                    href={content.socialInfo[indexOfImage1].link}
                    target="_blank"
                  >
                    <Image src={image1} alt="instagram image" />
                  </a>
                </div>
              ) : (
                <div className={Styles.images}>
                  <Image
                    src={image1}
                    className={Styles.blurred_image}
                    alt="instagram image"
                  />
                </div>
              )}

              {valueOfImage2 ? (
                <div className={Styles.images}>
                  <a
                    href={content.socialInfo[indexOfImage2].link}
                    target="_blank"
                  >
                    <Image src={image2} alt="X image" />
                  </a>
                </div>
              ) : (
                <div className={Styles.images}>
                  <Image
                    src={image2}
                    className={Styles.blurred_image}
                    alt="X image"
                  />
                </div>
              )}

              {valueOfImage3 ? (
                <div className={Styles.images}>
                  <a
                    href={content.socialInfo[indexOfImage3].link}
                    target="_blank"
                  >
                    <Image src={image3} alt="Only Fans image" />
                  </a>
                </div>
              ) : (
                <div className={Styles.images}>
                  <Image
                    src={image3}
                    className={Styles.blurred_image}
                    alt="Only Fans image"
                  />
                </div>
              )}
            </div>
            <div className={Styles.link_content}>
              {content
                ? content.bio
                  ? content.bio
                  : "To be added later..."
                : "To be added later..."}
            </div>
          </div>
          {content.youTubeUrl && content.youTubeUrl.trim(" ") !== "" && (
            <div className={Styles.video_container}>
              <iframe
                className={Styles.video}
                // src="https://www.youtube.com/embed/YphL3Whh5B0?si=J3VZ9NXRCRi7ua8u"
                src={`https://www.youtube.com/embed/${url}`}
                // src={content.youTubeUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          {content.avatarImages && content.avatarImages.length > 0 && (
            <div className={Styles.images_container}>
              {/* <div className="hidden md:block lg:block xl:block 2xl:block">
                <div
                  ref={sliderRef}
                  className={`keen-slider ${Styles["main_slider"]} ${padding_class}`}
                >
                {content.avatarImages.map((image,index)=> (
                  <div className={` keen-slider__slide `} key={index}>
                    <Image src={image.avatarImageUrl} alt="Influencer uploaded photos" width={200} height={300} className="images_gallery"/>
                  </div>
                  )
                )}
                </div>
              </div> */}
              {content.avatarImages.map((image, index) => (
                <Image
                  src={image.avatarImageUrl}
                  alt="Influencer uploaded photos"
                  className="images_gallery"
                  width={200}
                  height={3}
                />
              ))}
            </div>
          )}
          <div className={`${Styles.BUTTON} ${urbanistBold.className}`}>
            <Link href={authToken ? "/welcome" : "/signin"}>
              <button className={Styles.starting_button}>Start</button>
            </Link>
          </div>
        </div>
      ) : isLoading ? (
        <div className={Styles.profile_container}>
          <div className="TOP_BOX_PROFILE bg-[linear-gradient(180deg,#74e5e6,#367fea)] h-[220px]"></div>
          <div className={Styles.animation}>
            <Loader />
          </div>
        </div>
      ) : (
        <div className={Styles.profile_container}>
          <div className="TOP_BOX_PROFILE bg-[linear-gradient(180deg,#74e5e6,#367fea)] h-[220px]"></div>
          <div className={Styles.error_message}>
            <h1>OOPS!</h1>
            <p>
              There seems to be an error with the URL, please make sure the id
              in the URL is correct and valid
            </p>
          </div>
        </div>
      )}
    </>
  );
}
