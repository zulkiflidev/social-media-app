import type { UserSearchResult } from "@/features/users/types/user";
import type { PaginationMeta } from "@/features/posts/types/post";

export interface FollowListResponse {
  users: UserSearchResult[];
  pagination: PaginationMeta;

  
}