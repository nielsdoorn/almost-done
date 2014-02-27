Deadlines = new Meteor.Collection("deadlines");

//var Meteor = Package.meteor.Meteor;

if (Meteor.isClient) {
  Template.deadlines.items = function() {
    return Deadlines.find({}, {sort: {deadline: 1}});
  }

  Template.add_deadline_form.groups = function() {
    return Session.get("newGroups");
  }

  Template.hello.username = function() {
    if (Meteor.user()) {
      return Meteor.user().emails[0].address;
    }
  };

  Template.add_deadline_form.events({
      'submit form': function(event) {   // also tried just 'submit', both work for me!
        console.log( 'Adding deadline!' );
        event.preventDefault();
        event.stopPropagation();
        var subject = document.querySelector("form[name=add_deadline_form] input[name=subject]").value;
        var task = document.querySelector("form[name=add_deadline_form] input[name=task]").value;
        var deadline = document.querySelector("form[name=add_deadline_form] input[name=deadline]").value;
        var id = Deadlines.insert({'subject': subject, 'task': task, 'groups': getGroups(), 'deadline': deadline});
        console.log(id, subject, task, getGroups(), deadline);
        Session.set("newGroups", Array());
        return false; 
      },
      'click input[name=add_group]': function(event) {
        var newGroup = document.querySelector("form[name=add_deadline_form] input[name=group]").value;
        var daGroups = getGroups();
        daGroups.push({'name': newGroup});
        Session.set("newGroups", daGroups);
      }
    });

  function getGroups() {
    if (Session.equals("newGroups", undefined)) {
      Session.set("newGroups", Array());
    }
    return Session.get("newGroups");
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  //Meteor.publish("userData", function () {
  //  return Meteor.users.find({_id: this.userId}, {fields: {'username': 1, 'other': 1, 'things': 1}});
  //});
}
