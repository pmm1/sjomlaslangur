if (Meteor.isClient) {

  Template.slangSubmit.rendered = function() {
  	$('.ui.form').form({
      fields: {
        title: {
          identifier: 'title',
          rules: [
            {
              type   : 'empty',
              prompt : 'Ég er alveg að fara að Schnappa á þig sjomli! Ekki gleyma að skrifa titil slangrsins!'
            }
          ]
        },
        description: {
          identifier: 'description',
          rules: [
            {
              type   : 'empty',
              prompt : 'Nei nú slæ ég þig þvert og yfir moldarbeðið! Þú verður að skilgreina slangrið til þess að geta haldið áfram, Sjomli!'
            }
          ]
        },      
        example: {
          identifier: 'example',
          rules: [
            {
              type   : 'empty',
              prompt : 'Nei haltu í hestana þína Sjomli! Þú verður að gefa dæmi um hvernig slangrið er notað í daglegu tali! :O :D'
            }
          ]
        }
      }
    });
  }




  Template.slangSubmit.helpers({
  	errorMessage: function(field) {
  		return Session.get('slangSubmitErrors')[field];
  	},
  	errorClass: function(field) {
  		return !!Session.get('slangSubmitErrors')[field] ? 'has-error': '';
  	}
  });


  Template.slangSubmit.events({
  	'submit form': function(e) {
  		e.preventDefault();


  		var slang = {
  			title: $(e.target).find('[name=title]').val(),
  			description: $(e.target).find('[name=description]').val(),
  			example: $(e.target).find('[name=example]').val(),
  			upvotes: 0,
  			downvotes:0,
        upvoteArr: []
  		}


  		Meteor.call('slangInsert', slang, function(error,result) {
  			// display error to user and abort
  			if (error)
  				return throwError(error.reason);

  			Router.go('indexPage', {_id: result._id});
  		});
  	}
  });


};