if (Meteor.isServer) {
    Meteor.startup(function () {

        // create a couple of roles if they don't already exist (THESE ARE NOT NEEDED -- just for the demo)
        if(!Meteor.roles.findOne({name: "webmaster"}))
            Roles.createRole("webmaster");

            if ( Meteor.users.find().count() === 0 ) {
            Accounts.createUser({
                username: 'webmaster',
                email: 'sjomlaslangur@gmail.com',
                password: '123456789',
                favorite: [],
                profile: {
                    first_name: 'fname',
                    last_name: 'lname',
                    company: 'company',
                }
            });
        }



        // Patrekur
       /* if (Meteor.users.findOne("wYuzzTXWtF9HLsoug"))
            Roles.addUsersToRoles("wYuzzTXWtF9HLsoug", ['webmaster']);

        // Bjassis
        if (Meteor.users.findOne("Ygh92GT5L7jWdhqhr"))
            Roles.addUsersToRoles("Ygh92GT5L7jWdhqhr", ['webmaster']);

        // Lexitron
        if (Meteor.users.findOne("TyuZ9HgjbKjmK4yuk"))
            Roles.addUsersToRoles("TyuZ9HgjbKjmK4yuk", ['webmaster']);

        // Addibagg
        if (Meteor.users.findOne("Jzs6HpGBDGeSvMXtY"))
            Roles.addUsersToRoles("Jzs6HpGBDGeSvMXtY", ['webmaster']);

        */

        // webmaster
        if (Meteor.users.findOne({ username: "webmaster" }))
            var webmasterID = Meteor.users.findOne({ username: "webmaster" });
            Roles.addUsersToRoles(webmasterID, ['webmaster']);
    });
}
