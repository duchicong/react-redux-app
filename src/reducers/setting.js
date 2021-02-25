import {
  LANGUAGE_APP,
  MODE_APP
} from '../actions/actionTypes'
import {
  LIGHT_THEME
} from '../constant'
import * as translation from '../i18n'

const initalState = {
  isLight: true,
  language: 'en',
  theme: LIGHT_THEME,
  translation: translation.en
}

const settingReducer = (state = initalState, action) => {
  switch (action.type) {
    case MODE_APP:
      return {
        ...state,
        ...action.payload
      }
    case LANGUAGE_APP:
      if (action.payload.language === 'en') state.translation = translation.en
        else state.translation = translation.vi
      return {
        ...state,
        ...action.payload
      }
    default:
      return initalState;
  }
}
export default settingReducer