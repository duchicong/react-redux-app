import React from 'react'
import Proptypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import {
  Card,
  Typography,
  Button
} from '@material-ui/core'
import { deleteFood } from '../../actions/foods'
import axios from '../../utils/API'

const useStyles = makeStyles((theme) => ({
  MuiCard: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridGap: theme.spacing(2)
  },
  MuiPaper: {
    padding: theme.spacing(3)
  }
}))

function ItemFood({ name, description, price, id }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { translation } = useSelector(state => state.setting)
  const deleteProduct = () => {
    axios.delete(`/foods/${id}.json/`)
      .then(res => dispatch(deleteFood(id)))
  }
  return (
    <div className="item-foods">
      <Card variant="outlined" className={classes.MuiCard}>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body1">{description}</Typography>
        <Typography variant="h6">{price}</Typography>
        <Button variant="contained" color="primary">{translation.addToCard}</Button>
        <Button variant="contained" color="secondary" onClick={deleteProduct}>{translation.deleteProduct}</Button>
      </Card>
    </div>
  )
}

ItemFood.propTypes = {
  id: Proptypes.string,
  name: Proptypes.string,
  description: Proptypes.string,
  price: Proptypes.string,
}

export default React.memo(ItemFood)