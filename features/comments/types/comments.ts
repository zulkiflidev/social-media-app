import type { PostAuthor }     from "@/features/posts/types/post";
import type { PaginationMeta } from "@/features/posts/types/post";

export interface Comment {

    id: number;
    text: string;
    createdAt: string;
    author: PostAuthor;
}

export interface CommentsResponse {
    comments: Comment[];
    pagination: PaginationMeta;
}
