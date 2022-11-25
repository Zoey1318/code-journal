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
var listChild = document.getElementsByTagName('li');

$formdata.addEventListener('submit', function (event) {
  event.preventDefault();
  var inputobj = {};
  inputobj.title = $title.value;
  inputobj.notes = $notes.value;
  inputobj.photo = $photo.value;
  if (data.view === 'entry-edit') {
    inputobj.entryID = data.editing.entryID;
    data.entries[data.entries.length - data.editing.entryID] = inputobj;
    listChild[data.entries.length - data.editing.entryID].replaceWith(renderEntry(inputobj));
  } else {
    inputobj.entryID = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(inputobj);
    listAll.prepend(renderEntry(inputobj));
  }
  $img.setAttribute('src', './images/placeholder-image-square.jpg');
  entryView();
  $formdata.reset();
});

function renderEntry(entryvalue) {
  var list = document.createElement('li');
  list.setAttribute('data-entryid', entryvalue.entryID);

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
  editIcon.setAttribute('class', 'fa-solid fa-pen edit-entry');
  editIcon.setAttribute('data-id', entryvalue.entryID);
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
  $img.setAttribute('src', './images/placeholder-image-square.jpg');
  $formdata.reset();
}

$nav.addEventListener('click', entryView);

var editTitle = document.querySelector('h1');

$newbtn.addEventListener('click', function newform() {
  data.view = 'entry-form';
  editTitle.textContent = 'New Entry';
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

listAll.addEventListener('click', function editEntry(event) {
  if (event.target.nodeName === 'I') {
    data.view = 'entry-edit';
    $entryForm.className = 'container';
    $entries.className = 'container hidden';
    editTitle.textContent = 'Edit Entry';
    var editList = event.target.closest('li');
    data.editing = data.entries[data.entries.length - editList.getAttribute('data-entryid')];
    $title.value = data.editing.title;
    $photo.value = data.editing.photo;
    $notes.value = data.editing.notes;
    $img.setAttribute('src', data.editing.photo);
  }
});
