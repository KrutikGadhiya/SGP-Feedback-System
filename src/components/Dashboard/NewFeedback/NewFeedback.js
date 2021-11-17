import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import CreateNewFeedback from './CreateNewFeedback'
import { AppBar, Box, Button, Dialog, DialogActions, DialogTitle, IconButton, Typography, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { set, reset } from '../../../redux/reducers/loadingSlice'
import { openSnack } from '../.././../redux/reducers/snackSlice'

const useStyle = makeStyles((theme) => ({
  heading: {
    display: 'flex',
    padding: theme.spacing(5),
    paddingTop: theme.spacing(3),
  },
  headText: {
    flex: 1
  },
  tblContainer: {
    maxHeight: 500
  }
}))

const Feed = ({ list, setDelId, setConfirmation, value }) => {

  return (
    <TableBody>
      {

        list.map(row => {
          let newDueFrom = new Date(row.dueFrom)
          let newDueTo = new Date(row.dueTo)
          return <TableRow hover key={row._id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.description}</TableCell>
            {JSON.parse(localStorage.getItem('user')).role === "admin" && <TableCell>{row.feedbackQuestions.name}</TableCell>}
            <TableCell>{row.createdBy.userName}</TableCell>
            {
              JSON.parse(localStorage.getItem('user')).role === "admin" && <TableCell>{row.createdBy.email}</TableCell>
            }
            <TableCell>{newDueFrom.toDateString()}</TableCell>
            <TableCell>{newDueTo.toDateString()}</TableCell>
            {JSON.parse(localStorage.getItem('user')).role === "admin" && <TableCell>
              {/* <IconButton color='secondary' onClick={() => { confirmation ? deleteFeedback(row._id) :  }} > */}
              <IconButton color='secondary' onClick={() => {
                setDelId(row._id)
                setConfirmation(true)
              }} >
                <DeleteOutlinedIcon />
              </IconButton>
            </TableCell>}
            {JSON.parse(localStorage.getItem('user')).role.toLowerCase() === "student" && <TableCell>
              {/* <IconButton color='secondary' onClick={() => { confirmation ? deleteFeedback(row._id) :  }} > */}
              <Link to={`/submitFeed?fid=${row._id}&qid=${row.feedbackQuestions._id}&isCourse=${value}`}><IconButton color='primary'>
                <OpenInNewIcon />
              </IconButton>
              </Link>
            </TableCell>}
          </TableRow>
        })
      }
    </TableBody>
  )
}

export default function NewFeedback() {
  const dispatch = useDispatch()
  // const JWTtoken = useSelector((state) => state.user.token)
  const JWTtoken = localStorage.getItem('token').slice(1, -1)
  const role = useSelector((state) => state.user.role)
  const sem = useSelector((state) => state.user.sem)
  // const year = useSelector((state) => state.user.year)
  const inst = useSelector((state) => state.user.institute)
  const depart = useSelector((state) => state.user.department)
  const classes = useStyle()
  const [feedbacks, setFeedbacks] = useState([]);
  const [courseFeedbacks, setCourseFeedbacks] = useState([]);
  const [delId, setDelId] = useState('');
  const [confirmation, setConfirmation] = useState(false);
  const [value, setValue] = useState(0)

  const courseFeedURL = role === 'admin' ? `https://sgp-feedback-system.herokuapp.com/api/courseFeedback` : `https://sgp-feedback-system.herokuapp.com/api/courseFeedback?sem=${sem}&institute=${inst}&department=${depart}`
  const feedURL = role === 'admin' ? `https://sgp-feedback-system.herokuapp.com/api/getfeedbacklist` : `https://sgp-feedback-system.herokuapp.com/api/getfeedbacklist?sem=${sem}&institute=${inst}&department=${depart}`

  const handleConfirmation = () => {
    setConfirmation(false)
  }

  const getFeedbackList = useCallback(async () => {
    dispatch(set())
    try {
      const res = await axios.get(feedURL, {
        headers: {
          Authorization: `Bearer ${JWTtoken}`
        }
      })
      setFeedbacks(res.data)
      dispatch(reset())
    } catch (err) {
      console.log(err)
      dispatch(openSnack({ message: err.response.data.message, type: "error" }))
      dispatch(reset())
    }
  }, [dispatch, JWTtoken, feedURL])
  const getCourseFeedbackList = useCallback(async () => {
    dispatch(set())
    try {
      const res = await axios.get(courseFeedURL, {
        headers: {
          Authorization: `Bearer ${JWTtoken}`
        }
      })
      setCourseFeedbacks(res.data)
      dispatch(reset())
    } catch (err) {
      console.log(err)
      dispatch(openSnack({ message: err.response.data.message, type: "error" }))
      dispatch(reset())
    }
  }, [dispatch, JWTtoken, courseFeedURL])

  useEffect(() => {
    getFeedbackList()
    getCourseFeedbackList()
  }, [getFeedbackList, getCourseFeedbackList])

  const deleteFeedback = async (id) => {
    dispatch(set())
    try {

      let url = value === 0 ? `https://sgp-feedback-system.herokuapp.com/api/feedback?id=${id}` : `https://sgp-feedback-system.herokuapp.com/api/courseFeedback?id=${id}`

      const res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${JWTtoken}`
        }
      })
      // console.log(res)
      dispatch(openSnack({ message: res.data.message, type: "success" }))
      dispatch(reset())
      getFeedbackList()
      handleConfirmation()
    } catch (err) {
      console.log(err)
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

  return (<>
    <Box>
      {JSON.parse(localStorage.getItem('user')).role === "admin" ? (<Box className={classes.heading}>
        <Typography
          className={classes.headText}
          variant='h4'
        >
          NewFeedback
        </Typography>
        <CreateNewFeedback getFeedList={getFeedbackList} />
      </Box>) : <></>}
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
      <TableContainer component={Paper} className={classes.tblContainer}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              {JSON.parse(localStorage.getItem('user')).role === "admin" && <TableCell>Feedback Question</TableCell>}
              <TableCell>Created By</TableCell>
              {JSON.parse(localStorage.getItem('user')).role === "admin" && <TableCell>Email</TableCell>}
              <TableCell>Due From</TableCell>
              <TableCell>Due To</TableCell>
              {JSON.parse(localStorage.getItem('user')).role === "admin" && <TableCell><Typography color='secondary'>delete</Typography></TableCell>}
              {JSON.parse(localStorage.getItem('user')).role !== "admin" && <TableCell><Typography>Give Feedback</Typography></TableCell>}
            </TableRow>
          </TableHead>
          <Feed
            list={value === 0 ? feedbacks : courseFeedbacks}
            setDelId={delId => setDelId(delId)}
            value={value}
            setConfirmation={confirmation => setConfirmation(confirmation)}
          />
          {/* <TableBody> */}
          {
            // feedbacks.map(row => {
            //   let newDueFrom = new Date(row.dueFrom)
            //   let newDueTo = new Date(row.dueTo)
            //   return <TableRow key={row._id}>
            //     <TableCell>{row.name}</TableCell>
            //     <TableCell>{row.description}</TableCell>
            //     <TableCell>{row.feedbackQuestions.name}</TableCell>
            //     <TableCell>{row.createdBy.userName}</TableCell>
            //     <TableCell>{row.createdBy.email}</TableCell>
            //     <TableCell>{newDueFrom.toDateString()}</TableCell>
            //     <TableCell>{newDueTo.toDateString()}</TableCell>
            //     <TableCell>
            //       {/* <IconButton color='secondary' onClick={() => { confirmation ? deleteFeedback(row._id) :  }} > */}
            //       <IconButton color='secondary' onClick={() => {
            //         setDelId(row._id)
            //         setConfirmation(true)
            //       }} >
            //         <DeleteOutlinedIcon />
            //       </IconButton>
            //     </TableCell>
            //   </TableRow>
            // })
          }
          {/* </TableBody> */}
        </Table>
      </TableContainer>
    </Box>
    <Dialog
      open={confirmation}
      onClose={handleConfirmation}
    >
      <DialogTitle>Are You Sure, You want to delete?</DialogTitle>
      <DialogActions>
        <Button onClick={handleConfirmation} color="primary" autoFocus>
          NO
        </Button>
        <Button onClick={() => deleteFeedback(delId)} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  </>
  )
}
