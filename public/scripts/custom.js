jQuery (document).ready(function(){
  $('.info-p2').html(function (index, text) {
    this.innerHTML = text.replace("dirkelijah@gmail.com", "<a href='mailto:dirkelijah@gmail.com'>dirkelijah@gmail.com</a>");
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

    // clear old layout 
    cards.forEach(c => {
      c.style.top = "";
      c.style.left = "";
      c.style.width = "";
      c.style.zIndex = "";
    });

    // make images half as large as originally provided
    const scale = 0.5;

    // max width is 400px for now
    const maxCardWidthPx = 400;

    const leftTwoLeft = 5;
    const leftTwoRight = 52.5;
    let leftOneCentered = 22.5;

    const topStart = 2.5;
    let rowHeight = 20;

    const n = cards.length;

    // 2, 1, 2, 1 patterning for each row's columns
    let rows = 0;
    let i = 0;
    while (i < n) {
      const isTwoUp = (rows % 2 === 0);
      i += isTwoUp ? 2 : 1;
      rows++;
    }

    // set height for parent div
    const pxPerRow = 420;
    const paddingBottom = 0;
    board.style.height = `${topStart * 0 + rows * pxPerRow + paddingBottom}px`;

    // get "native" width in px
    function getNativeWidthPx(el) {
      const img = el.tagName === "IMG" ? el : el.querySelector?.("img");
      if (img && img.naturalWidth) return img.naturalWidth;

      // if it's already rendered, use its current pixel width
      const rect = el.getBoundingClientRect();
      return rect.width || 0;
    }

    // set image widths once (so repeated measurements aren't needed)
    const widthPx = (el) => Math.min(getNativeWidthPx(el) * scale, maxCardWidthPx);

    let cardIndex = 0;

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      const isTwoUp = (rowIndex % 2 === 0);
      const prevCard = cards[cardIndex - 1]; // previous card
      const prevHeight = prevCard ? prevCard.offsetHeight : 0;

      // if the image is quite large, add some to the rowHeight
      if (prevHeight > 500) {
        rowHeight = 26;
      }

      let topPct = topStart + rowIndex * rowHeight;

      if (isTwoUp) {
        if (cards[cardIndex]) {
          let tempTopPct = topPct;
          if (rowIndex % 4 !== 0) {
            tempTopPct = topPct + 7;
          }
          setCard(cards[cardIndex], {
            widthPx: widthPx(cards[cardIndex]),
            leftPct: leftTwoLeft,
            topPct: tempTopPct,
            z: 100 + (cardIndex)
          });
        }
        if (cards[cardIndex + 1]) {
          let tempTopPct = topPct;
          if (rowIndex % 4 === 0) {
            tempTopPct = topPct + 3;
          }
          setCard(cards[cardIndex + 1], {
            widthPx: widthPx(cards[cardIndex + 1]),
            leftPct: leftTwoRight,
            topPct: tempTopPct,
            z: 100 + (cardIndex + 1)
          });
        }
        cardIndex += 2;
      } else {
        if (cards[cardIndex]) {
          let tempLeftOneCentered = leftOneCentered;
          if ((rowIndex - 1) % 4 !== 0) {
            tempLeftOneCentered = leftOneCentered + 10;
          }

          setCard(cards[cardIndex], {
            widthPx: widthPx(cards[cardIndex]),
            leftPct: tempLeftOneCentered,
            topPct: topPct,
            z: 100 + (cardIndex)
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

  ////filter////
  $("#write").click(function(){
    $(".Designer").hide();
    $(".Writer").show();
  });
  $("#design").click(function(){
    $(".Writer").hide();
    $(".Designer").show();
  });

  $(".long").hide();
  $("#sh").click(function(){
    $(".long").hide();
    $(".short").show();
  });
  $("#lg").click(function(){
    $(".short").hide();
    $(".long").show();
  });
  ////end filter//

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



  // handle navigation color change based on image brightness
  const navigation = document.querySelector("#navigation");
  const logo = document.querySelector("#logo")

  let lastSlide = null;
  let lastImageUrl = null;

  function getBackgroundImageUrl(element) {
    const backgroundImage = getComputedStyle(element).backgroundImage;

    const match = backgroundImage.match(/^url\(["']?(.*?)["']?\)$/);
    return match ? match[1] : null;
  }

  function updateNavigationContrast() {
    const currentSlide = document.querySelector(".slide.current");

    if (!currentSlide) return;

    const imageUrl = getBackgroundImageUrl(currentSlide);

    if (!imageUrl) return;

    // Avoid recalculating while the same slide is still visible
    if (currentSlide === lastSlide && imageUrl === lastImageUrl) {
      return;
    }

    lastSlide = currentSlide;
    lastImageUrl = imageUrl;

    const image = new Image();

    // Required if the image server supports CORS
    image.crossOrigin = "anonymous";

    image.onload = function () {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d", { willReadFrequently: true });

      // A small canvas is enough to determine general brightness
      canvas.width = 50;
      canvas.height = 50;

      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      const pixels = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data;

      let totalBrightness = 0;
      let pixelCount = 0;

      for (let i = 0; i < pixels.length; i += 4) {
        const red = pixels[i];
        const green = pixels[i + 1];
        const blue = pixels[i + 2];

        // Perceived luminance
        const brightness =
          0.2126 * red +
          0.7152 * green +
          0.0722 * blue;

        totalBrightness += brightness;
        pixelCount++;
      }

      const averageBrightness = totalBrightness / pixelCount;

      // Lower values mean a darker image
      const imageIsDark = averageBrightness < 120;

      navigation.classList.toggle("is-light", imageIsDark);
      logo.classList.toggle("is-light", imageIsDark);
    };

    image.onerror = function () {
      // If the image cannot be analyzed, keep the default black text
      navigation.classList.remove("is-light");
      logo.classList.remove("is-light");
    };

    image.src = imageUrl;
  }

  // Check for slide changes
  setInterval(updateNavigationContrast, 200);

  // Run once immediately
  updateNavigationContrast();
});
