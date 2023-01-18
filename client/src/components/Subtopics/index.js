import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_ALL_SUBTOPICS } from "../../utils/queries";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Container from 'react-bootstrap/Container';
import ResourceCard from "../ResourceCards";
import { Button, ButtonGroup, Grid } from "@mui/material";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    // const buttons = [
    //   <Button key="one">See</Button>,
    //   <Button key="two">Add Subtopic</Button>,
    //   <Button key="three">Three</Button>,
    // ];

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

    // handle the tab changes
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // object to keep the topic data
    const subtopicData = data?.subtopics || {};
    // check load time and errors
    if (loading) return "loading";
    if (error) return `Error! ${error}`;



    return (
        <>
            {subtopicData.map((subtopic) => {
                return (
                    <>
                    <Container key={subtopic._id} fluid>
                        <Stack direction="row" spacing={2} margin={1}>
                            <Avatar
                                alt={"Subtopic image"}
                                src={subtopic.image}
                                sx={{ width: 100, height: 100, marginTop: 0 }}
                                className="avatar"
                            />
                            <div>
                                <h4 className="subtopic-headers">{subtopic.title}</h4>
                                <p className="mainText">{subtopic.text}</p>
                            </div>
                        </Stack>
                    </Container>

            <Box key={subtopic._id} sx={{ width: '100%', marginTop: 0 }}>
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
                        indicatorColor="secondary">
                        <Tab label="Resources" {...a11yProps(0)} />
                    </Tabs>

                </Box>
                <TabPanel value={value} index={0}>

                    <Grid direction="row" container sx={{ padding: "1rem" }}>
                        <Grid container spacing={0} justifyContent="center">

                            <ResourceCard />

                        </Grid>
                    </Grid>

                </TabPanel>

            </Box>
            <hr></hr>
            </>
                );

            })}
        </>
    );
};

export default Subtopics;