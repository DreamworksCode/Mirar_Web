"use client";
import React, { useState } from "react";
import styles from "@/Styles/Signup.module.css";
import Image from "next/image";
import signup from "@/public/Signup.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import API from "../api";

const page = () => {
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
  const router = useRouter();
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name:credentials.name,
      email:credentials.email,
      password:credentials.password
    };
    setCredentials({email:"",name:"",password:"",cpassword:""});
    try {
      const results = await API.postAPICalling("/auth/signup", data);
      router.replace("/checkEmail");
      console.log(results);
    } catch (error) {
      alert("Email already exist");
      console.log("Errors", error);
    }
  };

  const handleChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});
  }

  return (
    <div className={styles.main_container}>
      <div className={styles.image}>
        <Image src={signup} alt="SignUp" />
      </div>
      <div className={styles.form}>
        <div className="text-3xl mx-auto text-center">Sign Up</div>
        <div className={styles.form_Container}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={credentials.name}
              className={styles.input}
              name="name"
              onChange={handleChange}
              required
            />
            <br />
            <input
              type="email"
              placeholder="Email"
              value={credentials.email}
              className={styles.input}
              required
              onChange={handleChange}
              name="email"
            />
            <br />
            <input
              type="password"
              placeholder="Password "
              className={styles.input}
              value={credentials.password}
              required
              onChange={handleChange}
              name="password"
            />
            <br />
            <input
              type="password"
              placeholder="Confirm Password"
              className={styles.input}
              value={credentials.cpassword}
              required
              onChange={handleChange}
              name="cpassword"
            />
            <div className={styles.button}>
              <button>SIGN UP</button>
            </div>
          </form>
        </div>

        <div className={styles.signin_link}>
          <span>Have an account?</span>
          <Link className="text-blue-500" href="/signin">
            Sign in
          </Link>
        </div>
      </div>
    </div>
    //     <div className={styles.image}>
    //     <Image src={signup}/>
    // </div>
  );
};

export default page;
