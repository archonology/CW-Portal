import React from "react";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_RESOURCES, QUERY_ME } from "../../utils/queries";
import ResourceCard from "../OneResource";

import Auth from "../../utils/auth";


const Resources = () => {
    // query user and admin to get lists info (favorites, to-do, etc.)
    const { loading: loadingMe, error: errorMe, data: dataMe } = useQuery(QUERY_ME);
    const userData = dataMe?.me || {};

    // set up useQuery to get resource data from the backend
    const { loading, error, data } = useQuery(QUERY_ALL_RESOURCES);


    // object to keep the topic data
    const resourceData = data?.resources || [];


    return (
        <>
            {resourceData.map((resource) => {
                return (
                    <>
                    <ResourceCard resource={resource} favorites={userData.favorites} toDo={userData.do} doing={userData.doing} done={userData.done} />
                </>
                )

            })}

        </>
    )

};

export default Resources;