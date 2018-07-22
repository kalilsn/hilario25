$(function(){
  var $form = $('#volunteer-form'),
      $submit = $form.find('.submit'),
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
        $form.trigger('reset');
        $form.find('.success').show();
      },
      error: function() {
        $form.find('.error').show();
      },
    });

    return false;
  });

});
