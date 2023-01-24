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
import { QUERY_ALL_TOPICS } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { REMOVE_SUBTOPIC_FROM_TOPIC } from "../../utils/mutations";
import { SnackbarProvider, useSnackbar } from "notistack";

export default function XSubtopicFromTopicDialog({ subtopic }) {

    return (
        // limits the alert to 3 max
        <SnackbarProvider maxSnack={3}>
            <TopicList subtopic={subtopic} />
        </SnackbarProvider>
    );
}

function TopicList({ subtopic }) {

    const { loading, err, data } = useQuery(QUERY_ALL_TOPICS);
    const topicData = data?.topics || [];

    const { enqueueSnackbar } = useSnackbar();

    // useMutation -- and refetch needed to update site content dynamically
    const [removeResourceFromTopic, { topicError }] = useMutation(REMOVE_SUBTOPIC_FROM_TOPIC, {
        refetchQueries: [{ query: QUERY_ALL_TOPICS }],
    });


    // takes in a card and deck object
    const handleRemoveFromTopic = async (subtopic, topic) => {
   
        try {
            const { data } = await removeResourceFromTopic({
                variables: { topicId: topic._id, _id: subtopic._id },
            });

            // Display the success message when card added to deck
            enqueueSnackbar(`Removed ${subtopic.title} from ${topic.title}`, { variant: "success" });

        } catch (err) {
            console.error(err);
            enqueueSnackbar(`Error removing ${subtopic.title} from ${topic.title}`, { variant: "error" });
        }
    };

    return (
        <>
            <DialogTitle>{"Select a topic to remove this subtopic from:"}</DialogTitle>
            <DialogContent sx={{ maxHeight: "400px" }}>
                {/* overflowY allows for scrolling*/}
                <List sx={{ overflowY: "scroll" }}>
                    {/* checks for topicData -> topics -> and maps topic titles as list items */}
                    {topicData.map((topic) => {
                        return (
                            <ListItem key={topic._id}>
                                <Tooltip title="Remove From This Topic">
                                    <Button onClick={() => handleRemoveFromTopic(subtopic, topic)}>
                                        <RemoveCircleOutlineIcon/>
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
