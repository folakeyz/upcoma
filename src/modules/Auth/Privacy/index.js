import React from "react";
import styles from "../styles.module.css";
import { Header } from "../../../components";
const Privacy = () => {
  return (
    <>
      <div className={`${styles.textContainer} ${styles.bgBlack}`}>
        <Header />
        <h3>UPCOMA PRIVACY POLICY</h3>
        <h3>Privacy Policy</h3>
        <h4>Effective Date: 31st Of July, 2023</h4>
        <h3>Introduction</h3>
        <p>
          Thank you for choosing Upcoma. We are committed to protecting your
          privacy and ensuring the security of your personal information. This
          Privacy Policy outlines how we collect, use, disclose, and safeguard
          the information you provide when using our entertainment platform,
          which is dedicated to supporting upcoming artists and facilitating
          event bookings, event promotion, ticket sales and more. Please read
          this Privacy Policy carefully to understand our practices regarding
          your personal information. By accessing or using our platform, you
          acknowledge and agree to the terms of this Privacy Policy. If you do
          not agree with the practices described in this policy, please refrain
          from using our platform.
        </p>
        <h3>Information We Collect</h3>
        <p>
          We may collect personal information from you when you interact with
          our platform. The types of information we collect may include, but are
          not limited to:
        </p>
        <ol>
          <li>
            {" "}
            Personal Identifiers: Your name, email address, phone number, and
            any other information you provide when creating an account or
            communicating with us.
          </li>
          <li>
            {" "}
            Artist Profile Information: Information you provide when creating an
            artist profile, such as your biography, photos, videos, and audio
            recordings.
          </li>
          <li>
            {" "}
            Event Information: Details related to events, including event
            descriptions, dates, locations, ticket pricing, and any other
            information you provide when organizing or promoting events.
          </li>
          <li>
            Booking and Ticketing Information: Information you provide when
            booking artists for events or purchasing tickets, such as event
            preferences, payment details, and transaction history.
          </li>
          <li>
            Communication Data: Records of your interactions with us, including
            emails, messages, and feedback you provide to us.
          </li>
        </ol>
        <h3>Use of Information</h3>
        <p>We use the information collected for the following purposes:</p>
        <ol>
          <li>
            Artist Promotion and Bookings: To facilitate the promotion and
            booking of artists for events based on the information provided in
            their profiles.
          </li>
          <li>
            Event Promotion and Ticket Sales: To promote and publicize events
            organized by artists or third-party event organizers, and facilitate
            the sale of tickets through our platform.
          </li>
          <li>
            Communication: To communicate with you regarding platform updates,
            event-related information, customer support, and other relevant
            matters.
          </li>
          <li>
            Improvements and Enhancements: To analyze user behavior and
            preferences, evaluate the effectiveness of our platform and
            services, and make enhancements and improvements based on user
            feedback.
          </li>
        </ol>
        <h3>Data Security and Retention</h3>
        <p>
          We take reasonable measures to protect your personal information and
          prevent unauthorized access, use, or disclosure. We implement
          industry-standard security measures, including encryption, secure data
          storage, and access controls, to safeguard your information. We will
          retain your personal information for as long as necessary to fulfill
          the purposes outlined in this Privacy Policy unless a longer retention
          period is required or permitted by law. When we no longer require your
          information, we will securely dispose of it in accordance with
          applicable laws and regulations.
        </p>
        <h3>Third-Party Disclosure</h3>
        <p>
          We may share your personal information with trusted third parties in
          the following circumstances:
        </p>
        <ol>
          <li>
            Artists, Event Organizers, and Ticket Buyers: We may share relevant
            information with artists, event organizers, or ticket buyers
            involved in event bookings or ticket purchases to facilitate
            communication, coordination, and fulfillment of event-related
            activities.
          </li>
          <li>
            {" "}
            Service Providers: We may engage trusted third-party service
            providers to assist us in operating our platform and delivering
            services, such as payment processing, data analysis, customer
            support, or marketing. These service providers are contractually
            bound to maintain the confidentiality and security of your personal
            information.
          </li>
          <li>
            Legal Compliance: We may disclose your personal information if
            required to do so by law or in response to valid legal requests,
            such as court orders, government investigations, or as otherwise
            necessary to protect our rights, interests, or safety.
          </li>
        </ol>
        <h3>Your Rights and Choices</h3>
        <p>
          You have certain rights and choices regarding the collection, use, and
          disclosure of your personal information. These may include the right
          to access, correct, update, or delete your information, as well as the
          ability to manage your communication preferences. Please contact us
          using the information provided at the end of this Privacy Policy to
          exercise these rights.
        </p>
        <h3>Children's Privacy</h3>
        <p>
          Our platform is not intended for individuals under the age of 18. We
          do not knowingly collect personal information from children. If we
          become aware that we have inadvertently collected personal information
          from a child, we will take immediate steps to delete it. If you
          believe that we may have collected personal information from a child,
          please contact us as provided below.
        </p>
        <h3>Changes to this Privacy Policy</h3>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or applicable laws. We will post the updated Privacy
          Policy on our platform and update the effective date. We encourage you
          to review this Privacy Policy periodically for any changes. Your
          continued use of our platform after the posting of any modifications
          constitutes your acceptance of the revised Privacy Policy.
        </p>
        <h3>Contact Us</h3>
        <p>
          If you have any questions, concerns, or requests regarding this
          Privacy Policy or our data practices, please contact us at
          support@upcoma.com.
        </p>
        <p>
          Thank you for entrusting Upcoma with your personal information. We are
          committed to protecting your privacy and providing you with a secure
          and enjoyable experience on our platform.
        </p>
        <p>Upcoma</p>
        <p>Lagos, Nigeria</p>
        <a href="mailTo:support@upcoma.com">support@upcoma.com</a>
        <a href="tel:+2348058463103">+2348058463103</a>
      </div>
    </>
  );
};

export default Privacy;
