"use client";
import React, { useState } from "react";
import styles from "@/Styles/Signup.module.css";
import Image from "next/image";
import signup from "@/public/Signup.webp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import API from "../api";
import LoginAnimation from "@/Components/Animations/LoginAnimation";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { urbanistRegular,urbanistBold, nixieOne } from "../fonts";

const page = () => {
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
  const [isLoading,setIsLoading]=useState(false);
  const router = useRouter();
  const [message,setMessage]=useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      name:credentials.name,
      email:credentials.email,
      password:credentials.password
    };
    setCredentials({email:"",name:"",password:"",cpassword:""});
    try {
      const results = await API.postAPICalling("/auth/signup", data);
      router.push("/checkEmail");
      console.log(results);
    } catch (error) {
      setMessage(error.message);
      handleShow();
      // alert("Email already exist");
      // console.log("Errors", error);
    }
    setIsLoading(false);
  };

  const handleChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});
  }

  const togglePasswordVisibility1 = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };

  const handleFocus=(event)=>{
    event.target.select();
  }

  return (
    <>
    <div className={styles.main_container}>
      <div className={styles.image}>
        <Image src={signup} alt="SignUp" className={styles.login_image} />
      </div>
      <div className={styles.form}>
        <div className={`text-3xl mx-auto font-[500] text-center ${styles.heading_text} `}>Sign up</div>
        <div className={styles.form_Container}>
          <form onSubmit={handleSubmit}className={styles.formholder}>
            <input
              type="text"
              placeholder="Name"
              value={credentials.name}
              className={`${styles.input} ${urbanistRegular.className}`}
              name="name"
              onChange={handleChange}
              onFocus={handleFocus}
              required
            />
            <br />
            <input
              type="email"
              placeholder="Email"
              value={credentials.email}
              className={`${styles.input} ${urbanistRegular.className}`}
              required
              onChange={handleChange}
              name="email"
            />
            <br />
            <div style={{ width:"100%", position: 'relative', display: 'inline-block' }}>
              
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password "
              className={`${styles.input} ${urbanistRegular.className}`}
              value={credentials.password}
              required
              onChange={handleChange}
              
              style={{ paddingRight: "30px" }}
              name="password"
            />
            <FontAwesomeIcon
                  icon={passwordVisible ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility1}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                />
            </div>
            <br />
            <div style={{ width:"100%", position: 'relative', display: 'inline-block' }}>
              
            <input
              type={passwordVisible2 ? "text" : "password"}
              placeholder="Confirm Password"
              className={`${styles.input} ${urbanistRegular.className}`}
              value={credentials.cpassword}
              required
              onChange={handleChange}
              
              style={{ paddingRight: "30px" }}
              name="cpassword"
            />
            <FontAwesomeIcon
                  icon={passwordVisible2 ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility2}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                />
                
            </div>
            <div className={`${styles.button} ${urbanistBold.className}`}>
              <button>{isLoading?"Processing...":"SIGN UP"}</button>
            </div>
          </form>
        </div>

        <div className={`${styles.signin_link} ${urbanistRegular.className}`}>
          <span>Have an account?</span>
          <Link className="text-blue-500 ml-4" href="/signin">
            Sign in
          </Link>
        </div>
      </div>
    </div>
    {/* //     <div className={styles.image}>
    //     <Image src={signup}/>
    // </div> */}
    
    {isLoading && <div className={styles.animation}>
      <LoginAnimation/>
    </div>}

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default page;
