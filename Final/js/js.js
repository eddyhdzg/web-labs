$('.input_wrap').on('click', function(event){
  $(this).addClass('input_wrap_sel');
});

$('.input_wrap').focusout(function(event){
  $(this).removeClass('input_wrap_sel');
});
