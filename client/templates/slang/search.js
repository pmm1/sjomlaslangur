
if (Meteor.isClient){

  Template.searchPage.rendered = function() {
      // init modal
      $('.small.modal').modal();

      //init dropdown
      $('.ui.dropdown').dropdown();

      // init report slang event listener
      $('.sendReport').on('click',mailMan);
      
  }


 /* Template.searchPage.helpers({
    index: function () {
      return SlangIndex;
    },
    renderTmpl: () => Template.searchPage
  });
 */



  // On Client
  Template.searchPage.helpers({
    slangIndex: () => SlangIndex,
    renderTmpl: () => Template.searchPage
  });
};