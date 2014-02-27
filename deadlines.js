Deadlines = new Meteor.Collection("deadlines");

if (Meteor.isClient) {
  Template.deadlines.items = function() {
    return Deadlines.find({});
  }

  Template.add_deadline_form.events({
      'submit form': function( event ){   // also tried just 'submit', both work for me!
        console.log( 'Adding deadline!' );
        event.preventDefault();
        event.stopPropagation();
        var subject = document.querySelector("form[name=add_deadline_form] input[name=subject]").value;
        var task = document.querySelector("form[name=add_deadline_form] input[name=task]").value;
        var group = document.querySelector("form[name=add_deadline_form] input[name=group]").value;
        var deadline = document.querySelector("form[name=add_deadline_form] input[name=deadline]").value;
        var id = Deadlines.insert({'subject': subject, 'task': task, 'group': group, 'deadline': deadline});
        console.log(id, subject, task, group, deadline);
        return false; 
      }
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
