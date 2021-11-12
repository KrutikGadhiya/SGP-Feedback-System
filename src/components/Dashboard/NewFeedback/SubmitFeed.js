import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { set, reset } from '../../../redux/reducers/loadingSlice'
import { openSnack } from '../../../redux/reducers/snackSlice'


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

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function SubmitFeed() {
  // const { id } = useParams()
  const query = useQuery()
  const classes = useStyle()
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.user.id)
  const JWTtoken = useSelector((state) => state.user.token)
  const [feedQue, setFeedQue] = useState([])

  const getFeedback = useCallback(async () => {
    dispatch(set())
    try {
      const res = await axios.get(`https://sgp-feedback-system.herokuapp.com/api/getfeedbackque?id=${query.get('qid')}`, {
        headers: {
          Authorization: `Bearer ${JWTtoken}`
        }
      })

      setFeedQue(res.data[0].questions)
      // dispatch(openSnack({ message: res.data.message, type: "success" }))
      dispatch(reset())
    } catch (err) {
      console.error(err)
      dispatch(openSnack({ message: err.response.data.message, type: "error" }))
      dispatch(reset())
    }

  }, [query, JWTtoken, dispatch])
  useEffect(() => {
    getFeedback()
  }, [getFeedback])

  return (
    <Box>
      <Box className={classes.heading}>
        <Typography
          className={classes.headText}
          variant='h4'
        >
          Submit Feedback
        </Typography>
      </Box>
      {
        feedQue.map((itm) => {
          return (
            <h1>{itm}</h1>
          )
        })
      }
    </Box>
  )
}
