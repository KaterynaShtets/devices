   'use strict'

   function Device(power) {
       this._power = power;
       this._enabled = false

   }
   Device.prototype.enable = function () {
       this._enabled = true;
   };
   Device.prototype.disable = function () {
       this._enabled = false;
   };
   Device.prototype._powerValid = function (power) {
       if (typeof power === 'number') {
           this._power = power;
       }
   };
   Device.prototype.setPower = function (power) {
       this._powerValid(power);
   }

   function CoffeeMachine(power, capacity) {
       Device.apply(this, arguments);
       this._capacity = capacity;
       this._waterAmount;
       this._timerId;
   }
   CoffeeMachine.prototype = Object.create(Device.prototype)
   CoffeeMachine.prototype.constructor = CoffeeMachine;

   CoffeeMachine.prototype.WATER_HEAT_CAPACITY = 4200;
   CoffeeMachine.prototype._waterAmountValid = function (amount) {
       if (typeof amount === 'number' && amount > 0 && amount < this._capacity) {
           this._waterAmount = amount
       }
   }

   CoffeeMachine.prototype.setWaterAmount = function (amount) {
       if (amount < 0) {
           throw new Error("Значение должно быть положительным");
       }
       if (amount > this._capacity) {
           throw new Error("Нельзя залить больше, чем " + capacity);
       }
       this._waterAmountValid(amount)
   }
   CoffeeMachine.prototype.getTimeToBoil = function () {
       return this._waterAmount * this.WATER_HEAT_CAPACITY * 80 / this.power;
   }
   CoffeeMachine.prototype.disable = function () {
       Device.prototype.disable()
       clearTimeout(this.timerId)
       alert('Кофеварка остановлена')
   }
   CoffeeMachine.prototype._onReady = function () {
       alert('Готов кофе: ' + this._waterAmount + 'мл');
       // Готов кофе: 150 мл
   }
   CoffeeMachine.prototype.run = function () {
       if (!this._enabled) {
           throw new Error("Кофеварка выключена")
       }
       self = this;
       this._timerId = setTimeout(function () {
           CoffeeMachine.prototype._onReady.call(self)
       }, this.getTimeToBoil())
   }

   CoffeeMachine.prototype.addWater = function (amount) {
       this.setWaterAmount(this._waterAmount + amount);
   };

   function Fridge(power) {
       Device.apply(this, arguments)
       this._food = [];
   }
   Fridge.prototype = Object.create(Device.prototype)
   Fridge.prototype.constructor = Fridge;
   Fridge.prototype.addFood = function () {
       for (var i = 0; i < arguments.length; i++) {
           this._food.push(arguments[i])
       }
       if (!this._enabled) {
           throw new Error("Холодильник выключен");
       }
       if (this._food.length + arguments.length > this._power / 100) {
           throw new Error("Нельзя добавить, не хватает мощности");
       }
   }
   Fridge.prototype._getFood = function () {
       var res = 'В холодильнике: ' + this._food
       return res;
   }

   function Light(power) {
       Device.apply(this, arguments)

   }

   Light.prototype = Object.create(Device.prototype)
   Light.prototype.constructor = Light;

   Light.prototype.checkEnable = function () {
       if (!this._enabled) {
           throw new Error('Свет выключен')
       } else {
           alert('Свет включен на мощности :' + this._power)
       }
   }

   function Microwave(power) {
       Device.apply(this, arguments)
   }
   Microwave.prototype = Object.create(Device.prototype)
   Microwave.prototype.constructor = Microwave;
   Microwave.prototype._onReady = function () {
       alert('Еда нагрета');
   }
   Microwave.prototype._getTimeToCook = function () {
       var time = prompt('Установите время для подогрева', '');
       return time
   }
   Microwave.prototype.run = function () {
       if (!this._enabled) {
           throw new Error("Микроволновка выключена");
       }
       this._timerId = setTimeout(this._onReady, Microwave.prototype._getTimeToCook());
   };
   Microwave.prototype.disable = function () {
       Device.prototype.disable.apply(this);
       clearTimeout(this._timerId);
       alert('Микроволновка остановлена')
   }

   var coffeeMachine = new CoffeeMachine(100000, 400);
   coffeeMachine.enable();
   coffeeMachine.setPower(1000)
   coffeeMachine.setWaterAmount(100);
   coffeeMachine.addWater(200);
   coffeeMachine.addWater(100);
   coffeeMachine.run();

   //coffeeMachine.disable();-остановит
   //coffeeMachine.addWater(300); // Нельзя залить больше..

   var fridge = new Fridge(500);

   fridge.setPower(1000);
   fridge.enable();
   fridge.addFood("котлета");
   fridge.addFood("сок", "варенье");
   fridge.addFood("торт");
   //fridge.disable()
   alert(fridge._getFood());
   var light = new Light(100);
   light.enable();
   light.setPower(180);
   light.checkEnable();

   //light.disable();
   var microwave = new Microwave(300);
   microwave.enable();
   microwave.run();
   //microwave.disable();