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
    
    /*info section animation*/
    $(function(){
        $('#info').click(function() {
            if($('#site-footer').hasClass('closed')) {
                $('#site-footer').animate({'top': '67px'}, 1000);
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
    
//    //filter
    filterSelection("all")
    function filterSelection(c) {
      var x, i;
      x = document.getElementsByClassName("category");
      if (c == "all") c = "";
      for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
      }
    }

    function w3AddClass(element, name) {
      var i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
      }
    }

    function w3RemoveClass(element, name) {
      var i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
          arr1.splice(arr1.indexOf(arr2[i]), 1);     
        }
      }
      element.className = arr1.join(" ");
    }
////end filter//
});