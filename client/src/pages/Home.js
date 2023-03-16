import React from "react";
import Container from 'react-bootstrap/Container';
import Post from "../components/OnePost";
import { useQuery } from '@apollo/client';
import { QUERY_ALL_POSTS } from "../utils/queries";



const Home = () => {
  const { loading, error, data } = useQuery(QUERY_ALL_POSTS);

  const postData = data?.posts || [];

  return (
    <>
      <Container fluid className="text-center p-5 mt-3 box">
        <h1 className="welcome">Welcome to The Child Welfare Portal</h1>
      </Container>

      {postData.map((post) => (
        <Container  className="post p-3 mb-3">

          <Post key={post._id} post={post} />

        </Container>
      ))}


    </>

  );
};

export default Home;
