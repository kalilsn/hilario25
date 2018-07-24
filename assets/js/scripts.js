$(function() {
  var $form = $("#volunteer-form"),
    $error = $form.parent().find(".error"),
    url =
      "https://script.google.com/macros/s/AKfycbyfz1cHGt6XQTiIZurutn_Fe3EiOQ1ljHU77tH_x7QQxzGHmBI/exec";

  $form.submit(function(e) {
    var data = {};
    $form.serializeArray().forEach(function(field) {
      data[field.name] = field.value;
    });

    $.ajax({
      url: url,
      dataType: "json",
      data: data,
      success: function() {
        $form.hide();
        $error.hide();
        $form
          .parent()
          .find(".success")
          .show();
      },
      error: function() {
        $error.show();
      }
    });

    return false;
  });
});

//from underscore (http://underscorejs.org/docs/underscore.html)
function throttle(func, wait, options) {
  var context, args, result;
  var now =
    Date.now ||
    function() {
      return new Date().getTime();
    };
  var timeout = null;
  var previous = 0;
  if (!options) {
    options = {};
  }
  var later = function() {
    previous = options.leading === false ? 0 : now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) {
      context = args = null;
    }
  };
  return function() {
    var n = now();
    if (!previous && options.leading === false) {
      previous = n;
    }
    var remaining = wait - (n - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = n;
      result = func.apply(context, args);
      if (!timeout) {
        context = args = null;
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

$(window).on("load", function() {
  var aspectRatio,
    $bg = $(".bg-image"),
    $window = $(window);

  if ($bg.length === 0) {
    return;
  } else {
    aspectRatio = $bg.width() / $bg.height();
    $window.resize(throttle(resizeBackground, 250)).trigger("resize");
  }

  function resizeBackground() {
    var stretchHorizontal = $window.width() / $window.height() > aspectRatio;
    $bg
      .toggleClass("stretch-horizontal", stretchHorizontal)
      .toggleClass("stretch-vertical", !stretchHorizontal);
  }
});
