function buyMore(checkOption, checkBoxId) {
	
  // Get the output text
  var liLocation = $(checkBoxId).parent("li").getAttribute("id");

	console.log(liLocation);
  var text = document.getElementById("test002").getElementsByClassName("giftcheck-content");
	
	

  // If the checkbox is checked, display the output text
  if (checkOption === true){
    $(text).addClass("showcontent");
  } else {
    $(text).removeClass("showcontent");
  }
}