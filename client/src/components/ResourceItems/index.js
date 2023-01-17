import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_ALL_RESOURCES } from "../../utils/queries";

const ResourceItems = () => {
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
                <div key={resource._id}>
                    <h2>{resource.title}</h2>
                    <p className="mainText">{resource.text}</p>
                </div>
            })}
        </>
    );
};

export default ResourceItems;