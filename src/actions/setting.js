import {
  LANGUAGE_APP,
  MODE_APP
} from './actionTypes'
import {
  DARK_THEME,
  LIGHT_THEME
} from '../constant'

export const toggleMode = (isMode) => {
  // Mode default is light theme!
  let theme = LIGHT_THEME
  if (!isMode) theme = DARK_THEME
  return {
    type: MODE_APP,
    payload: {
      isLight: isMode,
      theme
    }
  }
}

export const handleChangeLanguage = (language) => {
  return {
    type: LANGUAGE_APP,
    payload: { language }
  }
}