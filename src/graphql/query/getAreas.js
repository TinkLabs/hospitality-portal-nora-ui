import i18n from '../i18n';
import meta from '../meta';

const query = `
query {
  areas{
    ${meta}
    results{
      ... on CMS_Area{
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