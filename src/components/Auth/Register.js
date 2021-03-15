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
import axios from '../../utils/authAPI'
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

  const registerHandler = () => {
    axios({
      method: 'post',
      data: { ...formState.values, returnSecureToken: true }
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

  return (
    <div className={clsx("register-form", classes.root)}>
      <MuiTextField
        label={translation.placeholders.email}
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
        label={translation.placeholders.password}
        variant="outlined"
        size="small"
        onChange={handleChange}
        ref={typingRef}
        type="password"
        name="password"
        error={hasError('password')}
        helperText={hasHelperText('password')}
        fullWidth
        required
      />
      <MuiButton
        onClick={registerHandler}
        variant="contained"
        color="primary"
        disabled={!formState.valid}
      >
        {translation.createButton}
      </MuiButton>
    </div>
  )
}

export default Register