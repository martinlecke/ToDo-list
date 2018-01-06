let todolist = new List('todolist');
let donelist = new List('donelist');



function renderList() {
  $('#todolist').empty();
  $('#donelist').empty();
  $('.push-donelist').hide(); // Hides in jquery cause the icons loads in before hand

  let dataNumber = 0;
  if (todolist.items.length == 0) {
    let code = `
      <li class="list-group-item list-item">
      You have nothing to do, what about to add some tasks...
      </li>`;
    $('#todolist').append(code);
  } else {
    for (item of todolist.items) {
      // render todolist
      let code = `
        <li class="list-group-item list-item"><button type="button" class="btn btn-secondary completebtn `;
        if (item.completed) {
          code += 'completed';
        }
          code += `
            " data-index="${dataNumber}"></button>
            ${item.description} 
          <div class="menuitems float-right">
            <button type="button" class="btn btn-danger remove float-right" data-index="${dataNumber}">
            <i class="fa fa-trash-o" aria-hidden="true"></i>
          </button>`;
      if (dataNumber !== 0) {
        code += `
          <button type="button" class="btn btn-secondary moveup float-right" data-index="${dataNumber}">
            <i class="fa fa-arrow-up" aria-hidden="true"></i>
          </button>
        `}
      if (dataNumber !== todolist.items.length - 1) {
        code += `
          <button type="button" class="btn btn-secondary movedown float-right" data-index="${dataNumber}">
            <i class="fa fa-arrow-down" aria-hidden="true"></i>
          </button>`;
      }
      code += `</div></li>`;
      if (item.completed) {
        $('.push-donelist').fadeIn('slow');
      }
      $('#todolist').append(code);
      dataNumber++;
    }
  }

  for (item of donelist.items) {
    // render donelist
    let code = `
      <li class="list-group-item list-item"><button type="button" class="btn btn-secondary completebtn `;
      if (item.completed) {
        code += 'completed';
      }
      code += `
        " data-index="${dataNumber}"></button>
        ${item.description} 
        `;
    code += `</div></li>`;
    $('#donelist').append(code);
  }
    dataNumber++;
    if (dataNumber > 0) {
      $('.emptyDoneBtn').fadeIn('slow');

    }


  //hides menu items with jQuery instead of CSS because of loadtime
  $(document).find('.menuitems').hide();
  saveJSON();
}

function listeners() {
  $(document).on('mouseenter', '.list-item', function() {
    $(this).find('.menuitems').show();
  });
  $(document).on('mouseleave', '.list-item', function() {
    $(this).find('.menuitems').hide();
  });

  // Removes a list item
  $(document).on('click', '.remove', function() {
    $(this).parent().parent().fadeOut(500);
    let index = $(this).data('index');
    todolist.removeFromList(index);
    setTimeout(() => { 
      // rerenders after animation is made
      renderList();
    }, 500);
  });
  $(document).on('click', '.emptyDoneBtn', function() {
      donelist.items.splice(0, donelist.items.length);
      $('#donelist').fadeOut(500).fadeIn();
      setTimeout(() => { 
        // rerenders after animation is made
        renderList();
      }, 500);
  });
  // Moves up in list
  $(document).on('click', '.moveup', function() {
    let index = $(this).data('index');
    todolist.moveUp(index);
    renderList();
  });
  // Moves up in list
  $(document).on('click', '.movedown', function() {
    let index = $(this).data('index');
    todolist.moveDown(index);
    renderList();
  });
  // Adds item with button
  $(document).on('click', '.addnewbtn ', function() {
    let $selector = $('.addnew');
    if ($selector.val() !== '') {
      let newitem = new Item($selector.val());
      todolist.addItem(newitem);
      recentAdd(newitem.description);
      $selector.val('');
      renderList();
    }
  });
    // Adds item with button
  $('.addnew').on('keyup', function(e) {
    let $selector = $('.addnew');
    if ($selector.val() !== '' && e.key == 'Enter') {
      let newitem = new Item($selector.val());
      todolist.addItem(newitem);
      recentAdd(newitem.description);
      $('.addnewbtn').addClass('box-shadow-inset');
      setTimeout(() => { 
        $('.addnewbtn').removeClass('box-shadow-inset');
      }, 200);
      $selector.val('');
      renderList();
    }
  });
  $(document).on('click', '.completebtn', function() {
    let index = $(this).data('index');
    todolist.completeItem(index);
    renderList();
  });
  $(document).on('click', '.push-donelist-btn', function() {
    todolist.addCompletedToDone();
    renderList();
  });
}

function recentAdd(val) {
  $('.recent-add').html('You added: ' + val).slideDown().fadeIn().delay(2000).slideUp();
}

listeners();

// JSON Flex functions
function saveJSON(){
  todolist.writeJSON();
  donelist.writeJSON();
}

function renderJSON(){
  todolist.loadJSON(function(loadedItems){
    renderList();
  });
  // Arrow function
  donelist.loadJSON(loadedItems => renderList());
}


renderJSON();