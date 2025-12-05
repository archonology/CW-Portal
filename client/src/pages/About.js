import React from "react";
import Container from "react-bootstrap/Container";
import { Avatar, Stack, Grid } from "@mui/material";
// import Heidi from '../media/IMG_4744.jpeg'
import Reed from "../media/IMG_4904.jpeg";

const About = () => {
  return (
    <>
      <h2 className="text-center p-2 about">About Us</h2>

      <Grid direction="row" container sx={{ padding: "1rem" }}>
        <Grid container spacing={0} justifyContent="center">
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
                <h5>Web Developer</h5>
                <hr></hr>
                <p className="about">
                  Reed lives with his wife, their three daughters, their
                  huntress house cat, and their big golden dog in Saint Paul,
                  MN.
                </p>
              </div>
              <a
                href="https://www.linkedin.com/in/reed-meher"
                target={"_blank"}
                rel={"nonreferrer"}
              >
                <i class="fa-brands fa-linkedin-in"></i>
              </a>
            </Stack>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default About;
