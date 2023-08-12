import { useEvent, useAttendEvent } from "./User/events";
import {
  useBeat,
  usePlayBeat,
  useBuyBeat,
  usePostComment as usePostBeatComment,
} from "./User/beats";
import { useCompetition, useJoinCompetition } from "./User/competition";
import { useArtist } from "./User/artist";
import { useProducer } from "./User/producer";
import {
  useSong,
  useLikeSong,
  usePlaySong,
  usePostComment,
} from "./User/songs";
import {
  useLikeComedy,
  usePostComment as usePostComedyComment,
  usePlayComedy,
  useComedy,
} from "./User/comedy";
import {
  usePlaylist,
  useUpdatePlaylist,
  useCreatePlaylist,
} from "./User/playlist";
import { useTalents, useTrends } from "./User/chart";
import { useUpdateProfile, useUploadPhoto } from "./User/profile";
import { useGenres, useUploadSong, useDeleteSong } from "./Admin/genres";
import { useUploadComedy, useDeleteComedy } from "./Admin/comedy";
import { useUploadBeat, useDeleteBeat } from "./Admin/beats";
import { useDeleteMix, useUploadMix } from "./Admin/mix";
import { useMyBooking as useAdminBooking } from "./Admin/booking";
import { useJoinedComp } from "./Admin/comp";
import { useAnalytics } from "./Admin/dashboard";
import { useRegEvent } from "./Admin/events";
import {
  useLikeMix,
  usePlayMix,
  usePostMixComment,
  useMix,
} from "./User/djbooth";
import { useFollow, useLike, useWatchlist, useUsers } from "./User/generic";
import { useUploadService } from "./User/services";
import { useCreateBooking, useMyBooking } from "./User/booking";
import { useTrending } from "./User/chart";
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
  usePlayMix,
  usePostMixComment,
  useJoinCompetition,
  useMix,
  usePostComedyComment,
  usePlayComedy,
  useComedy,
  usePlayBeat,
  useBuyBeat,
  usePostBeatComment,
  useCreateBooking,
  useMyBooking,
  useUsers,
  useTrending,
  useUploadSong,
  useDeleteSong,
  useUploadComedy,
  useDeleteComedy,
  useUploadBeat,
  useDeleteBeat,
  useUploadMix,
  useDeleteMix,
  useAdminBooking,
  useJoinedComp,
  useAnalytics,
  useRegEvent,
};
