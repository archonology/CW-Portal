import React from "react";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_TOPICS, QUERY_ONE_TOPIC, QUERY_ME } from "../../utils/queries";
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from '@mui/material/Stack';
import { Grid, IconButton } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Subtopic from "../OneSubtopic";
import ResourceCard from "../OneResource";
import EditTopicDialog from "../EditTopicDialog";
import { DELETE_TOPIC } from "../../utils/mutations";
import Dialog from "@mui/material/Dialog";
import Auth from "../../utils/auth";
import { Button } from '@mui/material';


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
                <Box sx={{ p: 0, m: .5, mt: 3 }}>
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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));



const OneTopic = ({ }) => {
    const { loading: loadingMe, error: errorMe, data: dataMe } = useQuery(QUERY_ME);

    const userData = dataMe?.me || {};
    const [expanded, setExpanded] = React.useState(false);

    const [openTopic, setOpenTopic] = React.useState(false);

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [deleteTopic, { err, dat }] = useMutation(DELETE_TOPIC, {
        refetchQueries: [{ query: QUERY_ALL_TOPICS }],
    });


    // get the id with useParams
    const { _id } = useParams();
    // set up useQuery get the data from the backend
    const { loading, error, data } = useQuery(
        _id ? QUERY_ONE_TOPIC : error,
        {
            variables: { _id: _id },
        }
    );

    // object to keep the topic data
    const topicData = data?.topic || {};
    // check load time and errors
    if (loading) return "loading";
    if (error) return `Error! ${error}`;



    const handleClickOpenTopics = () => {
        setOpenTopic(true);
    };

    const handleCloseTopics = () => {
        setOpenTopic(false);
    };

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
            <Container fluid>
                <Stack direction="row" spacing={2} margin={2} marginTop={15} padding={3} className="topicBox">
                    <div>
                        <h2 className="topic-headers">{topicData.title}</h2>
                        <hr />
                        <p className="mainText">{topicData.text}
                            <br />
                            <span>
                                <Button
                                    href={topicData.link}
                                    target={'_blank'}
                                    rel={'nonreferrer'}
                                    variant="outlined"
                                    color="primary"
                                    sx={{ marginTop: 3 }}
                                    size="small" >Learn More
                                </Button>
                            </span>
                        </p>
                    </div>
                </Stack>
                {Auth.adminLoggedIn() ? (
                    <>
                        <Box sx={{ marginLeft: 2 }}>
                            <Tooltip title="Edit">
                                <IconButton onClick={handleClickOpenTopics}>
                                    <EditIcon sx={{ color: "#ffcf33" }} />
                                </IconButton>
                            </Tooltip>

                            <Dialog open={openTopic} onClose={handleCloseTopics}>
                                <EditTopicDialog topic={topicData} />
                            </Dialog>

                            <Tooltip title="Delete Resource">
                                <IconButton onClick={() => handleDelete(topicData._id)}>
                                    <DeleteIcon
                                        className="custom-link"
                                        sx={{ variant: "filled", color: "#b2102f" }}
                                    />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </>
                ) : (
                    <>

                    </>
                )}
            </Container>

            <Box sx={{ margin: "1em" }}>
                <Box>

                    <Tabs
                        sx={{ alignContent: "center" }}
                        // variant="fullWidth"
                        value={value}
                        onChange={handleChange}
                        textColor="inherit"
                        // variant="fullWidth"
                        centered
                        scrollButtons
                        allowScrollButtonsMobile
                        aria-label="scrollable Dashboard List Tabs"
                        indicatorColor="primary">
                        {/* If a topic has no subtopics, don't load a subtopic tab. */}
                        <Tab label="Resources" {...a11yProps(0)} />
                        {topicData.subtopics.length > 0 ? (<Tab label="SubTopics" {...a11yProps(1)} />) : (<></>)}

                    </Tabs>

                </Box>

                <TabPanel value={value} index={0}>

                    <Grid direction="row" container sx={{ padding: "1rem" }}>
                        <Grid container spacing={0} justifyContent="center">

                            {topicData?.resources?.map((resource) => {
                                return (
                                    <>
                                        <ResourceCard resource={resource} favorites={userData.favorites} toDo={userData.do} doing={userData.doing} done={userData.done} />
                                    </>
                                )
                            })}

                        </Grid>
                    </Grid>
                </TabPanel>
                {topicData.subtopics ? (<TabPanel value={value} index={1}>

                    {/* see all subtopics for one topic */}
                    {topicData?.subtopics?.map((subtopic) => {
                        return (
                            <>
                                <Subtopic
                                    subtopic={subtopic}
                                />
                            </>
                        )
                    })}

                </TabPanel>) : (<></>)}


            </Box>

        </>
    );
};

export default OneTopic;