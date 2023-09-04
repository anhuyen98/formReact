import { combineReducers } from 'redux'
import { formReducer } from './form/slice'

export const rootReducer = combineReducers({
    form: formReducer
})