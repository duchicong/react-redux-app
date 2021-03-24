import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import validate from 'validate.js'
import cookie from 'js-cookie'
import {
  TextField,
  Button,
  Grid
} from '@material-ui/core'
import {
  makeStyles, withStyles
} from '@material-ui/core/styles'
import NumberFormat from '../../components/NumberFormat'
import axios from '../../utils/API'
import constraints from './constraints'
import { addFood } from '../../actions/foods'

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
  const typingRef = useRef(null)
  const dispatch = useDispatch()
  const { translation } = useSelector(state => state.setting)
  const [formState, setFormState] = useState({
    values: null,
    errors: {},
    valid: false,
    tourch: {}
  })

  const handleChange = React.useCallback((e) => {
    if (typingRef.current) clearTimeout(typingRef.current)
    typingRef.current = setTimeout(() => setFormState(prev => ({
      ...prev,
      values: {
        ...prev.values,
        [e.target.name]: e.target.value.trim()
      },
      tourch: {
        ...prev.tourch,
        [e.target.name]: true
      }
    })), 300)
  }, [])

  const createFoodHandler = () => {
    axios({
      method: 'post',
      url: `/foods.json?auth=${cookie.get('token')}`,
      data: formState.values
    })
      .then(() => dispatch(addFood(formState.values)))
      .catch(err => console.log(err.response))
      .finally(() => {
        setFormState(prev => ({
          ...prev,
          tourch: {},
          values: null,
          valid: false
        }))
        document.getElementById('name').value = ""
        document.getElementById('description').value = ""
        document.getElementById('price').value = ""
      })
  }

  const hasError = (fieldName) => !!(formState.errors[fieldName] && formState.tourch[fieldName])

  const hasHelperText = (fieldName) => {
    return hasError(fieldName) ? formState.errors[fieldName] : ''
  }

  useEffect(() => {
    const errors = validate(formState.values, constraints(translation.validate))

    setFormState(prev => ({
      ...prev,
      errors: errors || {},
      valid: !errors
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.values])

  return (
    <div className="Create-form">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <MuiTextField
            placeholder={translation.placeholders.name}
            ref={typingRef}
            onChange={handleChange}
            name="name"
            variant="outlined"
            id="name"
            error={hasError('name')}
            helperText={hasHelperText('name')}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <MuiTextField
            placeholder={translation.placeholders.price}
            ref={typingRef}
            onChange={handleChange}
            name="price"
            variant="outlined"
            id="price"
            InputProps={{
              inputComponent: NumberFormat,
            }}
            error={hasError('price')}
            helperText={hasHelperText('price')}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <MuiTextField
            placeholder={translation.placeholders.description}
            ref={typingRef}
            onChange={handleChange}
            name="description"
            id="description"
            variant="outlined"
            rows={2}
            error={hasError('description')}
            helperText={hasHelperText('description')}
            multiline
            required
            fullWidth
          />
        </Grid>
      </Grid>
      
      <Button
        className={classes.MuiButton}
        variant="contained"
        color="secondary"
        onClick={createFoodHandler}
        disabled={!formState.valid}
      >{translation.buttons.submit}</Button>
    </div>
  )
}

export default Create