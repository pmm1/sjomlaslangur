if (Meteor.isServer) {

	Meteor.publish('slang', function(options) {
		check(options, {
			sort: Object,
			limit: Number
		});
		return Slang.find({}, options);
	});




	Meteor.publish('randomDoc', function(id) {
	  check(id, String);
	return Slang.find(id);
});


	Meteor.publish('favoriteDoc', function(arr) {
			check(arr, Array);
			return Slang.find({'_id':{$in:arr}});
	});

	Meteor.publish('usersDoc', function(sjomli) {
		check(sjomli, String);
		return Slang.find({ owner: sjomli});
	});






}
