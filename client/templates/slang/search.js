
if (Meteor.isClient){


  Template.searchPage.events({
    'click .webmasterdelete': function(e) {
      e.preventDefault();


      if (confirm('Deleta þessum badboi?')) {
        var current = this.__originalId;
        Slang.remove(current);
        //Router.go('indexPage');
      };

    },
    'click .upvote': function(e) {
      e.preventDefault();

      if ($(e.target).hasClass('active')) {
        return;
      };

      // Get current slang object
      var slangId = this.__originalId;

      // date & time of upvote
      var upItem = {};
      var key = 'upvoteArr';
      upItem[key] = moment();

      // you can only upvote or downvote, not both..
      if ($(e.target).next().hasClass('active')) {

        $(e.target).next().removeClass('active');
        $(e.target).next().children().removeClass('active');
        $(e.target).addClass('active');
        $(e.target).children().addClass('active');



        Slang.update(slangId, { $inc: {downvotes: -1,upvotes: 1} });



      } else{

        Slang.update(slangId, {$inc: {upvotes: 1} /*, $push: upItem */});

        $(e.target).addClass('active');
      };


      if (Session.get("upvotes") === undefined) {

        var upvoteArr = [];
        upvoteArr.push(slangId);
        Session.setPersistent("upvotes", upvoteArr);




      } else {
        var upvoteArr = Session.get("upvotes");
        upvoteArr.push(slangId);
        Session.update("upvotes", upvoteArr);
      }

      if (Session.get("downvotes") !== undefined) {

        // fix so that you cant have both upvotes and downvotes
        var downvotesArr = Session.get("downvotes");
        var index = downvotesArr.indexOf(slangId);

        if (downvotesArr.indexOf(slangId) != -1) {
          downvotesArr.splice(index,1);
          Session.update("downvotes",downvotesArr);
        }
      }


    },
    'click .downvote': function(e) {
      e.preventDefault();

      if ($(e.target).hasClass('active')) {
        return;
      };

      // Get current slang object
      var slangId = this.__originalId;


      // you can only upvote or downvote, not both..
      if ($(e.target).prev().hasClass('active')) {

        $(e.target).prev().removeClass('active');
        $(e.target).prev().children().removeClass('active');
        $(e.target).addClass('active');
        $(e.target).children().addClass('active');
        Slang.update(slangId, {$inc: {upvotes: -1, downvotes:1} /*, $pop: { upvoteArr: 1 } */});
        //Slang.update(slangId, {$inc: {downvotes: 1}});
      } else{
        Slang.update(slangId, {$inc: {downvotes: 1}});
        $(e.target).addClass('active');
      };

      if (Session.get("downvotes") === undefined) {

        var downvoteArr = [];
        downvoteArr.push(slangId);
        Session.setPersistent("downvotes", downvoteArr);




      } else {
        var downvoteArr = Session.get("downvotes");
        downvoteArr.push(slangId);
        Session.update("downvotes", downvoteArr);
      }


      if (Session.get("upvotes") !== undefined) {

        // fix so that you cant have both upvotes and downvotes
        var upvotesArr = Session.get("upvotes");
        var index = upvotesArr.indexOf(slangId);

        if (upvotesArr.indexOf(slangId) != -1) {
          upvotesArr.splice(index,1);
          Session.update("upvotes",upvotesArr);
        }
      }
    },
    'click .upvoteIcon':function(e) {
      e.preventDefault();
      if ($(e.target).hasClass('active')) {
        return;
      };

      $(e.target).transition('bounce');

      // date & time of upvote
      var upItem = {};
      var key = 'upvoteArr';
      upItem[key] = moment().format('L');



      // Get current slang object
      var slangId = this.__originalId;


      // you can only upvote or downvote, not both..
      if ($(e.target).parent().next().hasClass('active')) {

        $(e.target).parent().next().removeClass('active');
        $(e.target).parent().next().children().removeClass('active');

        $(e.target).addClass('active');
        $(e.target).parent().addClass('active')
        Slang.update(slangId, { $inc: {downvotes: -1,upvotes: 1} });
      } else {
        Slang.update(slangId, {$inc: {upvotes: 1} });
        $(e.target).addClass('active');
        $(e.target).parent().addClass('active');
      };


      if (Session.get("upvotes") === undefined) {

        var upvoteArr = [];
        upvoteArr.push(slangId);
        Session.setPersistent("upvotes", upvoteArr);




      } else {
        var upvoteArr = Session.get("upvotes");
        upvoteArr.push(slangId);
        Session.update("upvotes", upvoteArr);
      }

      if (Session.get("downvotes") !== undefined) {

        // fix so that you cant have both upvotes and downvotes
        var downvotesArr = Session.get("downvotes");
        var index = downvotesArr.indexOf(slangId);

        if (downvotesArr.indexOf(slangId) != -1) {
          downvotesArr.splice(index,1);
          Session.update("downvotes",downvotesArr);
        }
      }

    },
    'click .downvoteIcon':function(e) {
      e.preventDefault();
      if ($(e.target).hasClass('active')) {
        return;
      };

      // date & time of upvote
      var upItem = {};
      var key = 'upvoteArr';
      upItem[key] = moment();

      $(e.target).transition('shake');
      // Get current slang object
      var slangId = this.__originalId;

      // you can only upvote or downvote, not both..
      if ($(e.target).parent().prev().hasClass('active')) {

        $(e.target).parent().prev().removeClass('active');
        $(e.target).parent().prev().children().removeClass('active');

        $(e.target).addClass('active');
        $(e.target).parent().addClass('active')
        //Slang.update(slangId, {$inc: {upvotes: -1}});
        //Slang.update(slangId, {$inc: {downvotes: 1}});
        Slang.update(slangId, {$inc: {upvotes: -1, downvotes:1} /*, $pop: { upvoteArr: 1 } */});
      } else{
        Slang.update(slangId, {$inc: {downvotes: 1}});
        $(e.target).addClass('active');
        $(e.target).parent().addClass('active');
      };

      if (Session.get("downvotes") === undefined) {

        var downvoteArr = [];
        downvoteArr.push(slangId);
        Session.setPersistent("downvotes", downvoteArr);




      } else {
        var downvoteArr = Session.get("downvotes");
        downvoteArr.push(slangId);
        Session.update("downvotes", downvoteArr);
      }


      if (Session.get("upvotes") !== undefined) {

        // fix so that you cant have both upvotes and downvotes
        var upvotesArr = Session.get("upvotes");
        var index = upvotesArr.indexOf(slangId);

        if (upvotesArr.indexOf(slangId) != -1) {
          upvotesArr.splice(index,1);
          Session.update("upvotes",upvotesArr);
        }
      }
    },
    'click .reportModal':function(e) {
      e.preventDefault();

      var currentSlangId = this.__originalId;
      $('.reportText').attr('name',currentSlangId);
      $('.small.modal').modal('show');

    }
  });


};
