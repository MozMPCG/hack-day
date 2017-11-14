function updateTimer(deadline){
    var time = deadline - new Date();
    return {
      'days': Math.floor( time/(1000*60*60*24) ),
      'hours': Math.floor( (time/(1000*60*60)) % 24 ),
      'minutes': Math.floor( (time/1000/60) % 60 ),
      'seconds': Math.floor( (time/1000) % 60 ),
      'total' : time
    };
  }
  
  
  function animateClock(span){
    span.className = "turn";
    setTimeout(function(){
      span.className = "";
    },700);
  }
  
  function startTimer(id, deadline){
    var timerInterval = setInterval(function(){
      var clock = document.getElementById(id);
      var timer = updateTimer(deadline);
  
      clock.innerHTML = '<span>' + timer.days + '</span>'
                      + '<span>' + timer.hours + '</span>'
                      + '<span>' + timer.minutes + '</span>'
                      + '<span>' + timer.seconds + '</span>';
  
      //animations
      var spans = clock.getElementsByTagName("span");
      animateClock(spans[3]);
      if(timer.seconds == 59) animateClock(spans[2]);
      if(timer.minutes == 59 && timer.seconds == 59) animateClock(spans[1]);
      if(timer.hours == 23 && timer.minutes == 59 && timer.seconds == 59) animateClock(spans[0]);
  
      //check for end of timer
      if(timer.total < 1){
        clearInterval(timerInterval);
        $('#comingsoon').text('BOOOOM ! Event started on 18th November 2017 and will over on 18th November 2017');
        clock.innerHTML = '<span>0</span><span>0</span><span>0</span><span>0</span>';
      }
  
  
    }, 1000);
  }
  
  var currentPos = 0;
  var text = 'HACKATHON';
  function textInsert(){
    if(currentPos === 9){
      currentPos = 0;
      $('#hackathontext').text('');  
    }
    var textinsert = $('#hackathontext').text();
    $('#hackathontext').text(textinsert + text.charAt(currentPos));
    currentPos++;
  }


  function interval(textInsert){
    setInterval(textInsert, 300);
  }


  window.onload = function(){
    var deadline = new Date("November 18, 2017 12:00:00");
    startTimer("clock", deadline);
    interval(textInsert);
  };



  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
