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
  }
}));


// const Form = props => {
//   const { classes } = props;
//   const [feedback, setFeedback] = useState({
//     name: '', desc: '', dueFrom: new Date(), dueTo: new Date(), feedbackFor: '', feedbackQue: '', sem: 0, year: new Date().getFullYear(), inst: '', depart: '', feedbackOf: ''
//   })
//   const [facultyLst, setFacultyLst] = useState([])
//   const [questionLst, setQuestionLst] = useState([])
//   const instCSPIT = ['IT', 'CE', 'EC', 'EE', 'ME', 'CL']
//   const instDEPSTAR = ['IT', 'CE', 'CSE']

//   useEffect(() => {
//     axios.get('https://sgp-feedback-system.herokuapp.com/api/faculty').then((res) => {
//       console.log(res)
//       setFacultyLst(res.data)
//     })
//     axios.get('https://sgp-feedback-system.herokuapp.com/api/getfeedbackque').then((res) => {
//       console.log(res)
//       setQuestionLst(res.data)
//     })
//   }, [])

//   const handleChange = (prop) => (event) => {
//     if (prop === 'dueTo' || prop === 'dueFrom')
//       setFeedback({ ...feedback, [prop]: event })
//     else
//       setFeedback({ ...feedback, [prop]: event.target.value })
//   }

//   const handleSubmit = () => {
//     console.log(feedback)
//   }

//   return (
//     <div ref={props.reff} onSubmit={handleSubmit}>
//       <button hidden onClick={handleSubmit}>submit</button>
//       <TextField
//         label="Name"
//         fullWidth
//         variant="outlined"
//         className={classes.input}
//         value={feedback.name}
//         onChange={handleChange('name')}
//         required
//       />
//       <TextField
//         label="Description"
//         multiline
//         rows={5}
//         variant="outlined"
//         fullWidth
//         className={classes.input}
//         value={feedback.desc}
//         onChange={handleChange('desc')}
//         required
//       />
//       <Typography className={classes.label}>Feedback For: </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             label="Sem"
//             variant="outlined"
//             fullWidth
//             // className={classes.input}
//             value={feedback.sem}
//             type='number'
//             onChange={handleChange('sem')}
//             required
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             label="Year"
//             variant="outlined"
//             fullWidth
//             // className={classes.input}
//             value={feedback.year}
//             type='number'
//             onChange={handleChange('year')}
//             required
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           {/* <TextField
//             label="Institute"
//             variant="outlined"
//             fullWidth
//             // className={classes.input}
//             value={feedback.inst}
//             onChange={handleChange('inst')}
//             required
//           /> */}
//           <FormControl fullWidth required style={{ margin: "0 0 1em 0" }} variant="outlined" className={classes.formControl}>
//             <InputLabel id="Institute">Institute</InputLabel>
//             <Select
//               labelId="Institute"
//               value={feedback.inst}
//               onChange={handleChange('inst')}
//               label="Institute"
//               required
//             >
//               <MenuItem value=""><em>None</em></MenuItem>
//               <MenuItem value="CSPIT" >CSPIT</MenuItem>
//               <MenuItem value="DEPSTAR" >DEPSTAR</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           {/* <TextField
//             label="Department"
//             variant="outlined"
//             fullWidth
//             className={classes.input}
//             value={feedback.depart}
//             onChange={handleChange('depart')}
//             required
//           /> */}
//           <FormControl fullWidth required style={{ margin: "0 0 1em 0" }} variant="outlined" className={classes.formControl}>
//             <InputLabel id="Department">Department</InputLabel>
//             <Select
//               labelId="Department"
//               value={feedback.depart}
//               onChange={handleChange('depart')}
//               label="Department"
//               required
//             >
//               <MenuItem value=""><em>None</em></MenuItem>
//               {
//                 feedback.inst === 'CSPIT' ? instCSPIT.map((item, index) => {
//                   return <MenuItem value={item} key={index}>{item}</MenuItem>
//                 }) : feedback.inst === 'DEPSTAR' ? instDEPSTAR.map((item, index) => {
//                   return <MenuItem value={item} key={index}>{item}</MenuItem>
//                 }) : null
//               }
//             </Select>
//           </FormControl>
//         </Grid>
//       </Grid>
//       <FormControl fullWidth required style={{ margin: "0 0 1em 0" }} variant="outlined" className={classes.formControl}>
//         <InputLabel id="FeedbackOf">Feedback Of faculty</InputLabel>
//         <Select
//           labelId="FeedbackOf"
//           value={feedback.feedbackOf}
//           onChange={handleChange('feedbackOf')}
//           label="Feedback Of"
//           required
//         >
//           <MenuItem value=""><em>None</em></MenuItem>
//           {
//             facultyLst.map((item) => (
//               <MenuItem value={item.id} key={item.id}>{item.userName}</MenuItem>
//             ))
//           }
//         </Select>
//       </FormControl>
//       <FormControl fullWidth required style={{ margin: "0 0 1em 0" }} variant="outlined" className={classes.formControl}>
//         <InputLabel id="feedbackQue">Feedback Question's</InputLabel>
//         <Select
//           labelId="feedbackQue"
//           value={feedback.feedbackQue}
//           onChange={handleChange('feedbackQue')}
//           label="Feedback Question's"
//           required
//         >
//           <MenuItem value=""><em>None</em></MenuItem>
//           {
//             questionLst.map((item) => (
//               <MenuItem value={item._id} key={item._id}>{item.name}</MenuItem>
//             ))
//           }
//         </Select>
//       </FormControl>
//       <DateTimePicker
//         label="Due date From"
//         inputVariant="outlined"
//         fullWidth
//         value={feedback.dueFrom}
//         onChange={handleChange('dueFrom')}
//         className={classes.input}
//         required
//       />
//       <DateTimePicker
//         label="Due date To"
//         inputVariant="outlined"
//         fullWidth
//         value={feedback.dueTo}
//         onChange={handleChange('dueTo')}
//         className={classes.input}
//         required
//       />
//     </div>
//   );
// };

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateNewFeedback = (props) => {
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

export default CreateNewFeedback;
