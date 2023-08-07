import React from "react";
import styles from "../styles.module.css";
import { Header } from "../../../components";
const TC = () => {
  return (
    <>
      <div className={`${styles.textContainer} ${styles.bgBlack}`}>
        <Header />
        <h3>Terms of Use</h3>
        <h4>Effective Date: 31st Of July, 2023</h4>

        <p>
          Welcome to Upcoma Platform. These Terms of Use ("Terms") govern your
          access to and use of our Platform, which is dedicated to providing a
          platform for upcoming artists to showcase their talent, collaborate,
          and gain exposure. By accessing or using our Platform, you agree to be
          bound by these Terms. If you do not agree with any part of these
          Terms, please refrain from using our Platform.
        </p>
        <h3>1. Account Creation</h3>
        <ul>
          <li>
            Eligibility: To use certain features of our Platform, you must
            create an account. By creating an account, you represent and warrant
            that you are at least 18 years old and have the legal capacity to
            enter into a binding contract.
          </li>
          <li>
            Account Information: You are responsible for providing accurate and
            up-to-date information when creating and maintaining your account.
            You are solely responsible for maintaining the confidentiality of
            your account credentials, and you agree to take full responsibility
            for all activities that occur under your account.
          </li>
        </ul>
        <h3>2. User Conduct</h3>
        <ul>
          <li>
            Prohibited Activities: You agree not to engage in any conduct that
            violates these Terms or applicable laws. Prohibited activities
            include, but are not limited to, unauthorized access to our
            Platform, interference with the Platform's functionality,
            distribution of harmful content, infringement of intellectual
            property rights, or engaging in any illegal activities.
          </li>
          <li>
            Content Submission: By submitting content to our Platform, such as
            artist profiles, event information, or any other materials, you
            grant us a non-exclusive, worldwide, royalty-free, and transferable
            license to use, reproduce, modify, publicly perform, publicly
            display, and distribute the content solely for the purposes of
            operating and promoting the Platform.
          </li>
        </ul>
        <h3>Intellectual Property Rights</h3>
        <ul>
          <li>
            Ownership: All content and materials available on the Platform,
            including but not limited to text, graphics, images, audio, videos,
            logos, and trademarks, are owned by or licensed to us and are
            protected by copyright, trademark, and other intellectual property
            laws.
          </li>
          <li>
            Limited License: We grant you a limited, non-exclusive,
            non-transferable, and revocable license to access and use the
            Platform solely for your personal, non-commercial use. You may not
            reproduce, modify, distribute, or create derivative works from the
            Platform or any content without our prior written consent.
          </li>
        </ul>
        <h3>4. Event Booking and Ticketing</h3>
        <ul>
          <li>
            Booking Artists: The Platform facilitates the booking of artists for
            events. By booking artists through our Platform, you agree to abide
            by the terms and conditions set forth in the booking agreements.
          </li>
          <li>
            Ticket Sales: The Platform facilitates the sale of tickets for
            events. By purchasing tickets through our Platform, you agree to
            abide by the terms and conditions set forth in the ticketing
            agreements.
          </li>
        </ul>
        <h3>5. Third-Party Content and Links</h3>
        <ul>
          <li>
            Third-Party Content: Our Platform may contain links to third-party
            websites, content, or services. We do not endorse or control these
            third-party resources, and we are not responsible for their content
            or availability.
          </li>
          <li>
            Third-Party Services: Your use of any third-party services linked
            from our Platform is subject to the terms and conditions of those
            services. Please review their policies before using their services.
          </li>
        </ul>
        <h3>6. Disclaimer of Warranties</h3>
        <ul>
          <li>
            Use at Your Own Risk: Your use of the Platform is at your own risk.
            The Platform is provided on an "as-is" and "as-available" basis,
            without warranties of any kind, whether express or implied.
          </li>
          <li>
            No Guarantee: We do not guarantee the accuracy, completeness, or
            timeliness of the content on the Platform. We do not guarantee that
            the Platform will be error-free, secure, or continuously available.
          </li>
        </ul>
        <h3>7. Limitation of Liability</h3>
        <ul>
          <li>
            Exclusion of Damages: To the maximum extent permitted by applicable
            law, we shall not be liable for any direct, indirect, incidental,
            special, consequential, or punitive damages arising out of or
            related to your use or inability to use the Platform.
          </li>
          <li>
            Indemnification: You agree to indemnify, defend, and hold us
            harmless from any claims, liabilities, damages, losses, costs, or
            expenses arising from your use of the Platform or your violation of
            these Terms.
          </li>
        </ul>
        <h3>8. Modification of Terms</h3>
        <ul>
          <li>
            Updates: We may update these Terms from time to time to reflect
            changes in our practices or applicable laws. Any changes will be
            effective upon posting the updated Terms on the Platform.
          </li>
          <li>
            Continued Use: Your continued use of the Platform after the posting
            of any modifications constitutes your acceptance of the revised
            Terms.
          </li>
        </ul>
        <h3>9. Termination</h3>
        <ul>
          <li>
            Suspension and Termination: We may suspend or terminate your access
            to the Platform for any reason, with or without notice, at our sole
            discretion.
          </li>
          <li>
            Effect of Termination: Upon termination, your license to access and
            use the Platform shall terminate, and all provisions of these Terms
            that by their nature should survive termination shall survive.
          </li>
        </ul>
        <h3>10. Governing Law</h3>
        <ul>
          <li>
            Applicable Law: These Terms shall be governed by and construed in
            accordance with the laws of the Federal Republic of Nigeria, without
            regard to its conflict of laws principles.
          </li>
          <li>
            Jurisdiction: Any dispute arising out of or related to these Terms
            shall be subject to the exclusive jurisdiction of the courts of
            Nigeria.
          </li>
        </ul>
        <h3>11. Contact Us</h3>
        <p>
          If you have any questions, concerns, or requests regarding these Terms
          or our Platform, please contact us at{" "}
          <a href="mailTo:support@upcoma.com">support@upcoma.com</a>
        </p>
        <p>
          Thank you for using Upcoma. We hope you enjoy your experience on our
          Platform.
        </p>
        <p>Upcoma</p>
        <p>Lagos, Nigeria</p>
        <a href="mailTo:support@upcoma.com">support@upcoma.com</a>
        <a href="tel:+2348058463103">+2348058463103</a>
      </div>
    </>
  );
};

export default TC;
