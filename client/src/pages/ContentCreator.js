import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import Topics from '../components/Topics';
import Subtopics from '../components/Subtopics';
import ResourceCard from '../components/ResourceCards';
import { Button, ButtonGroup, Grid } from "@mui/material";


// import { useQuery } from '@apollo/client';
// import { QUERY_ALL_TOPICS, QUERY_ALL_SUBTOPICS, QUERY_ALL_RESOURCES } from '../utils/queries';
// import { useParams } from "react-router-dom";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const ContentCreator = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  // // set up useQuery get the data from the backend
  // const { loading, error, data } = useQuery(QUERY_ALL_TOPICS);

  // // objects to keep the data

  // const topicData = data?.topics || {};

  // if (loading) return alert("loading");
  // if (error) return `Error! ${error}`;



  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <span className='span'>Admin</span> / Content Creator
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[{ name: 'View Topics', link: "/contentcreator" }, { name: 'View Subtopics', link: "/contentcreator" }, { name: 'View Resources', link: "/contentcreator" }].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton as={Link} className="link2" to={text.link}>
                <VisibilityIcon>
                </VisibilityIcon>
                <ListItemText primary={text.name} className="m-1" />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[{ name: 'Add Topic', link: "/" }, { name: 'Add Subtopic', link: "/contentcreator" }, { name: 'Add Resource', link: "/contentcreator" }].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton as={Link} className="link2" to={text.link}>
                <AddIcon>
                </AddIcon>
                <ListItemText primary={text.name} className="m-1" />
              </ListItemButton>
            </ListItem>
          ))}
          <hr></hr>
          <ListItemButton as={Link} className="link2" to='/dashboard'>
            <DashboardIcon>
            </DashboardIcon>
            <ListItem>Return to Dashboard</ListItem>
          </ListItemButton>
          <ListItemButton as={Link} className="link2" to='/'>
            <HomeIcon>
            </HomeIcon>
            <ListItem>Return Home</ListItem>
          </ListItemButton>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Topics />
        <Subtopics />
        <h5>ALL RESOURCES</h5>
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ backgroundColor: "#263238", padding: "5rem"}}
      >

        <Box sx={{ flexGrow: 1 }}>
          <Grid container
        spacing={0}>

            <ResourceCard />

          </Grid>
        </Box>
      </Grid>
        <>
        </>
      </Main>
    </Box>
  );
}

export default ContentCreator;