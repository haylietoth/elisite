jQuery (document).ready(function(){
    /*info section animation*/
    $(function(){
        $('#info').click(function() {
            if($('#site-footer').hasClass('closed')) {
                $('.navbar-collapse').removeClass('in');
                $('#site-footer').animate({'top': '100px'}, 1000);
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
