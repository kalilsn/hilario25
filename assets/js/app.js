// Update url in response to scroll on issues page
$links = $('#issues-sidebar .nav-link');

$(window).on('activate.bs.scrollspy', function (e) {
  history.replaceState({}, '', $links.filter('.active').attr('href'));
});

if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", function(user) {
    if (!user) {
      window.netlifyIdentity.on("login", function() {
        document.location.href = "/admin/";
      });
    }
  });
}
