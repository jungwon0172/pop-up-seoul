// 쿠키 동의 배너 (localStorage 기반)
(function () {
  var KEY = 'seoulscene_cookie_consent';
  var banner = document.getElementById('cookie-consent');
  if (!banner) return;
  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  if (!stored) banner.hidden = false;

  var accept = document.getElementById('cookie-accept');
  var decline = document.getElementById('cookie-decline');
  function hide(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
    banner.hidden = true;
  }
  if (accept) accept.addEventListener('click', function () { hide('accepted'); });
  if (decline) decline.addEventListener('click', function () { hide('declined'); });
})();

// 카테고리 / 지역 / 무료 필터
(function () {
  var grid = document.getElementById('ticket-grid');
  if (!grid) return;

  var catGroup = document.getElementById('filter-category');
  var areaGroup = document.getElementById('filter-area');
  var freeBtn = document.getElementById('filter-free');

  var state = { category: 'all', area: 'all', free: false };

  function applyFilters() {
    var cards = grid.querySelectorAll('.ticket');
    cards.forEach(function (card) {
      var matchCat = state.category === 'all' || card.dataset.category === state.category;
      var matchArea = state.area === 'all' || card.dataset.area === state.area;
      var matchFree = !state.free || card.dataset.free === 'True';
      var show = matchCat && matchArea && matchFree;
      card.style.display = show ? '' : 'none';
    });
  }

  if (catGroup) {
    catGroup.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-filter-category]');
      if (!btn) return;
      state.category = btn.dataset.filterCategory;
      catGroup.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('chip-active'); });
      btn.classList.add('chip-active');
      applyFilters();
    });
  }

  if (areaGroup) {
    areaGroup.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-filter-area]');
      if (!btn) return;
      state.area = btn.dataset.filterArea;
      areaGroup.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('chip-active'); });
      btn.classList.add('chip-active');
      applyFilters();
    });
  }

  if (freeBtn) {
    if (freeBtn.classList.contains('chip-active')) state.free = true;
    freeBtn.addEventListener('click', function () {
      state.free = !state.free;
      freeBtn.classList.toggle('chip-active', state.free);
      applyFilters();
    });
  }

  applyFilters();
})();
