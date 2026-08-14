jQuery (document).ready(function(){
  $('.info-p2').html(function (index, text) {
    this.innerHTML = text.replace("dirkelijah@gmail.com", "<a href='mailto:dirkelijah@gmail.com'>dirkelijah@gmail.com</a>")
  });



  //drag drawing photos
  // Make the DIV element draggable:
  if (window.location.pathname === "/drawings") {
    document.querySelectorAll(".drawing").forEach(el => dragElement(el));
  }

  function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      // ignore if currently mobile
      if (window.innerWidth < 768) return;

      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  const drawings = Array.from(document.querySelectorAll(".drawing"));

  if (window.location.pathname === "/drawings" && drawings.length) {
    applyAbsoluteLayout(drawings);
  }

  function applyAbsoluteLayout(cards) {
    const board = document.querySelector(".drawing-board");
    if (!board) return;

    // Clear old layout values if needed
    cards.forEach(c => {
      c.style.top = "";
      c.style.left = "";
      c.style.width = "";
      c.style.zIndex = "";
    });

    // ====== Tuning knobs ======
    // 50% smaller than native => multiply by 0.5
    const scaleTwoUp = 0.5;
    const scaleOneUp = 0.5;

    // Cap rendered width
    const maxCardWidthPx = 400;

    const leftTwoLeft = 5;     // still expressed in % of board width
    const leftTwoRight = 52.5;
    const leftOneCentered = 22.5;

    const topStart = 2.5; // percent
    const rowHeight = 28; // percent

    const n = cards.length;

    // Decide how many "rows" we will have for N cards with the pattern:
    // row0: 2 cards, row1: 1 card, row2: 2 cards, row3: 1 card, ...
    let rows = 0;
    let i = 0;
    while (i < n) {
      const isTwoUp = (rows % 2 === 0);
      i += isTwoUp ? 2 : 1;
      rows++;
    }

    // Convert percent-based vertical scheme into an actual height.
    const pxPerRow = 420;
    const paddingBottom = 200;
    board.style.height = `${topStart * 0 + rows * pxPerRow + paddingBottom}px`;

    // ---- helper: get "native" width in px ----
    // For <img>, naturalWidth is ideal.
    // For other elements, we'll fall back to current rendered width.
    function getNativeWidthPx(el) {
      // If it's an <img>, prefer naturalWidth
      const img = el.tagName === "IMG" ? el : el.querySelector?.("img");
      if (img && img.naturalWidth) return img.naturalWidth;

      // Fallback: if it's already rendered, use its current pixel width
      const rect = el.getBoundingClientRect();
      return rect.width || 0;
    }

    // Precompute widths once (so repeated measurements aren't needed)
    // We’ll set:
    // - two-up cards: 50% smaller than native, max 400px
    // - one-up cards: 50% smaller than native, max 400px
    const widthPx = (el) => Math.min(getNativeWidthPx(el) * scaleTwoUp, maxCardWidthPx);

    let cardIndex = 0;

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      const isTwoUp = (rowIndex % 2 === 0);
      const topPct = topStart + rowIndex * rowHeight;

      if (isTwoUp) {
        if (cards[cardIndex]) {
          setCard(cards[cardIndex], {
            widthPx: widthPx(cards[cardIndex]),
            leftPct: leftTwoLeft,
            topPct,
            z: 100 + (n - cardIndex)
          });
        }
        if (cards[cardIndex + 1]) {
          setCard(cards[cardIndex + 1], {
            widthPx: widthPx(cards[cardIndex + 1]),
            leftPct: leftTwoRight,
            topPct,
            z: 100 + (n - (cardIndex + 1))
          });
        }
        cardIndex += 2;
      } else {
        if (cards[cardIndex]) {
          setCard(cards[cardIndex], {
            widthPx: widthPx(cards[cardIndex]),
            leftPct: leftOneCentered,
            topPct,
            z: 100 + (n - cardIndex)
          });
        }
        cardIndex += 1;
      }
    }
  }

  function setCard(el, { widthPx, leftPct, topPct, z }) {
    el.style.width = `${widthPx}px`;
    el.style.left = `${leftPct}%`;
    el.style.top = `${topPct}%`;
    el.style.zIndex = String(z);
  }



  //hide
  if (window.location.href.indexOf("info") > -1 ||
      window.location.href.indexOf("slides") > -1 ||
      window.location.href.indexOf("thoughts") > -1 ||
      window.location.href.indexOf("soon") > -1 ||
      window.location.href.indexOf("drawings") > -1) {
        $("#navigation").css('opacity', '1');
    // $("#logo").css('background-color', '#cae7ec');
  }

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
        $("#slides").css('opacity', '0');
    } else {
      if (currentIndex == 1) {
        $('#dirk').removeClass('dirk-small');
        $('#logo').removeClass('logo-small');
        $("#navigation").css('opacity', '0');
        $("#slides").css('opacity', '1');
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
      $("#slides").css('opacity', '1');
    } else {
      var newIndex = Number(currentIndex) + 1;
      $('*[data-index="'+newIndex+'"]').addClass('current');
      $('#dirk').addClass('dirk-small');
      $('#logo').addClass('logo-small');
      $("#navigation").css('opacity', '1');
      $("#slides").css('opacity', '0');
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

    // $(document).on("click", "a", function () {
    //     var newUrl = $(this).attr("href");
    //     if (!newUrl || newUrl[0] === "#") {
    //         location.hash = newUrl;
    //         return;
    //     }
    //       $("html").fadeOut(function () {
    //           location = newUrl;
    //       });
    //     return false;
    // });
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
