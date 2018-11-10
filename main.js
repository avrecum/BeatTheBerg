// Set the date we're counting down to

var countDownDate = new Date("2018-11-10T18:00:00");

// Update the count down every 1 second
var x = setInterval(function() {

    if(countDownDate == null){
        document.getElementById("timer").innerHTML = "";
    }
    else{
  // Get todays date and time
  var now = Date.now();

  // Find the distance between now an the count down date
  var distance = Math.floor(countDownDate - now);

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementsByTagName("main")[0].innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    document.getElementsByTagName("main")[0].innerHTML = "0d 0h 0m 0s";
  }
    }
}, 1000);
