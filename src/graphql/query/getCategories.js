import i18n from '../i18n';
import meta from '../meta';

const query = `
query getCategories($offset: Int, $limit: Int){
  categories(offset: $offset, limit: $limit){
    ${meta}
    results{
      ... on CMS_Category{
        _id
        name ${i18n}
        gnavi_code
        gnavi_attribute
      }
    }
  }
}
`;

export default query;