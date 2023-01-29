import { getIngredients } from '../../../utils/api-requests';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export function fetchIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    getIngredients()
      .then(data => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
}

// export const getIngredientsRequest = () => ({
//   type: GET_INGREDIENTS_REQUEST,
// });

// export const getIngredientsSuccess = ingredients => ({
//   type: GET_INGREDIENTS_SUCCESS,
//   payload: ingredients,
// });

// export const getIngredientsFailed = () => ({
//   type: GET_INGREDIENTS_FAILED,
// });

// export const fetchIngredients = () => {
//   return async dispatch => {
//     dispatch(getIngredientsRequest());
//     try {
//       const data = await getIngredients();
//       dispatch(getIngredientsSuccess(data));
//     } catch (error) {
//       dispatch(getIngredientsFailed());
//     }
//   };
// };
