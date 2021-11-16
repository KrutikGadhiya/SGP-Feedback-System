import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Box, Button, Dialog, DialogContent, DialogActions, DialogTitle, IconButton, Slide, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { set, reset } from '../../redux/reducers/loadingSlice'
import { openSnack } from '../../redux/reducers/snackSlice'
import Chart from './PieChart'

const useStyle = makeStyles((theme) => ({
  heading: {
    display: 'flex',
    padding: theme.spacing(5),
    paddingTop: theme.spacing(3),
  },
  box: {
    background: '#f1f3ff',
    textAlign: 'center',
    padding: theme.spacing(2),
    border: '1px solid #4a5cff',
    marginTop: theme.spacing(1),
    borderRadius: theme.spacing(2),
    cursor: 'pointer'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  chartMap: {
    // width: '30%',
    background: '#f1f3ff',
    border: '1px solid #4a5cff',
    padding: theme.spacing(2)
  },
  chart: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  margin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  nofeed: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Settings() {

  const dispatch = useDispatch()
  const id = useSelector((state) => state.user.id)
  // const JWTtoken = useSelector((state) => state.user.token)
  const JWTtoken = localStorage.getItem('token').slice(1, -1)
  const dialogRef = useRef()
  const [feeds, setFeeds] = useState([])
  const [open, setOpen] = useState(false);
  const [chart, setChart] = useState({ que: ['1', '2', '3', '4', '5'], analytic: [{ '1': 0, '2': 0, '3': 0, '4': 3, '5': 0 }], For: 'ME' })
  const classes = useStyle()

  const getAnalytics = useCallback(async () => {
    dispatch(set())
    try {
      const res = await axios.get(`https://sgp-feedback-system.herokuapp.com/api/feedbackAns?id=${id}`, {
        headers: {
          Authorization: `Bearer ${JWTtoken}`
        }
      })
      setFeeds(res.data)
      // dispatch(openSnack({ message: re.response.data.message, type: "error" }))
      dispatch(reset())
    } catch (err) {
      console.log(err)
      dispatch(openSnack({ message: err.response.data.message, type: "error" }))
      dispatch(reset())
    }

  }, [dispatch, id, JWTtoken])

  useEffect(() => {
    getAnalytics()
  }, [getAnalytics])

  const handleClose = () => {
    setOpen(false)
  }

  const handleShowChart = (que, analytic, For) => {
    setChart({ que, analytic, For })
    setOpen(true)
  }

  return (
    <Box>
      <Box className={classes.heading}>
        <Typography
          className={classes.headText}
          variant='h4'
        >
          Analytics
        </Typography>
      </Box>
      {
        feeds.length !== 0 ? (
          feeds.map((feed, i) => {
            return (
              <Box className={classes.box} key={i} onClick={e => handleShowChart(feed.questions, feed.analytics, feed.feedFor)}>
                {/* <Chart label={feed.} /> */}
                <Typography variant='h6' >{feed.feedFor}</Typography>
              </Box>
            )
          })) : (<Box className={classes.nofeed}>
            <Typography variant='h6'>No feed Found</Typography>
          </Box>)
      }
      {/* {JSON.stringify(feeds)} */}
      <Dialog
        open={open}
        fullScreen
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        ref={dialogRef}
        disableEscapeKeyDown
        TransitionComponent={Transition}
      >
        <DialogTitle id="alert-dialog-title">
          {chart.For}
          <IconButton
            className={classes.closeButton}
            aria-label="close"
            onClick={handleClose}

          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container >
            {
              chart.analytic.map((itm, i) => {
                return (<Grid item xs={12} sm={6} md={4} className={classes.chartMap}>
                  <Typography variant='h6' >{chart.que[i]}</Typography>
                  <Box className={classes.chart}>
                    <Chart label={chart.que[i]} labels={Object.keys(itm)} data={Object.values(itm)} />
                  </Box>
                </Grid>
                )
              })
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained' color="primary">
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
