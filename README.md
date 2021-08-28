# flexImage.js
轻量级横向瀑布流插件，无依赖，兼容IE9以上，类似百度图片、谷歌图片展示效果

## 参数：{
  rowHeight: 200,          // 每行最大高度
  listenResize: false,     // 是否监听窗口大小改变更新layout
  item: '.fleximage-item', // item class类名
  itemObject: 'img'        // item子节点DOM
}

## 使用方法：
### html:
<div class="demo">
  <div class="fleximage-item" data-w="219" data-h="180"><img src="./img/1.jpg"></div>
  <div class="fleximage-item" data-w="279" data-h="180"><img src="./img/2.jpg"></div>
  <div class="fleximage-item" data-w="270" data-h="180"><img src="./img/3.jpg"></div>
  <div class="fleximage-item" data-w="270" data-h="180"><img src="./img/4.jpg"></div>
  <div class="fleximage-item" data-w="147" data-h="180"><img src="./img/5.jpg"></div>
  <div class="fleximage-item" data-w="276" data-h="180"><img src="./img/6.jpg"></div>
  <div class="fleximage-item" data-w="319" data-h="180"><img src="./img/7.jpg"></div>
  <div class="fleximage-item" data-w="270" data-h="180"><img src="./img/8.jpg"></div>
  <div class="fleximage-item" data-w="240" data-h="180"><img src="./img/9.jpg"></div>
  <div class="fleximage-item" data-w="270" data-h="180"><img src="./img/10.jpg"></div>
  <div class="fleximage-item" data-w="240" data-h="180"><img src="./img/11.jpg"></div>
  <div class="fleximage-item" data-w="270" data-h="180"><img src="./img/12.jpg"></div>
  <div class="fleximage-item" data-w="283" data-h="180"><img src="./img/13.jpg"></div>
  <div class="fleximage-item" data-w="271" data-h="180"><img src="./img/14.jpg"></div>
  <div class="fleximage-item" data-w="258" data-h="180"><img src="./img/15.jpg"></div>
</div>
### js:
var flexImage = new FlexImage(document.querySelector('.demo'), {
  rowHeight: 200,
  listenResize: true
});
// 动态插入图片，后更新
document.querySelector('.btn-append').onclick = function() {
    var items = [
        { url: './img/1.jpg', width: 219, height: 180 },
        { url: './img/2.jpg', width: 279, height: 180 },
        { url: './img/3.jpg', width: 270, height: 180 },
        { url: './img/4.jpg', width: 270, height: 180 },
        { url: './img/5.jpg', width: 147, height: 180 },
        { url: './img/6.jpg', width: 276, height: 180 },
        { url: './img/7.jpg', width: 319, height: 180 },
        { url: './img/8.jpg', width: 270, height: 180 },
        { url: './img/9.jpg', width: 240, height: 180 },
        { url: './img/10.jpg', width: 270, height: 180 }
    ]
    for (var i = 0; i < items.length; i++ ) {
        var item = items[i];
        var child = document.createElement('div');
        child.className = 'fleximage-item';
        child.setAttribute('data-w', item.width);
        child.setAttribute('data-h', item.height);
        child.innerHTML = '<img src="' + item.url + '">';
        document.querySelector('.demo').appendChild(child);
    }
    flexImage.update();
}

## 方法
flexImage.init(); 初始化或重新渲染
flexImage.update(); 更新，局部更新比init()方法轻量
