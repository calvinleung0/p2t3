$("#createProjectBtn").click(function(event) {
  alertify.alert("Congrats on submitting your project!");
  alert.set("onok", function(){
    alertify.success("New Project Added!")
  });
  alert.show();
});