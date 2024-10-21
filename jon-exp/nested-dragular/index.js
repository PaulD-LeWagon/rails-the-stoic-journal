(function() {
  dragula([document.querySelector('.bloc')], {
    moves: function(el, container, handle) {
      // return !handle.classList.contains('bloc--inner');
    }
  });

  dragula([].slice.apply(document.querySelectorAll('.bloc')), {
    direction: 'horizontal'
  });
})();
