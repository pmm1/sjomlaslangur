
if(Meteor.isClient) {


	Template.indexPage.events({
		'click .webmasterdelete': function(e) {
			e.preventDefault();


			if (confirm('Deleta þessum badboi?')) {
				var current = this._id;
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
			var slangId = this._id;

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

				

				Slang.update(slangId, { $inc: {downvotes: -1,upvotes: 1} /*, $push: upItem */ });
				//Slang.update(slangId, {$inc: {upvotes: 1}});
				//Slang.update()

			} else{

				Slang.update(slangId, {$inc: {upvotes: 1} /*, $push: upItem */});

				$(e.target).addClass('active');
			}; 

		},
		'click .downvote': function(e) {
			e.preventDefault();

			if ($(e.target).hasClass('active')) {
				return;
			};

			// Get current slang object
			var slangId = this._id;


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
			var slangId = this._id;


			// you can only upvote or downvote, not both..
			if ($(e.target).parent().next().hasClass('active')) {

				$(e.target).parent().next().removeClass('active');
				$(e.target).parent().next().children().removeClass('active');

				$(e.target).addClass('active');
				$(e.target).parent().addClass('active')
				Slang.update(slangId, { $inc: {downvotes: -1,upvotes: 1} /*, $push: upItem */});
				//Slang.update(slangId, {$inc: {downvotes: -1}});
				//Slang.update(slangId, {$inc: {upvotes: 1}});
			} else{	
				Slang.update(slangId, {$inc: {upvotes: 1} /*, $push: upItem */});
				$(e.target).addClass('active');
				$(e.target).parent().addClass('active');
			};
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
			var slangId = this._id;

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
		},
		'click .reportModal':function(e) {
			e.preventDefault();

			var currentSlangId = this._id;
			$('.reportText').attr('name',currentSlangId);
			$('.small.modal').modal('show');

		},
		'keyup .searchInput': function(e){
	        e.preventDefault();
			if (e.keyCode == 13) {
			    // Do something

			    var searchVal = "/search/" + $(e.target).val().toString();
			    console.log(searchVal);
			    Router.go(searchVal);
			    $('[name=searchString]').val('');
			}
		}
    });






/*
	Template.indexPage.rendered = function() {

		// init modal
		$('.small.modal').modal();

		// init dropdown
		$('.ui.dropdown').dropdown();


		// init report slang event listener
		$('.sendReport').on('click',mailMan);


	} */





	// global function..
	mailMan = function() {
		var str1 ="id á slangri: " + $('.reportText').attr('name').toString() + "         ";
		var str2 ="skilaboð frá notanda: " + $('.reportText').val().toString();
		var message = str1.concat(str2);
		console.log(message);


		// In your client code: asynchronously send an email
		Meteor.call('sendEmail',
	        'sjomlaslangur@gmail.com',
	        'notendur@sjomlaslangur.is',
	        'Tilkynning á slangri',
	        message);

		console.log("email sent!");
		$('.small.modal').modal('hide');

	}
}