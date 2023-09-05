import React from "react";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_SUBTOPICS } from "../../utils/queries";

import Subtopic from "../OneSubtopic";
import { DELETE_SUBTOPIC } from "../../utils/mutations";

const Subtopics = () => {
    // set up useQuery get the data from the backend
    const { loading, error, data } = useQuery(QUERY_ALL_SUBTOPICS);
    const [openTopic, setOpenTopic] = React.useState(false);

    // object to keep the topic data
    const subtopicData = data?.subtopics || [];

    const [deleteSubtopic, { err, dat }] = useMutation(DELETE_SUBTOPIC, {
        refetchQueries: [{ query: QUERY_ALL_SUBTOPICS }],
    });

    const [expanded, setExpanded] = React.useState(false);

    const handleAccordChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // handles open and close edit buttons for admin
    const handleClickOpenTopics = () => {
        setOpenTopic(true);
    };

    const handleCloseTopics = () => {
        setOpenTopic(false);
    };


    const handleDelete = async (_id) => {

        try {
            const { dat } = await deleteSubtopic({
                variables: { _id: _id },
            });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            {subtopicData.map((subtopic) => {
                return (
                    <>
                        <Subtopic subtopic={subtopic} />
                    </>
                );

            })}
        </>
    );
};

export default Subtopics;