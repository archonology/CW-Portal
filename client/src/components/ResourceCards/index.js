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

import { useQuery } from '@apollo/client';
import { QUERY_ALL_RESOURCES } from "../../utils/queries";
import { Link } from 'react-router-dom';



const ResourceCard = () => {
    // set up useQuery to get resource data from the backend
    const { loading, error, data } = useQuery(QUERY_ALL_RESOURCES);

    // object to keep the topic data
    const resourceData = data?.resources || {};
    // check load time and errors
    if (loading) return "loading";
    if (error) return `Error! ${error}`;

    return (
        <>
            {resourceData.map((resource) => {
                return (
                    <Card sx={{ maxWidth: 400, minWidth: 300, margin: 2, boxShadow: 10 }}>
                        <CardMedia
                            sx={{ height: "auto" }}
                            image={resource.image}
                            title="capacity colab cover"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {resource.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {resource.text}
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
                            <IconButton className="link2" href={resource.link} target={'_blank'} rel={'nonreferrer'}>
                                <PublicIcon sx={{ color: "#8bc34a" }} />
                            </IconButton>
                            {/* <Button size="small">Save to a List</Button> */}
                            {/* <Button size="small">Visit the Site</Button> */}
                        </CardActions>
                    </Card>

                );
            })}
        </>
    );
};

export default ResourceCard;