$(function () {
  
  // task 4
  $.ajax('http://0.0.0.0:5001/api/v1/places_search/', {
      type: 'POST',
      data: JSON.stringify({}),
      headers: {'Content-Type': 'application/json'},
      success : (data) => {
                  if (data){
                    for (key of data) {
                      $('.places').append(
                        "<article>" +
                            "<div class='title_box'>" +
                                "<h2>"+ key.name +"</h2>" +
                                "<div class='price_by_night'>" + key.price_by_night + "</div>" +
                            "</div>" +
                            "<div class='information'>" + 
                                "<div class='max_guest'>" + key.max_guest + "</div>" +
                                "<div class='number_rooms'>" + key.number_rooms + "</div>" +
                                "<div class='number_bathrooms'>" + key.number_bathrooms + "</div>" +
                            "</div>" +
                            "<div class='user'>" +
                                "<b>Owner:</b>" + key.first_name + key.last_name +
                            "</div>" +
                            "<div class='description'>" +
                                key.description +
                            "</div>" +
                        "</article>"
                      );
                      console.log(key);
                    }
                }
      }
    }
);


  // task 3
  $.ajax('http://0.0.0.0:5001/api/v1/status/').done(function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });



  //task 2
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
