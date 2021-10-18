import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LineChart from './LineChart'
import BarChart from './BarChart'
import PieChart from './PieChart'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4)
  }
}))

function Home() {
  const classes = useStyles()
  const role = useSelector((state) => state.user.role)
  // useEffect(() => {

  // }, [])
  return (
    <div>
      <Grid container spacing={1}>
        {role === "admin" || JSON.parse(localStorage.getItem('user')).role === 'admin' ? (<><Grid item xs={12} lg={6} xl={6} md={6}>
          <Paper className={classes.paper}>
            <PieChart />
          </Paper>
        </Grid>
          <Grid item xs={12} lg={6} xl={6} md={6}>
            <Paper className={classes.paper}>
              <BarChart />
            </Paper>
          </Grid>
          <Grid item xs={12} lg={12} xl={12} md={12}>
            <Paper className={classes.paper}>
              <LineChart />
            </Paper>
          </Grid></>) : <></>}
      </Grid>
    </div>
  )
}

export default React.memo(Home)