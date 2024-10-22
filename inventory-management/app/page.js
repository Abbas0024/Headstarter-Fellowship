'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Typography, Modal, Stack, TextField, Button } from "@mui/material";
import { collection, getDocs, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import "../app/globals.css";

/*const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};*/

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updateInventory = async () => {
    const snapshot = collection(firestore, 'inventory');
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  return (
    <div className="main-container">
      <div className="left-section">
        <Box className="inventory-list">
          <Box className="inventory-header">
            Inventory Items
          </Box>
          <Stack width="100%" height="300px" spacing={2} overflow={'auto'}>
            {inventory.map(({ name, quantity }) => (
              <Box
                key={name}
                className="inventory-item"
              >
                <Typography variant={'h3'}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography variant={'h3'}>
                  Quantity: {quantity}
                </Typography>
                <Button variant="contained" onClick={() => removeItem(name)}>
                  Remove
                </Button>
              </Box>
            ))}
          </Stack>
        </Box>
        <Button className="add-item-button" variant="contained" onClick={handleOpen}>
          Add New Item
        </Button>
      </div>
      <div className="right-section">
        <div className="instructions">
          <h2>How to Use</h2>
          <p>1. To add an item, click the "Add New Item" button and enter the item name.</p>
          <p>2. You can increase the quantity of an existing item by adding it again.</p>
          <p>3. To remove an item, click the "Remove" button next to the item.</p>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-box">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
  
}
