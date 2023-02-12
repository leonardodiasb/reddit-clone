import { PostType } from "@/atoms/postsAtom";
import { firestore } from "@/firebase/clientApp";
import { Box, Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { collection, doc, increment, serverTimestamp, Timestamp, writeBatch } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import CommentInput from "./CommentInput";

type CommentsProps = {
  user: User
  selectedPost: PostType | null
  communityId: string
};

export type Comment = {
  id: string
  creatorId: string
  creatorDisplayText: string
  communityId: string
  postId: string
  postTitle: string
  text: string
  createdAt: Timestamp
}

const Comments:React.FC<CommentsProps> = ({
  user,
  selectedPost,
  communityId
}) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const onCreateComment = async () => {
    setCreateLoading(true);
    try {
      const batch = writeBatch(firestore); 

      const commentDocRef = doc(collection(firestore, "comments"));

      const newComment: Comment = {
        id: commentDocRef.id,
        creatorId: user.uid,
        creatorDisplayText: user.email!.split("@")[0],
        communityId,
        postId: selectedPost?.id!,
        postTitle: selectedPost?.title!,
        text: commentText,
        createdAt: serverTimestamp() as Timestamp
      };

      batch.set(commentDocRef, newComment);

      const postDocRef = doc(firestore, "posts", selectedPost?.id!);
      batch.update(postDocRef, {
        numberOfComments: increment(1)
      });

      await batch.commit();

      setCommentText("");
      setComments(prev => [newComment, ...prev]);
    } catch (error: any) {
      console.log("onCreateComment error", error.message);
    }
    setCreateLoading(false);
  };

  const onDeleteComment = async (comment: any) => {};

  const getPostComments = async () => {};

  useEffect(() => {
    getPostComments();
  }, []);

  return (
    <Box bg='white' borderRadius='0px 0px 4px 4px' p={2}>
      <Flex direction='column' pl={10} pr={4} mb={6} fontSize='10pt' width='100%'>
        <CommentInput 
          user={user} 
          commentText={commentText} 
          setCommentText={setCommentText} 
          createLoading={createLoading} 
          onCreateComment={onCreateComment} 
        />
      </Flex>
    </Box>
  );
};

export default Comments;

