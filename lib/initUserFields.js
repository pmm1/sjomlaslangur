if (Meteor.isClient) {

  Meteor.subscribe('currentUser');

  $('.ui.dropdown').dropdown();

  Template.slangItem.events({
    'click .favoriteMe': function (e) {
      e.preventDefault();



      if (!Meteor.userId()) {
        throwError('Þú verður að vera innskráður Sjomli til þess að geta bætt við uppáhaldsSlangri.');

        $('.close').click(function(e) {
          /* Act on the event */
          e.preventDefault();
          $(e.target).parent().parent().parent().remove();

        });
        return;
      };

      $(e.target).addClass(' inverted orange');
      $(e.target).transition('tada');

      var userId = Meteor.userId();

      if (Router.current().route.getName() == "searchPage") {
        var currentSlangId = this.__originalId;
      } else {
      var currentSlangId = this._id;
      }


      var fav = {};
      var key = 'favorite';
      fav[key] = currentSlangId;

      Meteor.call('addToFavorites', userId, {$addToSet: fav});
    },
    'click .close': function(e) {
      e.preventDefault();

      $(e.target).parent().parent().parent().remove();
      //console.log("closed");
    }
  });

}



if (Meteor.isServer) {

    // error tvi ad eg publishadi 'users' sem er fratekid af meteor..
    // breyta nafni a publish i currentUser..
    Meteor.publish('currentUser', function() {
      var user = Meteor.users.find({_id: this.userId});
    return user;
  });


/*
    Accounts.onCreateUser(function(options, user) {
        if (user.profile == undefined) user.profile = {};
        _.extend(user.profile, { favorite : [] });
    });

 */


  Accounts.onCreateUser(function(options, user) {
    user.favorite = [];
    check(user.favorite, Array);
    // user.upvoted = [];
    // user.downvoted = [];
    if (options.profile) {
      user.profile = options.profile;
    }
    return user;
  });



  Meteor.methods({
    addToFavorites: function (userId, favorite) {
      check(userId, String);
      check(favorite, Object);
      Meteor.users.update(userId, favorite);
    }
  });
}
