import React from "react";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_TOPICS } from "../../utils/queries";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Container from 'react-bootstrap/Container';
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Divider } from '@mui/material';

import Tooltip from '@mui/material/Tooltip';
import { DELETE_TOPIC } from "../../utils/mutations";
import Topic from "../Topic";

import Auth from "../../utils/auth";


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
                    <>
                    <Topic topic={topic} />
                    </>
                );
            })}
            <hr></hr>
        </>
    );
};

export default Topics;