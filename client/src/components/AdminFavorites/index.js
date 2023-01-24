import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ADMIN } from "../../utils/queries";
import ResourceCard from "../OneResource";

const AdminFavorites = () => {

    const { loading: loadingAdmin, error: errorAdmin, data: dataAdmin } = useQuery(QUERY_ADMIN);
    const adminData = dataAdmin?.admin || {};


    if (loadingAdmin) {
        return <h2>LOADING...</h2>;
    }

    console.log(adminData);

    return (
        <>
            {adminData.favorites.map((resource) => {
                const resourceData = {
                    _id: resource._id,
                    title: resource.title,
                    text: resource.text,
                    image: resource.image,
                    link: resource.link,
                };
                return (
                    <>
                        <ResourceCard key={resourceData._id} resource={resourceData} adminFavorites={adminData.favorites} />
                    </>
                )
            })}
        </>
    )
};

export default AdminFavorites;
