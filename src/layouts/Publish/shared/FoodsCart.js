import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Typography
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'
import { removeCardItem } from '../../../actions/cards'

const withStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    right: 0,
    width: '100%',
    height: 'auto',
    minWidth: 380,
    maxWidth: 500,
    display: 'table',
    borderRadius: 2
  },
  MuiTypography: {
    margin: 15
  },
  MuiPayment: {
    margin: 16
  }
}))

const FoodsCart = (props) => {
  const { open, onClose, ...rest } = props
  const classes = withStyles()
  const dispatch = useDispatch()
  const { setting, cardStore } = useSelector(state => state)
  const { translation } = setting

  if (!open) return null
  return (
    <Box
      className={clsx("Menu-setting", classes.root)}
      bgcolor={setting.theme.bgColor}
      color={setting.theme.color}
      onBlur={onClose}
      id="box-test"
      component={Paper}
      {...rest}
    >
      {cardStore.cards.length !== 0 ? (
        <TableContainer>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>{translation.card.label.name}</TableCell>
                <TableCell align="right">{translation.card.label.price}</TableCell>
                <TableCell align="right">{translation.card.label.quantily}</TableCell>
                <TableCell align="right">{translation.card.label.total}</TableCell>
                <TableCell align="right">{translation.card.label.delete}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cardStore.cards.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="center">{row.count}</TableCell>
                  <TableCell align="right">{parseInt(row.price, 10) * row.count}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => dispatch(removeCardItem(row.id))}><DeleteIcon color="error"/></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : <Typography className={classes.MuiTypography}>{translation.card.empty}</Typography>}
      
      <Divider />
      {cardStore.cards.length !== 0 && (<Button
        variant="contained"
        color="primary"
        className={classes.MuiPayment}
      >
        {translation.card.payment}
      </Button>)}
    </Box>
  )
}

FoodsCart.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
}

export default FoodsCart
