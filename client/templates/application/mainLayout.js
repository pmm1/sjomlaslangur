if (Meteor.isClient) {


  Template.layoutTemplate.onRendered(function() {

    this.find('#main')._uihooks = {
      insertElement: function(node, next) {
        $(node)
          .hide()
          .insertBefore(next)
          .fadeIn();
      },
      removeElement: function(node) {
        $(node).fadeOut(function() {
          $(this).remove();
        });
      }
    }

    init();




    function init() {
      $('.ui.dropdown').dropdown();

      // init modal
      $('.small.modal').modal();

      $('.genRandom').click(function(e) {
        /* Act on the event */
         e.preventDefault();

        $('.sendReport').on('click',mailMan);



         Meteor.call('randomPost', function (error, result) {
              if (error) {
                console.log(error);
              } else {
                Router.go('randomPage', {_id: result});
              }
            });
      });


      $(".searchInput").keyup(function (e) {
          if (e.keyCode == 13) {
              // Do something

              var searchVal = "/search/" + $(e.target).val().toString();
              //console.log(searchVal);
              Router.go(searchVal);
              $('[name=searchString]').val('');
          }
      });


    }


});




};
