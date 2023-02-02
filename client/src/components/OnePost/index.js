import React from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Image from 'mui-image';
import sample from '../../media/DNGF7977.jpeg'


const Post = () => {
  return (
    <>
    
        <Stack direction="row" spacing={5} margin={3}>
          <Image src={sample} fit="contain"></Image>
          <p><span><h4>The Link of the Day</h4></span>This is a site dedicated to child welfare workers in MN. It is a hub for resources commonly needed by new and experience CW workers. Users are also able to create accounts so that they can save favorite resource links and created simple, learning to-do lists.This is a site dedicated to child welfare workers in MN. It is a hub for resources commonly needed by new and experience CW workers. Users are also able to create accounts so that they can save favorite resource links and created simple, learning to-do lists.<br></br><span><Button variant="outlined" color="success" sx={{ marginTop: 3}} size="small">Learn More</Button></span></p>
          <Stack spacing={2} direction="row">
            
          </Stack>
        </Stack>

    </>

  );
};

export default Post;
