import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { role } from './role.reducer';
import { permissions } from './permissions.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  role,
  permissions
});

export default rootReducer;