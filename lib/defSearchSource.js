/* if (Meteor.isServer) {

  SearchSource.defineSource('slanging', function(searchText, options) {
    var options = {sort: {isoScore: -1}, limit: 20};
    
    if(searchText) {
      var regExp = buildRegExp(searchText);
      var selector = {$or: [
        {title: regExp}
        ]};
      
      return Slang.find(selector, options).fetch();
    } else {
      return Slang.find({}, options).fetch();
    }
  });

  function buildRegExp(searchText) {
    // this is a dumb implementation
    var parts = searchText.trim().split(/[ \-\:]+/);
    return new RegExp("(" + parts.join('|') + ")", "ig");
  }


}; */