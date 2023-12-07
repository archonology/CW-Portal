import React from "react";
import { useMutation } from '@apollo/client';
import Container from 'react-bootstrap/Container';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from '@mui/material/Stack';
import { Grid, IconButton } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Subtopic from "../OneSubtopic";
import ResourceCard from "../OneResource";
import EditTopicDialog from "../EditTopicDialog";
import { DELETE_TOPIC } from "../../utils/mutations";
import { QUERY_ALL_TOPICS } from "../../utils/queries";
import Dialog from "@mui/material/Dialog";
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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));



const Topic = ({ topic }) => {
    // const [expanded, setExpanded] = React.useState(false);

    const [openTopic, setOpenTopic] = React.useState(false);

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [deleteTopic, { err, dat }] = useMutation(DELETE_TOPIC, {
        refetchQueries: [{ query: QUERY_ALL_TOPICS }],
    });

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

            <Container key={topic._id} fluid>
                <Stack direction="row" spacing={2} margin={2}>
                    {/* <Avatar
                        alt={"T"}
                        src={topic.image}
                        sx={{ width: 100, height: 100, marginTop: 1.5 }}
                        className="avatar"
                    /> */}
                    <div>
                        <h2 className="topic-headers">{topic.title}</h2>
                        <p className="mainText">{topic.text}</p>
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
                                <EditTopicDialog topic={topic} />
                            </Dialog>

                            <Tooltip title="Delete Resource">
                                <IconButton onClick={() => handleDelete(topic._id)}>
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

            <Box sx={{ width: '100%', marginTop: 0 }}>
                <Box>

                    <Tabs
                        sx={{ alignContent: "center" }}
                        // variant="fullWidth"
                        value={value}
                        onChange={handleChange}
                        textColor="inherit"
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                        aria-label="scrollable Dashboard List Tabs"
                        indicatorColor="primary">
                        <Tab label="SubTopics" {...a11yProps(0)} />
                        <Tab label="Resources" {...a11yProps(1)} />
                    </Tabs>

                </Box>

                <TabPanel value={value} index={0}>

                    {/* see all subtopics for one topic */}
                    {topic?.subtopics?.map((subtopic) => {
                        return (
                            <>
                                <Subtopic
                                    subtopic={subtopic}
                                />
                            </>
                        )
                    })}

                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Grid direction="row" container sx={{ padding: "1rem" }}>
                        <Grid container spacing={0} justifyContent="center">

                            {topic?.resources?.map((resource) => {
                                return (
                                    <>
                                        <ResourceCard
                                            resource={resource}
                                        />
                                    </>
                                )
                            })}

                        </Grid>
                    </Grid>
                </TabPanel>
            </Box>
        </>
    );
};

export default Topic;