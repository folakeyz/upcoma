import { useEvent, useAttendEvent } from "./User/events";
import { useBeat } from "./User/beats";
import { useCompetition } from "./User/competition";
import { useArtist } from "./User/artist";
import { useProducer } from "./User/producer";
import {
  useSong,
  useLikeSong,
  usePlaySong,
  usePostComment,
} from "./User/songs";
import { useLikeComedy } from "./User/comedy";
import {
  usePlaylist,
  useUpdatePlaylist,
  useCreatePlaylist,
} from "./User/playlist";
import { useTalents, useTrends } from "./User/chart";
import { useUpdateProfile, useUploadPhoto } from "./User/profile";
import { useGenres } from "./Admin/genres";
import { useLikeMix } from "./User/djbooth";
import { useFollow, useLike, useWatchlist } from "./User/generic";
import { useUploadService } from "./User/services";

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
  useGenres,
  usePostComment,
  useLikeMix,
  useFollow,
  useLike,
  useWatchlist,
  useUploadService,
  useCreatePlaylist,
  useAttendEvent,
};
