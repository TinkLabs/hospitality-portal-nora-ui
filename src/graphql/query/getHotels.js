import i18n from '../i18n';
import meta from '../meta';

const query = `
query getHotels($_id: Int, $offset: Int, $limit: Int){
  hotels(_id: $_id, offset: $offset, limit: $limit){
    ${meta}
    results{
      _id
      name
      vote_token
      lat
      lng
    }
  }
}
`;

export default query;