jQuery (document).ready(function(){
  //hide
  if (window.location.href.indexOf("info") > -1 ||
      window.location.href.indexOf("slides") > -1 ||
      window.location.href.indexOf("thoughts") > -1 ||
      window.location.href.indexOf("soon") > -1) {
    $("#navigation").css('opacity', '1');
    // $("#logo").css('background-color', '#cae7ec');
  }


  $( ".nav-default" ).mouseenter(function() {
    $(".nav-arrow").hide();
    $(".bottomnav").css('bottom', '0');
  });
  $( ".nav-default" ).mouseleave(function() {
    $(".nav-arrow").show();
    $(".bottomnav").css('bottom', '-50px');
  });

  //new stuff

  $('#left-clickarea').click(function() {
    //get current value
    var currentIndex = $('.current').attr('data-index');
    //remove current class
    $('*[data-index="'+currentIndex+'"]').removeClass('current');
    //add current to next div
    if(currentIndex == 0) {
      var totalSlides = $(".slides div").length;
      var newIndex = totalSlides - 1;
      $('*[data-index="'+newIndex+'"]').addClass('current');
        $('#dirk').addClass('dirk-small');
        $('#logo').addClass('logo-small');
        $("#navigation").css('opacity', '1');
    } else {
      if (currentIndex == 1) {
        $('#dirk').removeClass('dirk-small');
        $('#logo').removeClass('logo-small');
        $("#navigation").css('opacity', '0');
      }
      var newIndex = Number(currentIndex) - 1;
      $('*[data-index="'+newIndex+'"]').addClass('current');
    }
  });

  $('#right-clickarea').click(function() {
    //get total slides
    var lastSlide = $(".slides div").length - 1;
    //get current value
    var currentIndex = $('.current').attr('data-index');
    //remove current class
    $('*[data-index="'+currentIndex+'"]').removeClass('current');
    //add current to next div
    if(currentIndex == lastSlide) {
      $('*[data-index="0"]').addClass('current');
      $('#dirk').removeClass('dirk-small');
      $('#logo').removeClass('logo-small');
      $("#navigation").css('opacity', '0');
    } else {
      var newIndex = Number(currentIndex) + 1;
      $('*[data-index="'+newIndex+'"]').addClass('current');
      $('#dirk').addClass('dirk-small');
      $('#logo').addClass('logo-small');
      $("#navigation").css('opacity', '1');
    }
  });

    /*info section animation*/
    $(function(){
        $('#info').click(function() {
            if($('#site-footer').hasClass('closed')) {
                $('.navbar-collapse').removeClass('in');
                $('#site-footer').animate({'top': '80px'}, 1000);
                    $(this).delay(1000)
                           .queue(function () {
                                $(this).addClass('material-icons').text('arrow_downward');
                                $(this).dequeue();
                           });
                    $('#site-footer').removeClass('closed');
            }
            else {
                $('#site-footer').addClass('closed');
                $(this).removeClass('material-icons').text('Info');
                $('#site-footer').animate({'top': '1500px'}, 1000);
                $('.navbar-collapse').removeClass('in');
            }
        });
    });
    /*page fade-in and fade-out */
    $('body').css('display','none');
    $('body').fadeIn(500);

    $(document).on("click", "a", function () {
        var newUrl = $(this).attr("href");
        if (!newUrl || newUrl[0] === "#") {
            location.hash = newUrl;
            return;
        }
        $("html").fadeOut(function () {
            location = newUrl;
        });
        return false;
    });
    //random quote
    (function() {
      var quote = document.getElementsByClassName("quotes");
      // Define images
      var getQuote,totalQuotes;
      var quotes = [];

      for (i=0;i<quote.length;i++) {
        var q = quote[i].innerText;
        quotes.push(q);
      }
      // Counts total quotes
      totalQuotes = quotes.length;

      // Get Quote
      getQuote = function() {
        var activeQuotes;
        // Gets random image from array
        activeQuotes = quotes[Math.floor(Math.random() * totalQuotes)];
        // Changes background of div
        return $('.home-content').text(activeQuotes);
      };

      getQuote();
    }).call(this);

    //end random text//

    ////filter////
    $(document).ready(function(){
      $("#write").click(function(){
        $(".Designer").hide();
        $(".Writer").show();
      });
      $("#design").click(function(){
        $(".Writer").hide();
        $(".Designer").show();
      });
    });

    $(document).ready(function(){
      $(".long").hide();
      $("#sh").click(function(){
        $(".long").hide();
        $(".short").show();
      });
      $("#lg").click(function(){
        $(".short").hide();
        $(".long").show();
      });
    });
    ////end filter//
});
