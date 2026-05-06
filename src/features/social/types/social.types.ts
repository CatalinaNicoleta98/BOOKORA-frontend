export interface PublicReader {
  id: string;
  handle: string;
  name: string;
  avatarUrl?: string;
  coverImageUrl?: string;
  bio?: string;
  isProfilePublic: boolean;
  followerCount: number;
  followingCount: number;
  isFollowing: boolean;
  isOwnProfile: boolean;
}

export interface ReaderSummary {
  booksInLibrary: number;
  finishedCount: number;
  inProgressCount: number;
  reviewsCount: number;
}

export interface ReaderShelfSummary {
  want_to_read: number;
  currently_reading: number;
  currently_listening: number;
  finished_reading: number;
  finished_listening: number;
  on_break: number;
  did_not_finish: number;
}

export interface ReaderBookSnapshot {
  source: "open_library" | "custom";
  externalBookId?: string;
  title: string;
  author?: string;
  cover?: string;
  publishedYear?: number;
}

export interface ReaderActivityItem {
  type:
    | "reviewed"
    | "rated"
    | "finished_reading"
    | "finished_listening"
    | "currently_reading"
    | "currently_listening";

  createdAt: string;

  isSpoiler?: boolean;
  reviewText?: string;
  rating?: number;
  status?: string;

  book: ReaderBookSnapshot;
}

export interface ReaderSpotlightItem {
  createdAt: string;

  status?: string;
  rating?: number;

  reviewText?: string;
  isSpoiler?: boolean;

  book: ReaderBookSnapshot;
}

export interface PublicReaderProfileResponse {
  reader: PublicReader;

  summary: ReaderSummary;

  shelves: ReaderShelfSummary;

  recentActivity: ReaderActivityItem[];

  spotlight: ReaderSpotlightItem[];
}
