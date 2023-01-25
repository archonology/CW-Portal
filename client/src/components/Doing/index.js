import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { Container, Grid } from "@mui/material";
import ResourceCard from "../OneResource";

const Doing = () => {
    const { loading, error, data } = useQuery(QUERY_ME);

    const userData = data?.me || {};

    //Error handling if user is not logged in
    if (error) {
        console.log(error);
        return (
            <h3
                style={{
                    color: "#fff",
                    textAlign: "center",
                }}
            >
                {error.toString().replace("ApolloError: ", "")}
            </h3>
        );
    }

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    console.log(userData);

    return (
        <>
            {userData.doing.map((resource) => {
                const resourceData = {
                    _id: resource._id,
                    title: resource.title,
                    text: resource.text,
                    image: resource.image,
                    link: resource.link,
                };
                return (
                    <>
                        <ResourceCard key={resourceData._id} resource={resourceData} favorites={userData.favorites} toDo={userData.do} doing={userData.doing} done={userData.done} />
                    </>
                )
            })}
        </>
    )
};

export default Doing;
