import React from "react";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_QUICKLINKS } from "../../utils/queries";
import { DELETE_QUICKLINK } from "../../utils/mutations";
import EditQuickLinkDialog from "../EditQuickLinkDialog";
import Dialog from "@mui/material/Dialog";
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';



const QuickLink = ({ quicklink }) => {

    const { loading, error, data } = useQuery(QUERY_ALL_QUICKLINKS);

    const quickLinkData = data?.quicklinks || [];

    const [openQuick, setOpenQuick] = React.useState(false);

    const handleClickOpenQuick = () => {
        setOpenQuick(true);
    }

    const handleCloseQuick = () => {
        setOpenQuick(false);
    }

    const [deleteQuickLink, { err, dat }] = useMutation(DELETE_QUICKLINK, {
        refetchQueries: [{ query: QUERY_ALL_QUICKLINKS }],
    });


    const handleDelete = async (_id) => {

        try {
            const { dat } = await deleteQuickLink({
                variables: { _id: _id },
            });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <h3 key={quicklink._id}>{quicklink.title}</h3>
            <a href={quicklink.link} target={'_blank'} rel={'nonreferrer'}>{quicklink.link}</a>


            <Tooltip title="Edit">
                <IconButton onClick={handleClickOpenQuick}>
                    <EditIcon sx={{ color: "#ffcf33" }} />
                </IconButton>
            </Tooltip>
            <hr></hr>
            <Dialog open={openQuick} onClose={handleCloseQuick}>
                <EditQuickLinkDialog quicklink={quicklink} />
            </Dialog>

        </>
    );
};

export default QuickLink;