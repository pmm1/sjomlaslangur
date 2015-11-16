if (Meteor.isClient) {

  Meteor.subscribe('users');

  $('.ui.dropdown').dropdown();

  Template.indexPage.events({
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
      var currentSlangId = this._id;
      var fav = {};
      var key = 'favorite';
      fav[key] = currentSlangId;

      Meteor.call('addToFavorites', userId, {$addToSet: fav});
    },
    'click .close': function(e) {
      e.preventDefault();

      $(e.target).parent().parent().parent().remove();
      console.log("closed");
    }
  });

  Template.randomPage.events({
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
      var currentSlangId = this._id;
      var fav = {};
      var key = 'favorite';
      fav[key] = currentSlangId;

      Meteor.call('addToFavorites', userId, {$addToSet: fav});
    },
    'click .close': function(e) {
      e.preventDefault();

      $(e.target).parent().parent().parent().remove();
    }
  });


  Template.searchPage.events({
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
      var currentSlangId = this.__originalId;
      var fav = {};
      var key = 'favorite';
      fav[key] = currentSlangId;

      Meteor.call('addToFavorites', userId, {$addToSet: fav});
    },
    'click .close': function(e) {
      e.preventDefault();

      $(e.target).parent().parent().parent().remove();
    }
  });

}



if (Meteor.isServer) {

  Meteor.publish('users', function() {
        return Meteor.users.find();
    });

  Accounts.onCreateUser(function(options, user) {
    user.favorite = [];
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
