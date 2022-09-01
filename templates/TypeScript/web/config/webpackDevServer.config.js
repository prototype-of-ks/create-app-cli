const paths = require('./paths');

module.exports = function() {
  return {
    allowedHost: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    },
    compress: true,
    static: {
      direactory: paths.appPublic,
    },
    client: {
      overlay: {
        errors: true,
        warning: false,
      }
    },
    host: 'localhost',
    port: 8081,
  };
}