const query = `
query getAllRestaurants($_id: String, $keyword: String, $offset: Int){
  restaurants(_id: $_id, name: $keyword, offset: $offset, limit: 10){
    _id
    name
    budget
    lat
    lng
    tel
    fax
    idd
    cover_image
    description
    url_website
    url_reservation
    url_coupon
    url_qrcode
    info_opentime
    info_holiday
    info_party
    info_lunch
    info_cc
    info_e_money
    access_line
    access_station
    access_station_exit
    access_walk
    access_note
    access_parking
  }
}
`;

export default query;