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
          At Mirar AI, we take privacy seriously. This Privacy Policy explains
          how we handle information when you use our services through messaging
          platforms such as Facebook Messenger and WhatsApp.
        </p>

        <h2 className={styles.subheading}>1. No Data Collection</h2>
        <p className={styles.text}>
          We do not collect, store, or share any personal data from end users
          who message the restaurants using Mirar AI. Our platform acts purely
          as a communication tool between customers and restaurants for support
          purposes.
        </p>

        <h2 className={styles.subheading}>2. How We Use the Platform</h2>
        <p className={styles.text}>
          Mirar AI is designed to automate customer support for restaurants. It
          provides quick responses to customer inquiries through messaging
          channels without saving any personally identifiable information.
        </p>

        <h2 className={styles.subheading}>3. Third-Party Platforms</h2>
        <p className={styles.text}>
          Our tool operates through platforms like Facebook Messenger and
          WhatsApp. Any information shared on those platforms is subject to
          their respective privacy policies:
        </p>
        <ul className={styles.list}>
          <li>
            <a
              href="https://www.facebook.com/policy.php"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Facebook Privacy Policy
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
        </ul>

        <h2 className={styles.subheading}>4. No Marketing or Tracking</h2>
        <p className={styles.text}>
          We do not use cookies, tracking tools, or analytics to monitor users.
          We do not send marketing messages or collect data for advertising.
        </p>

        <h2 className={styles.subheading}>5. Contact</h2>
        <p className={styles.text}>
          If you have any questions or concerns about this policy, please
          contact us at:{" "}
          <span className={styles.highlight}>info@mirar.ai</span>
        </p>
        <p className={styles.text}>
          Visit us at:{" "}
          <a
            href="https://www.mirar.ai"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            www.mirar.ai
          </a>
        </p>
      </div>
    </div>
  );
};

export default Page;
