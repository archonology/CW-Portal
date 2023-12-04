import React from "react";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_POSTS } from "../../utils/queries";
import { DELETE_POST } from "../../utils/mutations";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import Auth from "../../utils/auth";
import EditPostDialog from "../EditPostDialog";
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material';
import Dialog from "@mui/material/Dialog";

const Post = ({ post }) => {
    const { loading, error, data } = useQuery(QUERY_ALL_POSTS);

    const postData = data?.posts || [];

    const [openPosts, setopenPosts] = React.useState(false);

    const handleClickOpenPosts = () => {
        setopenPosts(true);
    }

    const handleClosePosts = () => {
        setopenPosts(false);
    }

    const [deletePost, { err, dat }] = useMutation(DELETE_POST, {
        refetchQueries: [{ query: QUERY_ALL_POSTS }],
    });


    const handleDelete = async (_id) => {

        try {
            const { dat } = await deletePost({
                variables: { _id: _id },
            });
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <>

            <Stack key={post._id} direction="column" spacing={1} margin={4}>
                <h4>{post.title}</h4><p>{post.text}<br></br><span><Button
                    href={post.link}
                    target={'_blank'}
                    rel={'nonreferrer'}
                    variant="outlined"
                    color="success"
                    sx={{ marginTop: 3 }}
                    size="small" >Learn More</Button></span></p>
                <Stack spacing={2} direction="row">

                </Stack>
            </Stack>

            {Auth.adminLoggedIn() ? (
                <>
                    <Tooltip title="Edit" sx={{ marginLeft: 3, padding: 2 }}>
                        <IconButton onClick={handleClickOpenPosts}>
                            <EditIcon sx={{ color: "#ffcf33" }} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Post">
                        <IconButton onClick={() => handleDelete(post._id)}>
                            <DeleteIcon
                                className="custom-link"
                                sx={{ color: "#b2102f" }}
                            />
                        </IconButton>
                    </Tooltip>

                    <Dialog open={openPosts} onClose={handleClosePosts}>
                        <EditPostDialog post={post} />
                    </Dialog>
                </>
            ) : (
                <>

                </>
            )}

        </>

    );
};

export default Post;
