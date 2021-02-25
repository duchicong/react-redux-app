import React from 'react'
import { useSelector } from 'react-redux'
import {
  Box,
  Container,
  Grid,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import logo from '../../assets/icons/logo.svg'
import {
  NAME_APP,
  DESCRIPTION_APP,
  COPYRIGHT
} from '../../constant'

const withStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    backgroundColor: '#764abc',
    height: 'auto',
    width: '100%',
    boxSizing: 'border-box',
    color: '#ebedf0'
  },
  MuiBox: {
    position: 'absolute',
    background: `transparent url(${logo}) no-repeat center right`,
    backgroundSize: 'contain',
    width: '100%',
    height: '100%',
    opacity: '.2'
  },
  MuiContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(5)
  }
}))

const Footer = () => {
  const classes = withStyles()
  const { translation } = useSelector(state => state.setting)

  return (
    <footer className={classes.root}>
      <Box className={classes.MuiBox} />
      <Container maxWidth="xl" className={classes.MuiContainer}>
        <Grid container alignContent="space-between" spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">{translation.nameApp}</Typography>
            <Typography variant="body2" align="justify">{translation.descriptionApp}</Typography>
          </Grid>
        </Grid>
      </Container>
      <Typography align="center" variant="body2" dangerouslySetInnerHTML={{ __html: translation.copyright }} />
    </footer>
  )
}

export default Footer