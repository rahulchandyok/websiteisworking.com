import { combineReducers } from 'redux'
import homeReducer from '../views/home/reducer'
import dnsReducer from '../views/dns/reducer'
import commonReducer from './commonReducer'
import sslReducer from '../views/SSL/reducer'

export const reducers = combineReducers({
  common: commonReducer,
  home: homeReducer,
  dns: dnsReducer,
  ssl: sslReducer
})
