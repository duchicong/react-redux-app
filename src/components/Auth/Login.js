import React, { useState, useEffect, useRef } from 'react'
import validate from 'validate.js'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import {
  Button,
  colors,
  TextField,
  FormHelperText
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { login as axios } from '../../utils/authAPI'
import constraints from './constraintsLogin'
import { loginSuccess, loginStart, loginFailed } from '../../actions/auth'

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
  },
  messageError: {
    textAlign: 'center'
  }
}))

function Login () {
  const { translation } = useSelector(state => state.setting)
  const classes = useStyles()
  const typingRef = useRef()
  const dispatch = useDispatch()
  const [formState, setFormState] = useState({
    values: null,
    touched: {},
    errors: {},
    valid: true,
    message: null
  })

  const handleChange = React.useCallback((e) => {
    if (typingRef.current) clearTimeout(typingRef.current)
    typingRef.current = setTimeout(() => setFormState(prev => ({
      ...prev,
      message: null,
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
    dispatch(loginStart())
    axios({
      method: 'post',
      data: { ...formState.values, returnSecureToken: true }
    })
      .then((res) => dispatch(loginSuccess(res.data)))
      .catch(err => {
        setFormState(prev => ({
          ...prev,
          valid: false,
          message: translation.login.messageError
        }))
        dispatch(loginFailed())
      })
      .finally(() => {
        setFormState(prev => ({ ...prev, valid: false }))
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
        {translation.login.loginButton}
      </MuiButton>
      {formState.message !== null && <FormHelperText
        className={classes.messageError}
        error={formState.message !== null}
        variant="outlined"
      >
        {formState.message}
      </FormHelperText>}
    </div>
  )
}

export default Login