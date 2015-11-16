
if (Meteor.isClient) {

  ShareIt.init({
    siteOrder: [/*'facebook', */ 'twitter'],
    sites: {
      /*'facebook': {
        'appId': '1649106538704235',
        'version': 'v2.3'
      }, */
      'twitter': {}
    },
    iconOnly: true,
    applyColors: true
  });



  ShareIt.configure({
    classes: "ui circular twitter icon basic teal button" // string (default: 'large btn')
  });



}
