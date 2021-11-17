import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography, Radio, RadioGroup, FormControlLabel, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { set, reset } from '../../../redux/reducers/loadingSlice'
import { openSnack } from '../../../redux/reducers/snackSlice'


const useStyle = makeStyles((theme) => ({
  heading: {
    display: 'flex',
    padding: theme.spacing(5),
    paddingTop: theme.spacing(3),
  },
  box: {
    borderRadius: theme.spacing(1),
    backgroundColor: '#e9eafb',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
  boxLast: {
    borderRadius: theme.spacing(1),
    backgroundColor: '#e9eafb',
    padding: theme.spacing(2),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
  que: {
    fontWeight: 600,
  },
  radio: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  submit: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    padding: theme.spacing(2)
  }
}))

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function SubmitFeed() {
  // const { id } = useParams()
  const history = useHistory()
  const query = useQuery()
  const classes = useStyle()
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.user.id)
  const JWTtoken = useSelector((state) => state.user.token)
  const [feedQue, setFeedQue] = useState([])
  const [ans, setAns] = useState([])

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const list = [...ans];
    list[index] = Number(value);
    setAns(list);
  };

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


  const handleSubmit = async () => {
    console.log(ans, query.get('fid'), userId)
    dispatch(set())
    try {
      let url = query.get('isCourse') === 0 ? `https://sgp-feedback-system.herokuapp.com/api/feedbackAns` : `https://sgp-feedback-system.herokuapp.com/api/courseFeedbackAns`
      const res = await axios.post(url, {
        feedbackId: query.get('fid'),
        userId,
        ans
      }, {
        headers: {
          Authorization: `Bearer ${JWTtoken}`
        }
      })
      dispatch(openSnack({ message: res.data.message, type: "success" }))
      history.push('/feedback')
      dispatch(reset())
    } catch (err) {
      console.error(err)
      dispatch(openSnack({ message: err.response.data.message, type: "error" }))
      dispatch(reset())
    }
  }

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
        feedQue.map((itm, index) => {
          return (
            <Box
              className={feedQue.length - 1 === index ? classes.boxLast : classes.box}
            >
              <Typography className={classes.que} variant="h6">
                {itm}
              </Typography>
              <RadioGroup
                aria-label="feedback"
                name="feedback"
                // value={value}
                value={ans[index]}
                // onChange={handleChange}
                onChange={(e) => handleInputChange(e, index)}
                className={classes.radio}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Completely Agree"
                />
                <FormControlLabel value="2" control={<Radio />} label="Agree" />
                <FormControlLabel value="3" control={<Radio />} label="Neutral" />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="Disagree"
                />
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="Completely Disagree"
                />
              </RadioGroup>
            </Box>
          );
        })}
      <Box className={classes.submit}>
        <Button
          variant='contained'
          color='primary'
          size='large'
          disabled={!(ans.length === feedQue.length)}
          onClick={handleSubmit}
        >Submit</Button>
      </Box>
    </Box>
  )
}
