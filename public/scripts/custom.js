jQuery (document).ready(function(){
    
    /*Google Analytics*/
//    window.dataLayer = window.dataLayer || [];
//    function gtag(){dataLayer.push(arguments);}
//    gtag('js', new Date());
//    gtag('config', 'UA-135736418-1');
//    
//    $(function() {
//        $('a').each(function() {
//            if ($(this).attr('id') == 'info') {
//                this.setAttribute("onclick","document.getElementById('site-footer').classList.toggle('closed');ga('send', 'event', '"+$(this).attr("href")+"', 'Click', '"+$(this).text()+"');")
//            }
//            else {
//                this.setAttribute("onclick","ga('send', 'event', '"+$(this).attr("href")+"', 'Click', '"+$(this).text()+"');")
//            }
//        });
//    });
    
    /*info section animation*/
    $(function(){
        $('#info').click(function() {
            if($('#site-footer').hasClass('closed')) {
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
                $('#site-footer').animate({'top': '1500px'}, 1000)
            }
        });
    });
    
    //random quote
    (function() {
      // Define images
      var getQuote, quotes, totalQuotes;

      quotes = ['This is where dirk elijah would write something interesting, clever, and/or humorous to grab someones attention so that they will continue to look at his site.', 'But wait! If the user is to refresh this page, he will also have this phrase change (up to four times) leaving the user delighted with a surprise when the re-enter his  fsite...', 'Only to be later disappointed when they find out there is only four different phrases. But no worries, if you want me to write more you can hire me!', 'But it will of course be better if he comes up with is own material, I mean that is the point of this whole website.'];

      // Counts total images
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
    ////end filter//
    
    /*Smooth scroll*/
    $(document).ready(function(){
        $("#write").on('click', function(event) {
            if (this.hash !== "") {
              event.preventDefault();
              var hash = this.hash;
              $('html, body').animate({
                scrollTop: $(hash).offset().top
              }, 1000, function(){
                window.location.hash = hash;
              });
            }
          });
        $("#design").on('click', function(event) {
            if (this.hash !== "") {
              event.preventDefault();
              var hash = this.hash;
              $('html, body').animate({
                scrollTop: $(hash).offset().top
              }, 1000, function(){
                window.location.hash = hash;
              });
            }
          });
        });
});