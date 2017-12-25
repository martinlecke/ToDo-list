let todolist = new List();
let itemone = new Item('Lägga upp matbilder på instagram');
let itemtwo = new Item('Köpa julklappar');
let itemthree = new Item('Klippa gräset');
let itemfour = new Item('Klippa till grannen');
let itemfive = new Item('Läsa javascript hela julen');
let itemsix = new Item('Fixa till så det finns en Done list');

todolist.addItem(itemone);
todolist.addItem(itemtwo);
todolist.addItem(itemthree);
todolist.addItem(itemfour);
todolist.addItem(itemfive);
todolist.addItem(itemsix);

function renderList() {
  $('#todolist').empty();
  let dataNumber = 0;
  for (item of todolist.items) {
    console.log(item.completed);
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
    $('#todolist').append(code);
    dataNumber++;

  }
  //hides menu items with jQuery instead of CSS because of loadtime
  $(document).find('.menuitems').hide();
}

function listeners() {
  $(document).on('mouseenter', '.list-item', function() {
    $(this).find('.menuitems').fadeIn(200);
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

}

renderList();
listeners();