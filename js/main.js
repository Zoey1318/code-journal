var $photo = document.getElementById('url');
var $img = document.getElementsByClassName('imageUpload')[0];
var $formdata = document.getElementsByClassName('formdata')[0];

$photo.addEventListener('input', function (event) {
  if (event.target.value.match(/\.(jpeg|jpg|gif|png)$/) != null) {
    $img.setAttribute('src', event.target.value);
  } else {
    $img.setAttribute('src', './images/placeholder-image-square.jpg');
  }
});

var $title = document.getElementById('title');
var $notes = document.getElementById('notes');

$formdata.addEventListener('submit', function (event) {
  event.preventDefault();
  var inputobj = {};
  inputobj.title = $title.value;
  inputobj.notes = $notes.value;
  inputobj.photo = $photo.value;
  inputobj.entryID = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(inputobj);
  $img.setAttribute('src', './images/placeholder-image-square.jpg');
  $formdata.reset();
});
