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
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from '@mui/material/Tooltip';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_RESOURCES } from "../../utils/queries";
import { DELETE_RESOURCE } from "../../utils/mutations";
import { Link } from 'react-router-dom';

import Auth from "../../utils/auth";


const ResourceCard = () => {
    // set up useQuery to get resource data from the backend
    const { loading, error, data } = useQuery(QUERY_ALL_RESOURCES);

    // handle delete resource and refetch minus the deleted resource
    const [deleteResource, { err, dat }] = useMutation(DELETE_RESOURCE, {
        refetchQueries: [{ query: QUERY_ALL_RESOURCES }],
    });

    // object to keep the topic data
    const resourceData = data?.resources || {};
    // check load time and errors
    if (loading) return "loading";
    if (error) return `Error! ${error}`;

    const handleDelete = async (_id) => {
        //  Auth.adminLoggedIn() ? Auth.getAdminToken() : null;

        try {
            const { dat } = await deleteResource({
                variables: { _id: _id },
            });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            {resourceData.map((resource) => {
                return (
                    <Card key={resource._id} sx={{ maxWidth: 400, minWidth: 300, margin: 2, boxShadow: 10 }}  >
                        <CardMedia
                            component="img"
                            alt="resource image"
                            height="140"
                            image={resource.image}
                            className="bgresource"
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
                            {Auth.adminLoggedIn() ? (
                                <>
                                    <IconButton>
                                        <FavoriteIcon sx={{ color: "#e57373" }} />
                                    </IconButton>

                                    <IconButton>
                                        <AssignmentIcon sx={{ color: "#4fc3f7" }} />
                                    </IconButton>

                                    <IconButton className="link2" href={resource.link} target={'_blank'} rel={'nonreferrer'}>
                                        <PublicIcon sx={{ color: "#8bc34a" }} />
                                    </IconButton>

                                    <Tooltip title="Delete Resource">
                                        <IconButton onClick={() => handleDelete(resource._id)}>
                                            <DeleteIcon
                                                className="custom-link"
                                                sx={{ variant: "filled" }}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            ) : (
                                <>
                                    <IconButton>
                                        <FavoriteIcon sx={{ color: "#e57373" }} />
                                    </IconButton>

                                    <IconButton>
                                        <AssignmentIcon sx={{ color: "#4fc3f7" }} />
                                    </IconButton>

                                    <IconButton className="link2" href={resource.link} target={'_blank'} rel={'nonreferrer'}>
                                        <PublicIcon sx={{ color: "#8bc34a" }} />
                                    </IconButton>
                                </>
                            )}


                        </CardActions>
                    </Card>

                );
            })}
        </>
    );
};

export default ResourceCard;