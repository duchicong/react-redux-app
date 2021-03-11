import React, { useState, useEffect, useRef } from 'react'
import validate from 'validate.js'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import {
  Box,
  Button,
  colors,
  TextField
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import axios from '../../utils/API'
import constraints from './constraintsRegiser'

const MuiTextField = withStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    '& .Mui-required > span': {
      color: colors.red[600]
    }
  }
}))(TextField)

const MuiButton = withStyles((theme) => ({
  root: {
    textTransform: 'initial',
    maxWidth: "80%",
    width: '100%',
    marginTop: theme.spacing(2)
  }
}))(Button)

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1)
  }
}))

function Register () {
  const { translation } = useSelector(state => state.setting)
  const classes = useStyles()
  const typingRef = useRef()
  const [formState, setFormState] = useState({
    values: null,
    touched: {},
    errors: {},
    valid: true
  })

  const handleChange = React.useCallback((e) => {
    if (typingRef.current) clearTimeout(typingRef.current)
    typingRef.current = setTimeout(() => setFormState(prev => ({
      ...prev,
      values: {
        ...prev.values,
        [e.target.name]: e.target.value.trim()
      },
      touched: {
        ...prev.touched,
        [e.target.name]: true
      }
    })), 300)
  }, [])

  const createFoodHandler = () => {
    axios({
      method: 'post',
      url: '/foods.json',
      data: formState.values
    })
      .then((res) => console.log(res))
      .catch(err => console.log(err.response))
      .finally(() => {
        setFormState(prev => ({
          ...prev,
          touched: {},
          values: null,
          valid: false
        }))
      })
  }

  const hasError = (fieldName) => !!(formState.errors[fieldName] && formState.touched[fieldName])

  const hasHelperText = (fieldName) => {
    return hasError(fieldName) ? formState.errors[fieldName] : ''
  }

  useEffect(() => {
    const errors = validate(formState.values, constraints(translation.validate))

    setFormState(prev => ({
      ...prev,
      errors: errors || {},
      valid: !errors
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.values])
  console.log('formState ', formState)

  return (
    <div className={clsx("register-form", classes.root)}>
      <Box display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap={16}>
        <MuiTextField
          label="User name"
          variant="outlined"
          size="small"
          onChange={handleChange}
          ref={typingRef}
          name="userName"
          error={hasError('userName')}
          helperText={hasHelperText('userName')}
          fullWidth
          required
        />
        <MuiTextField
          label="Number Phone"
          variant="outlined"
          size="small"
          onChange={handleChange}
          ref={typingRef}
          name="phone"
          error={hasError('phone')}
          helperText={hasHelperText('phone')}
          fullWidth
          required
        />
      </Box>
      <MuiTextField
        label="Email"
        variant="outlined"
        size="small"
        onChange={handleChange}
        ref={typingRef}
        name="email"
        error={hasError('email')}
        helperText={hasHelperText('email')}
        fullWidth
        required
      />
      <MuiTextField
        label="Password"
        variant="outlined"
        size="small"
        onChange={handleChange}
        ref={typingRef}
        name="password"
        error={hasError('password')}
        helperText={hasHelperText('password')}
        fullWidth
        required
      />
      <MuiButton
        onClick={createFoodHandler}
        variant="contained"
        color="primary"
        disabled={!formState.valid}
      >
        Create Now
      </MuiButton>
    </div>
  )
}

export default Register