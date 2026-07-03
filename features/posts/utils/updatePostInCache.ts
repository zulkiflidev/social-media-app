import type { InfiniteData } from "@tanstack/react-query";
import type { FeedResponse, Post } from "../types/post";


function updatePostInCache(
    oldData: InfiniteData<FeedResponse> | undefined,
    postId: number,
    updater: (post: Post) => Post
): InfiniteData<FeedResponse> | undefined 
    {

        if (!oldData) return oldData;

    return{
        ...oldData,
        pages: oldData.pages.map(
            (page) => (
                {
                    ...page,
                    items: page.items.map( (post) => (
                            post.id === postId ? updater(post) : post
                        )
                    )
                }
            )
        )
        
    }
}

export default updatePostInCache;