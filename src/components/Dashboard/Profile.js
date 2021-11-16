import React from 'react'
import { Avatar, Box, Button, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import EditIcon from '@material-ui/icons/Edit';

const useStyle = makeStyles((theme) => ({
  heading: {
    display: 'flex',
    padding: theme.spacing(5),
    paddingTop: theme.spacing(3),
  },
  headText: {
    flex: 1
  },
  label: {
    fontWeight: 500,
    marginBottom: theme.spacing(1)
  },
  box: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  value: {
    padding: theme.spacing(2),
    border: '1px solid #8b8b8b',
    borderRadius: theme.spacing(2)
  },
  avatarCont: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    outline: `3px solid #3f51b5`,
  },
  editBtn: {
    marginTop: theme.spacing(2)
  }
}))

export default function Profile() {
  const classes = useStyle()
  const userName = useSelector((state) => state.user.userName)
  const avatar = useSelector((state) => state.user.avatar)
  const institute = useSelector((state) => state.user.institute)
  const department = useSelector((state) => state.user.department)
  return (
    <>
      <Box className={classes.heading}>
        <Typography
          className={classes.headText}
          variant='h4'
        >
          Profile
        </Typography>
      </Box>
      <Container>
        <Box className={classes.avatarCont}>
          <Avatar className={classes.avatar} alt='avatar' src={avatar} />
          <Button variant='contained' color='primary' className={classes.editBtn} startIcon={<EditIcon />} >Edit</Button>
        </Box>
        <Box className={classes.box}>
          <Typography variant='h6' className={classes.label} >Name</Typography>
          <Box className={classes.value}>
            <Typography >{userName}</Typography>
          </Box>
        </Box>
        <Box className={classes.box}>
          <Typography variant='h6' className={classes.label} >Institute</Typography>
          <Box className={classes.value}>
            <Typography >{institute}</Typography>
          </Box>
        </Box>
        <Box className={classes.box}>
          <Typography variant='h6' className={classes.label} >Department</Typography>
          <Box className={classes.value}>
            <Typography >{department}</Typography>
          </Box>
        </Box>
      </Container>
    </>
  )
}
