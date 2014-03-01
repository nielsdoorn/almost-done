Deadlines = new Meteor.Collection("deadlines");

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

if (Meteor.isClient) {
  Template.deadlines.items = function() {
    return Deadlines.find({}, {sort: {deadline: 1}});
  }

  Template.add_deadline_form.groups = function() {
    return Session.get("newGroups");
  }

  Template.hello.username = function() {
    if (Meteor.user()) {
      console.log(Meteor.user());
      if (Meteor.user().username) {
        return Meteor.user().username;
      } else if (Meteor.user().profile && Meteor.user().profile.name) {
        return Meteor.user().profile.name;
      } else if (Meteor.user().emails && Meteor.user().emails[0] && Meteor.user().emails[0].address) {
        return Meteor.user().emails[0].address;
      }
      return "Ok";
    }
  };

  Template.add_deadline_form.events(
    {
      'submit form': function(event) {   // also tried just 'submit', both work for me!
        console.log( 'Adding deadline!' );
        event.preventDefault();
        event.stopPropagation();
        var subject = document.querySelector("form[name=add_deadline_form] input[name=subject]").value;
        var task = document.querySelector("form[name=add_deadline_form] input[name=task]").value;
        var deadline = document.querySelector("form[name=add_deadline_form] input[name=deadline]").value;
        var id = Deadlines.insert({'subject': subject, 'task': task, 'groups': getGroups(), 'deadline': deadline});
        //Session.set("newGroups", Array());
        return false; 
      },
      'click input[name=add_group]': function(event) {
        var newGroup = document.querySelector("form[name=add_deadline_form] input[name=group]").value;
        var daGroups = getGroups();
        daGroups.push({'name': newGroup});
        Session.set("newGroups", daGroups);
      }
    }
  );

  function getGroups() {
    if (Session.equals("newGroups", undefined)) {
      Session.set("newGroups", Array());
    }
    return Session.get("newGroups");
  }
}
