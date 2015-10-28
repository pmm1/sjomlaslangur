if (Meteor.isClient) {	
	
	Template.favorites.helpers({
		favItem:function() {
			// Geta favorites from user array 'favorite'
			return Slang.find().fetch();	
		},
		noFavorites: function() {
			if (Meteor.user().favorite.length == 0) {
				return true;
			} else {
				return false;
			}
		}
	});


}

