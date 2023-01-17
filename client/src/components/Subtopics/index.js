import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_ALL_SUBTOPICS } from "../../utils/queries";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Container from 'react-bootstrap/Container';

const Subtopics = () => {
    // set up useQuery get the data from the backend
    const { loading, error, data } = useQuery(QUERY_ALL_SUBTOPICS);

    // object to keep the topic data
    const subtopicData = data?.subtopics || {};
    // check load time and errors
    if (loading) return "loading";
    if (error) return `Error! ${error}`;

    return (
        <>
            {subtopicData.map((subtopic) => {
                return (
                    <Container key={subtopic._id} fluid>
                        <Stack direction="row" spacing={2} margin={1}>
                            <Avatar
                                alt={"S"}
                                src={subtopic.image}
                                sx={{ width: 100, height: 100, marginTop: 0 }}
                                className="avatar"
                            />
                            <div>
                                <h4 className="subtopic-headers">{subtopic.title}</h4>
                                <p className="mainText">{subtopic.text}</p>
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

export default Subtopics;