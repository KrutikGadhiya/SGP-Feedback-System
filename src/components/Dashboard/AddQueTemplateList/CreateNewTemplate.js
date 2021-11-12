import React, { useState, useRef } from 'react';
import {
  Button,
  Dialog,
  Fab,
  IconButton,
  Slide,
  Typography,
  Tooltip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Form from './Form'

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
  },
  label: {
    marginBottom: theme.spacing(2)
  },
  dialogAction: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  addBtn: {
    background: '#eef',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  removeBtn: {
    background: '#fee',
    // marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  inputWithBtn: {
    marginBottom: theme.spacing(1)
  }
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateNewTemplate = (props) => {
  const classes = styles();
  const newFeedbackRef = useRef()
  const dialogRef = useRef()
  const [open, setOpen] = useState(false);
  const handleClose = (e, r, a) => {
    // console.log(e, r)
    if (r === 'backdropClick') return
    setOpen(false);
  };

  return (
    <>
      <Tooltip title='New Feedback' aria-label='new-feedback' arrow>
        <Fab color="primary" onClick={() => setOpen(true)}>
          <AddOutlinedIcon />
        </Fab>
      </Tooltip>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        // fullScreen
        fullWidth
        maxWidt='sm'
        ref={dialogRef}
        disableEscapeKeyDown
        TransitionComponent={Transition}
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
          <Form
            classes={classes}
            reff={newFeedbackRef}
            setOpen={open => setOpen(open)}
            getFeedList={props.getFeedList}
          />
        </MuiDialogContent>
        <MuiDialogActions className={classes.dialogAction}>
          <Button
            autoFocus
            variant="outlined"
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            autoFocus
            variant="contained"
            // onClick={handleClose}
            onClick={() => newFeedbackRef.current.children[0].click()}
            color="primary"
          >
            {/* {newFeedbackRef.current ? console.log(newFeedbackRef.current.children[0]) : console.log("not rendering")} */}
            Save
          </Button>
        </MuiDialogActions>
      </Dialog>
    </>
  );
};

export default CreateNewTemplate;
