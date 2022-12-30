import React, { useContext, useState } from "react";
import Layout from "../../Layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { usePlaySong, useSong } from "../Global/Songs/hooks";
import {
  CompetitionCard,
  EventCard,
  Player,
  SongCard,
  TrendCard,
  UserCard,
} from "../../components";
import { useTrends } from "./hooks";
import { breakpoints } from "./Breakpoints";
import { useEvent } from "../Global/Events/hooks";
import { useArtist } from "../Global/Artist/hooks";
import { useProducer } from "../Global/Producer/hooks";
import { useDJ } from "../Global/DJ/hooks";
import { useComedian } from "../Global/Comedian/hooks";
import { AuthContext } from "../../context";
import { useCompetition } from "../Global/Competition/hooks";
import { usePlaylist, useUpdatePlaylist } from "../Global/Playlist/hooks";
//import { useIsMutating } from "@tanstack/react-query";
import { toast } from "react-toastify";
import PlaylistModal from "./PlaylistModal";

const Home = () => {
  const [playList, setPlaylist] = useState([]);
  const [open, setOpen] = useState();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  // const loading = useIsMutating();

  const { user } = useContext(AuthContext);
  const songs = useSong();
  const event = useEvent();
  const comp = useCompetition();
  const likedSongs = user?.likedSongs;

  const { mutate } = usePlaySong();

  const playlistHandler = (audio) => {
    let song = { ...audio, musicSrc: audio.song };
    setPlaylist((prev) => [...prev, song]);
    mutate(audio._id);
  };
  const trends = useTrends();
  const artist = useArtist();
  const producer = useProducer();
  const dj = useDJ();
  const comedian = useComedian();

  const playlist = usePlaylist();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validationHandler = (name, error) => {
    setErrors({
      ...errors,
      [name]: error,
    });
  };
  const { mutate: add, isSuccess, reset } = useUpdatePlaylist();

  const submitHandler = () => {
    const data = {
      id: formData["playlist"],
      songs: JSON.stringify([formData["id"]]),
      _sid: "Song",
    };
    add(data);
  };
  const openHandler = (item) => {
    setOpen(!open);
    setFormData({ ...formData, id: item._id });
  };
  if (isSuccess) {
    reset();
    setOpen(false);
    setFormData("");
    toast.success("Added to Playlist", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  }
  return (
    <Layout>
      <div className="pageContents">
        {/* Top Songs */}
        <div className="trending">
          <div className="card-3">
            <div className="itemTitle">
              <h3>SONGS</h3>
            </div>
            <Swiper
              modules={[Navigation]}
              slidesPerView={4}
              className="cardFlex desktop"
              navigation
              spaceBetween={15}
              breakpoints={breakpoints}
            >
              {songs?.map((item, i) => (
                <SwiperSlide key={i}>
                  <SongCard
                    play={() => playlistHandler(item)}
                    song={item}
                    liked={likedSongs}
                    myPlaylist={() => openHandler(item)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="cardFlex mobile">
              {songs?.map((item, i) => (
                <SongCard
                  play={() => playlistHandler(item)}
                  song={item}
                  liked={likedSongs}
                  key={i}
                  myPlaylist={() => openHandler(item)}
                />
              ))}
            </div>
          </div>
          <div className="card-1">
            <div className="itemTitle">
              <h3>TOP SONGS OF THE WEEK</h3>
            </div>
            {trends?.map((item, i) => (
              <TrendCard key={i} song={item} play={playlistHandler} />
            ))}
          </div>
        </div>
        {/* End of  Songs */}

        {/* Events */}
        <div className="col">
          <div className="itemTitle">UPCOMING EVENTS</div>
          <div className="cardFlex">
            {event?.map((item, i) => (
              <EventCard key={i} event={item} />
            ))}
          </div>
        </div>
        {/* End of Events */}

        {/* Artist */}
        <div className="col">
          <div className="itemTitle">TOP ARTISTES</div>
          <Swiper
            modules={[Navigation]}
            slidesPerView={4}
            className="cardFlex desktop"
            navigation
            spaceBetween={15}
            breakpoints={breakpoints}
          >
            {artist?.map((item, i) => (
              <SwiperSlide key={i}>
                <UserCard user={item} />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* mobile view */}
          <div className="cardFlex mobile">
            {artist?.map((item, i) => (
              <UserCard key={i} user={item} />
            ))}
          </div>
          {/* end of mobile View */}
        </div>
        {/* End of Artist */}

        {/* Producer */}
        <div className="col">
          <div className="itemTitle">TOP PRODUCERS</div>
          <Swiper
            modules={[Navigation]}
            slidesPerView={4}
            className="cardFlex desktop"
            navigation
            spaceBetween={15}
            breakpoints={breakpoints}
          >
            {producer?.map((item, i) => (
              <SwiperSlide key={i}>
                <UserCard user={item} />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* mobile view */}
          <div className="cardFlex mobile">
            {producer?.map((item, i) => (
              <UserCard key={i} user={item} />
            ))}
          </div>
          {/* end of mobile View */}
        </div>
        {/* End of Producer */}

        {/* DJ */}
        <div className="col">
          <div className="itemTitle">TOP DJs</div>
          <Swiper
            modules={[Navigation]}
            slidesPerView={4}
            className="cardFlex desktop"
            navigation
            spaceBetween={15}
            breakpoints={breakpoints}
          >
            {dj?.map((item, i) => (
              <SwiperSlide key={i}>
                <UserCard user={item} />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* mobile view */}
          <div className="cardFlex mobile">
            {dj?.map((item, i) => (
              <UserCard key={i} user={item} />
            ))}
          </div>
          {/* end of mobile View */}
        </div>
        {/* End of DJ */}

        {/* Comedians */}
        <div className="col">
          <div className="itemTitle">TOP Comedians</div>
          <Swiper
            modules={[Navigation]}
            slidesPerView={4}
            className="cardFlex desktop"
            navigation
            spaceBetween={15}
            breakpoints={breakpoints}
          >
            {comedian?.map((item, i) => (
              <SwiperSlide key={i}>
                <UserCard user={item} />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* mobile view */}
          <div className="cardFlex mobile">
            {comedian?.map((item, i) => (
              <UserCard key={i} user={item} />
            ))}
          </div>
          {/* end of mobile View */}
        </div>
        {/* End of Comedians*/}

        {/* Competition */}
        <div className="col">
          <div className="itemTitle">TOP Comedians</div>
          <Swiper
            modules={[Navigation]}
            slidesPerView={4}
            className="cardFlex desktop"
            navigation
            spaceBetween={15}
            breakpoints={breakpoints}
          >
            {comp?.map((item, i) => (
              <SwiperSlide key={i}>
                <CompetitionCard key={i} info={item} />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Mobile view */}
          <div className="cardFlex mobile">
            {comp?.map((item, i) => (
              <CompetitionCard key={i} info={item} />
            ))}
          </div>
        </div>

        {/* End of Competition */}

        {/* add to playlist */}
        <PlaylistModal
          setErrors={setErrors}
          submitHandler={submitHandler}
          open={open}
          errors={errors}
          formData={formData}
          handleChange={handleChange}
          validationHandler={validationHandler}
          playlist={playlist}
          setOpen={setOpen}
        />
        {/* add to playlist */}
      </div>
      <Player playlist={playList} />
    </Layout>
  );
};

export default Home;
