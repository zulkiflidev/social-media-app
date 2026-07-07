export interface PostAuthor{
    id: number;
    username: string;
    name: string;
    avatarUrl: string | null;
}


export  interface Post {
    id: number;
    imageUrl: string;
    caption: string;
    createdAt: string;
    author: PostAuthor;
    likeCount: number;
    commentCount: number;
    likedByMe: boolean;
    savedByMe?: boolean;

}

export  interface PaginationMeta {

    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export  interface FeedResponse {
    items: Post[];
    pagination: PaginationMeta;

}

export  interface ExploreResponse {
    posts: Post[];
    pagination: PaginationMeta;

}

