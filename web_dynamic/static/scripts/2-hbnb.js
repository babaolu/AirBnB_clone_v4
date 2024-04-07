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
});
