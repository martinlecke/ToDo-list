class List {

  constructor() {
    this.items = [];
  }

addItem(item){
  this.items.push(item);
  return this.items;
}

addToTopOfList(item){
  this.items.unshift(item);
  return this.items;
}
removeFromBottomOfList(){
  return this.items.pop();
}

removeFromTopOfList(){
  return this.items.shift();
}

removeFromList(index){
  if(index >= 0){
    return this.items.splice(index,1);
  }
}

completeItem(index) {
  if (this.items[index].completed) {
    this.items[index].completed = false;
  } else {
    this.items[index].completed = true;
  }
  return this.items;
}

addCompletedToDone(){
  for (let i = 0; i < this.items.length; i++) {
    if (this.items[i].completed) {
      donelist.items.push(this.items[i]);
      todolist.items.splice(i, 1);
    }
  }
  return this.items;
}

moveToTop(item){
  this.addToTopOfList(removeFromListByName(item));
  return this.items;
}


moveDown(index){
  let item = this.items[index];
  if(index + 1 < this.items.length){
    this.items[index] = this.items[index + 1];
    this.items[index + 1] = item;
  }
  return this.items;
}

moveUp(index){
  let item = this.items[index];
  if(index > 0){
    this.items[index] = this.items[index - 1];
    this.items[index - 1] = item;
  }
  return this.items;
}

}