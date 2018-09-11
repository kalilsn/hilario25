// Update url in response to scroll on issues page
$links = $('#issues-sidebar .nav-link');

$(window).on('activate.bs.scrollspy', function (e) {
  history.replaceState({}, '', $links.filter('.active').attr('href'));
});
