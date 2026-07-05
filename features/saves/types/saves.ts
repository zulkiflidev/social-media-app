import type { PaginationMeta } from "@/features/posts/types/post";

export interface SavedPost {
  id: number;
  imageUrl: string;
  caption: string;
  createdAt: string;

}

export interface SavedPostsResponse {
  posts: SavedPost[];
  pagination: PaginationMeta;

  
}