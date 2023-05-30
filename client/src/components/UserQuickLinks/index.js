import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { Button } from "@mui/material";
import { UPDATE_USER_QUICKLINK } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const UserLinks = () => {

    const [updateUserQuickLink] = useMutation(UPDATE_USER_QUICKLINK, {
        refetchQueries: [{ query: QUERY_ME }]
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { loading, error, data } = useQuery(QUERY_ME);

    const userData = data?.me || {};


    const [linkTitle, setLinkTitle] = useState('');
    const [linkAddress, setLinkAddress] = useState('');
    const [linkID, setLinkID] = useState('');

    const handleInputChange = (e) => {
        let { target } = e;
        let inputType = target.name;
        let inputValue = target.value;
        console.log(inputValue);

        if (inputType === 'linkTitle') {
            setLinkTitle(inputValue);
        } else if (inputType === 'linkAddress') {
            setLinkAddress(inputValue);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        handleClose();
        try {
            const { data } = await updateUserQuickLink({
                variables: {
                    _id: linkID,
                    title: linkTitle,
                    link: linkAddress
                },
            });
            setLinkTitle('');
            setLinkAddress('');
        } catch (err) {
            console.error(err);
        }
    }
    

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

    return (
        <>
            {userData?.userQuickLinks.map((link) => {

                return (
                    <>
                        <Container className="userQLBox d-flex justify-content center">
                            
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
                            <Button
                                variant="contained"
                                color="warning"
                                sx={{ m: 1 }}
                                onClick={() => {
                                    setLinkTitle(link.title);
                                    setLinkAddress(link.link);
                                    setLinkID(link._id);
                                    handleShow();
                                 } }
                            >Update
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ m: 1 }}
                                onClick={() => {
              
                                }}
                            >Delete
                            </Button>
                            {/* <div>
                               <p>{link.link}</p> 
                            </div> */}
                        </Container>
                        <Modal show={show} onHide={handleClose} className="modal">
                            <Modal.Header className="modalForm">
                                <Modal.Title>Update Quick Link</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="modalForm">
                                <Form


                                >
                                    <Form.Group className="mb-3" controlId="form.ControlInput1">
                                        <Form.Label>Quick Link Title</Form.Label>
                                        <Form.Control
                                            type="title"
                                            name="linkTitle"
                                            value={linkTitle}
                                            onChange={handleInputChange}
                                            placeholder="Title"
                                            autoFocus
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="form.link"
                                    >
                                        <Form.Label>Link</Form.Label>
                                        <Form.Control
                                            type="link"
                                            name="linkAddress"
                                            value={linkAddress}
                                            onChange={handleInputChange}
                                            placeholder="Link address"
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer className="modalForm">
                                <Button
                                    variant="contained"
                                    color='error'
                                    sx={{ m: 1 }}
                                    onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{ m: 1 }}
                                    onClick={handleFormSubmit}
                                    type="submit"
                                    id="submit"
                                    value='submit'
                                >
                                    Update
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                )
            })}
        </>
    )
};

export default UserLinks;
