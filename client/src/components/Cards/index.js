import React from "react";
import Container from 'react-bootstrap/Container';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, IconButton, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AssignmentIcon from '@mui/icons-material/Assignment';
import IosShareIcon from '@mui/icons-material/IosShare';
import PublicIcon from '@mui/icons-material/Public';
const ResourceCard = () => {
    return (
        <>
            <Card sx={{ maxWidth: 345, margin: 2, boxShadow: 10 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={"https://capacity.childwelfare.gov/sites/default/files/styles/hero_desktop/public/media-image/GettyImages-1084390966-1920px%20-%20mirror.jpg?h=bf8618f3&itok=XH04zm0t"}
                    title="capacity colab cover"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Child Welfare Capacity Building Collaborative
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        The Center for Tribes collaborates with American Indian and Alaska Native nations to help strengthen Tribal child and family systems and services in order to nurture the safety, permanency, and well-being of children, youth, and families.
                    </Typography>
                </CardContent>
                <Divider variant="middle" />
                <CardActions>
                    <IconButton>
                        <FavoriteIcon sx={{ color: "#e57373" }} />
                    </IconButton>
                    <IconButton>
                        <AssignmentIcon sx={{ color: "#4fc3f7" }} />
                    </IconButton>
                    {/* <IconButton>
                        <IosShareIcon sx={{ }} />
                    </IconButton> */}
                    <IconButton>
                        <PublicIcon sx={{ color: "#8bc34a" }} />
                    </IconButton>
                    {/* <Button size="small">Save to a List</Button> */}
                    {/* <Button size="small">Visit the Site</Button> */}
                </CardActions>
            </Card>

            <Card sx={{ maxWidth: 345, margin: 2, boxShadow: 10 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={"https://static.wixstatic.com/media/2a3c6b_62a92c0a95f0439a9a5590af54efa626.jpg/v1/fill/w_351,h_155,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/2a3c6b_62a92c0a95f0439a9a5590af54efa626.jpg"}
                    title="vpc"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Violence Prevention Center
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    The foundation of Violence Prevention Center is deeply imbedded in the nationwide, grassroots movement  to address and end violence against women. Our organization was incorporated in 1986 as the Cook County  Women’s Collective. The Cook County Women’s Collective was started by passionate community members  who saw a need for services and education regarding women and girls who were being subjected to violence.  
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton>
                        <FavoriteIcon sx={{ }} />
                    </IconButton>
                    <IconButton>
                        <AssignmentIcon sx={{ }} />
                    </IconButton>
                    {/* <IconButton>
                        <IosShareIcon sx={{ }} />
                    </IconButton> */}
                    <IconButton>
                        <PublicIcon sx={{  }} />
                    </IconButton>
                    {/* <Button size="small">Save to a List</Button> */}
                    {/* <Button size="small">Visit the Site</Button> */}
                </CardActions>
            </Card>
        </>
    );
};

export default ResourceCard;