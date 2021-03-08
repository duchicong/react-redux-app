import React from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import {
  Typography,
  Paper
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Create } from '../components/Foods'

const withStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  MuiPaper: {
    padding: theme.spacing(3)
  }
}))

const CreateFood = () => {
  const classes = withStyles()
  const { translation } = useSelector(state => state.setting)
  return (
    <div className={clsx("Create-Foods", classes.root)}>
      <Typography variant="h6" gutterBottom>
        {translation.createFood}
      </Typography>
      <Paper variant="outlined" className={classes.MuiPaper}>
        <Create />
      </Paper>
    </div>
  )
}

export default CreateFood