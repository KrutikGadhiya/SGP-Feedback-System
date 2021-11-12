import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
  TextField,
} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { set, reset } from '../../../redux/reducers/loadingSlice'
import { openSnack } from '../../../redux/reducers/snackSlice'

const addDays = (date, days) => {
  var newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Form = props => {
  const { classes } = props;
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.user.id)
  const JWTtoken = useSelector((state) => state.user.token)
  const [feedback, setFeedback] = useState({
    name: '', desc: '', dueFrom: null, dueTo: null, feedbackFor: '', feedbackQue: '', sem: 0, year: new Date().getFullYear(), inst: '', depart: '', feedbackOf: ''
  })
  const [facultyLst, setFacultyLst] = useState([])
  const [courseLst, setCourseLst] = useState([])
  const [questionLst, setQuestionLst] = useState([])
  const [errors, setErrors] = useState({})
  const [value, setValue] = React.useState(0);
  const instCSPIT = ['IT', 'CE', 'EC', 'EE', 'ME', 'CL']
  const instDEPSTAR = ['IT', 'CE', 'CSE']

  useEffect(() => {
    axios.get('https://sgp-feedback-system.herokuapp.com/api/faculty', {
      headers: {
        Authorization: `Bearer ${JWTtoken}`
      }
    }).then((res) => {
      setFacultyLst(res.data)
    })
    axios.get('https://sgp-feedback-system.herokuapp.com/api/courses', {
      headers: {
        Authorization: `Bearer ${JWTtoken}`
      }
    }).then((res) => {
      setCourseLst(res.data)
    })
    axios.get('https://sgp-feedback-system.herokuapp.com/api/getfeedbackque', {
      headers: {
        Authorization: `Bearer ${JWTtoken}`
      }
    }).then((res) => {
      setQuestionLst(res.data)
    })
  }, [JWTtoken])

  const handleValidation = (fieldValues) => {
    let temp = { ...errors }
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required."

    if ("desc" in fieldValues)
      temp.desc = fieldValues.desc ? "" : "This field is required."
    if ("inst" in fieldValues)
      temp.inst = fieldValues.inst ? "" : "This field is required."
    if ("depart" in fieldValues)
      temp.depart = fieldValues.depart ? "" : "This field is required."
    if ("sem" in fieldValues)
      temp.sem = fieldValues.sem ? "" : "This field is required."
    if ("sem" in fieldValues)
      temp.sem = fieldValues.sem <= 8 && fieldValues.sem >= 1 ? "" : "between 1-5."
    if ("year" in fieldValues)
      temp.year = fieldValues.year ? "" : "This field is required."
    if ("feedbackOf" in fieldValues)
      temp.feedbackOf = fieldValues.feedbackOf ? "" : "This field is required."
    if ("feedbackQue" in fieldValues)
      temp.feedbackQue = fieldValues.feedbackQue ? "" : "This field is required."
    if ("dueFrom" in fieldValues)
      temp.dueFrom = fieldValues.dueFrom ? "" : "This field is required."
    if ("dueTo" in fieldValues)
      temp.dueTo = fieldValues.dueTo ? "" : "This field is required."

    setErrors({
      ...temp
    });
  }
  const isFormValid = () => Object.values(errors).every((x) => x === "")

  const handleChange = (prop) => (event) => {
    if (prop === 'dueTo' || prop === 'dueFrom') {
      setFeedback({ ...feedback, [prop]: event })
      handleValidation({ [prop]: event })
    }
    else {
      setFeedback({ ...feedback, [prop]: event.target.value })
      handleValidation({ [prop]: event.target.value })
    }
  }

  const handleSubmit = async () => {
    // console.log(feedback, Number(feedback.sem))
    // return
    if (!isFormValid()) {
      return dispatch(openSnack({ message: 'Please Enter the Correct Values', type: "error" }))
    }
    if (!feedback.name || !feedback.desc || !feedback.depart || !feedback.name || feedback.sem === 0 || !feedback.year)
      return dispatch(openSnack({ message: 'Please Add All the Fields', type: "error" }))

    dispatch(set())
    try {
      const res = await axios.post(`https://sgp-feedback-system.herokuapp.com/api/${value === 0 ? 'newFeedback' : 'courseFeedback'}`, {
        name: feedback.name,
        description: feedback.desc,
        feedbackFor: {
          sem: Number(feedback.sem),
          year: Number(feedback.year),
          institute: feedback.inst,
          department: feedback.depart
        },
        feedbackOf: feedback.feedbackOf,
        feedbackQuestions: feedback.feedbackQue,
        dueFrom: feedback.dueFrom,
        dueTo: feedback.dueTo,
        createdBy: userId
      }, {
        headers: {
          Authorization: `Bearer ${JWTtoken}`
        }
      })
      // console.log(res.data)

      dispatch(openSnack({ message: res.data.message, type: "success" }))
      props.setOpen(false)
      props.getFeedList()
      dispatch(reset())
    } catch (err) {
      console.error(err)
      dispatch(openSnack({ message: err.response.data.message, type: "error" }))
      dispatch(reset())
    }
  }

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div ref={props.reff} onSubmit={handleSubmit}>
      <button hidden onClick={handleSubmit}>submit</button>
      <AppBar position="static" color="default" >
        <Tabs
          value={value}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="feedback tabs"
        >
          <Tab label="Faculty Feedback" {...a11yProps(0)} />
          <Tab label="Course Feedback" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      {/* <h1></h1> */}
      <TextField
        label="Name"
        fullWidth
        variant="outlined"
        className={classes.input1}
        value={feedback.name}
        onBlur={handleChange('name')}
        onChange={handleChange('name')}
        {...(errors["name"] && { error: true, helperText: errors["name"] })}
      />
      <TextField
        label="Description"
        multiline
        rows={5}
        variant="outlined"
        fullWidth
        className={classes.input}
        value={feedback.desc}
        onBlur={handleChange('desc')}
        onChange={handleChange('desc')}
        {...(errors["desc"] && { error: true, helperText: errors["desc"] })}
      />
      <Typography className={classes.label}>Feedback For: </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Sem"
            variant="outlined"
            fullWidth
            // className={classes.input}
            value={feedback.sem}
            type='number'
            onBlur={handleChange('sem')}
            onChange={handleChange('sem')}
            {...(errors["sem"] && { error: true, helperText: errors["sem"] })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Year"
            variant="outlined"
            fullWidth
            // className={classes.input}
            value={feedback.year}
            type='number'
            onBlur={handleChange('year')}
            onChange={handleChange('year')}
            {...(errors["year"] && { error: true, helperText: errors["year"] })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {/* <TextField
            label="Institute"
            variant="outlined"
            fullWidth
            // className={classes.input}
            value={feedback.inst}
            onChange={handleChange('inst')}
          /> */}
          <FormControl fullWidth style={{ margin: "0 0 1em 0" }} variant="outlined" className={classes.formControl}>
            <InputLabel id="Institute">Institute</InputLabel>
            <Select
              labelId="Institute"
              value={feedback.inst}
              onBlur={handleChange('inst')}
              onChange={handleChange('inst')}
              label="Institute"

              {...(errors["inst"] && { error: true, helperText: errors["inst"] })}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="CSPIT" >CSPIT</MenuItem>
              <MenuItem value="DEPSTAR" >DEPSTAR</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          {/* <TextField
            label="Department"
            variant="outlined"
            fullWidth
            className={classes.input}
            value={feedback.depart}
            onChange={handleChange('depart')}
          /> */}
          <FormControl fullWidth style={{ margin: "0 0 1em 0" }} variant="outlined" className={classes.formControl}>
            <InputLabel id="Department">Department</InputLabel>
            <Select
              labelId="Department"
              value={feedback.depart}
              onBlur={handleChange('depart')}
              onChange={handleChange('depart')}
              label="Department"
              {...(errors["depart"] && { error: true, helperText: errors["depart"] })}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {
                feedback.inst === 'CSPIT' ? instCSPIT.map((item, index) => {
                  return <MenuItem value={item} key={index}>{item}</MenuItem>
                }) : feedback.inst === 'DEPSTAR' ? instDEPSTAR.map((item, index) => {
                  return <MenuItem value={item} key={index}>{item}</MenuItem>
                }) : null
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <TabPanel value={value} index={0}>
        <FormControl fullWidth style={{ margin: "0 0 1em 0" }} variant="outlined" className={classes.formControl}>
          <InputLabel id="FeedbackOf">Feedback Of Faculty</InputLabel>
          <Select
            labelId="FeedbackOf"
            value={feedback.feedbackOf}
            onBlur={handleChange('feedbackOf')}
            onChange={handleChange('feedbackOf')}
            label="Feedback Of"
            {...(errors["feedbackOf"] && { error: true, helperText: errors["feedbackOf"] })}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {
              facultyLst.map((item) => (
                <MenuItem value={item.id} key={item.id}>{item.userName}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FormControl fullWidth style={{ margin: "0 0 1em 0" }} variant="outlined" className={classes.formControl}>
          <InputLabel id="FeedbackOf">Feedback Of Course</InputLabel>
          <Select
            labelId="FeedbackOf"
            value={feedback.feedbackOf}
            onBlur={handleChange('feedbackOf')}
            onChange={handleChange('feedbackOf')}
            label="Feedback Of"
            {...(errors["feedbackOf"] && { error: true, helperText: errors["feedbackOf"] })}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            {
              courseLst.map((item) => (
                <MenuItem value={item._id} key={item._id}>{item.name + ' '} ({item.courseId})</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </TabPanel>
      <FormControl fullWidth style={{ margin: "0 0 1em 0" }} variant="outlined" className={classes.formControl}>
        <InputLabel id="feedbackQue">Feedback Question's</InputLabel>
        <Select
          labelId="feedbackQue"
          value={feedback.feedbackQue}
          onBlur={handleChange('feedbackQue')}
          onChange={handleChange('feedbackQue')}
          label="Feedback Question's"
          {...(errors["feedbackQue"] && { error: true, helperText: errors["feedbackQue"] })}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {
            questionLst.map((item) => (
              <MenuItem value={item._id} key={item._id}>{item.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <DateTimePicker
        label="Due date From"
        inputVariant="outlined"
        fullWidth
        clearable
        disablePast
        value={feedback.dueFrom}
        onChange={handleChange('dueFrom')}
        className={classes.input}
        {...(errors["dueFrom"] && { error: true, invalidLabel: errors["dueFrom"] })}
      />
      <DateTimePicker
        label="Due date To"
        inputVariant="outlined"
        fullWidth
        clearable
        disablePast
        {...(!feedback.dueFrom && { disabled: true })}
        {...(feedback.dueFrom && { minDate: addDays(feedback.dueFrom, 60) })}
        value={feedback.dueTo}
        onChange={handleChange('dueTo')}
        className={classes.input}
        {...(errors["dueTo"] && { error: true, invalidLabel: errors["dueTo"] })}
      />
    </div>
  );
};

export default React.memo(Form)