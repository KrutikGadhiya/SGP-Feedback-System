import React from 'react'
import CreateNewFeedback from './CreateNewFeedback'
import { Box, Typography } from '@material-ui/core'
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
  return (
    <Box>
      <Box className={classes.heading}>
        <Typography
          className={classes.headText}
          variant='h4'
        >
          NewFeedback
        </Typography>
        <CreateNewFeedback />
      </Box>
    </Box>
  )
}
