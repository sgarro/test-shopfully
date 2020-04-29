import React, { useReducer, createContext } from "react";
import { STACK_FLYERS, FETCHING_FLYERS, FETCHING_FLYERS_ERROR, ADD_FAVOURITES, REMOVE_FAVOURITES, ADVANCE_PAGE } from "./action_types";

// cookies fallback
const lsSupport = (localStorage)? true: false
const manageStorage = (value, isGet) => {
  if(lsSupport){
    if(isGet){
      return JSON.parse(localStorage.getItem('favourites'))
    }
    else{
      localStorage.setItem("favourites", value);

    }
  }
  else{
    if(isGet){
      return (document.cookie)? document.cookie : null
    }
    else{
      document.cookie=value
    }
  }
}

// flyers reducers
const flyersReducer = (state, action) => {
  switch (action.type) {
    case STACK_FLYERS:
      // mapping only ids for simpler checking
      const favouritesMapped = state.favourites.map(favourites => favourites.id)
      const newFlyers = action.flyers.map(flyer => {
        flyer.isFavourite = (favouritesMapped.includes(flyer.id)) ? true : false
        return flyer
      })
      return { ...state, flyers: state.flyers.concat(newFlyers) }

    case FETCHING_FLYERS:
      return { ...state, fetching: action.fetching }

    case FETCHING_FLYERS_ERROR:
      return { ...state, fetching: action.fetching, error: true }

    case ADD_FAVOURITES:
      const favourites = state.favourites.slice()
      favourites.push({id: action.id, title: action.title})
      manageStorage(JSON.stringify(favourites), false)
      const flyer = state.flyers.findIndex((flyer => flyer.id === action.id));
      state.flyers[flyer].isFavourite = true
      return { ...state, favourites}

    case REMOVE_FAVOURITES:
      let filteredFavourites = state.favourites.slice().filter(favourite => favourite.id !== action.id)
      manageStorage(JSON.stringify(filteredFavourites), false)
      const removedFlyer = state.flyers.findIndex((flyer => flyer.id === action.id));
      state.flyers[removedFlyer].isFavourite = false
      return { ...state, favourites: filteredFavourites}
      
    default:
      return state;
  }
}
// reducer for incrementing pages
const pageReducer = (state, action) => {
  switch (action.type) {
    case ADVANCE_PAGE:
      return { ...state, page: state.page + 1 }
    default:
      return state;
  }
}

const initialState = {
  fylers: {
    error: false,
    fetching: false,
    flyers: [],
    favourites: []
  }, 
  pager:{
    page: 1,
    limit: 30
  },
};
const Store = createContext(initialState);
const { Provider } = Store;

const StoreProvider = ( { children } ) => {
  const [pager, pagerDispatch ] = useReducer(pageReducer, { page: 1, limit: 30 })
  let localFavourites = manageStorage(null, true)
  const favourites = (localFavourites && localFavourites.length > 0)? localFavourites : []
  const [flyers, flyersDispatch] = useReducer(flyersReducer,{ flyers:[], fetching: false, favourites})
  
  const state = {
    pager,
    flyers,
  }
  const dispatch = {
    pagerDispatch,
    flyersDispatch,
  }

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { Store, StoreProvider}