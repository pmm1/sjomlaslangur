
if (Meteor.isClient){

  Template.searchPage.helpers({
    noResults: function(){

      if (this.searchItem != undefined) {
        Session.set("searchResultsNumber", this.searchItem.length);
      }

      if (Session.get("searchResultsNumber") == 0) {
        return true;
      } else {
        return false;
      }


    },
    searchObj: function() {

        // super hacky way of getting the searchString from the url...
        var url = Router.current().url;
        var strArr = url.split("/");
        var str = strArr[strArr.length - 1];
        var obj = [{searchString: str}];
        //console.log(obj);
        return obj;
    }
  });




};
