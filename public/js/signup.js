$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form#signup");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();

    var firstName = $("#first-name").val().trim();
    var lastName = $("#last-name").val().trim();
    var emailInput = $("#inputEmail").val().trim();
    var passwordInput = $("#inputPassword").val().trim();
    var urlProPic = $("#urlProPic").val().trim();
    var interests = $("#interests").val().trim();
    var bio = $("#inputBio").val().trim();
    
    var userData = {
      email: emailInput,
      password: passwordInput,
      firstName: firstName,
      lastName: lastName,
      password: passwordInput,
      profileImg: urlProPic,
      interests: interests,
      bio: bio
    };

    console.log(userData);

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData);
    // emailInput.val("");
    // passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(userData) {
    $.post("/api/signup", {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      profileImg: userData.profileImg,
      bio: userData.bio,
      interests: userData.interests
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
