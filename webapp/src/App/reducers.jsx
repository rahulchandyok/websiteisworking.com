import { combineReducers } from 'redux';
import homeReducer from '../views/home/reducer';
import dnsReducer from '../views/dns/reducer';
import commonReducer from './commonReducer';

export const reducers = combineReducers({
  common: commonReducer,
  home: homeReducer,
  dns: dnsReducer
});
