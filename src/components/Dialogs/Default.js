import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core'

function DialogDefault({ open, fullWidth, maxWidth, onClose, onClick, title, children, okLabel, closeLabel, ...rest }) {
  const { translation } = useSelector(state => state.setting)
  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      onClose={onClose}
      {...rest}
    >
      <DialogTitle>
        <Box textAlign="center">
          {title}
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box textAlign="center">
          {children}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {closeLabel ? closeLabel : translation.buttons.close}
        </Button>
        <Button onClick={onClose} color="primary">
          {okLabel ? okLabel : translation.buttons.ok}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

DialogDefault.defaultProps = {
  maxWidth: 'sm',
  fullWidth: true
}

DialogDefault.propTypes = {
  open: PropTypes.bool.isRequired,
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.oneOf([false, 'xs', 'sm', 'md', 'lg', 'xl']),
  title: PropTypes.string,
  okLabel: PropTypes.string,
  closeLabel: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
  onClick: PropTypes.func
}

export default React.memo(DialogDefault)