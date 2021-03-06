sitemap.behavior.multiDrag = function(options) {
  options = options || {};

  var dragstart = 'dragstart.multiDrag';
  var dragmove = 'drag.multiDrag';
  var dragend = 'dragend.multiDrag';

  function behavior(g) {
    var handles = options.handle ? g.selectAll(options.handle) : g;
    var dx, dy, x, y, isDragging, gotDragMove;

    var xxx;

    var drag = d3.behavior.drag()
      .on(dragstart, function(data) {
        dx = 0;
        dy = 0;

        isDragging = options.enabled ? options.enabled(data) : true;
        gotDragMove = false;

        xxx = window.options.duration;
        window.options.duration = 0;
      })
      .on(dragmove, function() {
        if (!isDragging) {
          return;
        }

        gotDragMove = true;

        dx += d3.event.dx;
        dy += d3.event.dy;

        x = d3.event.x;
        y = d3.event.y;

        options.drag({
          dx: dx,
          dy: dy,
          position: {
            x: x,
            y: y
          }
        });
      })
      .on(dragend, function(data) {
        window.options.duration = xxx;

        if (!isDragging) {
          return;
        }

        isDragging = false;

        if (gotDragMove) {
          options.dragend({
            data: data,
            dx: dx,
            dy: dy,
            position: {
              x: x,
              y: y
            }
          });
        }
      });

    handles.call(drag);
  }

  return behavior;
};