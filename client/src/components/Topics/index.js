import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_ALL_TOPICS } from "../../utils/queries";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Container from 'react-bootstrap/Container';

const Topics = () => {
    // set up useQuery get the data from the backend
    const { loading, error, data } = useQuery(QUERY_ALL_TOPICS);

    // object to keep the topic data
    const topicData = data?.topics || {};
    // check load time and errors
    if (loading) return "loading";
    if (error) return `Error! ${error}`;

    return (
        <>
            {topicData.map((topic) => {
                return (
                    <Container key={topic._id} fluid>
                    <Stack direction="row" spacing={2}  margin={1}>
                        <Avatar
                            alt={topic.title + "image"}
                            src={topic.image}
                            sx={{ width: 100, height: 100, marginTop: 0 }}
                        />
                        <div>
                            <h3 className="topic-headers">{topic.title}</h3>
                            <p className="mainText">{topic.text}</p>
                        </div>
                    </Stack>
                    <hr></hr>
                </Container>
                );
            })}
            <hr></hr>
        </>
    );
};

export default Topics;