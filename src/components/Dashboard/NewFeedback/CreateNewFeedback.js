import React, { useState } from 'react';
import {
  Button,
  Dialog,
  Fab,
  FormControl,
  InputLabel,
  IconButton,
  MenuItem,
  Select,
  Slide,
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

const generateYear = () => {
  const currentYear = new Date().getFullYear().toString().slice(2, 4)
  let dep = ['IT', 'CE']
  let yearList = []
  dep.forEach(dprt => {
    for (let i = 18; i <= currentYear; i++) {
      yearList.push(i + dprt)
    }
  })
  return yearList
}

const Form = props => {
  const { classes } = props;
  const [feedback, setFeedback] = useState({
    name: '', desc: '', dueFrom: new Date(), dueTo: new Date(), feedbackFor: '', feedbackQue: ''
  })
  // const [name, setName] = useState('');
  // const [desc, setDesc] = useState('');
  // const [dueFrom, setDueFrom] = useState(new Date());
  // const [dueTo, setDueTo] = useState(new Date());

  const handleChange = (prop) => (event) => {
    if (prop === 'dueTo' || prop === 'dueFrom')
      setFeedback({ ...feedback, [prop]: event })
    else
      setFeedback({ ...feedback, [prop]: event.target.value })
  }
  return (
    <>
      <TextField
        label="Name"
        fullWidth
        variant="outlined"
        className={classes.input}
        value={feedback.name}
        onChange={handleChange('name')}
        required
      />
      <TextField
        label="Description"
        multiline
        rows={5}
        variant="outlined"
        fullWidth
        className={classes.input}
        value={feedback.desc}
        onChange={handleChange('desc')}
        required
      />
      <FormControl fullWidth required style={{ margin: "0 0 1em 0" }} variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Feedback For</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={feedback.feedbackFor}
          onChange={handleChange('feedbackFor')}
          label="Feedback For"
          required
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            generateYear().map((item) => (
              <MenuItem value={item} key={item}>{item}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <FormControl fullWidth required style={{ margin: "0 0 1em 0" }} variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Feedback Question's</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={feedback.feedbackQue}
          onChange={handleChange('feedbackQue')}
          label="Feedback Question's"
          required
        >
          <MenuItem selected value="default">
            <em>Default</em>
          </MenuItem>
          {
            ['IT', 'test'].map((item) => (
              <MenuItem value={item} key={item}>{item}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <DateTimePicker
        label="Due date From"
        inputVariant="outlined"
        fullWidth
        value={feedback.dueFrom}
        onChange={handleChange('dueFrom')}
        className={classes.input}
        required
      />
      <DateTimePicker
        label="Due date To"
        inputVariant="outlined"
        fullWidth
        value={feedback.dueTo}
        onChange={handleChange('dueTo')}
        className={classes.input}
        required
      />
    </>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
        fullScreen
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
