import { Box, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle, } from "@mui/material";
import { useState } from "react";
import DataWizard from "./dataWizard"

const Buttons = () => {
  const [openScanner, setOpenScanner] = useState(false);
  const [openGenerate, setOpenGenerate] = useState(false);

  const handleOpenScanner = () => {
    setOpenScanner(true);
  };
  const handleOpenGenerate = () => {
    setOpenGenerate(true);
  };
  const handleCloseScanner = () => {
    setOpenScanner(false);
  };
  const handleCloseGenerate = () => {
    setOpenGenerate(false);
  };

  return (
    <>
      <Grid
        sx={{
          bgcolor: "white",
          borderRadius: 1,
          width: 0.4,
          m: "auto",
          "@media (max-width: 768px)": { width: "auto", height: "auto" },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-evenly", p: 1, m: 1, }} >
          <Button
            variant="contained"
            sx={{ bgcolor: "#510A32" }}
            onClick={handleOpenScanner}>
            Request Data
          </Button>
          <Dialog open={openScanner} onClose={handleCloseScanner}>
            <DialogTitle>{"Scan Data"}</DialogTitle>
            <DialogContent>
              <DataWizard steptype="request"/>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseScanner}>Close</Button>
            </DialogActions>
          </Dialog>

          <Button
            variant="contained"
            sx={{ bgcolor: "#510A32" }}
            onClick={handleOpenGenerate}>
            Send Data
          </Button>
          <Dialog open={openGenerate} onClose={handleCloseGenerate}>
            <DialogTitle>{"QR Code"}</DialogTitle>
            <DialogContent>
              <DataWizard steptype="send"/>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseGenerate}>Close</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Grid>
    </>
  );
};

export default Buttons;
