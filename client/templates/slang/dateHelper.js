if (Meteor.isClient) {
	Template.slangItem.helpers({
		submittedDate: function() {
			return moment(this.submitted).calendar();
		}
	});


	Template.favSlangItem.helpers({
		submittedDate: function() {
			return moment(this.submitted).calendar();
		}
	});

};
