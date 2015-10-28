if (Meteor.isClient) {

  Template.layoutTemplate.onRendered(function() {
    $('.ui.dropdown').dropdown();
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
  });






  /* Template.layoutTemplate.helpers({
    index: function () {
      return SlangIndex;
    },
    renderTmpl: () => Template.searchPage
  }); */


   Template.layoutTemplate.helpers({
    slangIndex: () => SlangIndex,
    renderTmpl: () => Template.searchPage
  }); 
};