import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_ALL_SUBTOPICS } from "../../utils/queries";

import Typography from '@mui/material/Typography';

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
        <h5>ALL SUBTOPICS</h5>
            {subtopicData.map((subtopic) => {
                return (
                    <>
                        <Typography key={subtopic._id} fluid className="text-left box">
                            <h3>{subtopic.title}</h3>
                            <p className="mainText">{subtopic.text}</p>
                        </Typography>
                        <hr></hr>
                    </>
                );
            })}
            <hr></hr>
        </>
    );
};

export default Subtopics;