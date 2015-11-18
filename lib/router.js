Router.configure({
	layoutTemplate: 'layoutTemplate',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	trackPageView: true
});

AccountsTemplates.configure({
    defaultLayout: 'accountLayout',
});



IndexPageController = RouteController.extend({
  template: 'indexPage',
  increment: 5,
  slangLimit: function() {
    return parseInt(this.params.slangLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.slangLimit()};
  },
  subscriptions: function() {
    this.slangSub = Meteor.subscribe('slang', this.findOptions());
  },
  slang: function() {
    return Slang.find({}, this.findOptions());
  },
  data: function() {
    var self = this;
    return {
      slang: self.slang(),
      ready: self.slangSub.ready,
      nextPath: function() {
        if (self.slang().count() === self.slangLimit())
          return self.nextPath();
      }
    };
  },
	action: function() {
		$('.ui.dropdown').dropdown();

		if (!this.ready())
		this.render('loading');
	    else
	this.render();
	}
});

NewSlangController = IndexPageController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newSlang.path({slangLimit: this.slangLimit() + this.increment})
  }
});

BestSlangController = IndexPageController.extend({
  sort: {upvotes: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.bestSlang.path({slangLimit: this.slangLimit() + this.increment})
  }
});

Router.route('/', {
  name: 'home',
  controller: NewSlangController
});

Router.route('/new/:slangLimit?', {name: 'newSlang'});

Router.route('/best/:slangLimit?', {name: 'bestSlang'});






Router.route('/submit', {
  name: 'slangSubmit',
  path: '/submit',
  template: 'slangSubmit',
  layoutTemplate: 'layoutTemplate',
  action: function () {
    // render all templates and regions for this route
    if (!this.ready())
		this.render('loading');
	    else
	this.render();
  }
});

Router.route('/favorites', {
  name: 'favorites',
  path: '/favorites',
  template: 'favorites',
  layoutTemplate: 'layoutTemplate',
  waitOn: function() {
  	var favArr;
  	if (Meteor.user()) {
  		favArr = Meteor.user().favorite
  	} else {
  		favArr = [];
  	}
  	return Meteor.subscribe('favoriteDoc', favArr);
  }
  /*action: function () {
    // render all templates and regions for this route
    if (!this.ready())
		this.render('loading');
	    else
	this.render();
  } */
});




Router.route('/search/:searchString', {
  name: 'searchPage',
  template: 'searchPage',
  layoutTemplate: 'layoutTemplate',
  action: function () {
    // render all templates and regions for this route
    if (!this.ready())
		this.render('loading');
	    else
	this.render();
  },
  data: function() {
  	var sString = this.params.searchString.toString();

  	var cursor = SlangIndex.search(sString);

		//console.log(cursor.fetch());

  	return {
  		searchItem: cursor.fetch()
  	}
  }

});


Router.route('/users/:sjomli', {
  name: 'userPage',
  template: 'userPage',
  layoutTemplate: 'layoutTemplate',
  action: function () {
    // render all templates and regions for this route
    if (!this.ready())
		this.render('loading');
	    else
	this.render();
  },waitOn: function() {
    return Meteor.subscribe('usersDoc', this.params.sjomli.toString());
  },
  data: function() {
  	var user = this.params.sjomli.toString();
		return Slang.find({ owner: user });
  }

});




Router.route('/random/:_id', {
  name: 'randomPage',
  action: function () {
    // render all templates and regions for this route
    if (!this.ready())
		this.render('loading');
	    else
	this.render();
  },
  waitOn: function() {
    return Meteor.subscribe('randomDoc', this.params._id);
  },
  data: function() { return Slang.findOne(this.params._id); }
});







Router.route('/kvergausskvadeulerkvernigramanujan', {
  name: 'aboutPage',
  path: '/kvergausskvadeulerkvernigramanujan',
  template: 'aboutPage',
  layoutTemplate: 'layoutTemplate',
  action: function () {
    // render all templates and regions for this route
    if (!this.ready())
		this.render('loading');
	    else
	this.render();
  }
});


Router.route('signOut', {
    path: '/sign-out'
  });

var requireLogin = function() {
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
}

var logOut = function() {
  Meteor.logout();
  this.redirect('/')
}

Router.onBeforeAction(requireLogin, {only: ['slangSubmit', 'favorites']});
Router.onBeforeAction(logOut, {only: 'signOut'});


// multiple hooks:
// Router.onBeforeAction(requireLogin, {only:['anotherTemplate','slangSubmit']});





AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('changePwd');

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Invalid email',
  },
  pwd
]);
