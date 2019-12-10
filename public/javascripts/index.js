$('#register-form').submit(function(e){
  e.preventDefault();

  var form = {
    url: $(this).attr('action'),
    type: $(this).attr('method')
  };

  $.ajax({
    url: form.url,
    type: form.type,
    data: $(this).serialize(),
    success: function(result){
      if(result.success.toString() == "false"){
        alert(result.message);
      }else{
        window.location.replace('/login');
      }
    }
  })
});

$('#login-form').submit(function(e){
  e.preventDefault();

  var form = {
    url: $(this).attr('action'),
    type: $(this).attr('method')
  };

  $.ajax({
    url: form.url,
    type: form.type,
    data: $(this).serialize(),
    success: function(result){
      if(result.success.toString() == "false"){
        console.log(result.hasil);
        alert(result.message);
      }else{
        if(typeof result.role != 'undefined' && result.role.toString() == 'admin'){
          window.location.replace('/admin');
        }else{
          window.location.replace('/');
        }
      }
    }
  })
});

function rot(s){
  return s.replace(/[a-zA-Z]/g, function (c) {
    return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
  });
}

$('#decTextArea').on('keyup', function(){
  $('#encTextArea').val(rot($(this).val()));
});
