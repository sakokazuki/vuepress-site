// require DataJa from './data-ja'
// import DataEn from './data-en'
// import DataCommon from './data-common'
const DataJa = require('./data-ja')
const DataEn = require('./data-en')
const DataCommon = require('./data-common')
module.exports = {
  '/': {
    lang: 'ja', // this will be set as the lang attribute on <html>
    title: 'Title JP',
    description: 'description jp',
    langData: DataJa,
    commonData: DataCommon,
  },
  '/en/': {
    lang: 'en',
    title: 'Title EN',
    description: 'description en',
    langData: DataEn,
  }
}