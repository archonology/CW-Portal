import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { IconButton, Divider } from '@mui/material';
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

          
        </>
    );
};

export default ResourceCard;