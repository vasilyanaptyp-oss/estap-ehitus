(function () {
  var d = document, b = d.body;
  // mobile menu
  var burger = d.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click', function () {
      var open = b.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    d.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', function () { b.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false'); });
    });
  }
  // lightbox for the works grid
  var items = Array.prototype.slice.call(d.querySelectorAll('.gi'));
  var lb = d.querySelector('.lb');
  if (lb && items.length) {
    var img = lb.querySelector('img'), cap = lb.querySelector('figcaption'), cur = 0, last = null;
    var show = function (i) {
      cur = (i + items.length) % items.length;
      var it = items[cur];
      img.src = it.getAttribute('data-full');
      img.alt = it.querySelector('img').alt;
      cap.textContent = it.querySelector('span').textContent;
    };
    var open = function (i) { last = d.activeElement; show(i); lb.classList.add('on'); lb.setAttribute('aria-hidden', 'false'); b.style.overflow = 'hidden'; lb.querySelector('.x').focus(); };
    var close = function () { lb.classList.remove('on'); lb.setAttribute('aria-hidden', 'true'); b.style.overflow = ''; if (last) last.focus(); };
    items.forEach(function (it, i) { it.addEventListener('click', function () { open(i); }); });
    lb.querySelector('.x').addEventListener('click', close);
    lb.querySelector('.pv').addEventListener('click', function () { show(cur - 1); });
    lb.querySelector('.nx').addEventListener('click', function () { show(cur + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    d.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('on')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(cur - 1);
      else if (e.key === 'ArrowRight') show(cur + 1);
    });
  }
  // contact form: opens the visitor's mail program with a prepared letter
  var f = d.querySelector('.form');
  if (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (n) { return (f.elements[n].value || '').trim(); };
      if (!v('msg')) { f.elements.msg.focus(); return; }
      var body = v('msg') + '\n\n' + v('name') + '\n' + v('contact');
      location.href = 'mailto:' + f.getAttribute('data-mail') + '?subject=' + encodeURIComponent(f.getAttribute('data-subj')) + '&body=' + encodeURIComponent(body);
    });
  }
})();
