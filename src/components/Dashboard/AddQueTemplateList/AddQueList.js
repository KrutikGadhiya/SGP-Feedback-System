import React, { useState, useEffect, useCallback } from 'react'
import CreateNewTemplate from './CreateNewTemplate'
import { Box, Button, Dialog, DialogActions, DialogTitle, IconButton, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import axios from 'axios'
import { useDispatch } from 'react-redux'
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
  }
}))

export default function AddQueList() {
  const dispatch = useDispatch()
  // const JWTtoken = useSelector((state) => state.user.token)
  const JWTtoken = localStorage.getItem('token').slice(1, -1)
  const classes = useStyle()
  const [feedbacks, setFeedbacks] = useState([]);
  const [delId, setDelId] = useState('');
  const [confirmation, setConfirmation] = useState(false);

  const handleConfirmation = () => {
    setConfirmation(false)
  }

  const getFeedbackList = useCallback(async () => {
    dispatch(set())
    try {
      const res = await axios.get('https://sgp-feedback-system.herokuapp.com/api/getfeedbackque', {
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
  }, [dispatch, JWTtoken])

  useEffect(() => {
    getFeedbackList()
  }, [getFeedbackList])

  const deleteFeedback = async (id) => {
    dispatch(set())
    try {
      const res = await axios.delete(`https://sgp-feedback-system.herokuapp.com/api/feedbackQue?id=${id}`, {
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

  return (
    <>
      <Box>
        {JSON.parse(localStorage.getItem('user')).role === "admin" ? (<Box className={classes.heading}>
          <Typography
            className={classes.headText}
            variant='h4'
          >
            Add Question Template
          </Typography>
          <CreateNewTemplate getFeedList={getFeedbackList} />
        </Box>) : <></>}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Number of Questions</TableCell>
                <TableCell><Typography color='secondary'>delete</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                feedbacks.map(row => {
                  return <TableRow key={row._id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.createdBy.userName}</TableCell>
                    <TableCell>{row.createdBy.email}</TableCell>
                    <TableCell>{row.questions.length}</TableCell>
                    <TableCell>
                      <IconButton color='secondary' onClick={() => {
                        setDelId(row._id)
                        setConfirmation(true)
                      }}
                        {...((row.name === 'default' || row.name === 'default course') && { disabled: true })}
                      >
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                })
              }
            </TableBody>
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
