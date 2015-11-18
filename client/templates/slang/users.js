if (Meteor.isClient) {

	Template.userPage.helpers({
    userSlang: function() {
      return Slang.find().fetch();
    },
		noDefinitions: function() {
      var arr = Slang.find().fetch();
      //console.log(arr);
      //console.log(arr);
      if (arr.length == 0 ) {
        return true;
      } else {
        return false;
      }
    },
    userObj: function() {

      // super hacky way of getting the user name from the url...
      var url = Router.current().url;
      var strArr = url.split("/");
      var usern = strArr[strArr.length - 1];
      var obj = [{owner: usern}];
      //console.log(obj);
      return obj;
    }

	});


}
