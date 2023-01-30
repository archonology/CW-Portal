import React from "react";
import Container from 'react-bootstrap/Container';
import { Avatar, Stack, Grid } from "@mui/material";
import Heidi from '../media/IMG_4744.jpeg'
import Reed from '../media/IMG_4904.jpeg'


const About = () => {
    return (
        <>
            <h2 className="text-center p-2 mt-5">About Us</h2>

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
                                <h5 className="subtopic-headers">Child Welfare Scholar, MSW</h5>
                                <hr></hr>
                                <p className="about">This is a site dedicated to child welfare workers in MN. It is a hub for resources commonly needed by new and experience CW workers. Users are also able to create accounts so that they can save favorite resource links and created simple, learning to-do lists.</p>
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
                                <h5 className="subtopic-headers">Full Stack Developer</h5>
                                <hr></hr>
                                <p className="about">Among many things, Reed is a wanderer, homemaker, artist, writer, musician, teacher, social worker, and graphic designer. Now he's forging all his experience into becoming a <span>Full Stack</span> and <span>Frontend Developer</span>: a dream he's had ever since the long summer days of his youth spent attempting to get the family Commodore 64 to reveal it's secrets through the command line.</p>
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