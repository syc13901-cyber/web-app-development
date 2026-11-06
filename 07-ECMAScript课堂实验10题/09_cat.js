// 2.3-1：Cat 构造函数；实例数据独立，say 方法在原型上共享。

function Cat(name) {
  this.name = name;
}

Cat.prototype.say = function say() {
  return `我是${this.name}`;
};

if (require.main === module) {
  const cat1 = new Cat("咪咪");
  const cat2 = new Cat("花花");
  console.log(cat1.say());
  console.log(cat2.say());
  console.log("两只猫共享同一个 say 方法：", cat1.say === cat2.say);
}

module.exports = { Cat };

