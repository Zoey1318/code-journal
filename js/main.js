var $photo = document.getElementById('url');
var $img = document.getElementsByClassName('image-upload')[0];
var $formdata = document.getElementsByClassName('formdata')[0];

$photo.addEventListener('input', function imagentry(event) {
  if (event.target.value.match(/\.(jpeg|jpg|gif|png)$/) != null) {
    $img.setAttribute('src', event.target.value);
  } else {
    $img.setAttribute('src', './images/placeholder-image-square.jpg');
  }
});

var $title = document.getElementById('title');
var $notes = document.getElementById('notes');

$formdata.addEventListener('submit', function inputdata(event) {
  event.preventDefault();
  var inputobj = {};
  inputobj.title = $title.value;
  inputobj.notes = $notes.value;
  inputobj.photo = $photo.value;
  inputobj.entryID = data.nextEntryId;
  var renderList = renderEntry(inputobj);
  if (data.view === 'entry-edit') {
    data.entries.splice(data.entries.entryID, 1, inputobj);
    listAll.replaceWith(renderList);

  } else {
    data.nextEntryId++;
    data.entries.unshift(inputobj);
    listAll.prepend(renderList);

  }
  $img.setAttribute('src', './images/placeholder-image-square.jpg');
  $formdata.reset();
  entryView();
});

function renderEntry(entryvalue) {
  var list = document.createElement('li');
  list.setAttribute('id', entryvalue.title);
  var rowList = document.createElement('div');
  rowList.setAttribute('class', 'row');

  var columnHalf = document.createElement('div');
  columnHalf.setAttribute('class', 'column-half');
  var image = document.createElement('img');
  image.setAttribute('class', 'image-upload');
  image.src = entryvalue.photo;
  list.appendChild(rowList);
  rowList.appendChild(columnHalf);
  columnHalf.appendChild(image);

  var columnHalfTwo = document.createElement('div');
  columnHalfTwo.setAttribute('class', 'column-half');
  var innerRow = document.createElement('div');
  innerRow.setAttribute('class', 'inner-row');
  var columnFull = document.createElement('div');
  columnFull.setAttribute('class', 'column-full');
  var hFour = document.createElement('h4');
  hFour.textContent = entryvalue.title;
  var pOne = document.createElement('p');
  pOne.textContent = entryvalue.notes;
  var editIcon = document.createElement('i');
  editIcon.setAttribute('class', 'fa-solid fa-pen');
  rowList.appendChild(columnHalfTwo);
  columnHalfTwo.appendChild(innerRow);
  innerRow.appendChild(columnFull);
  innerRow.appendChild(pOne);
  columnFull.appendChild(hFour);
  columnFull.appendChild(editIcon);
  return list;
}

var listAll = document.getElementsByTagName('ul')[0];

function showEntry() {
  for (var i = 0; i < data.entries.length; i++) {
    var renderList = renderEntry(data.entries[i]);
    listAll.appendChild(renderList);
  }
  return listAll;
}

document.addEventListener('DOMContentLoaded', showEntry);

var $nav = document.getElementsByClassName('subnav')[0];
var $entryEmpty = document.querySelector('[data-view="entry-empty"]');
var $entryHistory = document.querySelector('[data-view="entry-history"]');
var $entryForm = document.querySelector('[data-view="entry-form"]');
var $entries = document.querySelector('[data-view="entries"]');
var $newbtn = document.getElementsByClassName('newbtn')[0];

function entryView() {
  data.view = 'entries';
  $entryForm.className = 'container hidden';
  $entries.className = 'container';
  if (data.entries.length !== 0) {
    $entryHistory.className = 'column-full';
    $entryEmpty.className = 'column-full hidden';
  } else {
    $entryEmpty.className = 'column-full';
    $entryHistory.className = 'column-full hidden';
  }
}

$nav.addEventListener('click', entryView);

$newbtn.addEventListener('click', function newform() {
  data.view = 'entry-form';
  $entryForm.className = 'container';
  $entries.className = 'container hidden';
});

if (data.view === 'entries') {
  $entryForm.className = 'container hidden';
  $entries.className = 'container';
  if (data.entries.length !== 0) {
    $entryHistory.className = 'column-full';
    $entryEmpty.className = 'column-full hidden';
  } else {
    $entryEmpty.className = 'column-full';
    $entryHistory.className = 'column-full hidden';
  }
}

var editTitle = document.querySelector('h1');

listAll.addEventListener('click', function (event) {
  if (event.target.matches('i')) {
    data.view = 'entry-edit';
    $entryForm.className = 'container';
    $entries.className = 'container hidden';
    editTitle.textContent = 'Edit Entry';
    var editEntry = event.target.closest('li');
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].title === editEntry.getAttribute('id')) {
        data.editing = data.entries[i];
        $title.value = data.editing.title;
        $photo.value = data.editing.photo;
        $notes.value = data.editing.notes;
        $img.setAttribute('src', data.editing.photo);
      }
    }
  }
});
