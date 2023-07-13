const axios = require('axios');
const moment = require('moment');

const fecha_actual = moment().format('YYYY-MM-DD');

const url = `https://eightroom.voonix.net/api/?report=advertiserearnings&list&key=c2fb5fb9293a5ebe1c83ae8d53b1ca5773456fd9&start=${fecha_actual}&end=${fecha_actual}`;

axios.get(url)
  .then(response => {
    if (response.status === 200) {
      const data = response.data;
      const json_result = JSON.stringify(data);
    } else {
      console.log('La solicitud no tuvo éxito. Código de estado:', response.status);
    }
  })
  .catch(error => {
    console.log('Error:', error);
  });

function modify_json(json_data) {
  const data = JSON.parse(json_data);
  const modified_data = [];
  for (const month in data.data) {
    const month_data = data.data[month];
    for (const advertiser_id in month_data) {
      const advertiser_data = month_data[advertiser_id];
      for (const login_id in advertiser_data) {
        const login_data = advertiser_data[login_id];
        for (const campaign_id in login_data) {
          const campaign_data = login_data[campaign_id];
          for (const date in campaign_data) {
            const date_data = campaign_data[date];
            const item = {
              month: month,
              advertiser_id: advertiser_id,
              login_id: login_id,
              campaign_id: campaign_id,
              date: date,
              data: date_data
            };
            modified_data.push(item);
          }
        }
      }
    }
  }
  return modified_data;
}

const json_result_ok = modify_json(json_result);
