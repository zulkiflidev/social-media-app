export interface PublicProfile {

    id: number;
    username: string;
    name: string;
    avatarUrl: string | null;
    bio: string | null;
    postsCount: number;
    followersCount: number;
    followingCount: number;
    isFollowedByMe: boolean;


}