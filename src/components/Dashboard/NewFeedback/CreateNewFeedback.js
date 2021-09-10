import React, { useState } from 'react';
import {
  Button,
  Dialog,
  Fab,
  IconButton,
  Typography,
  TextField,
  Tooltip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { DateTimePicker } from '@material-ui/pickers';

const styles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  content: {
    padding: theme.spacing(4)
  },
  input: {
    marginBottom: theme.spacing(2)
  }
}));

const Form = props => {
  const { classes } = props;
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [dueFrom, setDueFrom] = useState(new Date());
  const [dueTo, setDueTo] = useState(new Date());
  return (
    <>
      <TextField
        label="Name"
        fullWidth
        variant="outlined"
        className={classes.input}
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <TextField
        label="Description"
        multiline
        rows={5}
        variant="outlined"
        fullWidth
        className={classes.input}
        value={desc}
        onChange={e => setDesc(e.target.value)}
      />
      <DateTimePicker
        label="Due date From"
        inputVariant="outlined"
        fullWidth
        value={dueFrom}
        onChange={setDueFrom}
        className={classes.input}
      />
      <DateTimePicker
        label="Due date To"
        inputVariant="outlined"
        fullWidth
        value={dueTo}
        onChange={setDueTo}
        className={classes.input}
      />
    </>
  );
};

const NewFeedback = () => {
  const classes = styles();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Tooltip title='New Feedback' aria-label='new-feedback' arrow>
        <Fab color="primary" variant="contained" onClick={() => setOpen(true)}>
          <AddOutlinedIcon />
        </Fab>
      </Tooltip>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <MuiDialogTitle
          disableTypography
          className={classes.root}
          id="customized-dialog-title"
        >
          <Typography variant="h6">ADD New Feedback</Typography>
          <IconButton
            className={classes.closeButton}
            aria-label="close"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <MuiDialogContent className={classes.content} dividers>
          <Form classes={classes} />
        </MuiDialogContent>
        <MuiDialogActions>
          <Button
            autoFocus
            variant="contained"
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            autoFocus
            variant="contained"
            onClick={handleClose}
            color="primary"
          >
            Save
          </Button>
        </MuiDialogActions>
      </Dialog>
    </>
  );
};

export default NewFeedback;
