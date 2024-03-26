import React from "react";
import styles from '@/Styles/Chat.module.css';
import Navbar from "@/Components/Navbar/Navbar";
import Chatbot from "@/Components/Chatbot/ChatBot";

const page = () => {
  return (
    <div className={styles.container}>
      <Navbar/>
      <Chatbot/>
    </div>
  );
};

export default page;