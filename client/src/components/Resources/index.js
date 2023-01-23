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
import EditResourceDialog from "../EditResourceDialog";
import Dialog from "@mui/material/Dialog";
import ResourceCard from "../OneResource";

import Auth from "../../utils/auth";


const Resources = () => {
    // set up useQuery to get resource data from the backend
    const { loading, error, data } = useQuery(QUERY_ALL_RESOURCES);
    const [openTopic, setOpenTopic] = React.useState(false);
    const [openSubtopic, setOpenSubtopic] = React.useState(false);
    const [openResource, setOpenResource] = React.useState(false);

    // object to keep the topic data
    const resourceData = data?.resources || [];

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
            {resourceData.map((resource) => {
                return (
                    <ResourceCard resource={resource} />
                )

            })}

        </>
    )

};

export default Resources;