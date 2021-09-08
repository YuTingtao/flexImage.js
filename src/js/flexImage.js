/*
 * flexImage.js 1.0.0
 * description: 轻量级横向瀑布流插件，无依赖，兼容IE9以上，类似百度图片、谷歌图片展示效果
 * https://github.com/YuTingtao/flexImage.js
 * author: 735126858@qq.com
 * license: MIT
 */
;(function(global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory();
    } else {
        global.FlexImage = factory();
    }
}(this, (function() {
    var defaults = {
        rowHeight: 200,          // 每行最大高度
        listenResize: false,     // 是否监听窗口大小改变更新layout
        item: '.fleximage-item', // item class类名
        itemObject: 'img'        // item子节点DOM
    }
    // 构造函数
    function FlexImage(el, options) {
        var _this = this;
        this.el = el;
        this.opt = this.extend(defaults, options);
        this.lastRows = []; // 最后一行
        this.itemLength = 0; // item长度
        this.init();
        // 窗口大小改变时是否更新layout
        if (this.opt.listenResize) {
            window.addEventListener('resize', function() {
                _this.setLayout();
            });
        }
    }

    FlexImage.prototype = {
        constructor: FlexImage,
        // 对象合并
        extend: function(defaults, options) {
            for(var key in defaults) {
                if(defaults.hasOwnProperty(key) && (!options.hasOwnProperty(key))){
                    options[key] = defaults[key];
                }
            }
            return options;
        },
        // 获取样式
        getStyle: function(el) {
            return window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle;
        },
        // 获取DOM水平方向 margin + border 的宽度
        getMbWidth: function(el) {
            var style = this.getStyle(el);
            return (parseInt(style.marginLeft) || 0) +
                (parseInt(style.marginRight) || 0) +
                (Math.round(parseFloat(style.borderLeftWidth)) || 0) +
                (Math.round(parseFloat(style.borderRightWidth)) || 0);
        },
        // 设置布局
        setLayout: function(items) {
            var elWidth = parseInt(this.getStyle(this.el).width), // 最大宽度
                o = this.opt,
                items = items || this.el.querySelectorAll(o.item);
                rows = [],                 // 行
                rowWidth = 0,              // 行宽
                rowHeight = o.rowHeight,   // 行高
                rowMbWidth = 0,            // 行水平方向的 margin + border
                showWidth = 0,             // 最终显示的宽度
                ratio = 1;                 // 比例
            // 循环
            for (var i = 0; i < items.length; i++) {
                var item = items[i],
                    itemObject = item.querySelector(o.itemObject);
                    itemDataW = parseInt(item.getAttribute('data-w')),
                    itemWidth = itemDataW * (o.rowHeight / parseInt(item.getAttribute('data-h')));
                // 设置item和itemObject宽高
                item.style.float = 'left';
                item.style.width = itemWidth + 'px';
                item.style.height = o.rowHeight + 'px';
                itemObject.style.width = '100%';
                itemObject.style.height = '100%';
                // 计算每行的数据
                rows.push(item);
                rowMbWidth += this.getMbWidth(item); 
                rowWidth += itemWidth + this.getMbWidth(item);
                // 保留最后一行数据
                if (i == items.length - 1) {
                    this.lastRows = rows;
                }
                // 精确计算行当中的每个item宽度
                if (rowWidth >= elWidth) {
                    var exactWidth = 0;
                    ratio = (elWidth - rowMbWidth) / (rowWidth - rowMbWidth);
                    rowHeight = Math.round(o.rowHeight * ratio);
                    for (var j = 0; j < rows.length; j++) {
                        showWidth = Math.round(parseInt(rows[j].style.width) * ratio);
                        exactWidth += showWidth + this.getMbWidth(rows[j]);
                        // 计算每行最后一个的宽度
                        if (exactWidth > elWidth || exactWidth + rows.length > elWidth) {
                            showWidth -= exactWidth - elWidth;
                        }
                        // 设置item宽高
                        rows[j].style.width = showWidth + 'px';
                        rows[j].style.height = rowHeight + 'px';
                    }
                    // 重置行的数据
                    rows = [];
                    rowMbWidth = 0;
                    rowWidth = 0;
                }
            }
        },
        // 初始化
        init: function() {
            var el = this.el,
                o = this.opt,
                items = el.querySelectorAll(o.item);
            this.itemLength = items.length;
            this.setLayout();
            return this;
        },
        // 更新
        update: function() {
            var el = this.el,
                o = this.opt;
            var items = el.querySelectorAll(o.item);
            if (items && items.length > this.itemLength) {
                var newItems = this.lastRows;
                for (var i = this.itemLength; i < items.length; i++) {
                    newItems.push(items[i]);
                }
                this.itemLength = items.length;
                this.setLayout(newItems);
            }
            return this;
        }
    }
    
    return FlexImage;
})));
