module.exports = {

  apiEndpoint: 'https://elisite.prismic.io/api/v2',

  // -- Access token if the Master is not open
  // accessToken: 'xxxxxx',

  // OAuth
  // clientId: 'xxxxxx',
  // clientSecret: 'xxxxxx',

  // -- Links resolution rules
  // This function will be used to generate links to Prismic.io documents
  // As your project grows, you should update this function according to your routes
  linkResolver: function(doc, ctx) {
    if (doc.type == 'page') {
        return '/' + doc.uid;
    }
    if (doc.type == 'action') {
        return '/' + doc.uid;
    }
    if (doc.type == 'thoughts') {
        return '/' + doc.uid;
    }
    if (doc.type == 'temp-home') {
        return '/' + doc.uid;
    }
    if (doc.type == 'info') {
        return '/' + doc.uid;
    }
    if (doc.type == 'slides') {
        return '/' + doc.uid;
    }
    if (doc.type == 'soon') {
        return '/coming-soon';
    }
    // return '/';
  }
};
