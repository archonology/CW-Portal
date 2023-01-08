import React from "react";
import ResourceItems from "../components/ResourceItems/index";
import Container from 'react-bootstrap/Container';

const Resources = () => {
    return (
        <>
            <Container fluid className="text-left p-5 mt-5 box">
                <ResourceItems />
            </Container>
        </>
    );
};

export default Resources;