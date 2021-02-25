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

const MenuSetting = (props) => {
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
        <ListItem component='li'>
          {/* {LANGUAGE.EN}
          <Switch
            checked={!(setting.language === 'en')}
            onChange={(e) => dispatch(handleChangeLanguage(e.target.value))}
            value={setting.language === 'en' ? 'vi' : 'en'}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          {LANGUAGE.VI} */}
        </ListItem>
        <ListItem component='li'>
          {/* <IconButton
            onClick={() => dispatch(toggleMode(!setting.isLight))}
          >
            <Icon />
          </IconButton>
          {label} */}
        </ListItem>
      </List>
    </Box>
  )
}

MenuSetting.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
}

export default MenuSetting
