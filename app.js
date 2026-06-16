/* Accelerate Plumbing & Heating — site behaviour
   Vanilla JS, no dependencies. Progressive enhancement only. */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  /* ---- hover / focus styles (from data-hover / data-focus attributes) ---- */
  function applyState(el, attr) {
    if (el.__base === undefined) el.__base = el.getAttribute('style') || '';
    el.setAttribute('style', el.__base + ';' + el.getAttribute(attr));
  }
  function clearState(el) {
    if (el.__base !== undefined) el.setAttribute('style', el.__base);
  }
  function wireStates() {
    document.querySelectorAll('[data-hover]').forEach(function (el) {
      el.addEventListener('mouseenter', function () { applyState(el, 'data-hover'); });
      el.addEventListener('mouseleave', function () { clearState(el); });
    });
    document.querySelectorAll('[data-focus]').forEach(function (el) {
      el.addEventListener('focus', function () { applyState(el, 'data-focus'); });
      el.addEventListener('blur', function () { clearState(el); });
    });
  }

  /* ---- mobile menu ---- */
  function wireMenu() {
    var btn = document.getElementById('navToggle');
    var panel = document.getElementById('navPanel');
    if (!btn || !panel) return;
    btn.addEventListener('click', function () {
      panel.style.display = (panel.style.display === 'block') ? 'none' : 'block';
    });
  }

  /* ---- count-up stats (Home) ---- */
  function runCounters() {
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var dec = el.getAttribute('data-dec') === '1';
      var suffix = el.getAttribute('data-suffix') || '';
      var dur = 1500, start = performance.now();
      function step(now) {
        var p = Math.min(1, (now - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        var v = target * eased;
        el.textContent = (dec ? v.toFixed(1) : Math.round(v).toLocaleString()) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  function wireCounters() {
    var band = document.querySelector('[data-counters]');
    if (!band || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { runCounters(); io.disconnect(); }
      });
    }, { threshold: 0.35 });
    io.observe(band);
  }

  /* ---- helpers ---- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function showErr(id, msg) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg;
    el.style.display = msg ? 'block' : 'none';
  }
  function mailto(subjectName, body) {
    return 'mailto:acceleratepandh@gmail.com?subject=' +
      encodeURIComponent('Quote request — ' + (subjectName || 'New enquiry')) +
      '&body=' + encodeURIComponent(body);
  }

  /* ---- Home lead form ---- */
  function wireLeadForm() {
    var btn = document.getElementById('lead-submit');
    if (!btn) return;
    var name = document.getElementById('lead-name');
    var phone = document.getElementById('lead-phone');
    var email = document.getElementById('lead-email');
    var city = document.getElementById('lead-city');
    var service = document.getElementById('lead-service');
    [name, phone, email].forEach(function (inp) {
      if (inp) inp.addEventListener('input', function () {
        showErr('lead-err-' + inp.id.replace('lead-', ''), '');
      });
    });
    btn.addEventListener('click', function () {
      var ok = true;
      showErr('lead-err-name', ''); showErr('lead-err-phone', ''); showErr('lead-err-email', '');
      if (!name.value.trim()) { showErr('lead-err-name', 'Please enter your name.'); ok = false; }
      if (!phone.value.trim()) { showErr('lead-err-phone', 'Please enter a phone number.'); ok = false; }
      if (email.value.trim() && !EMAIL_RE.test(email.value.trim())) { showErr('lead-err-email', 'That email doesn’t look right.'); ok = false; }
      if (!ok) return;
      var body = 'Name: ' + name.value + '\n' +
        'Phone: ' + phone.value + '\n' +
        'Email: ' + email.value + '\n' +
        'City/Town: ' + city.value + '\n' +
        'Service: ' + (service.value || '(not specified)');
      document.getElementById('lead-mailto').setAttribute('href', mailto(name.value, body));
      document.getElementById('lead-name-out').textContent = name.value;
      document.getElementById('lead-form').style.display = 'none';
      document.getElementById('lead-success').style.display = 'block';
    });
  }

  /* ---- Contact form ---- */
  function wireContactForm() {
    var btn = document.getElementById('c-submit');
    if (!btn) return;
    var name = document.getElementById('c-name');
    var email = document.getElementById('c-email');
    var phone = document.getElementById('c-phone');
    var address = document.getElementById('c-address');
    var scope = document.getElementById('c-scope');
    [name, email, phone, scope].forEach(function (inp) {
      if (inp) inp.addEventListener('input', function () {
        showErr('c-err-' + inp.id.replace('c-', ''), '');
      });
    });
    btn.addEventListener('click', function () {
      var ok = true;
      ['name', 'email', 'phone', 'scope'].forEach(function (f) { showErr('c-err-' + f, ''); });
      if (!name.value.trim()) { showErr('c-err-name', 'Please enter your name.'); ok = false; }
      if (!email.value.trim()) { showErr('c-err-email', 'Please enter your email.'); ok = false; }
      else if (!EMAIL_RE.test(email.value.trim())) { showErr('c-err-email', 'That email doesn’t look right.'); ok = false; }
      if (!phone.value.trim()) { showErr('c-err-phone', 'Please enter a phone number.'); ok = false; }
      if (!scope.value.trim()) { showErr('c-err-scope', 'Let us know what you need done.'); ok = false; }
      if (!ok) return;
      var body = 'Name: ' + name.value + '\n' +
        'Phone: ' + phone.value + '\n' +
        'Email: ' + email.value + '\n' +
        'Address: ' + address.value + '\n\n' +
        'Scope of work:\n' + scope.value;
      document.getElementById('c-mailto').setAttribute('href', mailto(name.value, body));
      document.getElementById('c-name-out').textContent = name.value;
      document.getElementById('contact-form').style.display = 'none';
      document.getElementById('contact-success').style.display = 'block';
    });
    var reset = document.getElementById('c-reset');
    if (reset) reset.addEventListener('click', function () {
      [name, email, phone, address, scope].forEach(function (i) { if (i) i.value = ''; });
      document.getElementById('contact-success').style.display = 'none';
      document.getElementById('contact-form').style.display = 'block';
    });
  }

  ready(function () {
    wireStates();
    wireMenu();
    wireCounters();
    wireLeadForm();
    wireContactForm();
  });
})();
