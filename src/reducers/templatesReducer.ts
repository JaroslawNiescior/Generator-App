import {
  CREATE_TEMPLATE,
  FETCH_TEMPLATES,
  DELETE_TEMPLATE,
  UPDATE_TEMPLATE,
  FETCH_TEMPLATE,
} from '../actions/templates/types';
import { Template } from '../components/types/templates/types';

const templatesReducer = (
  state: Template[] = [],
  action: { type: string; payload: any },
): Template[] => {
  switch (action.type) {
    case CREATE_TEMPLATE:
      return [...state, action.payload];

    case UPDATE_TEMPLATE:
    case FETCH_TEMPLATE:
      return state.map((template) =>
        template._id === action.payload._id ? action.payload : template,
      );

    case FETCH_TEMPLATES:
      return action.payload;

    case DELETE_TEMPLATE:
      return state.filter((t) => t._id !== action.payload);

    default:
      return state;
  }
};

export default templatesReducer;
