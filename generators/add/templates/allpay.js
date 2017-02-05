'use strict';

import process from 'process';
import url from 'url';
import uuid from 'uuid';
import fetch from 'node-fetch';
import moment from 'moment';

const ENV = process.env.NODE_ENV === 'production';
const config = {
  server: ENV ? 'https://payment.allpay.com.tw' : 'https://payment-stage.allpay.com.tw',
  hashKey: ENV ? process.env.ALLPAY_HASHKEY : '5294y06JbISpM5x9',
  hashIv: ENV ? process.env.ALLPAY_HASHIV : 'v77hoKGq4kWxNNIS',
  MerchantID: ENV ? process.env.ALLPAY_MERCHANTID : '2000132',
  ReturnURL: '',
  ChoosePayment: 'ALL'
};

export const getPaymentInfo = (payment, callback) => {
  const data = {
    MerchantID: config.MerchantID,
    MerchantTradeNo: uuid.v4().replace(/-/g, '').slice(0, 20),
    MerchantTradeDate: moment().format('YYYY/MM/DD HH:mm:ss'),
    PaymentType: 'aio',
    ReturnURL: config.ReturnURL,
    ChoosePayment: config.ChoosePayment
  };

  fetch(url.resolve(config.server, '/AioHelper/GenCheckMacValue/'), {
    method: 'POST',
    body: JSON.stringify(Object.assign({}, data, payment)),
    headers: {'Content-Type': 'application/json'},
  }).then(res => res.text())
    .then(text => {
      callback(Object.assign({
        MerchantTradeNo: data.MerchantTradeNo,
        MerchantTradeDate: data.MerchantTradeDate,
        CheckMacValue: text
      }, payment))
    })
    .catch(e => callback(null, e));
};
