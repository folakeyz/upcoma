import React, { useContext, useState } from "react";
import styles from "./styles.module.css";
// import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

//import { userLogout } from "../../redux/actions/authActions";

import { AiOutlineSearch } from "react-icons/ai";
import Links from "./Links";
import ProfileLink from "./Profile";
import { AuthContext } from "../../context";
import { useEvent } from "../../modules/Global/Events/hooks";
import { useBeat } from "../../modules/Global/Beats/hooks";
import { useCompetition } from "../../modules/Global/Competition/hooks";
import { useArtist } from "../../modules/Global/Artist/hooks";
import { useProducer } from "../../modules/Global/Producer/hooks";
import { useSong } from "../../modules/Global/Songs/hooks";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  //   const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(0);
  const event = useEvent();
  const beats = useBeat();
  const competition = useCompetition();
  const artist = useArtist();
  const producer = useProducer();
  const songs = useSong();

  const logoutHandler = () => {
    logout();
    navigate("/");
  };

  const profileHandler = () => {
    navigate("/app/profile");
  };

  //   const getSongs = useSelector((state) => state.getSongs);
  //   const { songs = [] } = getSongs;

  const handleChange = (e) => {
    const value = e.target.value;
    var dataFilter = [];
    const song = songs.filter((song) => {
      return (
        song.name.toLowerCase().includes(value.toLowerCase()) ||
        song.artist.toLowerCase().includes(value.toLowerCase())
      );
    });
    song.length > 0 && dataFilter.push(...song);
    const artists = artist.filter((x) => {
      return (
        x.firstname.toLowerCase().includes(value.toLowerCase()) ||
        x?.stagename?.toLowerCase().includes(value.toLowerCase())
      );
    });
    artist.length > 0 && dataFilter.push(...artists);

    const prod = producer.filter((x) => {
      return (
        x.firstname.toLowerCase().includes(value.toLowerCase()) ||
        x?.stagename?.toLowerCase().includes(value.toLowerCase())
      );
    });
    prod.length > 0 && dataFilter.push(...prod);
    const beat = beats.filter((x) => {
      return (
        x.name.toLowerCase().includes(value.toLowerCase()) ||
        x.producer.toLowerCase().includes(value.toLowerCase())
      );
    });
    beat.length > 0 && dataFilter.push(...beat);
    const comp = competition.filter((x) => {
      return x.name.toLowerCase().includes(value.toLowerCase());
    });
    comp.length > 0 && dataFilter.push(...comp);
    const evt = event.filter((x) => {
      return x.name.toLowerCase().includes(value.toLowerCase());
    });
    evt.length > 0 && dataFilter.push(...evt);
    setShow(true);
    setSearch(value);
    setFiltered(dataFilter);
  };

  const onClick = (suggestion) => {
    setActive(0);
    setFiltered([]);
    setShow(false);
    if (suggestion.artist) {
      navigate(`/app/song/${suggestion._id}`);
    }
    if (suggestion.producer) {
      navigate(`/app/beat/${suggestion._id}`);
    }
    if (suggestion.location) {
      navigate(`/app/events/${suggestion._id}`);
    }
    if (suggestion.deadline) {
      navigate(`app/competitons/view/${suggestion._id}`);
    }
  };
  const renderAutocomplete = () => {
    if (show && search) {
      if (filtered.length) {
        return (
          <ul className={styles.autocomplete}>
            {filtered.map((suggestion, index) => {
              let className;
              if (index === active) {
                className = "active";
              }
              return (
                <li
                  className={className}
                  key={index}
                  onClick={() => onClick(suggestion)}
                >
                  {suggestion?.name || suggestion?.firstname}
                </li>
              );
            })}
          </ul>
        );
      } else {
        return (
          <ul className={styles.autocomplete}>
            <li>No Results</li>
          </ul>
        );
      }
    }
    return <div></div>;
  };

  return (
    <div className={styles.header}>
      {/* Search Container */}
      <div className={styles.search}>
        <AiOutlineSearch />
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search for Artiste, Music, and more"
            value={search}
            onChange={handleChange}
            onClick={onClick}
            size="large"
          />
          {renderAutocomplete()}
        </div>
      </div>
      {/* end of Search */}

      {/* Profile/btns */}
      {user ? (
        <ProfileLink
          user={user}
          profileHandler={profileHandler}
          logoutHandler={logoutHandler}
        />
      ) : (
        <Links />
      )}

      {/* end of Profile/btns */}
    </div>
  );
};

export default Header;
