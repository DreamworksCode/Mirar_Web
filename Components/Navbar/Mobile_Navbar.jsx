import React,{useState} from "react";
import styles from "@/Styles/navbar.module.css";
import NavHome from '@/public/Chat/navHome.png';
import NavMessages from '@/public/Chat/NavMessages.png';
import NavSubscription from '@/public/Chat/NavSubscription.png';
import NavProfile from '@/public/Chat/NavProfile.png';
import Miraricon from '@/public/Chat/Miraricon.png';
import Image from "next/image";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';

const Mobile_Navbar = () => {
    
  const [show, setShow] = useState(false);
  let router=useRouter();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const handleLogOut=()=>{
        localStorage.removeItem('token');
        router.push("/signin")
        handleClose();
        
      }
    
      const handleHome=()=>{
        const item=localStorage.getItem('influencer');
        router.push(`/?id=${item}`);
      }
  return (
    <div>
      <div className={styles.navbar_container}>
      <div className={styles.nav_items}>
        <div title='Home' onClick={handleHome}><Image src={NavHome} alt='Navigation items'/></div>
        <div><Image src={NavMessages} alt='Navigation items'/></div>
        <div className={styles.mirarLogo}><Image src={Miraricon} alt='Navigation items'/></div>
        <div><Image src={NavSubscription} alt='Navigation items'/></div>
        <div title='Log Out' onClick={handleShow}><Image src={NavProfile} alt='Navigation items'/></div>
      </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogOut}>
            Log Out
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  );
};

export default Mobile_Navbar;
