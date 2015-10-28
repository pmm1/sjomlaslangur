Slang = new Mongo.Collection('slang');
// title is the field of the documents to search over

//Slang.initEasySearch('title');


SlangIndex = new EasySearch.Index({
	engine: new EasySearch.MongoDB(),
    collection: Slang,
    fields: ['title']
  });

/*if(Meteor.isServer) {
  Slang._ensureIndex({title: 1});
} */




Slang.allow({
	remove: function (userId, doc) {
	    // can only remove if user is webmaster	    
	    var isWebmaster = Roles.userIsInRole(userId, 'webmaster');
	    return isWebmaster;
	},
	update: function(userId, doc) {
		return true;
	}
});





Meteor.methods({
	slangInsert: function(slangAttributes) {
		check(Meteor.userId(), String);
		check(slangAttributes, {
			title: String,
			description: String,
			example: String,
			upvotes: Number,
			downvotes: Number,
			upvoteArr: Array
		});

		var now = moment().format('ll');
		var randNo = Math.random();

		var user = Meteor.user();
		var slang = _.extend(slangAttributes, {
			userId: user._id,
			owner: user.username,
			submitted: now,
			random: randNo

		});

		var slangId = Slang.insert(slang);

		return {
			_id: slangId
		};
	},
	randomPost: function() {

		var random = _.sample(Slang.find().fetch());
		//console.log(random);

		//console.log(Slang.find({_id: random && random._id}))
		var slangId = random._id;

		return slangId;
	    //return Slang.find({_id: random && random._id})._id;
	}	
});



if (Meteor.isServer) {
  Meteor.startup(function() {
	//seed();
	first_names = ["Hellaður","feitur","blekaður","kenny","kfc","cascade","tariff","letsa","ketsa","fetsa","mella","blazroc","blazricoo","kadidi","handre","sumo"];
	country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
	guys = ["addibagg","lexitron","bjassis","drepheitur","stoner","qasimoto","che guevera","stalin","buddha","jesus","john cena"];

   
    if (Slang.find().count() === 0) {

    	function randomDate(start, end) {
    		return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
		}

      for (var i = 0; i < 5000; i++) {
        console.log(i + ' doc indexed');
        Slang.insert({
          title: Random.choice(country_list),
          definition: Random.choice(first_names),
          example:Random.choice(first_names),
          submitted: randomDate(new Date(2012, 0, 1), new Date()),
          upvotes: Math.floor(Math.random()*500),
          downvotes: Math.floor(Math.random()*300),
          upvoteArr: [],
          owner: Random.choice(guys)
        });
      }

      console.log('done!');
    }
  });
}



