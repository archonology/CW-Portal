import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { IconButton, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AssignmentIcon from '@mui/icons-material/Assignment';
import PublicIcon from '@mui/icons-material/Public';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Tooltip from '@mui/material/Tooltip';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_RESOURCES } from "../../utils/queries";
import { DELETE_RESOURCE } from "../../utils/mutations";

// import dialog pop ups for admin resource editting
import ResourceToTopicDialog from "../ResourceToTopicDialog";
import ResourceToSubtopicDialog from "../ResourceToSubtopicDialog";
import XResourceFromTopicDialog from "../XResourceFromTopicDialog";
import EditResourceDialog from "../EditResourceDialog";
import Dialog from "@mui/material/Dialog";

import Auth from "../../utils/auth";
import XResourceFromSubtopicDialog from "../XResourceFromSubtopicDialog";


const ResourceCard = ({ resource }) => {
    // set up useQuery to get resource data from the backend
    const { loading, error, data } = useQuery(QUERY_ALL_RESOURCES);
    const [openTopic, setOpenTopic] = React.useState(false);
    const [openXtopic, setOpenXtopic] = React.useState(false);
    const [openXsubtopic, setOpenXsubtopic] = React.useState(false);
    const [openSubtopic, setOpenSubtopic] = React.useState(false);
    const [openResource, setOpenResource] = React.useState(false);


    // handle delete resource and refetch minus the deleted resource
    const [deleteResource, { err, dat }] = useMutation(DELETE_RESOURCE, {
        refetchQueries: [{ query: QUERY_ALL_RESOURCES }],
    });

    // handles the admin edit button toggling
    const handleClickOpenTopics = () => {
        setOpenTopic(true);
    };

    const handleCloseTopics = () => {
        setOpenTopic(false);
    };

    const handleClickOpenSubtopics = () => {
        setOpenSubtopic(true);
    };

    const handleCloseSubtopics = () => {
        setOpenSubtopic(false);
    };

    const handleClickOpenXtopics = () => {
        setOpenXtopic(true);
    };

    const handleCloseXtopics = () => {
        setOpenXtopic(false);
    };

    const handleClickOpenXsubtopics = () => {
        setOpenXsubtopic(true);
    };

    const handleCloseXsubtopics = () => {
        setOpenXsubtopic(false);
    };


    const handleClickOpenResource = () => {
        setOpenResource(true);
    };

    const handleCloseResource = () => {
        setOpenResource(false);
    };

    const handleDelete = async (_id) => {

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
            <Card key={resource._id} sx={{ maxWidth: 525, minWidth: 350, margin: 2, boxShadow: 10 }}  >
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

                {Auth.adminLoggedIn() ? (
                    <>
                        <CardActions>
                            <IconButton>
                                <FavoriteIcon sx={{ color: "#e57373" }} />
                            </IconButton>

                            <IconButton>
                                <AssignmentIcon sx={{ color: "#4fc3f7" }} />
                            </IconButton>

                            <IconButton className="link2" href={resource.link} target={'_blank'} rel={'nonreferrer'}>
                                <PublicIcon sx={{ color: "#8bc34a" }} />
                            </IconButton>
                        </CardActions>
                        <Divider variant="middle" />
                        {/* tools specific to admin */}
                        <CardActions>

                            <Tooltip title="Add to a Topic">
                                <IconButton onClick={handleClickOpenTopics}>
                                    <AddCircleIcon sx={{ color: "#00e676" }} />topic
                                </IconButton>
                            </Tooltip>

                            {/* run the dialog, manage collapse */}
                            <Dialog open={openTopic} onClose={handleCloseTopics}>
                                <ResourceToTopicDialog resource={resource} />
                            </Dialog>

                            <Tooltip title="Add to a Subtopic">
                                <IconButton onClick={handleClickOpenSubtopics}>
                                    <AddCircleOutlineIcon sx={{ color: "#00e676" }} />subtopic
                                </IconButton>
                            </Tooltip>

                            <Dialog open={openSubtopic} onClose={handleCloseSubtopics}>
                                <ResourceToSubtopicDialog resource={resource} />
                            </Dialog>

                            <Tooltip title="Remove from a Topic">
                                <IconButton onClick={handleClickOpenXtopics}>
                                    <RemoveCircleIcon sx={{ color: "#af52bf" }} />tpc
                                </IconButton>
                            </Tooltip>

                            <Dialog open={openXtopic} onClose={handleCloseXtopics}>
                                <XResourceFromTopicDialog resource={resource} />
                            </Dialog>

                            <Tooltip title="Remove from a Subtopic">
                                <IconButton onClick={handleClickOpenXsubtopics}>
                                    <RemoveCircleOutlineIcon sx={{ color: "#af52bf" }} />sbt
                                </IconButton>
                            </Tooltip>

                            <Dialog open={openXsubtopic} onClose={handleCloseXsubtopics}>
                                <XResourceFromSubtopicDialog resource={resource} />
                            </Dialog>

                            <Tooltip title="Edit">
                                <IconButton onClick={handleClickOpenResource}>
                                    <EditIcon sx={{ color: "#ffcf33" }} />
                                </IconButton>
                            </Tooltip>

                            <Dialog open={openResource} onClose={handleCloseResource}>
                                <EditResourceDialog resource={resource} />
                            </Dialog>

                            <Tooltip title="Delete Resource">
                                <IconButton onClick={() => handleDelete(resource._id)}>
                                    <DeleteIcon
                                        className="custom-link"
                                        sx={{ color: "#b2102f" }}
                                    />
                                </IconButton>
                            </Tooltip>





                        </CardActions>
                    </>
                ) : (
                    <>
                        <CardActions>
                            <IconButton>
                                <FavoriteIcon sx={{ color: "#e57373" }} />
                            </IconButton>

                            <IconButton>
                                <AssignmentIcon sx={{ color: "#4fc3f7" }} />
                            </IconButton>

                            <IconButton className="link2" href={resource.link} target={'_blank'} rel={'nonreferrer'}>
                                <PublicIcon sx={{ color: "#8bc34a" }} />
                            </IconButton>
                        </CardActions>
                    </>

                )}
            </Card>


        </>
    );
};

export default ResourceCard;