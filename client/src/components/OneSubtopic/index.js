import React from "react";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_SUBTOPICS, QUERY_ME } from "../../utils/queries";
import Stack from '@mui/material/Stack';
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
import Avatar from '@mui/material/Avatar';


import ResourceCard from "../OneResource";
import { Grid, IconButton } from "@mui/material";
import { DELETE_SUBTOPIC } from "../../utils/mutations";


// import dialog pops for admin editing
import SubToTopicDialog from "../SubToTopicDialog";
import EditSubtopicDialog from "../EditSubtopicDialog";
import XSubtopicFromTopicDialog from "../XSubtopicFromTopicDialog";
import Dialog from "@mui/material/Dialog";

import Auth from "../../utils/auth";


const Subtopic = ({ subtopic }) => {

    const { loading: loadingMe, error: errorMe, data: dataMe } = useQuery(QUERY_ME);

    const userData = dataMe?.me || {};
    // set up useQuery get the data from the backend
    const { loading, error, data } = useQuery(QUERY_ALL_SUBTOPICS);

    const [openTopic, setOpenTopic] = React.useState(false);
    const [openSubtopic, setOpenSubtopic] = React.useState(false);
    const [openXsubtopic, setOpenXsubtopic] = React.useState(false);

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

    const handleClickOpenSubtopics = () => {
        setOpenSubtopic(true);
    };

    const handleCloseSubtopics = () => {
        setOpenSubtopic(false);
    };

    const handleClickOpenXsubtopics = () => {
        setOpenXsubtopic(true);
    };

    const handleCloseXsubtopics = () => {
        setOpenXsubtopic(false);
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

            <Stack spacing={0}>

                <Accordion key={subtopic._id} expanded={expanded === `panel${subtopic._id}`} onChange={handleAccordChange(`panel${subtopic._id}`)} sx={{ padding: 2, backgroundColor: "#212121" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Avatar
                            alt={"T"}
                            src={subtopic.image}
                            sx={{ width: 50, height: 50, marginRight: 2 }}
                            className="avatar"
                        />

                        <a className="subtopic-headers" href={subtopic.link} target={'_blank'} rel={'nonreferrer'}><Typography sx={{ width: '33%', flexShrink: 0, fontSize: 'larger', paddingRight: 2 }} className="subtopic-headers">
                            {subtopic.title}
                        </Typography></a>

                        <Typography sx={{ color: 'text.secondary', paddingRight: 3 }} >{subtopic.text}</Typography>

                    </AccordionSummary>

                    <AccordionDetails key={subtopic._id} >
                        {Auth.adminLoggedIn() ? (
                            <>
                                {/* the admin edit button set */}
                                <Tooltip title="Add to a Topic">
                                    <IconButton onClick={handleClickOpenTopics}>
                                        <AddCircleIcon sx={{ color: "#00e676" }} />
                                    </IconButton>
                                </Tooltip>

                                {/* run the dialog, manage collapse */}
                                <Dialog open={openTopic} onClose={handleCloseTopics}>
                                    <SubToTopicDialog subtopic={subtopic} />
                                </Dialog>

                                <Tooltip title="Remove from a Topic">
                                    <IconButton onClick={handleClickOpenXsubtopics}>
                                        <RemoveCircleIcon sx={{ color: "white" }} />
                                    </IconButton>
                                </Tooltip>

                                <Dialog open={openXsubtopic} onClose={handleCloseXsubtopics}>
                                    <XSubtopicFromTopicDialog subtopic={subtopic} />
                                </Dialog>

                                <Tooltip title="Edit">
                                    <IconButton onClick={handleClickOpenSubtopics}>
                                        <EditIcon sx={{ color: "#ffcf33" }} />
                                    </IconButton>
                                </Tooltip>

                                <Dialog open={openSubtopic} onClose={handleCloseSubtopics}>
                                    <EditSubtopicDialog subtopic={subtopic} />
                                </Dialog>

                                <Tooltip title="Delete Resource">
                                    <IconButton onClick={() => handleDelete(subtopic._id)}>
                                        <DeleteIcon
                                            className="custom-link"
                                            sx={{ variant: "filled", color: "#b2102f" }}
                                        />
                                    </IconButton>
                                </Tooltip>

                            </>
                        ) : (
                            <></>

                        )}
                        <>
                            <Grid direction="row" container sx={{ padding: "1rem" }}>
                                <Grid container spacing={1} justifyContent="center">

                                    {subtopic?.resources.map((resource) => {
                                        console.log(resource);
                                        return (
                                            <>
                                                <ResourceCard resource={resource} favorites={userData.favorites} toDo={userData.do} doing={userData.doing} done={userData.done} />
                                            </>
                                        )
                                    })}

                                </Grid>
                            </Grid>


                            <Grid direction="row" container sx={{ padding: "1rem" }}>
                                <Grid container spacing={0} justifyContent="center">


                                </Grid>
                            </Grid>
                        </>

                    </AccordionDetails>
                </Accordion>

            </Stack>

        </>
    );
};

export default Subtopic;