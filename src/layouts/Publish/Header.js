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
  ClickAwayListener,
  TextField,
  InputAdornment
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import Brightness7Icon from '@material-ui/icons/Brightness7' // sun
import Brightness4Icon from '@material-ui/icons/Brightness4' // moon
import TranslateIcon from '@material-ui/icons/Translate'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import logo from '../../assets/icons/logo.svg'
import FoodsCart from './shared/FoodsCart'
import {
  toggleMode,
  handleChangeLanguage,
  authLogout
} from '../../actions'
import { DialogAuthentication } from '../../components/Dialogs'

const withStyles = makeStyles((theme) => ({
  MuiCardMedia: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  },
  MuiAppBarDark: {
    backgroundColor: theme.palette.primary.dark
  },
  languageBtn: {
    minWidth: theme.spacing(10)
  },
  searchTextField: {
    maxWidth: 200,
    '& .MuiOutlinedInput-root': {
      border: theme.palette.primary.light + ' 1px solid',
      color: theme.palette.primary.light
    },
    '& .MuiOutlinedInput-input': {
      padding: '8.5px 14px',
      paddingLeft: 0
    },
    '& .MuiOutlinedInput-adornedStart': {
      paddingLeft: '6px'
    }
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
  const { auth, setting } = useSelector(state => state)
  const { translation, isLight, language } = setting
  const { isAuth } = auth
  const [state, setState] = useState({
    isSetting: false,
    isCart: false,
    isSearch: false,
    isAuthDialog: false
  })

  const Icon = isLight ? Brightness7Icon : Brightness4Icon
  const appBarClassName = !isLight ? classes.MuiAppBarDark : ''

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar className={appBarClassName}>
          <Toolbar>
            <CardMedia component='img' src={logo} className={classes.MuiCardMedia}/>
            <Typography variant="h6">React Redux</Typography>
            <Box flexGrow={1}/>
            <TextField
              variant='outlined'
              className={classes.searchTextField}
              placeholder={translation.placeholderSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon htmlColor="#fff" />
                  </InputAdornment>
                ),
              }}
            />
            <ClickAwayListener onClickAway={() => setState(prev => ({ ...prev, isSetting: false }))}>
              <Box position="relative">
                <IconButton
                  onClick={() => setState(prev => ({ ...prev, isSetting: !state.isSetting }))}
                >
                  <ShoppingCartIcon htmlColor="#fff"/>
                </IconButton>
                <FoodsCart
                  open={state.isSetting}
                  onClose={() => setState(prev => ({ ...prev, isSetting: false }))}
                />
              </Box>
            </ClickAwayListener>
            <Button
              onClick={() => dispatch(handleChangeLanguage(language === 'en' ? 'vi' : 'en'))}
              startIcon={<TranslateIcon />}
              variant="outlined"
              color="inherit"
              className={classes.languageBtn}
            >
              {language}
            </Button>
            <IconButton
              onClick={() => dispatch(toggleMode(!isLight))}
            >
              <Icon htmlColor="#fff"/>
            </IconButton>
            {!isAuth ? (
              <IconButton onClick={() => setState(prev => ({ ...prev, isAuthDialog: true }))}>
                <PersonAddIcon htmlColor="#fff"/>
              </IconButton>
            ) : (
              <Button onClick={() => dispatch(authLogout())} color="inherit" variant="outlined">
                {translation.logout}
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container>
        {props.children}
      </Container>
      <DialogAuthentication
        open={state.isAuthDialog}
        onClose={() => setState(prev => ({ ...prev, isAuthDialog: false }))}
      />
    </React.Fragment>
  )
}

HideAppBar.propTypes = {
  children: PropTypes.node.isRequired
}
