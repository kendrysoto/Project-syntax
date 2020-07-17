import * as types from './action-types';

const initialState = {
  loading: false,
  Em: [],
  EmId: '',
  error: '',
  params: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_EMPLOYEES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case types.FETCH_EMPLOYEES_SUCCESS:
      return {
        loading: false,
        Em: action.payload.dataE,
        EmId: action.payload.dataId,
        params: action.payload.params,
        error: ''
      }
      case types.FETCH_EMPLOYEESID_SUCCESS:
      return {
        loading: false,
        EmId: action.payload.dataId,
        error: ''
      }
    case types.FETCH_EMPLOYEES_FAILURE:
      return {
        loading: false,
        Em: [],
        EmId: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;