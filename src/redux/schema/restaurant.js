import { Record, List, Map } from 'immutable'

import i18n from './i18n';

const RestaurantRecord = Record({
  _id: "",
  name: i18n,
  budget: 0,
  staff_like_count: 0,
  cover_image: "",
  images: List(),
  categories: List(),
  areas: List(),
  lat: 0,
  lng: 0,
  tel: "",
  fax: "",
  idd: "",
  address: "",
  description: i18n,
  url_website: "",
  url_reservation: "",
  url_coupon: "",
  url_qrcode: "",
  info_opentime: i18n,
  info_holiday: i18n,
  info_party: i18n,
  info_lunch: i18n,
  info_cc: i18n,
  info_e_money: i18n,
  access_line: i18n,
  access_station: i18n,
  access_station_exit: i18n,
  access_walk: i18n,
  access_note: i18n,
  access_parking: i18n,
});

export default RestaurantRecord;