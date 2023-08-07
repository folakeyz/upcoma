import React, { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Text } from "../../../components";
import Avatar from "../../../components/Avatar";
import { AuthContext } from "../../../context";
import Layout from "../../../layout";
import styles from "./styles.module.css";

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <Layout>
      <div className="pageContents">
        <div className={styles.profile}>
          <div className={styles.dp}>
            <img
              src={user.photo ? user?.photo : Avatar(user?.gender)}
              alt={user?.firstname}
            />
          </div>
          <div className={styles.user}>
            <Text label="First Name" text={user?.firstname} />
            <Text label="Last Name" text={user?.lastname} />
            <Text label="Email" text={user?.email} />
            <Text label="Mobile" text={user?.mobile} />
            <Text label="Gender" text={user?.gender} />
            {user.role !== "Listener" && (
              <>
                <Text label="Stage Name" text={user?.stagename} />
                <Text label="Currency" text={user?.currency} />
                <Text label="Hourly Rates" text={user?.perHour} />
                <Text label="Bio" text={user?.bio} size="large" />
              </>
            )}
            <Link to="/app/profile/edit" className="btn btnOrange">
              <FaEdit />
              &nbsp; Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
