import React from "react";
import styles from "@/Styles/Privacy_policy.module.css";

const Page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <h1 className={styles.heading}>Privacy Policy</h1>
        <p className={styles.text}>
          <strong>Effective Date:</strong> August 20, 2025
        </p>
        <p className={styles.text}>
          At Mirar AI, we value your privacy. This Privacy Policy outlines how we
          handle information collected through Facebook Messenger, Instagram
          Direct, and WhatsApp when interacting with restaurant businesses using
          our services.
        </p>

        <h2 className={styles.subheading}>1. Information We Collect</h2>
        <p className={styles.text}>We may collect:</p>
        <ul className={styles.list}>
          <li>Customer name, phone number, and message content</li>
          <li>
            Business information such as restaurant name, contact details, and
            menu items
          </li>
        </ul>
        <p className={styles.text}>
          This data is collected only when users interact voluntarily with the
          restaurants via Meta messaging platforms connected to Mirar AI.
        </p>

        <h2 className={styles.subheading}>2. How We Use This Data</h2>
        <p className={styles.text}>We use the collected data to:</p>
        <ul className={styles.list}>
          <li>Facilitate customer support on behalf of the restaurant</li>
          <li>
            Help restaurants manage conversations, respond to inquiries, and
            provide better service
          </li>
          <li>
            Store basic chat history and order preferences (if applicable)
          </li>
        </ul>

        <h2 className={styles.subheading}>3. No Unnecessary Tracking</h2>
        <p className={styles.text}>
          We do not use cookies or analytics tools to track users across sites.
          We do not use the data for advertising or resale.
        </p>

        <h2 className={styles.subheading}>4. Data Storage and Protection</h2>
        <p className={styles.text}>
          All data is securely stored using industry-standard encryption. Only
          authorized personnel have access to this data. We do not sell or share
          your data with any third party.
        </p>

        <h2 className={styles.subheading}>5. Data Access and Deletion</h2>
        <p className={styles.text}>
          Users may request a copy of their data or ask for it to be deleted by
          contacting us at:{" "}
          <span className={styles.highlight}>info@mirar.ai</span>
        </p>

        <h2 className={styles.subheading}>6. Third-Party Platforms</h2>
        <p className={styles.text}>
          Mirar AI integrates with the following Meta platforms:
        </p>
        <ul className={styles.list}>
          <li>
            <a
              href="https://www.facebook.com/policy.php"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Facebook Messenger Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="https://www.whatsapp.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              WhatsApp Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="https://privacycenter.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Instagram Privacy Policy
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Page;
