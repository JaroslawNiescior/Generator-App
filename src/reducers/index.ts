import { combineReducers } from 'redux';
import templatesReducer from './templatesReducer';

export const rootReducer = combineReducers({
  templates: templatesReducer,
});

export type RootState = ReturnType<typeof rootReducer>