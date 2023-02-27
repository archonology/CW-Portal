import React, { useState } from "react";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { Grid, TextField, Button } from "@mui/material";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SEARCHED_SUBTOPIC, QUERY_SEARCHED_TOPICS, QUERY_SEARCHED_RESOURCE } from '../utils/queries';
import Subtopic from "../components/OneSubtopic";
import ResourceCard from "../components/OneResource";
import Nav from 'react-bootstrap/Nav';


// the tabs in the main body of the Search Page
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
                <Box sx={{ p: 6, paddingTop: 0 }}>
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

    // const { loading: quickLinkLoading, error: errQuick, data: dataQuickLink } = useQuery(QUERY_ALL_QUICKLINKS);

    // const quickLinkData = dataQuickLink?.quicklinks || [];

    // const { loading: postLoading, error: errPost, data: dataPost } = useQuery(QUERY_ALL_POSTS);

    // const postData = dataPost?.posts || [];

    // const [openQuick, setOpenQuick] = React.useState(false);

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

    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();

    //     try {
    //         const { topicData } = await QUERY_SEARCHED_TOPICS({
    //             variables: { ...formState }
    //         });
    //         console.log(topicData);

    //     } catch (e) {
    //         console.error(e);
    //     }
    // };


    // const [deleteQuickLink, { err, dat }] = useMutation(DELETE_QUICKLINK, {
    //     refetchQueries: [{ query: QUERY_ALL_QUICKLINKS }],
    // });

    return (
        <Box sx={{ display: 'flex' }}>

            <Box sx={{ width: '100%', marginTop: 2 }}>
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
                        {/* <Tab label="QuickLinks" {...a11yProps(3)} />
                            <Tab label="Posts" {...a11yProps(4)} /> */}
                    </Tabs>

                </Box>
                <TabPanel value={value} index={0}>
                    <Grid direction="row" container >
                        <Grid container spacing={0}>
                            <Box
                                component="form"
                                // onSubmit={handleFormSubmit}
                                noValidate
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: { sm: "1fr" },
                                    gap: 2,
                                    marginBottom: "5em",
                                    marginLeft: "2em",
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
                                ></TextField>


                                {/* <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={{ maxWidth: "100px" }}
                                >
                                    search
                                </Button> */}

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
                    <Grid direction="row" container sx={{ padding: "1rem" }}>
                        <Grid container spacing={0} justifyContent="center">
                            <Box
                                component="form"
                                // onSubmit={handleFormSubmit}
                                noValidate
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: { sm: "1fr" },
                                    gap: 2,
                                    marginBottom: "5em",
                                    marginLeft: "2em",
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
                                ></TextField>


                                {/* <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={{ maxWidth: "100px" }}
                                >
                                    search
                                </Button> */}

                                {searchedSubtopicData?.map((subtopic) => {
                                    return (

                                        // <Nav.Link
                                        //     key={subtopic._id}
                                        //     as={Link}
                                        //     to={`/subtopic/${subtopic._id}`}
                                        //     className="subtopics p-2"
                                        //     variant='dark'
                                        // >{subtopic.title}
                                        // </Nav.Link>

                                        <>
                                            <Subtopic subtopic={subtopic} />
                                        </>

                                    )
                                })}


                            </Box>

                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Box
                        component="form"
                        // onSubmit={handleFormSubmit}
                        noValidate
                    >
                        <br></br>
                        <TextField
                            name="title"
                            value={formState.title}
                            onChange={handleSearchChange}
                            label="Search Resources"
                            id="titleName"
                            variant="standard"
                        ></TextField>

                    </Box>
                    <Grid direction="row" container sx={{ padding: "1rem" }}>
                        <Grid container spacing={0} justifyContent="center">

                            {/* <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={{ maxWidth: "100px" }}
                                >
                                    search
                                </Button> */}


                            {searchedResourceData?.map((resource) => {
                                return (

                                    <>
                                        <ResourceCard resource={resource} />
                                    </>
                                    // <Nav.Link
                                    //     key={resource._id}
                                    //     as={Link}
                                    //     to={`/resources/${resource._id}`}
                                    //     className="resources p-2"
                                    //     variant='dark'
                                    // >{resource.title}
                                    // </Nav.Link>

                                )
                            })}




                        </Grid>
                    </Grid>

                </TabPanel>
                {/* <TabPanel value={value} index={3}>
                    {quickLinkData.map((quicklink) => {
                        return (
                            <>
                                <ul>
                                    <QuickLink quicklink={quicklink} />
                                </ul>
                            </>
                        );
                    })}

                </TabPanel> */}
                {/* 
                <TabPanel value={value} index={4}>


                    {postData.map((post) => {
                        return (
                            <Container key={post._id} fluid className="bg-dark p-1 mb-3">

                                <Post post={post} />

                            </Container>
                        )

                    })}

                </TabPanel> */}

            </Box>
        </Box>

    );
}

export default Search;