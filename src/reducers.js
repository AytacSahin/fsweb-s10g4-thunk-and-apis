import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
  DELETE_ALL,
} from "./actions";

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {

    case FAV_ADD:
      const addFav_addLocal = {
        ...state,
        favs: state.favs.find(item => item.id === action.payload.id) ? state.favs : [...state.favs, action.payload]
      }
      writeFavsToLocalStorage(addFav_addLocal);
      return addFav_addLocal;

    case FAV_REMOVE:
      const delFav_delLocal = {
        ...state,
        favs: state.favs.filter(item => item.id !== action.payload)
      }
      writeFavsToLocalStorage(delFav_delLocal);
      return delFav_delLocal;

    case FETCH_LOADING:
      return {
        ...state,
        loading: true
      };

    case FETCH_SUCCESS:
      return {
        ...state,
        current: action.payload,
        loading: false
      }

    case FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
      }

    case GET_FAVS_FROM_LS:
      return {
        ...state,
        favs: readFavsFromLocalStorage() ?? initial.favs,
      }

    case DELETE_ALL:
      localStorage.clear();
      return {
        ...state,
        favs: initial.favs,
      }

    default:
      return state;
  }
}
