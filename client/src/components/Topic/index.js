import React from "react";
import Container from 'react-bootstrap/Container';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Subtopic from "../OneSubtopic";
import ResourceCard from "../OneResource";



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
    const [expanded, setExpanded] = React.useState(false);

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleAccordChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    return (
        <>
            <Container key={topic._id} fluid>
                <Stack direction="row" spacing={2} margin={1}>
                    <Avatar
                        alt={"T"}
                        src={topic.image}
                        sx={{ width: 100, height: 100, marginTop: 1.5 }}
                        className="avatar"
                    />
                    <div>
                        <h2 className="topic-headers">{topic.title}</h2>
                        <p className="mainText">{topic.text}</p>
                    </div>
                </Stack>

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
                    <Paper>
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
                    </Paper>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Paper elevation={5}>
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
                    </Paper>
                </TabPanel>

            </Box>

        </>
    );
};

export default Topic;