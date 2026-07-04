import type { Post, PaginationMeta } from "@/features/posts/types/post";

export interface LikedPost extends Post {
  likedAt: string;

}

export interface MyLikesResponse {
  posts: LikedPost[];
  pagination: PaginationMeta;

}