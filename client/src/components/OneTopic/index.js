import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_ONE_TOPIC } from "../../utils/queries";
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Typography from '@mui/material/Typography';

const OneTopic = () => {

    // get teh id with useParams
    const { _id } = useParams();
    // set up useQuery get the data from the backend
    const { loading, error, data } = useQuery(
        _id ? QUERY_ONE_TOPIC : error,
        {
            variables: { _id: _id },
        }
    );

    // object to keep the topic data
    const topicData = data?.topic || {};
    // check load time and errors
    if (loading) return "loading";
    if (error) return `Error! ${error}`;

    return (
        <>
            <Container fluid className="text-left p-5 mt-5 box">

                <h2 className="topic-headers">{topicData.title}</h2>
                <p className="mainText">{topicData.text}</p>

                <hr></hr>
            </Container>
        </>
    );
};

export default OneTopic;