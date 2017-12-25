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
  this.items[index].completed = true;
  return this.items;
}

removeFromListAndAddToDone(item){
  this.items.push(removeFromListByName(item));
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