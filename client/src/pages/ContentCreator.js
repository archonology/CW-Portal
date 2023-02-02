import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Container from 'react-bootstrap/Container';
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
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import Topics from '../components/Topics';
import Subtopics from '../components/Subtopics';
import Resources from '../components/Resources';
import { Grid } from "@mui/material";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Auth from "../utils/auth";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALL_QUICKLINKS, QUERY_ALL_POSTS } from '../utils/queries';
import { DELETE_QUICKLINK } from '../utils/mutations';

import QuickLink from '../components/QuickLink';
import Post from '../components/OnePost';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(0),
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

// the tabs in the main body of the contentCreator
function TabPanel(props) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2, mt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ContentCreator = () => {
  // ensure user is logged in and is an admin
  Auth.adminLoggedIn() ? Auth.getAdminToken() : window.location.assign('/');

  const { loading: quickLinkLoading, error: errQuick, data: dataQuickLink } = useQuery(QUERY_ALL_QUICKLINKS);

  const quickLinkData = dataQuickLink?.quicklinks || [];

  const { loading: postLoading, error: errPost, data: dataPost } = useQuery(QUERY_ALL_POSTS);

  const postData = dataPost?.posts || [];

  // const [openQuick, setOpenQuick] = React.useState(false);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const [deleteQuickLink, { err, dat }] = useMutation(DELETE_QUICKLINK, {
    refetchQueries: [{ query: QUERY_ALL_QUICKLINKS }],
  });

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
          {[{ name: 'Add Topic', link: "/contentcreator/addtopic" }, { name: 'Add Subtopic', link: "/contentcreator/addsubtopic" }, { name: 'Add Resource', link: "/contentcreator/addresource" }, { name: 'Add Quick Link', link: "/contentcreator/addquicklink" }, { name: 'Add Post', link: "/contentcreator/addpost" }].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton as={Link} className="link2" to={text.link}>
                <AddIcon>
                </AddIcon>
                <ListItemText primary={text.name} className="m-1" />
              </ListItemButton>
            </ListItem>
          ))}
          <hr></hr>
          <ListItemButton as={Link} className="link2" to='/'>
            <HomeIcon>
            </HomeIcon>
            <ListItem>Return Home</ListItem>
          </ListItemButton>
        </List>
      </Drawer>
      <Main open={open} >
        <DrawerHeader />

        <Box sx={{ width: '100%', marginTop: 0 }}>
          <Box>

            <Tabs
              sx={{ alignContent: "center" }}
              // variant="fullWidth"
              value={value}
              onChange={handleChange}
              textColor="inherit"
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable Dashboard List Tabs"
              indicatorColor="secondary">
              <Tab label="Topics" {...a11yProps(0)} />
              <Tab label="SubTopics" {...a11yProps(1)} />
              <Tab label="Resources" {...a11yProps(2)} />
              <Tab label="QuickLinks" {...a11yProps(3)} />
              <Tab label="Posts" {...a11yProps(4)} />
            </Tabs>

          </Box>
          <TabPanel value={value} index={0}>
            <Grid direction="row" container >
              <Grid container spacing={0}>

                {/* see all topics */}
                <Topics />

              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>

            {/* see all subtopics */}
            <Subtopics />

          </TabPanel>
          <TabPanel value={value} index={2}>

            <Grid direction="row" container sx={{ padding: "1rem" }}>
              <Grid container spacing={0} justifyContent="center">

                <Resources />

              </Grid>
            </Grid>

          </TabPanel>
          <TabPanel value={value} index={3}>
            {quickLinkData.map((quicklink) => {
              return (
                <>
                  <ul>
                    <QuickLink quicklink={quicklink} />
                  </ul>
                </>
              );
            })}

          </TabPanel>

          <TabPanel value={value} index={4}>


            {postData.map((post) => {
              return (
                <Container key={post._id} fluid className="bg-dark p-1">

                  <Post post={post} />

                </Container>
              )

            })}

          </TabPanel>

        </Box>
      </Main>
    </Box>
  );
}

export default ContentCreator;