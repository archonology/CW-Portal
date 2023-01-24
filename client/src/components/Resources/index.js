import React from "react";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_RESOURCES, QUERY_ME } from "../../utils/queries";
import { DELETE_RESOURCE } from "../../utils/mutations";
import ResourceCard from "../OneResource";

import Auth from "../../utils/auth";


const Resources = () => {
    const { loading: loadingMe, error: errorMe, data: dataMe } = useQuery(QUERY_ME);
    const userData = dataMe?.me || {};
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
                    <ResourceCard key={resource._id} resource={resource} favorites={userData.favorites} />
                )

            })}

        </>
    )

};

export default Resources;