import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  CssBaseline,
  useScrollTrigger,
  Box,
  IconButton,
  Container,
  Slide,
  CardMedia,
  ClickAwayListener
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import Brightness7Icon from '@material-ui/icons/Brightness7' // sun
import Brightness4Icon from '@material-ui/icons/Brightness4' // moon
import TranslateIcon from '@material-ui/icons/Translate'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import logo from '../../assets/icons/logo.svg'
import MenuSetting from './shared/MenuSetting'
import {
  toggleMode,
  handleChangeLanguage
} from '../../actions'

const withStyles = makeStyles((theme) => ({
  MuiCardMedia: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  },
  MuiAppBarDark: {
    backgroundColor: theme.palette.primary.dark
  }
}))

function HideOnScroll(props) {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default function HideAppBar(props) {
  const classes = withStyles()
  const dispatch = useDispatch()
  const { setting } = useSelector(state => state)
  const [state, setState] = useState({
    isSetting: false,
    isCart: false,
    isSearch: false
  })
  const Icon = setting.isLight ? Brightness7Icon : Brightness4Icon
  const appBarClassName = !setting.isLight ? classes.MuiAppBarDark : ''

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar className={appBarClassName}>
          <Toolbar>
            <CardMedia component='img' src={logo} className={classes.MuiCardMedia}/>
            <Typography variant="h6">React Redux</Typography>
            <Box flexGrow={1}/>
            <IconButton><SearchIcon htmlColor="#fff"/></IconButton>
            <ClickAwayListener onClickAway={() => setState(prev => ({ ...prev, isSetting: false }))}>
              <Box position="relative">
                <IconButton
                  onClick={() => setState(prev => ({ ...prev, isSetting: !state.isSetting }))}
                >
                  <ShoppingCartIcon htmlColor="#fff"/>
                </IconButton>
                <MenuSetting
                  open={state.isSetting}
                  onClose={() => setState(prev => ({ ...prev, isSetting: false }))}
                />
              </Box>
            </ClickAwayListener>
            <Button
              onClick={() => dispatch(handleChangeLanguage(setting.language === 'en' ? 'vi' : 'en'))}
              startIcon={<TranslateIcon />}
              variant="outlined"
              color="inherit"
            >
              {setting.language}
            </Button>
            <IconButton
              onClick={() => dispatch(toggleMode(!setting.isLight))}
            >
              <Icon htmlColor="#fff"/>
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container>
        {props.children}
      </Container>
    </React.Fragment>
  )
}

HideAppBar.propTypes = {
  children: PropTypes.node.isRequired
}
