if (Meteor.isServer) {
    Meteor.startup(function () {      

        // create a couple of roles if they don't already exist (THESE ARE NOT NEEDED -- just for the demo)
        if(!Meteor.roles.findOne({name: "webmaster"}))
            Roles.createRole("webmaster");



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
        if (Meteor.users.findOne("7NsShRFnY9PfZkb5y"))
            Roles.addUsersToRoles("7NsShRFnY9PfZkb5y", ['webmaster']);
    });
}
