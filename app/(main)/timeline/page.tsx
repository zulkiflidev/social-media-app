"use client";

import React from 'react';
import AuthGuard from '@/components/shared/AuthGuard';

import useFeed  from '@/features/posts/hooks/useFeed';
import useExplore  from '@/features/posts/hooks/useExplore';


import PostCard from "@/components/shared/PostCard";
import { Button } from '@/components/ui/button';

import { Home } from 'lucide-react';
import { Compass, Search, Globe } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Images from "@/components/shared/Images";
// import Heart from "@/components/shared/Heart";




function TimelinePage() {
  return (
    <AuthGuard>
        <TimelineContent />
    </AuthGuard>

  )
}


function TimelineContent() {

    const { 
        data : dataFeed,
        isLoading : isLoadingFeed,
        isError : isErrorFeed,
        fetchNextPage : fetchNextPageFeed,
        hasNextPage : hasNextPageFeed,
        isFetchingNextPage : isFetchingNextPageFeed,
        error : errorFeed
        
    } = useFeed();

    const { 
        data : dataExplore,
        isLoading : isLoadingExplore,
        isError : isErrorExplore,
        fetchNextPage : fetchNextPageExplore,
        hasNextPage : hasNextPageExplore,
        isFetchingNextPage : isFetchingNextPageExplore,
        error : errorExplore
        
    } = useExplore();

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    // if (isError) {
    //     return <div>Error loading posts.</div>; 
    // }

    const postFeed = dataFeed?.pages.flatMap( (page) => page.items) ?? [];
    const postExplore = dataExplore?.pages.flatMap( (page) => page.posts) ?? [];


    // if (postFeed.length === 0) {
    //     return <div className="flex flex-col justify-center items-center gap-2 mt-4 min-h-[300px]">
            
    //         No posts yet. Follow someone or create your first post ✨

    //     </div>;

    // }

    return (
        // <div className="max-w-lg mx-auto p-4 space-y-4">
        <div className="max-w-2xl mx-auto p-4 space-y-4 w-full">

            {/* <div className="flex justify-center items-center gap-10 mt-2">

                <Button variant="outline" className="flex items-center gap-2 px-5 py-5">
                    <Home className="w-25 h-25" color="white" strokeWidth={2}/>
                    <p className="text-white font-semibold"><span>Feed</span></p>
                </Button>

                <Button variant="outline" className="flex items-center gap-2 px-5 py-5">
                    <Compass className="w-25 h-25" color="white" strokeWidth={2}/>
                    <p className="text-white font-semibold"><span>Explore</span></p>
                </Button>

            </div> */}


            <div>
                <Tabs defaultValue="feed" className="flex pt-4">
                    <TabsList className="grid w-full grid-cols-2 bg-transparent h-auto p-0 rounded-none ">
                        
                        <TabsTrigger 
                            value="feed" 
                            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-full"
                        > 
                            <Home className="w-6 h-6" color="white" strokeWidth={2}/>
                            <p className="text-white font-semibold"><span>Feed</span></p>                        
                        </TabsTrigger>

                        <TabsTrigger 
                            value="explore" 
                            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-full"
                        > 
                            <Compass className="w-6 h-6" color="white" strokeWidth={2}/>
                            <p className="text-white font-semibold"><span>Explore</span></p>                                
                        </TabsTrigger>

                    </TabsList>

                    <TabsContent value="feed">

                        {
                            isLoadingFeed && (
                                <div className="flex flex-col justify-center items-center gap-2 mt-4 min-h-[300px]">
                                    Loading...

                                </div>
                            )
                        }

                        {
                            isErrorFeed && (
                                <div className="flex flex-col justify-center items-center gap-2 mt-4 min-h-[300px]">
                                    Error loading posts!

                                </div>
                            )
                        }

                        {
                            postFeed.length === 0 && (
                                <div className="flex flex-col justify-center items-center gap-2 mt-4 min-h-[300px]">            
                                    
                                    <div className="flex flex-col gap-5 justify-center items-center">
                                        
                                        <div className="rounded-full bg-muted overflow-hidden relative w-15 h-15 flex justify-center items-center">
                                            <Home className="w-8 h-8" color="grey" strokeWidth={2}/>
                                        </div>
                                        
                                        <p className="text-muted-foreground text-center text-sm">No posts yet. Follow someone or create your first post ✨</p>
                                    </div>

                                </div>                                
                            )                   
                        }

                        {
                            postFeed.map(
                                (post) => (
                                    <PostCard key={post.id} post={post} />

                                )
                            )
                        }

                        {
                            hasNextPageFeed && (

                                <div className="flex justify-center items-center gap-2 mt-4 ">
                                    <Button 
                                        variant="default"
                                        className="text-white px-5"
                                        onClick={
                                        () => {
                                            fetchNextPageFeed();
                                        }
                                    } disabled={isFetchingNextPageFeed} >
                                        {isFetchingNextPageFeed ? 'Loading...' : 'Load More'}
                                    </Button>

                                </div>
                            )

                        }            
                    </TabsContent>

                    <TabsContent value="explore">

                        {
                            isLoadingExplore && (
                                <div className="flex flex-col justify-center items-center gap-2 mt-4 min-h-[300px]">
                                    Loading...

                                </div>
                            )
                        }

                        {
                            isErrorExplore && (
                                <div className="flex flex-col justify-center items-center gap-2 mt-4 min-h-[300px]">
                                    Error loading posts!

                                </div>
                            )
                        }
  
                        {
                            postExplore.length === 0 && (
                                <div className="flex flex-col justify-center items-center gap-2 mt-4 min-h-[300px]">            
                                    
                                    <div className="flex flex-col gap-5 justify-center items-center">
                                        
                                        <div className="rounded-full bg-muted overflow-hidden relative w-15 h-15 flex justify-center items-center">
                                            <Home className="w-8 h-8" color="grey" strokeWidth={2}/>
                                        </div>
                                        
                                        <p className="text-muted-foreground text-center text-sm">No posts yet. Please contact Admin for this issue... ✨</p>
                                    </div>

                                </div>                                
                            )                   
                        }                        
                    
                        {
                            postExplore.map(
                                (post) => (
                                    <PostCard key={post.id} post={post} />

                                )
                            )
                        }

                        {
                            hasNextPageExplore && (

                                <div className="flex justify-center items-center gap-2 mt-4 ">
                                    <Button 
                                        variant="default"
                                        className="text-white px-5"
                                        onClick={
                                        () => {
                                            fetchNextPageExplore();
                                        }
                                    } disabled={isFetchingNextPageExplore} >

                                        {isFetchingNextPageExplore ? 'Loading...' : 'Load More'}
                                    
                                    </Button>

                                </div>
                            )

                        }      
                    </TabsContent>


                </Tabs>
            </div>




        </div>
    );
}
 

export default TimelinePage;