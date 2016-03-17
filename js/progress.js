$(document).ready(function() {
  var getMax, getValue, getWidth, max, progressBar, setWidth, value, width;
  getMax = function() {
    return $(document).height() - $(window).height();
  };
  getValue = function() {
    return $(window).scrollTop();
  };
  if ('max' in document.createElement('progress')) {
    progressBar = $('progress');
    progressBar.attr({
      max: getMax()
    });
    $(document).on('scroll', function() {
      progressBar.attr({
        value: getValue()
      });
    });
    $(window).resize(function() {
      var progressBar;
      progressBar.attr({
        max: getMax(),
        value: getValue()
      });
    });
  } else {
    progressBar = $('.progress-bar');
    max = getMax();
    value = void 0;
    width = void 0;
    getWidth = function() {
      value = getValue();
      width = value / max * 100;
      width = width + '%';
      return width;
    };
    setWidth = function() {
      progressBar.css({
        width: getWidth()
      });
    };
    $(document).on('scroll', setWidth);
    $(window).on('resize', function() {
      max = getMax();
      setWidth();
    });
  }
});
