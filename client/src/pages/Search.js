import React, { useState } from "react";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { Grid, TextField } from "@mui/material";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useQuery } from '@apollo/client';
import { QUERY_SEARCHED_SUBTOPIC, QUERY_SEARCHED_TOPICS, QUERY_SEARCHED_RESOURCE, QUERY_ME } from '../utils/queries';
import Subtopic from "../components/OneSubtopic";
import ResourceCard from "../components/OneResource";
import Nav from 'react-bootstrap/Nav';

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
                <Box sx={{ padding: 3, paddingTop: 0 }}>
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

const Search = () => {

    const [formState, setFormState] = useState({ title: "" });


    const { loading: topicLoading, error: topicError, data: topicData } = useQuery(QUERY_SEARCHED_TOPICS, { variables: { ...formState } });

    const searchedTopicData = topicData?.searchedTopics || [];

    const { loading: subtopicLoading, error: subtopicError, data: subtopicData } = useQuery(QUERY_SEARCHED_SUBTOPIC, { variables: { ...formState } });

    const searchedSubtopicData = subtopicData?.searchedSubtopics || [];

    const { loading: resourceLoading, error: resourceError, data: resourceData } = useQuery(QUERY_SEARCHED_RESOURCE, { variables: { ...formState } });

    const searchedResourceData = resourceData?.searchedResources || [];

    const { loading: loadingMe, error: errorMe, data: dataMe } = useQuery(QUERY_ME);

    const userData = dataMe?.me || {};

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSearchChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });

    };

    return (
        <Box sx={{ width: '100%', marginTop: "7em" }}>
            <Box>

                <Tabs
                    sx={{ alignContent: "center" }}
                    value={value}
                    onChange={handleChange}
                    textColor="inherit"
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable Dashboard List Tabs"
                    indicatorColor="primary">
                    <Tab label="Search Topics" {...a11yProps(0)} />
                    <Tab label="Search SubTopics" {...a11yProps(1)} />
                    <Tab label="Search Resources" {...a11yProps(2)} />
                </Tabs>


                <TabPanel value={value} index={0}>
                    <Grid direction="row" container >
                        <Grid container spacing={0}>
                            <Box
                                component="form"
                                noValidate
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: { sm: "1fr" },
                                    gap: 2,
                                    justify: "center",
                                    alignItems: "center",
                                }}
                            >
                                <br></br>
                                <TextField
                                    name="title"
                                    value={formState.title}
                                    onChange={handleSearchChange}
                                    label="Search Topics"
                                    id="titleName"
                                    variant="standard"
                                    sx={{ width: '325px' }}
                                ></TextField>

                                {searchedTopicData?.map((topic) => {
                                    return (

                                        <Nav.Link
                                            key={topic._id}
                                            as={Link}
                                            to={`/resources/${topic._id}`}
                                            className="topics p-2"
                                            variant='dark'
                                        >{topic.title}
                                        </Nav.Link>

                                    )
                                })}

                            </Box>

                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>

                    <Box
                        component="form"
                        noValidate
                        sx={{
                            display: "grid",
                            gap: 2,
                            justify: "center",
                            alignItems: "center",
                        }}
                    >
                        <br></br>
                        <TextField
                            name="title"
                            value={formState.title}
                            onChange={handleSearchChange}
                            label="Search Subtopics"
                            id="titleName"
                            variant="standard"
                            sx={{ width: '325px' }}
                        ></TextField>
                        <br></br>

                    </Box>

                    {searchedSubtopicData?.map((subtopic) => {
                        return (
                            <>
                                <Subtopic subtopic={subtopic} />
                            </>

                        )
                    })}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Box
                        component="form"
                        noValidate
                        sx={{ paddingBottom: "1rem" }}
                    >
                        <br></br>
                        <TextField
                            name="title"
                            value={formState.title}
                            onChange={handleSearchChange}
                            label="Search Resources"
                            id="titleName"
                            variant="standard"
                            sx={{ width: '325px' }}
                        ></TextField>

                    </Box>

                    <Grid direction="row" container sx={{ padding: "1rem" }}>
                        <Grid container spacing={0} justifyContent="center">

                            {searchedResourceData?.map((resource) => {
                                return (
                                    <>
                                        <ResourceCard resource={resource} favorites={userData.favorites} toDo={userData.do} doing={userData.doing} done={userData.done} />
                                    </>
                                )
                            })}

                        </Grid>
                    </Grid>

                </TabPanel>

            </Box>
        </Box>

    );
}

export default Search;