import React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { style } from '../Assets/styles/utils';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteModal = (props) => {
  return (
    <Modal
      open={props.open}
      onClose={() => props.handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          style={{
            fontFamily: 'Magdelin-Bold',
            fontSize: '24px',
            margin: '2% 0px'
          }}>
          Confirmation
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          style={{
            fontFamily: 'Magdelin-Regular',
            fontSize: '24px',
            margin: '10% 0'
          }}>
          Are you sure you want to delete this?
        </Typography>
        <Button
          onClick={() => props.handleClose()}
          style={{
            fontSize: '16px',
            borderRadius: '10px',
            fontFamily: 'Magdelin-Bold',
            width: '40%',
            padding: '0.35rem 0',
            backgroundColor: 'white',
            border: '1px solid black',
            color: 'black',
            letterSpacing: '0.2em',
            marginRight: '1.6rem'
          }}>
          CANCEL
        </Button>
        <Button
          onClick={() => props.delete()}
          style={{
            backgroundColor: 'black',
            borderRadius: '10px',
            height: '2.65rem',
            width: '40%',
            color: 'white'
          }}>
          <div style={{ marginRight: '1.4rem', paddingLeft: '1.5rem' }}>
            <DeleteIcon
              style={{
                color: 'white',
                fontSize: '1.8rem'
              }}
            />
          </div>
          <div
            style={{
              marginRight: '3rem',
              fontFamily: 'Magdelin-Bold',
              letterSpacing: '0.2em',
              fontSize: '1rem'
            }}>
            CONFIRM
          </div>
        </Button>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
