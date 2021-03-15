import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  colors
} from '@material-ui/core'
import Register from '../Auth/Register'
import Login from '../Auth/Login'
import DialogDefault from './Default'

const useStyles = makeStyles(() => ({
  link: {
    cursor: "pointer",
    color: colors.indigo[500],
    '&:hover': {
      textDecoration: "underline"
    }
  }
}))

export default function DialogAuthentication ({ open, onClose, onClick, ...rest }) {
  const classes = useStyles()
  const [isRegister, setIsRegister] = useState(true)
  const { translation } = useSelector(state => state.setting)
  return (
    <DialogDefault
      open={open}
      onClose={onClose}
      title={isRegister ? translation.register.title : translation.login.title}
      {...rest}
    >
      {isRegister ? <Register /> : <Login />}
      <Box
        component="span"
        className={classes.link}
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister ? translation.register.redirect : translation.login.redirect}
      </Box>
    </DialogDefault>
  )
}

DialogAuthentication.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string,
    onClose: PropTypes.func,
    onClick: PropTypes.func  
}
