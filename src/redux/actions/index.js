import graphql from '../../graphql/client';
import getRestaurantById from '../../graphql/query/getRestaurantById';
import getCategories from '../../graphql/query/getCategories';
import getAreas from '../../graphql/query/getAreas';
import getAllRestaurants from '../../graphql/query/getAllRestaurants';
import getSyncStatus from '../../graphql/query/getSyncStatus';
import getRestaurantsByLatLng from '../../graphql/query/getRestaurantsByLatLng';
import getHotelById from '../../graphql/query/getHotelById';
import updateRestaurant from '../../graphql/mutation/upsertRestaurant';
import updateComment from '../../graphql/mutation/upsertComment';

export const fetchRestaurant = (id) => {
  return {
    type: "FETCH_RESTAURANT",
    payload: graphql.request(getRestaurantById, {_id: id})
  }
}

export const fetchCategories = (offset, limit) => {
  return {
    type: "FETCH_CATEGORIES",
    payload: graphql.request(getCategories, {offset: offset, limit: limit})
  }
}

export const fetchAreas = () => {
  return {
    type: "FETCH_AREAS",
    payload: graphql.request(getAreas)
  }
}

export const fetchAllRestaurants = (id, keyword, offset) => {
  return {
    type: "FETCH_ALL_RESTAURANTS",
    payload: graphql.request(getAllRestaurants, {_id: id, keyword: keyword, offset: offset})
  };
}

export const fetchSyncStatus = (offset, limit) => {
  return {
    type: "FETCH_SYNC_STATUS",
    payload: graphql.request(getSyncStatus, {offset: offset, limit: limit})
  }
}

export const toggleMenu = (show) => {
  return {
    type: "TOGGLE_MENU",
    payload: {
      show
    }
  }
}

export const fetchRestaurantsByLatLng = (lat, lng) => {
  return {
    type: "FETCH_RESTAURANT_BY_LATLNG",
    payload: graphql.request(getRestaurantsByLatLng, {lat: lat, lng: lng})
  }
}

export const fetchHotelById = (id) => {
  return {
    type: "FETCH_HOTEL_BY_ID",
    payload: graphql.request(getHotelById, { id }),
  }
}

export const upsertRestaurant = (restaurant) => {
  return {
    type: "UPSERT_RESTAURANT",
    payload: graphql.request(updateRestaurant, {restaurant})
  }
}

export const upsertComment = (comment) => {
  return {
    type: "UPSERT_COMMENT",
    payload: graphql.request(updateComment, {comment})
  }
}

export const pushNotification = (notification) => {
  return {
    type: "PUSH_NOTIFICATION",
    payload: {
      content: notification,
    }
  }
}

export const popNotification = () => {
  return {
    type: "POP_NOTIFICATION",
  }
}

export const initCommentForm = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchHotelById(id)).then(() => {
      let lat = getState().hotel.get('map_currentHotel').get('lat');
      let lng = getState().hotel.get('map_currentHotel').get('lng');
      dispatch(fetchRestaurantsByLatLng(lat, lng));
    })
  }
}