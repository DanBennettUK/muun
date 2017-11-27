import NodeTwitterApi from 'node-twitter-api'
import appIsDev from 'electron-is-dev'

import config from '../../main/lib/config'
import devCredentials from '../../resources/credentials.json'
import prodCredentials from '../../renderer/store/modules/credentials'

var credentials = {}

if (!appIsDev) {
  credentials.consumerPublic = prodCredentials.state.credentials.accessPublic
  credentials.consumerSecret = prodCredentials.state.credentials.accessSecret
  credentials.callbackURL = prodCredentials.state.credentials.callbackURL
} else {
  credentials.consumerPublic = devCredentials.credentials.accessPublic
  credentials.consumerSecret = devCredentials.credentials.accessSecret
  credentials.callbackURL = devCredentials.credentials.callbackURL
}

const Twitter = new NodeTwitterApi({
  consumerKey: credentials.consumerPublic,
  consumerSecret: credentials.consumerSecret,
  callback: credentials.callbackURL
})

Twitter.getRequestToken(function (error, requestToken, requestTokenSecret, results) {
  if (error) {
    console.log('Error getting OAuth request token: ' + error)
  } else {
    config.set('credentials.accessPublic', requestToken)
    config.set('credentials.accessSecret', requestTokenSecret)
  }
})

export default Twitter
