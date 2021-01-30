/* Popup window show */

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus');
});
