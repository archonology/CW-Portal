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

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Divider } from '@mui/material';

import ResourceCard from "../ResourceCards";
import { Button, ButtonGroup, Grid } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import { DELETE_SUBTOPIC } from "../../utils/mutations";

import Auth from "../../utils/auth";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 2, mt: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Subtopics = () => {
    // set up useQuery get the data from the backend
    const { loading, error, data } = useQuery(QUERY_ALL_SUBTOPICS);

    const [deleteSubtopic, { err, dat }] = useMutation(DELETE_SUBTOPIC, {
        refetchQueries: [{ query: QUERY_ALL_SUBTOPICS }],
    });

    const [expanded, setExpanded] = React.useState(false);

    // handle the tab changes
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleAccordChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // object to keep the topic data
    const subtopicData = data?.subtopics || {};
    // check load time and errors
    if (loading) return "loading";
    if (error) return `Error! ${error}`;

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
                        <Stack spacing={0}>


                            <Accordion key={subtopic._id} expanded={expanded === `panel${subtopic._id}`} onChange={handleAccordChange(`panel${subtopic._id}`)} sx={{ padding: 2, backgroundColor: "transparent" }} >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >

                                    <Typography sx={{ width: '33%', flexShrink: 0, fontSize: 'larger', paddingRight: 2 }} className="subtopic-headers">
                                        {subtopic.title}
                                    </Typography>

                                    <Typography sx={{ color: 'text.secondary' }} >{subtopic.text}</Typography>

                                </AccordionSummary>

                                <AccordionDetails>
                                    {Auth.adminLoggedIn() ? (
                                        <>
                                            <Tooltip title="Delete Resource">
                                                <IconButton onClick={() => handleDelete(subtopic._id)}>
                                                    <DeleteIcon
                                                        className="custom-link"
                                                        sx={{ variant: "filled" }}
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                            <Grid direction="row" container sx={{ padding: "1rem" }}>
                                            <Grid container spacing={0} justifyContent="center">

                                                <ResourceCard />

                                            </Grid>
                                        </Grid>
                                        </>
                                    ) : (
                                        <Grid direction="row" container sx={{ padding: "1rem" }}>
                                            <Grid container spacing={0} justifyContent="center">

                                                <ResourceCard />

                                            </Grid>
                                        </Grid>
                                    )}
                                </AccordionDetails>
                            </Accordion>


                        </Stack>
                    </>
                );

            })}
        </>
    );
};

export default Subtopics;