import React from "react";
import Container from 'react-bootstrap/Container';
import { Avatar, Stack, Grid } from "@mui/material";
import Heidi from '../media/IMG_4744.jpeg'
import Reed from '../media/IMG_4904.jpeg'


const About = () => {
    return (
        <>
            <h2 className="text-center p-2 about">About Us</h2>

            <Grid direction="row" container sx={{ padding: "1rem" }}>
                <Grid container spacing={0} justifyContent="center">

                    <Container className="mb-3 p-3 bio">
                        <Stack direction="row" spacing={4} margin={1}>
                            <Avatar
                                alt={"portrait of Heidi"}
                                src={Heidi}
                                sx={{ width: 125, height: 125, marginTop: 2 }}
                                className="avatar"
                            />
                            <div>
                                <h3 className="topic-headers">Heidi Akins</h3>
                                <h5>Child Welfare Scholar, MSW</h5>
                                <hr></hr>
                                <p className="about">Heidi is a gifted and experienced child welfare social worker, wonderful mother of three children, and a fantastic advocate for the best things humanity has to offer.</p>
                            </div>
                            <a href="https://www.linkedin.com/in/heidi-akins-66b427221/" target={'_blank'} rel={'nonreferrer'}><i class="fa-brands fa-linkedin-in"></i></a>
                        </Stack>
                    </Container>

                    <Container className="p-3 bio">
                        <Stack direction="row" spacing={4} margin={1}>
                            <Avatar
                                alt={"Portrait of Reed"}
                                src={Reed}
                                sx={{ width: 125, height: 125, marginTop: 2 }}
                                className="avatar"
                            />
                            <div>
                                <h3 className="topic-headers">Reed Meher</h3>
                                <h5>Full Stack Developer</h5>
                                <hr></hr>
                                <p className="about">Reed lives with his partner, their three daughters, their huntress house cat, and their elephantine puppy along the stony edge of Lake Superior in Grand Marais, MN.</p>
                            </div>
                          <a href="https://www.linkedin.com/in/reed-meher" target={'_blank'} rel={'nonreferrer'}><i class="fa-brands fa-linkedin-in"></i></a>
                        </Stack>
                    </Container>

                </Grid>
            </Grid>
        </>


    );
};

export default About;