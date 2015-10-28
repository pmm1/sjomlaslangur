if (Meteor.isClient) {	
	
	Template.favorites.helpers({
		favItem:function() {
			// Geta favorites from user array 'favorite'
			//var objArr = [];

			/* for (var i = 0; i < Meteor.user().favorite.length; i++) {

				var temp = Slang.find({ _id: Meteor.user().favorite[i] }).fetch();
				console.log(temp);
				if (temp == undefined) {
					continue;
				} else {
					objArr.push(temp[0]);
				}
				
			}; */

			return Slang.find().fetch();

			/*Meteor.call('getFavorites', temparr, function ( error, result) {
				if (error) {
					throwError(error.reason):
				} else {
					return result;
				}
			}); */
	
		},
		noFavorites: function() {
			if (Meteor.user().favorite.length == 0) {
				return true;
			} else {
				return false;
			}
		}
	});


	/*Template.favorites.rendered = function() {
		// init dropdown
		$('.ui.dropdown').dropdown();
	} */
}

