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

import Auth from "../../utils/auth";


const Topics = () => {
    // set up useQuery get the data from the backend
    const { loading, error, data } = useQuery(QUERY_ALL_TOPICS);

    const [deleteTopic, { err, dat }] = useMutation(DELETE_TOPIC, {
        refetchQueries: [{ query: QUERY_ALL_TOPICS }],
    });

    // object to keep the topic data
    const topicData = data?.topics || {};
    // check load time and errors
    if (loading) return "loading";
    if (error) return `Error! ${error}`;

    const handleDelete = async (_id) => {

        try {
            const { dat } = await deleteTopic({
                variables: { _id: _id },
            });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            {topicData.map((topic) => {
                return (
                    <Container key={topic._id} fluid>
                        <Stack direction="row" spacing={2} margin={1}>
                            <Avatar
                                alt={"Topic"}
                                src={topic.image}
                                sx={{ width: 100, height: 100, marginTop: 0 }}
                                className="avatar"
                            />
                            <div>
                                {Auth.adminLoggedIn() ? (
                                    <>
                                        <h3 className="topic-headers">{topic.title}</h3>
                                        <p className="mainText">{topic.text}</p>
                                        <Tooltip title="Delete Resource">
                                            <IconButton onClick={() => handleDelete(topic._id)}>
                                                <DeleteIcon
                                                    className="custom-link"
                                                    sx={{ variant: "filled" }}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="topic-headers">{topic.title}</h3>
                                        <p className="mainText">{topic.text}</p>
                                    </>
                                )}

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