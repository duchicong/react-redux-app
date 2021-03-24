import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import cookie from 'js-cookie'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  Paper
} from '@material-ui/core'
import axios from '../../utils/API'
import { fetchFood } from '../../actions/foods'
import ItemFood from './ItemFood'

const withStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  MuiPaper: {
    padding: theme.spacing(3)
  }
}))

const List = () => {
  const classes = withStyles()
  const dispatch = useDispatch()
  const {foods} = useSelector(state => state)

  useEffect(() => {
    axios.get('/foods.json')
      .then(res => dispatch(fetchFood(Object.entries(res.data).map(([key, value]) => ({ ...value, id: key })))))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="list-foods">
      <Typography variant="h6">List Food</Typography>
      <Paper variant="outlined" className={classes.MuiPaper}>
        {foods.length !== 0 && foods.map((element, index) => <ItemFood food={element} key={index} />)}
      </Paper>
    </div>
  )
}
 
export default List