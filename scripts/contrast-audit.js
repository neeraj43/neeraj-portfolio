/*
 * Contrast audit — a browser-console snippet, not a Node script.
 *
 * Walks every element that renders its own text, composites the real
 * background behind it (including translucent layers), and checks the pair
 * against WCAG AA: 4.5:1, or 3:1 for large text. Returns the failures and
 * prints a sorted table.
 *
 * Run it on the running site once per theme (npm run dev, then paste into
 * the console). Two gotchas, learned the hard way:
 *
 *   1. Switch theme with the site's own toggle and let it settle before
 *      running this. `body` transitions background-color, so reading
 *      computed styles in the same tick as a theme change reports the OLD
 *      background and every result is wrong.
 *   2. `.text-gradient` (the hero headline) reports 1:1 and can be ignored.
 *      Its `color` is transparent by design — the ink comes from a clipped
 *      background gradient. Checked by hand: the faintest end is 5.2:1 on
 *      light and 7.1:1 on dark, against a 3:1 requirement at that size.
 *
 * Focus-only styles are not covered unless you focus the element first,
 * e.g. document.querySelector('a.sr-only').focus() for the skip link.
 */

(function () {
  document.querySelectorAll('.reveal').forEach(function (e) { e.classList.add('is-visible'); });

    function parse(c) {
      var m = c.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      var n = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
      return { r: n[0], g: n[1], b: n[2], a: n.length > 3 ? n[3] : 1 };
    }
    function over(fg, bg) { // composite fg (with alpha) over opaque bg
      var a = fg.a;
      return { r: fg.r * a + bg.r * (1 - a), g: fg.g * a + bg.g * (1 - a), b: fg.b * a + bg.b * (1 - a), a: 1 };
    }
    function lin(c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
    function L(c) { return 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b); }
    function ratio(a, b) { var l1 = L(a), l2 = L(b); if (l2 > l1) { var t = l1; l1 = l2; l2 = t; } return (l1 + 0.05) / (l2 + 0.05); }

    // Effective background: walk up compositing every non-transparent layer.
    function bgOf(el) {
      var stack = [];
      var n = el;
      while (n && n.nodeType === 1) {
        var c = parse(getComputedStyle(n).backgroundColor);
        if (c && c.a > 0) stack.push(c);
        n = n.parentElement;
      }
      var base = { r: 255, g: 255, b: 255, a: 1 };
      for (var i = stack.length - 1; i >= 0; i--) base = over(stack[i], base);
      return base;
    }

    var out = [];
    var seen = {};
    document.querySelectorAll('body *').forEach(function (el) {
      // only elements with their own visible text
      var text = '';
      for (var i = 0; i < el.childNodes.length; i++)
        if (el.childNodes[i].nodeType === 3) text += el.childNodes[i].textContent.trim();
      if (!text) return;
      var cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none') return;
      var r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;

      var fg = parse(cs.color);
      if (!fg) return;
      var bg = bgOf(el);
      var eff = fg.a < 1 ? over(fg, bg) : fg;
      var cr = ratio(eff, bg);

      var size = parseFloat(cs.fontSize);
      var weight = parseInt(cs.fontWeight, 10) || 400;
      var large = size >= 24 || (size >= 18.66 && weight >= 700);
      var need = large ? 3.0 : 4.5;

      var key = cs.color + '|' + Math.round(bg.r) + ',' + Math.round(bg.g) + ',' + Math.round(bg.b) + '|' + Math.round(size);
      if (seen[key]) return;
      seen[key] = 1;

      out.push({
        pass: cr >= need,
        cr: cr.toFixed(2),
        need: need,
        size: size + 'px/' + weight,
        color: cs.color,
        bg: 'rgb(' + Math.round(bg.r) + ',' + Math.round(bg.g) + ',' + Math.round(bg.b) + ')',
        cls: String(el.className).slice(0, 55),
        text: text.slice(0, 34)
      });
    });

    out.sort(function (a, b) { return parseFloat(a.cr) - parseFloat(b.cr); });

    var fails = out.filter(function (o) { return !o.pass; });
    console.log(out.length + ' text/background combinations checked, ' + fails.length + ' below AA');
    console.table(out.map(function (o) {
      return { ok: o.pass ? 'PASS' : 'FAIL', ratio: o.cr, needs: o.need, size: o.size,
               fg: o.color, bg: o.bg, text: o.text };
    }));
    return fails;
})();
