if (Meteor.isClient) {

	Template.aboutPage.rendered = function() {
		// init dropdown
		$('.ui.dropdown').dropdown();

	}

}