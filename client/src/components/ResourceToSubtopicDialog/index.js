import * as React from "react";
import {
    List,
    ListItem,
    ListItemText,
    Tooltip,
    DialogTitle,
    DialogContent,
    Button,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { QUERY_ALL_SUBTOPICS } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_RESOURCE_TO_SUBTOPIC } from "../../utils/mutations";
import { SnackbarProvider, useSnackbar } from "notistack";

export default function ResourceToSubtopicDialog({ resource }) {

    return (
        // limits the alert to 3 max
        <SnackbarProvider maxSnack={3}>
            <SubtopicList resource={resource} />
        </SnackbarProvider>
    );
}

function SubtopicList({ resource }) {

    const [addResourceToSubtopic, { subtopicError }] = useMutation(ADD_RESOURCE_TO_SUBTOPIC);
    const { loading, err, data } = useQuery(QUERY_ALL_SUBTOPICS);
    const subtopicData = data?.subtopics || [];

    const { enqueueSnackbar } = useSnackbar();

    // takes in a card and deck object
    const handleAddToSubtopic = async (resource, subtopic) => {
        try {
            const { data } = await addResourceToSubtopic({
                variables: { _id: resource._id, title: resource.title, text: resource.text, image: resource.image, link: resource.link, subtopicId: subtopic._id },
            });

            // Display the success message when card added to deck
            enqueueSnackbar(`Added to ${subtopic.title}`, { variant: "success" });

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <DialogTitle>{"Select a Subtopic"}</DialogTitle>
            <DialogContent sx={{ maxHeight: "400px" }}>
                {/* overflowY allows for scrolling*/}
                <List sx={{ overflowY: "scroll" }}>
                    {/* checks for topicData -> topics -> and maps topic titles as list items */}
                    {subtopicData.map((subtopic) => {
                        return (
                            <ListItem key={subtopic._id}>
                                <Tooltip title="Add to this Subtopic">
                                    <Button onClick={() => handleAddToSubtopic(resource, subtopic)}>
                                        <AddCircleOutlineIcon />
                                        <ListItemText primary={subtopic.title} />
                                    </Button>
                                </Tooltip>
                            </ListItem>
                        );
                    }
                    )}

                </List>
            </DialogContent>
        </>
    );
}
