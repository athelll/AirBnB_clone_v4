$(function () {
  let amn ={};
  // resets checked state if list when refreshed
  $("li input[type='checkbox']").prop('checked', false);

  // runs function on chenged event of checkbox
  $("li input[type='checkbox']").change(function () {
      
  let name = $(this).data('data-name');
  if (amn.length === 0) $('.amenities h4').html('&nbsp');
  // updaes the dict. based on the state of the
  // checked box 
  if ($(this).prop('checked')) {
    amn[$(this).attr('data-id')] = $(this).attr('data-name');
  } else {
    delete amn[$(this).attr('data-id')];
  }
  // updates H4 element in amenities cls 
  $('.amenities h4').text(Object.values(amn).join(', '));
  });
});
