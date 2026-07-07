import type { InfiniteData } from "@tanstack/react-query";
import type { ExploreResponse, Post } from "../types/post";



function updatePostInCache(
    oldData: InfiniteData<ExploreResponse> | undefined,
    postId: number,
    updater: (post: Post) => Post
): InfiniteData<ExploreResponse> | undefined 
    {

        if (!oldData) return oldData;

    return{
        ...oldData,
        pages: oldData.pages.map(
            (page) => (
                {
                    ...page,
                    items: page.posts.map( (post) => (
                            post.id === postId ? updater(post) : post
                        )
                    )
                }
            )
        )
        
    }
}

export default updatePostInCache;