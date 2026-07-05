import type { PaginationMeta } from "@/features/posts/types/post";


export interface UserSearchResult {

    id: number;
    username: string;
    name: string;
    avatarUrl: string | null;
    isFollowedByMe: boolean;
}

export interface UsersSearchResponse {
    users: UserSearchResult[];
    pagination: PaginationMeta;


}