import React from "react";
import { useParams } from "react-router-dom";
import { List, ListTitle, UserJumbotron } from "../../../components";
import Layout from "../../../Layout";
import { useSong } from "../Songs/hooks";
import { useUsers } from "./hooks";

const GlobalProfile = () => {
  const { id } = useParams();
  const allUsers = useUsers();

  const currentUser = allUsers?.find((x) => x._id === id);
  const songs = useSong();
  const userSong = songs.filter((x) => x.user._id === id);
  return (
    <Layout>
      <div className="pageContents">
        <UserJumbotron profile={currentUser} />
        <div>
          <div className="listContainer">
            <ListTitle />
            {userSong?.map((item, i) => (
              <List item={item} key={i} sn={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GlobalProfile;
