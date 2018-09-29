$(document).ready(function() {
  console.log("connected yaaa yeet");
  // Getting references to our form and input
  var createForm = $("form#create");

  // When the signup button is clicked, we validate the email and password are not blank
  createForm.on("submit", function(event) {
    event.preventDefault();

    console.log("submitted!");

    var title = $("#title").val().trim();
    var goal = $("#goal").val().trim();
    var category = $("#category").val().trim();
    var description = $("#description").val().trim();
    var incentiveDollarsOne = $("#incentiveDollarsOne").val().trim();
    var incentiveDescriptionOne = $("#incentiveDescriptionOne").val().trim();
    var incentiveDollarsTwo = $("#incentiveDollarsTwo").val().trim();
    var incentiveDescriptionTwo = $("#incentiveDescriptionTwo").val().trim();
    var incentiveDollarsThree = $("#incentiveDollarsThree").val().trim();
    var incentiveDescriptionThree = $("#incentiveDescriptionThree").val().trim();
    
    var newProject = {
      title: title,
      goal: goal,
      category: category,
      description: description,
      incentiveDollarsOne: incentiveDollarsOne,
      incentiveDescriptionOne: incentiveDescriptionOne,
      incentiveDollarsTwo: incentiveDollarsTwo,
      incentiveDescriptionTwo: incentiveDescriptionTwo,
      incentiveDollarsThree: incentiveDollarsThree,
      incentiveDescriptionThree: incentiveDescriptionThree
    };

    console.log(newProject);

    if (!newProject.title) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    createNewProject(newProject);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function createNewProject(newProject) {
    $.post("/api/project", {
      firstName: newProject.firstName,
      lastName: newProject.lastName,
      email: newProject.email,
      password: newProject.password,
      profileImg: newProject.profileImg,
      bio: newProject.bio,
      interests: newProject.interests
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});