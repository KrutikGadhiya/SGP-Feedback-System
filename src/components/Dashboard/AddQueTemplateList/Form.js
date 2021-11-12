import React, { useState } from 'react';
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  TextField,
  Typography
} from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { set, reset } from '../../../redux/reducers/loadingSlice'
import { openSnack } from '../../../redux/reducers/snackSlice'


const Form = props => {
  const { classes } = props;
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.user.id)
  const JWTtoken = useSelector((state) => state.user.token)
  const [name, setName] = useState('')
  const [queList, setQueList] = useState([''])


  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const list = [...queList];
    list[index] = value;
    setQueList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...queList];
    list.splice(index, 1);
    setQueList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setQueList([...queList, ""]);
  };

  const handleSubmit = async () => {
    // console.log(feedback, Number(feedback.sem))
    // return
    if (!name)
      return dispatch(openSnack({ message: 'Please Add All the Fields!!', type: "error" }))
    // console.log(name, queList, userId)
    dispatch(set())
    try {
      const res = await axios.post('https://sgp-feedback-system.herokuapp.com/api/addfeedbackque', {
        name: name,
        questions: queList,
        createdBy: userId
      }, {
        headers: {
          Authorization: `Bearer ${JWTtoken}`
        }
      })
      // console.log(res.data)
      dispatch(openSnack({ message: `FeedbackQue Template: ${res.data.savedfeedbackQues.name} Added Successfully`, type: "success" }))
      props.setOpen(false)
      props.getFeedList()
      dispatch(reset())
    } catch (err) {
      console.error(err)
      dispatch(openSnack({ message: err.response.data.message, type: "error" }))
      dispatch(reset())
    }
  }

  return (
    <div ref={props.reff}>
      <button hidden onClick={handleSubmit}>submit</button>
      <TextField
        label="Name"
        fullWidth
        variant="outlined"
        className={classes.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Typography variant='h6' gutterBottom>Question List</Typography>
      {
        queList.map((itm, i) => {
          return (
            <Box key={i}>
              {/* <Box className={classes.inputWithBtn}>
                <TextField
                  label={`Que ${i + 1}`}
                  variant="outlined"
                  fullWidth
                  // className={classes.input}
                  value={itm}
                  onChange={e => handleInputChange(e, i)}
                />
                {queList.length !== 1 && <IconButton color='secondary' size='small' className={classes.removeBtn} onClick={(e) => { handleRemoveClick(i); e.preventDefault() }}>
                  <Remove />
                </IconButton>}
              </Box> */}
              <FormControl className={classes.inputWithBtn} fullWidth variant="outlined" >
                <InputLabel htmlFor="queList">{`Que ${i + 1}`}</InputLabel>
                <OutlinedInput
                  id="queList"
                  value={itm}
                  fullWidth
                  onChange={e => handleInputChange(e, i)}
                  endAdornment={
                    <InputAdornment position="end">
                      {queList.length !== 1 && <IconButton color='secondary' size='small' className={classes.removeBtn} onClick={(e) => { handleRemoveClick(i); e.preventDefault() }}>
                        <Remove />
                      </IconButton>}
                    </InputAdornment>
                  }
                  labelWidth={40}
                />
              </FormControl>
              {queList.length - 1 === i && <IconButton
                color='primary'
                className={classes.addBtn}
                onClick={handleAddClick}
                size='small'
              >
                <Add />
              </IconButton>
              }
              {/* <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  value={name}
                  // onChange={}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                      >
                        <Remove />
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl> */}
            </Box>
          )
        })
      }

    </div>
  );
};

export default React.memo(Form)