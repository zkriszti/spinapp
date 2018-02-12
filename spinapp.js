'use strict';

//parents
let trackList = document.getElementById('tracklist');

let iconList = document.getElementById('iconlist');

let rowID = 1; //1st row will already be in the DOM
let markup = "<div class='trackrow'><input name='track' placeholder='add track title' class='text-input track-input' value=''><div class='drills connectedSortable'></div><input name='notes' placeholder='add your notes here' class='text-input note-input'></div>";
//ie11 won't support ` and template literals. Will need to use Babel for template literals.

//DISPLAY FIRST ROW
trackList.insertAdjacentHTML('beforeend', markup);
trackList.firstChild.setAttribute('id', 'row-' + rowID);

//ADD NEW ROW FOR NEW TRACK
function addNodeLast() {
  rowID++;
  trackList.insertAdjacentHTML('beforeend', markup);
  trackList.lastChild.setAttribute('id', 'row-' + rowID);
  //MAKE DYNAMICALLY ADDED ROWS 'LIVE'
  $( '.drills' ).sortable().disableSelection();
  $( '.drills' ).sortable('refresh').dblclick(function(e){
      $(e.target).closest("li").remove();});
  }

//REMOVE LAST ROW
function removeNodeLast() {
  if (trackList.children.length > 1) {
  let removeRow = trackList.lastChild;
  trackList.removeChild(removeRow);
  rowID--;
  }
}

//DRAG & DROP & SORT
  $(document).ready( function() {

    //DEFINE TARGET BOXES
    $( '.connectedSortable' ).sortable().disableSelection();
    $( '.connectedSortable' ).sortable('refresh');

    //DEFINE SOURCE BOX
    $( '#iconlist' ).sortable({
      connectWith: ".connectedSortable",
      opacity: 0.2,
      helper: "clone",
      cursor: 'move',
      //to still show the source element when drag is started:
      start: function(event, ui) {$('#iconlist').find('li:hidden').show();},
      //to clone the dragged element:
      remove: function (e, li) {
        let copyHelper = li.item.clone().insertAfter(li.item);
        $(this).sortable('cancel');
        copyHelper.addClass('iwasdragged');
        return li.item.clone();
      }

    }).disableSelection();

    //DEFINE 'DRILLS' BOXES THAT RECEIVE ELEMENTS
    //REMOVE DRILL-SIGN ON DOUBLECLICK
      $( '.drills' ).sortable().disableSelection().dblclick(function(e){
      $(e.target).closest("li").remove();}
    );


}); //jQuery end

//ADD PRINT BUTTON
let printButton = document.getElementById('printprofile');
printButton.addEventListener('click', function(){
                                         window.print();
                            });

//CALCULATE FOOTER POSITION WITH TIMEOUT

window.onload = function() {

function footerPos(){
    let bgImg = document.getElementById('bg');
    let bgHeight = window.getComputedStyle(bgImg).getPropertyValue('height');
    let wrapper = document.getElementById('wrapper');
    wrapper.style.minHeight = bgHeight;
}

let delay = 250; // delay between calls
let throttled = false; // are we currently throttled?

// window.resize event listener
window.addEventListener('resize', function() {
    // only run if we're not throttled
    if (!throttled) {
      // actual callback action
      footerPos();
      // we're throttled!
      throttled = true;
      // set a timeout to un-throttle
      setTimeout(function() {
          throttled = false;
        }, delay);
      }
  });

footerPos();
}