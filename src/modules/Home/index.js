import React, { useContext, useMemo, useState } from "react";
import Layout from "../../layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  CompetitionCard,
  EventCard,
  // Player,
  SongCard,
  TrendCard,
  UserCard,
} from "../../components";
import { breakpoints } from "./Breakpoints";
import { AuthContext } from "../../context";
import { hooks } from "../../hooks";
import { toast } from "react-toastify";
import PlaylistModal from "./PlaylistModal";

const Home = () => {
  const [playList, setPlaylist] = useState([]);
  const [open, setOpen] = useState();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  // const loading = useIsMutating();

  const { user } = useContext(AuthContext);
  const songs = hooks.useSong();
  const event = hooks.useEvent();
  const comp = hooks.useCompetition();
  const trends = hooks.useTrends();
  const talent = hooks.useTalents();
  const playlist = hooks.usePlaylist();

  const hooksObj = useMemo(
    () => ({
      songs,
      event,
      comp,
      trends,
      talent,
      playlist,
    }),
    [songs, event, comp, trends, talent, playlist]
  );

  const likedSongs = user?.likedSongs;

  const { mutate } = hooks.usePlaySong();

  const playlistHandler = (audio) => {
    let song = { ...audio, musicSrc: audio.song };
    setPlaylist((prev) => [...prev, song]);
    mutate(audio._id);
  };

  const artist = hooksObj?.talent.filter((x) => x.role === "Artist");
  const producer = hooksObj?.talent.filter((x) => x.role === "Producer");
  const dj = hooksObj?.talent.filter((x) => x.role === "DJ");
  const comedian = hooksObj?.talent.filter((x) => x.role === "Comedian");

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validationHandler = (name, error) => {
    setErrors({
      ...errors,
      [name]: error,
    });
  };
  const { mutate: add, isSuccess, reset } = hooks.useUpdatePlaylist();

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
    <Layout name="Home">
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
              {hooksObj?.songs?.map((item, i) => (
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
              <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                className="cardFlex mobile"
                navigation
                spaceBetween={1}
                breakpoints={breakpoints}
                observer
                observeParents
                parallax
              >
                {hooksObj?.songs?.map((item, i) => (
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
            </div>
          </div>
          <div className="card-1">
            <div className="itemTitle">
              <h3>TOP SONGS OF THE WEEK</h3>
            </div>
            {hooksObj?.trends?.map((item, i) => (
              <TrendCard key={i} song={item} play={playlistHandler} />
            ))}
          </div>
        </div>
        {/* End of  Songs */}

        {/* Events */}
        <div className="col">
          <div className="itemTitle">UPCOMING EVENTS</div>
          <div className="cardFlex">
            {hooksObj?.event?.map((item, i) => (
              <EventCard key={i} event={item} />
            ))}
          </div>
        </div>
        {/* End of Events */}

        {/* Artist */}
        <div className="col">
          <div className="itemTitle">TOP ARTISTS</div>
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
            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              className="cardFlex mobile"
              navigation
              spaceBetween={3}
              breakpoints={breakpoints}
            >
              {artist?.map((item, i) => (
                <SwiperSlide key={i}>
                  <UserCard user={item} />
                </SwiperSlide>
              ))}
            </Swiper>
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
            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              className="cardFlex mobile"
              navigation
              spaceBetween={3}
              breakpoints={breakpoints}
            >
              {producer?.map((item, i) => (
                <SwiperSlide key={i}>
                  <UserCard user={item} />
                </SwiperSlide>
              ))}
            </Swiper>
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
            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              className="cardFlex mobile"
              navigation
              spaceBetween={3}
              breakpoints={breakpoints}
            >
              {dj?.map((item, i) => (
                <SwiperSlide key={i}>
                  <UserCard user={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* end of mobile View */}
        </div>
        {/* End of DJ */}

        {/* Comedians */}
        <div className="col">
          <div className="itemTitle">TOP COMEDIANS</div>
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
            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              className="cardFlex mobile"
              navigation
              spaceBetween={3}
              breakpoints={breakpoints}
            >
              {comedian?.map((item, i) => (
                <SwiperSlide key={i}>
                  <UserCard user={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* end of mobile View */}
        </div>
        {/* End of Comedians*/}

        {/* Competition */}
        <div className="col">
          <div className="itemTitle">TOP COMPETITIONS</div>
          <Swiper
            modules={[Navigation]}
            slidesPerView={4}
            className="cardFlex desktop"
            navigation
            spaceBetween={15}
            breakpoints={breakpoints}
          >
            {hooksObj?.comp?.map((item, i) => (
              <SwiperSlide key={i}>
                <CompetitionCard key={i} info={item} />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Mobile view */}
          <div className="cardFlex mobile">
            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              className="cardFlex mobile"
              navigation
              spaceBetween={3}
              breakpoints={breakpoints}
            >
              {hooksObj?.comp?.map((item, i) => (
                <SwiperSlide key={i}>
                  <CompetitionCard key={i} info={item} />
                </SwiperSlide>
              ))}
            </Swiper>
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
          playlist={hooksObj?.playlist}
          setOpen={setOpen}
        />
        {/* add to playlist */}
      </div>
      {/* <Player playlist={playList} /> */}
    </Layout>
  );
};

export default Home;
