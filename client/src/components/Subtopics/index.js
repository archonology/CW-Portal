import React from "react";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_SUBTOPICS } from "../../utils/queries";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Container from 'react-bootstrap/Container';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Tooltip from '@mui/material/Tooltip';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import ResourceCard from "../OneResource";
import Subtopic from "../OneSubtopic";
import { Grid, IconButton } from "@mui/material";
import { DELETE_SUBTOPIC } from "../../utils/mutations";


// import dialog pops for admin editing
import SubToTopicDialog from "../SubToTopicDialog";
import Dialog from "@mui/material/Dialog";

import Auth from "../../utils/auth";


const Subtopics = () => {
    // set up useQuery get the data from the backend
    const { loading, error, data } = useQuery(QUERY_ALL_SUBTOPICS);
    const [openTopic, setOpenTopic] = React.useState(false);

    // object to keep the topic data
    const subtopicData = data?.subtopics || [];

    console.log(subtopicData);

    const [deleteSubtopic, { err, dat }] = useMutation(DELETE_SUBTOPIC, {
        refetchQueries: [{ query: QUERY_ALL_SUBTOPICS }],
    });

    const [expanded, setExpanded] = React.useState(false);

    // handle the tab changes
    // const [value, setValue] = React.useState(0);
    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };

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