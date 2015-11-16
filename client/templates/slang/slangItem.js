
Template.slangItem.helpers({
  isUpvoted: function() {
    var localPage = Router.current().route.getName();
    if (localPage == "searchPage") {
      var current = this.__originalId;
    } else {
      var current = this._id;
    }

    var upArr = Session.get("upvotes");

    if (upArr === undefined) {
      return false;

    } else if (upArr.indexOf(current) > -1) {
      return true;
    }
  },
  isDownvoted: function() {
    var localPage = Router.current().route.getName();
    if (localPage == "searchPage") {
      var current = this.__originalId;

    } else {
      var current = this._id;
    }

    var downArr = Session.get("downvotes");

    if (downArr === undefined) {
      return false;

    } else if (downArr.indexOf(current) > -1) {
      return true;
    }
  },
  isFavorited: function() {
    var localPage = Router.current().route.getName();
    if (localPage == "searchPage") {
      var current = this.__originalId;

    } else {
      var current = this._id;
    }

    if (Meteor.user()) {

      var favArr = Meteor.user().favorite;

      if (favArr.length != 0) {
        if (favArr.indexOf(current) > -1) {
          return true;
        }
      } else {
        return false;
      }

    } else {
      return false;
    }

  },
  shareData: function() {
    var current = this._id;
    var theurl = "http://www.sjomlaslangur.com/random/" + current.toString();
    var tweetLength = 44 + this.title.length;

    var lengthLeft = 140 - tweetLength -3;

    var tweetDef = this.description;

    if(tweetDef.length > lengthLeft) {
        tweetDef = tweetDef.substring(0,lengthLeft) + "...";
    }


    return {
      //title:"Sjomli, vissir þú að " + this.title + " þýðir " + tweetDef + " #sjomlaslangur",
      title: this.title + " - " + tweetDef + " #sjomlaslangur",
      //author: "sjomlaslangur",
      url: theurl
    }
  }
});
