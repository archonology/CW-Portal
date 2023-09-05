import React from "react";
import { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { IconButton, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Tooltip from '@mui/material/Tooltip';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_RESOURCES, QUERY_ME } from "../../utils/queries";
import {
    DELETE_RESOURCE,
    ADD_RESOURCE_TO_FAVS,
    ADD_RESOURCE_TO_DO,
    ADD_RESOURCE_TO_DOING,
    ADD_RESOURCE_TO_DONE,
    REMOVE_RESOURCE_FROM_FAVS,
    REMOVE_RESOURCE_FROM_DOING,
    REMOVE_RESOURCE_FROM_DONE,
    REMOVE_RESOURCE_FROM_TODO
} from "../../utils/mutations";

// import dialog pop ups for admin resource editting
import ResourceToTopicDialog from "../ResourceToTopicDialog";
import ResourceToSubtopicDialog from "../ResourceToSubtopicDialog";
import XResourceFromTopicDialog from "../XResourceFromTopicDialog";
import EditResourceDialog from "../EditResourceDialog";
import Dialog from "@mui/material/Dialog";

import Auth from "../../utils/auth";
import XResourceFromSubtopicDialog from "../XResourceFromSubtopicDialog";
import RemoveCircle from "@mui/icons-material/RemoveCircle";
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';


const ResourceCard = ({ resource, favorites, toDo, doing, done }) => {

    //If user is logged in, check their lists to manage icon color
    let favState = false;
    let doState = false;
    let doingState = false;
    let doneState = false;

    if (Auth.loggedIn()) {
        const favChecker = favorites.filter((resourceObj) => resourceObj._id === resource._id);
        const toDoChecker = toDo.filter((resourceObj) => resourceObj._id === resource._id);
        const doingChecker = doing.filter((resourceObj) => resourceObj._id === resource._id);
        const doneChecker = done.filter((resourceObj) => resourceObj._id === resource._id);

        if (favChecker.length > 0) {
            favState = true;
        }
        if (toDoChecker.length > 0) {
            doState = true;
        }
        if (doingChecker.length > 0) {
            doingState = true;
        }
        if (doneChecker.length > 0) {
            doneState = true;
        }
    }

    const [clicked, setClicked] = useState(favState);
    const [clickedToDo, setClickedToDo] = useState(doState);
    const [clickedDoing, setClickedDoing] = useState(doingState);
    const [clickedDone, setClickedDone] = useState(doneState);


    const { loading, error, data } = useQuery(QUERY_ALL_RESOURCES);
    const [openTopic, setOpenTopic] = React.useState(false);
    const [openXtopic, setOpenXtopic] = React.useState(false);
    const [openXsubtopic, setOpenXsubtopic] = React.useState(false);
    const [openSubtopic, setOpenSubtopic] = React.useState(false);
    const [openResource, setOpenResource] = React.useState(false);

    // handle adding to lists
    const [addResourceToFavs, { e }] = useMutation(ADD_RESOURCE_TO_FAVS, {
        refetchQueries: [{ query: QUERY_ME }]
    });
    const [addResourceToDo] = useMutation(ADD_RESOURCE_TO_DO, {
        refetchQueries: [{ query: QUERY_ME }]
    });
    const [addResourceToDoing] = useMutation(ADD_RESOURCE_TO_DOING, {
        refetchQueries: [{ query: QUERY_ME }]
    });
    const [addResourceToDone] = useMutation(ADD_RESOURCE_TO_DONE, {
        refetchQueries: [{ query: QUERY_ME }]
    });
    const [removeResourceFromFavs] = useMutation(REMOVE_RESOURCE_FROM_FAVS, {
        refetchQueries: [{ query: QUERY_ME }]
    });
    const [removeResourceFromDo] = useMutation(REMOVE_RESOURCE_FROM_TODO, {
        refetchQueries: [{ query: QUERY_ME }]
    });
    const [removeResourceFromDoing] = useMutation(REMOVE_RESOURCE_FROM_DOING, {
        refetchQueries: [{ query: QUERY_ME }]
    });
    const [removeResourceFromDone] = useMutation(REMOVE_RESOURCE_FROM_DONE, {
        refetchQueries: [{ query: QUERY_ME }]
    });

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
    };

    const handleSaveToFavs = async (resource) => {

        //If the clicked state is currently set to false, change it to true and add card to user's favorites
        if (!clicked) {
            try {
                const { data } = await addResourceToFavs({
                    variables: { ...resource },
                });
                setClicked(true);
            } catch (err) {
                console.error(err);
            }
        }
        //if the current fav state is set to true and the user clicks the button, we want to remove it from our favorites
        if (clicked) {
            try {
                const { data } = await removeResourceFromFavs({
                    variables: { _id: resource._id }, //Remove the resource based on the _id value
                });
                setClicked(false);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleSaveToDo = async (resource) => {

        //If the clicked state is currently set to false, change it to true and add card to user's favorites
        if (!clickedToDo) {
            try {
                const { data } = await addResourceToDo({
                    variables: { ...resource },
                });
                setClickedToDo(true);
            } catch (err) {
                console.error(err);
            }
        }
        //if the current fav state is set to true and the user clicks the button, we want to remove it from our favorites
        if (clickedToDo) {
            try {
                const { data } = await removeResourceFromDo({
                    variables: { _id: resource._id }, //Remove the resource based on the _id value
                });
                setClickedToDo(false);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleSaveToDoing = async (resource) => {

        if (!clickedDoing) {
            try {
                const { data } = await addResourceToDoing({
                    variables: { ...resource },
                });
                setClickedDoing(true);
            } catch (err) {
                console.error(err);
            }
        }

        if (clickedDoing) {
            try {
                const { data } = await removeResourceFromDoing({
                    variables: { _id: resource._id },
                });
                setClickedDoing(false);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleSaveToDone = async (resource) => {

        if (!clickedDone) {
            try {
                const { data } = await addResourceToDone({
                    variables: { ...resource },
                });
                setClickedDone(true);
            } catch (err) {
                console.error(err);
            }
        }

        if (clickedDone) {
            try {
                const { data } = await removeResourceFromDone({
                    variables: { _id: resource._id },
                });
                setClickedDone(false);
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <>
            <Card key={resource._id} sx={{ width: "340px", minHeight: "240px", margin: 2.2, boxShadow: 10, padding: 1.5, backgroundColor: "#212121" }}  >
                {/* client requested dropping photos for resources */}
                {/* <CardMedia
                    component="img"
                    alt="resource image"
                    height="140"
                    image={resource.image}
                    className="bgresource"
                /> */}
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {resource.title}
                    </Typography>
                    <hr />
                    {/* set textbox scroll and height: sx={{ overflow: "auto", height: "165px" }} */}
                    <Typography color="text.secondary" sx={{}}>
                        {resource.text}<br></br>
                    </Typography>
                    <Button
                        href={resource.link}
                        target={'_blank'}
                        rel={'nonreferrer'}
                        variant="text"
                        color="secondary"
                        className="cardButton"
                        sx={{ marginTop: 2, marginBottom: -3 }}
                        size="medium" >Visit Website</Button>
                </CardContent>

                <CardActions sx={{}}>


                    {Auth.loggedIn() ? (
                        <>

                            <div onClick={() => handleSaveToFavs(resource)}>
                                {clicked ? (
                                    <Tooltip title="Remove from Favorites">
                                        <IconButton>
                                            <FavoriteIcon sx={{ color: "#f6685e" }} />
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="Add to Favorites">
                                        <IconButton>
                                            <FavoriteBorderIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </div>

                            {/* toggle buttons for the user kanban */}
                            <div onClick={() => handleSaveToDo(resource)}>
                                {clickedToDo ? (
                                    <Tooltip title="Remove From To-Do List">
                                        <IconButton>
                                            <LooksOneIcon sx={{ color: "#ffcd38" }} />
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="Add to To-Do List">
                                        <IconButton>
                                            <LooksOneIcon sx={{ color: "white" }} />
                                        </IconButton>
                                    </Tooltip>
                                )}

                            </div>

                            <div onClick={() => handleSaveToDoing(resource)}>
                                {clickedDoing ? (
                                    <Tooltip title="Remove From Doing List">
                                        <IconButton>
                                            <LooksTwoIcon sx={{ color: "#33bfff" }} />
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="Add to Doing List">
                                        <IconButton>
                                            <LooksTwoIcon sx={{ color: "white" }} />
                                        </IconButton>
                                    </Tooltip>
                                )}

                            </div>

                            <div onClick={() => handleSaveToDone(resource)}>
                                {clickedDone ? (
                                    <Tooltip title="Remove From Done List">
                                        <IconButton>
                                            <Looks3Icon sx={{ color: "#ff9800" }} />
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="Add to Done List">
                                        <IconButton>
                                            <Looks3Icon sx={{ color: "white" }} />
                                        </IconButton>
                                    </Tooltip>
                                )}

                            </div>

                        </>
                    ) : (
                        <>

                        </>
                    )}

                    {Auth.adminLoggedIn() ? (
                        <>

                            <Tooltip title="Add to a Topic">
                                <IconButton onClick={handleClickOpenTopics}>
                                    <AddCircleIcon sx={{ color: "#00e676" }} />
                                </IconButton>
                            </Tooltip>

                            {/* run the dialog, manage collapse */}
                            <Dialog open={openTopic} onClose={handleCloseTopics}>
                                <ResourceToTopicDialog resource={resource} />
                            </Dialog>

                            <Tooltip title="Remove from a Topic">
                                <IconButton onClick={handleClickOpenXtopics}>
                                    <RemoveCircle sx={{ color: "white" }} />
                                </IconButton>
                            </Tooltip>

                            <Dialog open={openXtopic} onClose={handleCloseXtopics}>
                                <XResourceFromTopicDialog resource={resource} />
                            </Dialog>

                            <Tooltip title="Add to a Subtopic">
                                <IconButton onClick={handleClickOpenSubtopics}>
                                    <AddCircleIcon sx={{ color: "orange" }} />
                                </IconButton>
                            </Tooltip>

                            <Dialog open={openSubtopic} onClose={handleCloseSubtopics}>
                                <ResourceToSubtopicDialog resource={resource} />
                            </Dialog>

                            <Tooltip title="Remove from a Subtopic">
                                <IconButton onClick={handleClickOpenXsubtopics}>
                                    <RemoveCircleOutlineIcon sx={{ color: "white" }} />
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


                        </>
                    ) : (
                        <>

                        </>
                    )}
                </CardActions>
            </Card>


        </>
    );
};

export default ResourceCard;