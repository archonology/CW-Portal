import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { Container, Grid, Button } from "@mui/material";
import { Link } from 'react-router-dom';


const UserLinks = () => {
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
            {userData.userQuickLinks.map((link) => {

                return (
                    <>
                        <Button
                            key={link._id}
                            href={link.link}
                            target={'_blank'}
                            rel={'nonreferrer'}
                            variant="contained"
                            color="success"
                            sx={{ m: 1 }}
            
                        >{link.title}
                        </Button>
                    </>
                )
            })}
        </>
    )
};

export default UserLinks;
