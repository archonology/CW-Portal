import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_ALL_TOPICS } from "../../utils/queries";

import Typography from '@mui/material/Typography';

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
            <h5>ALL TOPICS</h5>
            {topicData.map((topic) => {
                return (
                    <>
                        <Typography key={topic._id} fluid className="text-left box">
                            <h2>{topic.title}</h2>
                            <p className="mainText">{topic.text}</p>
                        </Typography>
                        <hr></hr>
                    </>
                );
            })}
            <hr></hr>
        </>
    );
};

export default Topics;