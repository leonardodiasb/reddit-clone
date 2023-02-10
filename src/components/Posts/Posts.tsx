import { Community } from "@/atoms/communitiesAtom";
import { PostType } from "@/atoms/postsAtom";
import { auth, firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { Stack } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PostItem from "./PostItem";

type PostsProps = {
  communityData: Community;
};

const Posts:React.FC<PostsProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const { postStateValue, setPostStateValue, onVote, onSelectPost, onDeletePost } = usePosts();

  const getPosts = async () => {
    try {

      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postsQuery);
      const posts = postDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPostStateValue(prev => ({
        ...prev,
        posts: posts as PostType[]
      }));

      console.log(posts);
      
    } catch (error: any) {
      console.log("getPosts error", error.message);
    }

  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Stack>
      {postStateValue.posts.map(item => (
        <PostItem 
          key={item.title}
          post={item} 
          userIsCreator={user?.uid == item.creatorId} 
          userVoteValue={undefined} 
          onVote={onVote}
          onSelectPost={onSelectPost}
          onDeletePost={onDeletePost}
        />
      ))}
    </Stack>
  );
};

export default Posts;

