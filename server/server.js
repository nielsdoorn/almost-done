Deadlines = new Meteor.Collection("deadlines");

if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log("starting up...");
  });
}