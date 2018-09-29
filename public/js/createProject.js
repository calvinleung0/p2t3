$(document).ready(function() {
  // Getting references to our form and input
  //var createForm = $("form#create");
  console.log("js linked properly");
  // When the signup button is clicked, we validate the email and password are not blank
  $("#submit").on("click", function(event) {
    event.preventDefault();

    console.log("submitted!");

    var title = $("#title").val().trim();
    var goal = parseInt($("#goal").val().trim());
    var category = $("#category").val().trim();
    var description = $("#description").val().trim();
    var shortDesc = $("#shortDesc").val().trim();
    var imageDesc = $("#imageDesc").val().trim();
    var inc1cost = parseInt($("#inc1cost").val().trim());
    var inc1 = $("#inc1").val().trim();
    var inc2cost = parseInt($("#inc2cost").val().trim());
    var inc2 = $("#inc2").val().trim();
    var inc3cost = parseInt($("#inc3cost").val().trim());
    var inc3 = $("#inc3").val().trim();

    
    
    var newProject = {
      title: title,
      goal: goal,
      category: category,
      description: description,
      shortDesc: shortDesc,
      inc1cost: inc1cost,
      inc1: inc1,
      inc2cost: inc2cost,
      inc2: inc2,
      inc3cost: inc3cost,
      inc3: inc3,
      imageDesc: imageDesc
    };

    console.log(newProject);

    if (!newProject.title || !newProject.goal) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    createNewProject(newProject);
    //title.val("");
    //goal.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function createNewProject(newProject) {
    $.post("/api/projects", newProject)
      .then(function(data) {
        //window.location.replace(data);
        // If there's an error, handle it by throwing up a bootstrap alert
        console.log(data);
      })
      .catch(handleLoginErr);
    }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});