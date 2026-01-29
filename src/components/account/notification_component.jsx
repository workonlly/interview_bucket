import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import WarningIcon from '@mui/icons-material/Warning';
import { red } from '@mui/material/colors';

const StyledWarningIcon = styled(WarningIcon)(({ theme }) => ({
  fontSize: '3rem',
  color: red[500],
  marginBottom: theme.spacing(2),
}));

function Notification_component({ open, onClose }) {
  const handleCloseDialog = () => {
    if (onClose) {
      onClose();
    }
  };

  console.log('Notification component - open state:', open);

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      aria-labelledby="wallet-notification-title"
      PaperProps={{
        style: {
          borderRadius: 20,
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        },
      }}
      BackdropProps={{
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
      }}
      style={{ zIndex: 9999 }}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle 
        id="wallet-notification-title"
        sx={{ 
          textAlign: 'center',
          pt: 4,
          pb: 2,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <StyledWarningIcon />
          <Typography variant="h6" sx={{ fontWeight: 700, mt: 2 }}>
            Wallet Not Connected
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
          Please connect your wallet to proceed with transactions. Select your preferred wallet and network to get started.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={handleCloseDialog}
          sx={{
            backgroundColor: red[500],
            color: 'white',
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            '&:hover': {
              backgroundColor: red[700],
            },
          }}
          variant="contained"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Notification_component;
