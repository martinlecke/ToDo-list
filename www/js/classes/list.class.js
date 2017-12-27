class List {

  constructor(jsonfile) {
    this.items = [];
    this.jsonfile = jsonfile;
  }

addItem(item){
  this.items.push(item);
  return this.items;
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


// JSON Flex functions 

  addForJSON(items){
      for (let i = 0; i < items.length; i++){
        let item = new Item();
        item.description = items[i].description;
        item.completed = items[i].completed;
        this.addItem(item);
      }
  }
  removeForJSON(){
    //Empty lists for JSON add
    this.items.splice(0, this.items.length);
  }

  loadJSON(callback){
    JSON._load(this.jsonfile)
    .then((data) => {
      this.removeForJSON();
      this.addForJSON(data.items);
      callback(data.items);
    });
  }

  writeJSON(){
    JSON._save(this.jsonfile, {
        items: this.items
    });
  }
  
}