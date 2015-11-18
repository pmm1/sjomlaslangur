if (Meteor.isServer) {
    Meteor.startup(function () {

        // create a couple of roles if they don't already exist (THESE ARE NOT NEEDED -- just for the demo)
        if(!Meteor.roles.findOne({name: "webmaster"}))
            Roles.createRole("webmaster");

            if ( Meteor.users.find().count() === 0 ) {
            Accounts.createUser({
                username: 'webmaster',
                email: 'sjomlaslangur@gmail.com',
                password: 'kadidihandre',
                favorite: [],
                profile: {
                    first_name: 'fname',
                    last_name: 'lname',
                    company: 'company',
                }
            });
        }




        // webmaster (already exists)
        /*if (Meteor.users.findOne({ username: "webmaster" }))
            var webmasterID = Meteor.users.findOne({ username: "webmaster" });
            Roles.addUsersToRoles(webmasterID, ['webmaster']); */
    });
}
