function Phone(brand, price, color){
  this.brand = brand;
  this.price = price;
  this.color = color;

  Phone.prototype.printInfo = function(){
    console.log('This phone brand is ' + this.brand + '. It costs ' + this.price + '  and color is: ' + this.color + '.');
  };

  Phone.prototype.turnOff = function(){
    alert('Type "yes" to turn off your phone');
    var command = window.prompt();
    if (command === 'yes'){
      alert('Good bye');
    } else {
      alert('Turning off - terminated');
    }
  };

  Phone.prototype.turnOn = function(){
    alert(this.brand + '\n' + 'WELCOME!');
  };

  Phone.prototype.calculator = function(){
    var computed = eval(window.prompt('Enter here your math operation'));
    alert('You result is: ' + computed);
  }
}

var samsung = new Phone('Samsung Galaxy S6', 1000, 'graphite');
var iphone = new Phone('Iphone 6s', 1200, 'pearl white');
var onePlus = new Phone('One Plus One', 800, 'saphire');