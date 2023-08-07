import React, { useContext, useState, useMemo } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { AuthContext } from "../../context";
import Links from "./Links";
import ProfileLink from "./Profile";
import { hooks } from "../../hooks";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(0);

  const event = hooks.useEvent();
  const beats = hooks.useBeat();
  const competition = hooks.useCompetition();
  const artist = hooks.useArtist();
  const producer = hooks.useProducer();
  const songs = hooks.useSong();

  const logoutHandler = () => {
    logout();
    navigate("/");
  };

  const profileHandler = () => {
    navigate("/app/profile");
  };

  const hooksObj = useMemo(
    () => ({
      songs,
      artist,
      producer,
      beats,
      competition,
      event,
    }),
    [songs, artist, producer, beats, competition, event]
  );
  const handleChange = (e) => {
    const value = e.target.value;
    let dataFilter = [];

    // Check if each hook's data is available before filtering
    if (hooksObj.songs) {
      const song = hooksObj.songs.filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.artist.toLowerCase().includes(value.toLowerCase())
      );
      dataFilter.push(...song);
    }

    if (hooksObj.artist) {
      const artists = hooksObj.artist.filter(
        (x) =>
          x.firstname.toLowerCase().includes(value.toLowerCase()) ||
          x?.stagename?.toLowerCase().includes(value.toLowerCase())
      );
      dataFilter.push(...artists);
    }

    if (hooksObj.producer) {
      const prod = hooksObj.producer.filter(
        (x) =>
          x.firstname.toLowerCase().includes(value.toLowerCase()) ||
          x?.stagename?.toLowerCase().includes(value.toLowerCase())
      );
      dataFilter.push(...prod);
    }

    if (hooksObj.beats) {
      const beat = hooksObj.beats.filter(
        (x) =>
          x.name.toLowerCase().includes(value.toLowerCase()) ||
          x.producer.toLowerCase().includes(value.toLowerCase())
      );
      dataFilter.push(...beat);
    }

    if (hooksObj.competition) {
      const comp = hooksObj.competition.filter((x) =>
        x.name.toLowerCase().includes(value.toLowerCase())
      );
      dataFilter.push(...comp);
    }

    if (hooksObj.event) {
      const evt = hooksObj.event.filter((x) =>
        x.name.toLowerCase().includes(value.toLowerCase())
      );
      dataFilter.push(...evt);
    }

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
    } else if (suggestion.producer) {
      navigate(`/app/beat/${suggestion._id}`);
    } else if (suggestion.location) {
      navigate(`/app/events/${suggestion._id}`);
    } else if (suggestion.deadline) {
      navigate(`app/competitions/view/${suggestion._id}`);
    }
  };

  const renderAutocomplete = () => {
    if (show && search) {
      if (filtered.length) {
        return (
          <ul className={styles.autocomplete}>
            {filtered.map((suggestion, index) => {
              const className = index === active ? "active" : "";
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
    return null;
  };

  return (
    <div className={styles.header}>
      {/* Search Container */}
      <div className={styles.search}>
        <AiOutlineSearch />
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder=" Search for Artist, Music, and more"
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
