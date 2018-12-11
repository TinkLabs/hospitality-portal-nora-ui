const query = `
query getRestaurantById($_id: String){
  restaurants(_id: $_id){
    _id
    name
    budget
    cover_image
    lat
    lng
    tel
    fax
    idd
    categories {
      _id
    }
    areas{
      _id
    }
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