import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  TextField,
  Button,
  Grid
} from '@material-ui/core'
import {
  makeStyles, withStyles
} from '@material-ui/core/styles'
import NumberFormat from '../../components/NumberFormat'

const MuiTextField = withStyles({
  root: {
    '& input.MuiOutlinedInput-input': {
      padding: '8.5px 14px'
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 12px) scale(1)'
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)'
    },
    '& .MuiFormLabel-root': {
      fontSize: '0.8rem'
    },
    '& .MuiOutlinedInput-multiline': {
      padding: '8.5px 14px'
    },
    '& .Mui-required > span': {
      color: 'red'
    }
  }
})(TextField)

const useStyles = makeStyles((theme) => ({
  MuiButton: {
    marginTop: theme.spacing(2)
  }
}))

const Create = () => {
  const classes = useStyles()
  const { translation } = useSelector(state => state.setting)
  const [formState, setFormState] = useState({
    values: null,
    errors: {},
    valid: true,
    tourch: {}
  })

  const handleChange = React.useCallback((e) => {
    e.persist()
    setFormState(prev => ({
      ...prev,
      values: {
        ...prev.values,
        [e.target.name]: e.target.value.trim()
      },
      tourch: {
        ...prev.tourch,
        [e.target.name]: true
      }
    }))
  }, [])
  console.log(formState)
  return (
    <div className="Create-form">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <MuiTextField
            label={translation.fields.name}
            onChange={handleChange}
            name="name"
            variant="outlined"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <MuiTextField
            label={translation.fields.price}
            onChange={handleChange}
            name="price"
            variant="outlined"
            InputProps={{
              inputComponent: NumberFormat,
            }}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <MuiTextField
            label={translation.fields.description}
            onChange={handleChange}
            name="description"
            variant="outlined"
            rows={2}
            multiline
            required
            fullWidth
          />
        </Grid>
      </Grid>
      
      <Button className={classes.MuiButton} variant="contained" color="secondary">{translation.buttons.submit}</Button>
    </div>
  )
}

export default Create