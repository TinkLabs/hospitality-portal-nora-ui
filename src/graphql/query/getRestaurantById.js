import i18n from '../i18n';
import meta from '../meta';

const query = `
query getRestaurantById($_id: String){
  restaurants(_id: $_id){
    ${meta}
    results{
      ... on CMS_Restaurant{
        _id
        name ${i18n}
        budget
        cover_image
        lat
        lng
        tel
        fax
        idd
        categories{
          ... on CMS_Category {
            _id
            name {
              ja_JP
            }
          }
        }
        areas{
          ... on CMS_Area {
            _id
            name{
              ja_JP
            }
          }
        }
        description ${i18n}
        url_website
        url_reservation
        url_coupon
        url_qrcode
        images
        info_opentime ${i18n}
        info_holiday ${i18n}
        info_party ${i18n}
        info_lunch ${i18n}
        info_cc ${i18n}
        info_e_money ${i18n}
        access_line ${i18n}
        access_station ${i18n}
        access_station_exit ${i18n}
        access_walk ${i18n}
        access_note ${i18n}
        access_parking ${i18n}
      }
    }
  }
}
`;

export default query;