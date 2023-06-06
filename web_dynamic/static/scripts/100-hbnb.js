$(function () {

  //task 2
  let amenity_list = {};
  // resets checked state if list when refreshed
  $(".amenities li input[type='checkbox']").prop('checked', false);
  $(".amenities li input[type='checkbox']").change(function () {
    // updaes the dict. based 
    // on the state of the checked box
    if ($(this).prop('checked')) {
      amenity_list[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenity_list[$(this).attr('data-id')];
    }
    // updates H4 element in amenities cls 
    console.log(amenity_list);
    $('.amenities h4').text(Object.values(amenity_list).join(', '));
  });


  // task 100-1
  let state_list = {};
  $(".locations h2 li.s input[type='checkbox']").prop('checked', false);
  $(".locations h2 li.s input[type='checkbox']").change(function () {
    if ($(this).prop('checked')) {
      state_list[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete state_list[$(this).attr('data-id')];
    }
    console.log(state_list);
    // updates h4 elements in loacation cls
    $('.locations h4').text(Object.values(state_list).join(', '));
  });

  // task 100-2
  let city_list = {};
  $(".locations li.c input[type='checkbox']").prop('checked', false);
  $(".locations li.c input[type='checkbox']").change(function () {
    if ($(this).prop('checked')) {
      city_list[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete city_list[$(this).attr('data-id')];
    }
    console.log(city_list);
  });

  // task 3
  $.ajax('http://0.0.0.0:5001/api/v1/status/').done(function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

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

  // task 5
  $("button").click(() => { 
    if (amenity_list) {
      $.ajax('http://0.0.0.0:5001/api/v1/places_search/', {
        type: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify({'amenities': Object.keys(amenity_list), 'states': Object.keys(state_list), 'cities': Object.keys(city_list)}),
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
        });
    }
  });
});
