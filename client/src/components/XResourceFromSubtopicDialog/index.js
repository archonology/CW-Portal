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
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { QUERY_ALL_SUBTOPICS } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { REMOVE_RESOURCE_FROM_SUBTOPIC } from "../../utils/mutations";
import { SnackbarProvider, useSnackbar } from "notistack";

export default function XResourceFromSubtopicDialog({ resource }) {

    return (
        // limits the alert to 3 max
        <SnackbarProvider maxSnack={3}>
            <SubtopicList resource={resource} />
        </SnackbarProvider>
    );
}

function SubtopicList({ resource }) {

    const { loading, err, data } = useQuery(QUERY_ALL_SUBTOPICS);
    const subtopicData = data?.subtopics || [];

    const { enqueueSnackbar } = useSnackbar();

    // useMutation -- and refetch needed to update site content dynamically
    const [removeResourceFromSubtopic, { subtopicError }] = useMutation(REMOVE_RESOURCE_FROM_SUBTOPIC, {
        refetchQueries: [{ query: QUERY_ALL_SUBTOPICS }],
    });


    // takes in a card and deck object
    const handleRemoveFromSubtopic = async (resource, subtopic) => {

        try {
            const { data } = await removeResourceFromSubtopic({
                variables: { subtopicId: subtopic._id, _id: resource._id },
            });

            // Display the success message when card added to deck
            enqueueSnackbar(`Removed ${resource.title} from ${subtopic.title}`, { variant: "success" });

        } catch (err) {
            console.error(err);
            enqueueSnackbar(`Error removing ${resource.title} from ${subtopic.title}`, { variant: "error" });
        }
    };

    return (
        <>
            <DialogTitle>{"Select a subtopic to remove this resource from:"}</DialogTitle>
            <DialogContent sx={{ maxHeight: "400px" }}>
                {/* overflowY allows for scrolling*/}
                <List sx={{ overflowY: "scroll" }}>
                    {/* checks for topicData -> topics -> and maps topic titles as list items */}
                    {subtopicData.map((subtopic) => {
                        return (
                            <ListItem key={subtopic._id}>
                                <Tooltip title="Remove From This Topic">
                                    <Button onClick={() => handleRemoveFromSubtopic(resource, subtopic)}>
                                        <RemoveCircleOutlineIcon />
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
