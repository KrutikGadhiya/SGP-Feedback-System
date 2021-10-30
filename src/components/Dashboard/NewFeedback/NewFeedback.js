import React, { useEffect, useState } from 'react'
import CreateNewFeedback from './CreateNewFeedback'
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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

export default function NewFeedback() {
  const classes = useStyle()
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch('https://sgp-feedback-system.herokuapp.com/api/getfeedbacklist', {
      method: 'get'
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setFeedbacks(res)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <Box>
      {JSON.parse(localStorage.getItem('user')).role === "admin" ? (<Box className={classes.heading}>
        <Typography
          className={classes.headText}
          variant='h4'
        >
          NewFeedback
        </Typography>
        <CreateNewFeedback />
      </Box>) : <></>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Feedback Question</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Due From</TableCell>
              <TableCell>Due To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              feedbacks.map(row => (
                <TableRow key={row._id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.feedbackQuestions.name}</TableCell>
                  <TableCell>{row.createdBy.userName}</TableCell>
                  <TableCell>{row.createdBy.email}</TableCell>
                  <TableCell>{row.dueFrom}</TableCell>
                  <TableCell>{row.dueTo}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
