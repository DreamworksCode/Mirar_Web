"use client";
import React, { useState } from "react";
import styles from "@/Styles/Signup.module.css";
import Image from "next/image";
import signin from "@/public/SignIn.webp";
import Link from "next/link";
import API from "../api";
import {useRouter} from "next/navigation";
import LoginAnimation from "@/Components/Animations/LoginAnimation";

const page = () => {
  const router=useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading,setIsLoading]=useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const emailAddress=credentials.email.charAt(0).toLowerCase() + credentials.email.slice(1);
    // console.log(emailAddress);
    const data = {
      // email: "shravan52u@gmail.com",
      // password: "user12345",
      email: emailAddress,
      password: credentials.password,
    };
    setCredentials({email:"",password:""});
    try {
      const results = await API.postAPICalling("/auth/login", data);
      router.replace("/welcome");
      let authToken = results.token;
      console.log("Authtoken is :",authToken);
      localStorage.setItem("token", authToken);
      // console.log(results);
    } catch (error) { 
      console.log(error);
      alert(error);
    }
    setIsLoading(false);
  };

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div className={styles.main_container}>
      <div className={styles.image}>
        <Image src={signin} alt="Sign in image" className={styles.login_image} />
      </div>
      <div className={styles.form}>
        <div className="text-3xl mx-auto text-center xl:text-5xl 2xl:text-5xl">Sign In</div>
        <div className={styles.form_Container}>
          <form onSubmit={handleSubmit}>
            <input  
              type="email"
              placeholder="Email"
              value={credentials.email}
              className={styles.input}
              name="email"
              onChange={handleOnChange}
              required
            />
            <br />
            <input
              type="password"
              placeholder="Password "
              className={styles.input}
              required
              value={credentials.password}
              name="password"
              onChange={handleOnChange}
            />
            <br />
            <div className={styles.button}>
              <button>{isLoading?"Processing...":"SIGN IN"}</button>
            </div>
          </form>
        </div>

        <div className={styles.signin_link}>
          <span>Don't have an account?</span>
          <Link className="text-blue-500" href="/signup">
            Sign up
          </Link>
        </div>
      </div>
    </div>
    {/* //     <div className={styles.image}>
    //     <Image src={signup}/>
    // </div> */}
  {isLoading &&  <div className={styles.animation}>
      <LoginAnimation/>
    </div>}
    </>
  );
};

export default page;
