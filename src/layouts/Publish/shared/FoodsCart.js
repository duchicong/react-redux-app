import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  Box,
  List,
  ListItem,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const withStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    right: 0,
    width: '100%',
    height: 'auto',
    minWidth: 200,
    borderRadius: 2
  }
}))

const FoodsCart = (props) => {
  const { open, onClose, ...rest } = props
  const classes = withStyles()
  const { setting } = useSelector(state => state)

  if (!open) return null
  return (
    <Box
      className={clsx("Menu-setting", classes.root)}
      bgcolor={setting.theme.bgColor}
      color={setting.theme.color}
      onBlur={onClose}
      component='div'
      id="box-test"
      {...rest}
    >
      <List dense>
        {[1,2,3,4,5].map((item) => (
          <ListItem key={item} component='li'>
          Food {item}
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

FoodsCart.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
}

export default FoodsCart
