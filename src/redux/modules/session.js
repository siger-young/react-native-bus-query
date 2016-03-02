import { createAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
// Action types;
export const INITIAL_OVER = 'app/splash/initial_over';
export const INCREMENT = 'app/splash/increment';
export const UPDATE_TIME = 'app/splash/update_time';
export const CHANGE_READY = 'app/splash/update_time';

// Initial state
const initialState = {

};

// reducer
const reducer = handleActions({
	[INCREMENT]: (state = 0, action) => {
		console.log(state);
		console.log(action);
		return {
			...state,
			...action.payload
		};
	},
}, initialState);
export default reducer;

// action creators:
export const initialOver = createAction(INITIAL_OVER);
export const incrementAction = createAction(INCREMENT);
export const changeReadyAction = createAction(INCREMENT);
export const updateTimeAction = createAction(UPDATE_TIME);

// async action creators: create async function as redux-thunk.
// export function init() {
//   return async (dispatch) => {
//     const info = await fetch('/users/me');
//     dispatch(initialOver(info));
//   };
// }

// export function increment() {
// 	return {
// 		type: INCREMENT,
// 	}
// }
