import React, { useState, useEffect, useRef } from 'react'
import validate from 'validate.js'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import {
  Button,
  colors,
  TextField
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import axios from '../../utils/API'
import constraints from './constraintsLogin'

const MuiButton = withStyles((theme) => ({
  root: {
    textTransform: 'initial',
    maxWidth: "80%",
    width: '100%',
    marginTop: theme.spacing(2)
  }
}))(Button)

const MuiTextField = withStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    '& .Mui-required > span': {
      color: colors.red[600]
    }
  }
}))(TextField)

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1)
  }
}))

function Login () {
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

  const loginHandler = () => {
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
    <div className={clsx("Login-form", classes.root)}>
      <MuiTextField
        label={translation.placeholders.email}
        variant="outlined"
        size="small"
        onChange={handleChange}
        ref={typingRef}
        name="userName"
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
        name="userName"
        error={hasError('password')}
        helperText={hasHelperText('password')}
        inputProps={{ type:"password" }}
        fullWidth
        required
      />
      <MuiButton
        onClick={loginHandler}
        variant="contained"
        color="primary"
        disabled={!formState.valid}
      >
        {translation.loginButton}
      </MuiButton>
    </div>
  )
}

export default Login