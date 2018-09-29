$(document).ready(function() {
  console.log("connected yaaa yeet");
  // Getting references to our form and input

  // When the signup button is clicked, we validate the email and password are not blank
  $(".donate").on("click", function(event) {
    event.preventDefault();
    var donationAmount = parseInt($(".donationamount").val());
    var projectId = parseInt($(".donate").attr("projectid"));
    var donation = { amount: donationAmount, projectId: projectId };

    console.log("submitted!");
    createDonation(donation);
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function createDonation(newDonation) {
    $.post("/api/donations", newDonation)
      .then(function(data) {
        console.log(data);
        location.reload();
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});