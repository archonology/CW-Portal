import React from "react";
import Container from 'react-bootstrap/Container';

const Home = () => {
    return (
        <>
        <Container  className="text-center p-5 mt-5 box">
        <h1>Welcome to the Public Child Welfare Portal</h1>
        <p className="mainText">This is a site dedicated to child welfare workers in MN. It is a hub for resources commonly needed by new and experience CW workers. Users are also able to create accounts so that they can save favorite resource links and created simple, learning to-do lists.</p>
        </Container>
        </>
    );
};

export default Home;
