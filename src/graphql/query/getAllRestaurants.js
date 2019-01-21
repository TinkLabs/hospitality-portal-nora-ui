import i18n from '../i18n';
import meta from '../meta';

const query = `
query getAllRestaurants($_id: String, $keyword: String, $offset: Int){
  restaurants(_id: $_id, name: $keyword, offset: $offset, limit: 10){
    ${meta}
    results {
      ... on CMS_Restaurant{
        _id
        name ${i18n}
        budget
        lat
        lng
        tel
        fax
        idd
        cover_image
        images
        description ${i18n}
        url_website
        url_reservation
        url_coupon
        url_qrcode
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