$(function(){
  var $form = $('#volunteer-form'),
      $submit = $form.find('.submit'),
      $error = $form.parent().find('.error'),
      url = 'https://script.google.com/macros/s/AKfycbyfz1cHGt6XQTiIZurutn_Fe3EiOQ1ljHU77tH_x7QQxzGHmBI/exec'
    ;

  $submit.click(function(e) {
    var data = {};
    $form.serializeArray().forEach(function(field){
      data[field.name] = field.value;
    });

    $.ajax({
      url: url,
      dataType: 'json',
      data: data,
      success: function() {
        $form.hide();
        $error.hide();
        $form.parent().find('.success').show();
      },
      error: function() {
        $error.show();
      },
    });

    return false;
  });

});
