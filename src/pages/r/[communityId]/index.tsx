import { Community } from "@/atoms/communitiesAtom";
import CommunityNotFound from "@/components/Community/CommunityNotFound";
import CreatePostLink from "@/components/Community/CreatePostLink";
import Header from "@/components/Community/Header";
import PageContent from "@/components/Layout/PageContent";
import Posts from "@/components/Posts/Posts";
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React from "react";
import safeJsonStringify from "safe-json-stringify";

type CommunityPageProps = {
  communityData: Community
};

const CommunityPage:React.FC<CommunityPageProps> = ({ communityData }) => {

  if (!communityData) {
    return <CommunityNotFound />;
  }

  return (
    <>
      <Header communityData={communityData}/>
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <div>rhs</div>
        </>
      </PageContent>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(firestore, "communities", context.query.communityId as string);
    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: communityDoc.exists() ? JSON.parse(
          safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
        ) : "",
      },
    };
    
  } catch (error: any) {
    console.log("getServerSideProps error", error.message);
  }
}

export default CommunityPage;

