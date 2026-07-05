export interface LikedUser {
    id: number;
    username: string;
    name: string;
    avatarUrl: string | null;
    isFollowedByMe: boolean;
    isMe: boolean;
    followsMe: boolean;

}

export interface LikesResponse {
    
    users: LikedUser[];
    
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        
    };

}