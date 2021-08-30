import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LineChart from '../Charts/LineChart'
import BarChart from '../Charts/BarChart'
import PieChart from '../Charts/PieChart'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4)
  }
}))

export default function Home() {
  const classes = useStyles()
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} lg={6} xl={6} md={6}>
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
        </Grid>
      </Grid>
    </div>
  )
}
