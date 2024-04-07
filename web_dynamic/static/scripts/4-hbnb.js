$(document).ready(function () {
  const selectedAmenities = {};

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }
    let amenityNames = Object.values(selectedAmenities).join(', ');
    if (amenityNames.length > 32) {
      amenityNames = amenityNames.slice(0, 31) + '...';
    }
    $('h4#AmenityList').text(amenityNames);
  });

  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    success: function (data) {
      if (data.status === 'OK') {
        $('header div#api_status').addClass('available');
      }
    }
  });

  function fillPlace (places) {
    $('section.places').empty();
    $.each(places, function (i, place) {
      $('section.places').append(`
        <article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guest${place.max_guest > 1 ? 's' : ''}</div>
            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms > 1 ? 's' : ''}</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms > 1 ? 's' : ''}</div>
          </div>
          <div class="user">
            <b>Owner:</b> John Lennon</div>
          <div class="description">${place.description}</div>
        </article>
      `);
    });
  }

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: JSON.stringify({}),
    contentType: 'application/json',
    success: function (places) {
      fillPlace(places);
    },
    error: function () {
      console.error('Failed to fetch places!');
    }
  });

  $('.filters button').click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({ amenities: Object.keys(selectedAmenities) }),
      contentType: 'application/json',
      success: function (places) {
        fillPlace(places);
      },
      error: function () {
        console.error('Failed to fetch places with selected filters');
      }
    });
  });
});
