import { useEvent } from "./User/events";
import { useBeat } from "./User/beats";
import { useCompetition } from "./User/competition";
import { useArtist } from "./User/artist";
import { useProducer } from "./User/producer";
import { useSong, useLikeSong, usePlaySong } from "./User/songs";
import { useLikeComedy } from "./User/comedy";
import { usePlaylist, useUpdatePlaylist } from "./User/playlist";
import { useTalents, useTrends } from "./User/chart";
import { useUpdateProfile, useUploadPhoto } from "./User/profile";

export const hooks = {
  useEvent,
  useBeat,
  useCompetition,
  useArtist,
  useProducer,
  useSong,
  useLikeComedy,
  useLikeSong,
  usePlaylist,
  useUpdatePlaylist,
  useTalents,
  useTrends,
  usePlaySong,
  useUpdateProfile,
  useUploadPhoto,
};
