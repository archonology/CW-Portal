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
import { QUERY_ALL_TOPICS } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_RESOURCE_TO_TOPIC } from "../../utils/mutations";
import { SnackbarProvider, useSnackbar } from "notistack";

export default function ResourceToTopicDialog({ resource }) {

    return (
        // limits the alert to 3 max
        <SnackbarProvider maxSnack={3}>
            <TopicList resource={resource} />
        </SnackbarProvider>
    );
}

function TopicList({ resource }) {

    const { loading, err, data } = useQuery(QUERY_ALL_TOPICS);
    const topicData = data?.topics || [];

    const { enqueueSnackbar } = useSnackbar();

    // useMutation -- and refetch needed to update site content dynamically
    const [addResourceToTopic, { topicError }] = useMutation(ADD_RESOURCE_TO_TOPIC, {
        refetchQueries: [{ query: QUERY_ALL_TOPICS }],
    });


    // takes in a card and deck object
    const handleAddtoTopic = async (resource, topic) => {
   
        try {
            const { data } = await addResourceToTopic({
                variables: { _id: resource._id, title: resource.title, text: resource.text, image: resource.image, link: resource.link, topicId: topic._id },
            });

            // Display the success message when card added to deck
            enqueueSnackbar(`Added to ${topic.title}`, { variant: "success" });

        } catch (err) {
            console.error(err);
            enqueueSnackbar(`Error adding to ${topic.title}`, { variant: "error" });
        }
    };

    return (
        <>
            <DialogTitle>{"Select a topic"}</DialogTitle>
            <DialogContent sx={{ maxHeight: "400px" }}>
                {/* overflowY allows for scrolling*/}
                <List sx={{ overflowY: "scroll" }}>
                    {/* checks for topicData -> topics -> and maps topic titles as list items */}
                    {topicData.map((topic) => {
                        return (
                            <ListItem key={topic._id}>
                                <Tooltip title="Add to this topic">
                                    <Button onClick={() => handleAddtoTopic(resource, topic)}>
                                        <AddCircleOutlineIcon />
                                        <ListItemText primary={topic.title} />
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
