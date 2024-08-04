"use client"
import Image from "next/image";
import { styled, alpha, ThemeProvider, createTheme, useTheme, makeStyles, withStyles, createStyles, styled as muiStyled } from '@mui/material/styles';
import { Box, Button, Container, Grid, Typography, Paper, Card, CardContent, CardMedia, CardActionArea, CardActions, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Drawer, AppBar, Toolbar, List, ListItem, ListItemText, ListItemIcon, Divider, IconButton, Badge, InputBase, Menu, MenuItem, Fab, Backdrop, CircularProgress, LinearProgress, Snackbar, Alert, AlertTitle, Collapse, Grow, Slide, SlideDirection, Zoom, useScrollTrigger, useMediaQuery, useTheme as useMuiTheme, Hidden, Modal, Portal, ClickAwayListener, Popper, Popover, Tooltip, Fade, Skeleton, Stack, Autocomplete, Avatar, Chip, Icon, SvgIcon, Link, Breadcrumbs, BottomNavigation, BottomNavigationAction, MobileStepper, Pagination, PaginationItem, Rating, SpeedDial, SpeedDialAction, SpeedDialIcon, Stepper, Step, StepButton, StepConnector, StepContent, StepIcon, StepLabel, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, ToggleButton, ToggleButtonGroup, TreeItem, TreeView, useAutocomplete, h1, h2,h3 } from '@mui/material';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { doc, Firestore, getDocs, getFirestore, query, Query, QuerySnapshot } from "firebase/firestore";
import { collection, addDoc, deleteDoc, setDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { initializeApp } from 'firebase/app';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const firebaseConfig = {
  // Your Firebase project configuration
  apiKey: "AIzaSyAaDXbxWWOAhYYpP_eJ1ugIANJaowvC2pA",
  authDomain: "pantrastic-2f141.firebaseapp.com",
  projectId: "pantrastic-2f141",
  storageBucket: "pantrastic-2f141.appspot.com",
  messagingSenderId: "427441684999",
  appId: "1:427441684999:web:26d4e839320a67e43da0a2",
  measurementId: "G-7R3WWPXQ1W"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//new added

export default function Home() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [itemName, setItemName] = useState('')
  const [Pantry,  setPantry] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  


  
  // Edit item function
const editItem = async (itemName, newQuantity, newName) => {
  try {
    const docRef = doc(db, "Pantry", itemName);
    await setDoc(docRef, { name: newName, quantity: newQuantity });
    updatePantry();
  } catch (error) {
    console.error("Error editing item in pantry:", error);
  }
};

  //UpdatePantryFunction
  const updatePantry = async () => {
    const pantryRef = collection(db, "Pantry");
    const q = query(pantryRef,
       where("name", ">=", searchQuery),
        where("name", "<=", searchQuery + "\uf8ff"));
    const querySnapshot = await getDocs(q);
    const PantryList = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().name !== undefined) {
        PantryList[doc.data().name] = doc.data().quantity || 0;
      }
    });
    console.log(PantryList);
    setPantry(PantryList);
  };
  
  // ...
  
  useEffect(() => {
    updatePantry();
  }, [searchQuery]);

  const [quantity, setQuantity] = useState(1);


  // ADDItemFunction
  const addItem = async () => {
    try {
      const docRef = doc(collection(db, "Pantry"), itemName);
      await setDoc(docRef, { name: itemName, quantity });
      updatePantry();
    } catch (error) {
      console.error("Error adding item to pantry:", error);
    }
  };
  //END

  

  //REMOVEItemmFunction

  const removeItem = async (itemName) => {
    try {
      const docRef = doc(db, "Pantry", itemName);
      await deleteDoc(docRef);
      updatePantry();
    } catch (error) {
      console.error("Error removing item from pantry:", error);
    }
  };
  //END

  const [openEditModal, setOpenEditModal] = useState(false);
const [editedItem, setEditedItem] = useState({ name: '', quantity: 0 });


//DifferentPantryForEachUser
const getPantry = () => {
  const [pantryItems, setPantryItems] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const userId = auth.currentUser.uid; // Get the current user's ID from OAuth provider

  useEffect(() => {
    const fetchPantryItems = async () => {
      const pantryRef = doc(db, 'Pantry', userId);
      const pantrySnapshot = await getDoc(pantryRef);
      setPantryItems(pantrySnapshot.data()?.items || []);
    };

    fetchPantryItems();
  }, [userId]);

  const handleAddItem = async (itemName, quantity) => {
    const pantryRef = doc(db, 'Pantry', userId);
    await setDoc(pantryRef, { items: [...pantryItems, { name: itemName, quantity: quantity }] }, { merge: true });
    setPantryItems([...pantryItems, { name: itemName, quantity: quantity }]);
  };
}

  return (


    
    <main className={style.main}>
      <div className={style.description}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

        
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="4" component="h2" textAlign={'center'} textTransform={'uppercase'}>
            Item Added!!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} textAlign={'center'} textTransform={'uppercase'}  component={'h4'}>
            The item was added to your pantrastic pantry.
          </Typography>
        </Box>
      </Modal>
        <Box 
          width="100%"
          //height="100vh"
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={2}
          

          
          sx={{ 
            backgroundColor: 'white',
            position: 'relative'
          }}
        >


          <Button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" variant="contained" 
  onClick={() => {
    addItem();
    handleOpen();
  }}
>
  Add Item
</Button>

{/*Search Function*/}
<Stack direction={'row'} spacing={2}>
  <TextField
    id="outline-basic"
    label="Search Pantry"
    variant="outlined"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
  {/* ... */}
</Stack>
{/*End*/}

<Stack  direction={'row'} spacing={2}> 
  <TextField 
  
    id="outline-basic" 
    label="Item name." 
    variant="outlined" 
    value={itemName} 
    onChange={(e) => setItemName(e.target.value)} 
  />

  

  <TextField id="outline-basic" 
  
    label="Quantity." 
    margin="dense"
      type="number"
      fullWidth
      variant="standard"
      value={quantity} 
    onChange={(e) => setQuantity(parseInt(e.target.value))}
    />
</Stack>
          
            <Box border={''} boxShadow={' 0 25px 200px -12px rgb(0 0 0 / 0.35)'}
            >
          <Box 
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textTransform: 'uppercase'
  }}
>
  <h1 className="twilight_gradient head_text text-center">
    Manage Your Pantry
  </h1>
</Box>
          <Divider  sx={{ width: '100%'}} />

          <Stack width={'900px'} height={'350px'} overflow={'auto'}>

          {Object.keys(Pantry).map((i, index) => (
  <Box
    key={index}
    minHeight={'120px'}
    width="100%"
    height="100px"
    display={'flex'}
    justifyContent={'space-between'}
    alignItems={'center'}
  >
    <Typography  
      variant="h4"
      color='black'
      textAlign={'center'}
      paddingX={5}
    > 
    
      {i !== undefined && i.charAt(0).toUpperCase() + i.slice(1)}
    </Typography>
   
   <Typography >
    <Button     
    sx={{  color: '#021526', fontSize: '19px'}}
    
    >
    Quantity: {Pantry[i]}

    </Button>
   </Typography>

    <Typography paddingX={2} display="flex" justifyContent="space-between">
    <Button class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
    variant="outlined" bg-primary-orange rounded-full text-white
    sx={{ backgroundColor: '#FA7070', color: 'black'}}
    onClick={() => removeItem(i)}
  >
    Delete
  </Button>
</Typography>

{/*Edit Item-start*/}
<Typography paddingX={2} display="flex" justifyContent="space-between">
  <Button
    class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
    variant="outlined"
    bg-primary-orange
    rounded-full
    text-white
    sx={{ backgroundColor: '#FA7070', color: 'black' }}
    onClick={() => {
      // Open a modal or a form to edit the item
      setOpenEditModal(true);
      setEditedItem({ name: i, quantity: Pantry[i] });
    }}
  >
    Edit
  </Button>
</Typography>
{/*Edit Item-end*/}

{/* Render the edit modal*/}

<Modal
  open={openEditModal}
  onClose={() => setOpenEditModal(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Edit Pantry Item
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      <Stack direction={'column'} spacing={2}>
        <TextField
          id="outline-basic"
          label="Item name"
          variant="outlined"
          value={editedItem.name}
          onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
        />
        <TextField
          id="outline-basic"
          label="Quantity"
          variant="outlined"
          type="number"
          value={editedItem.quantity}
          onChange={(e) => setEditedItem({ ...editedItem, quantity: parseInt(e.target.value) })}
        />
        <Button className="black_btn"
          variant="contained"
          color="primary"
          onClick={() => {
            editItem(editedItem.name, editedItem.quantity, editedItem.name);
            setOpenEditModal(false);
          }}
        >
          Save Changes
        </Button>
      </Stack>
    </Typography>
  </Box>
</Modal>
  </Box>
))}

          </Stack>

          </Box>

        </Box>
      </div>
    </main>
  );
}