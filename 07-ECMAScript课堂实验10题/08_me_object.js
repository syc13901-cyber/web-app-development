// 2.2-4：创建描述自己的对象，包含至少 3 个属性和 1 个方法。

const me = {
  name: "小李",
  major: "网络空间安全",
  grade: 2,
  introduce() {
    return `大家好，我叫${this.name}，专业是${this.major}，现在读大${this.grade}。`;
  }
};

if (require.main === module) {
  console.log(me.introduce());
}

module.exports = { me };

