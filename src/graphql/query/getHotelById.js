const query = `
query getHotelById($id: Int){
  hotels (_id: $id){
    _id
    name
    lat
    lng
  }
}
`;

export default query;