/**
 * Created by Administrator on 2017/3/11 0011.
 */
/*

 Node.js 事件循环:

 Node.js 是单进程单线程应用程序，但是通过事件和回调支持并发，所以性能非常高。
 Node.js 的每一个 API 都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发。

 Node.js 有多个内置的事件，我们可以通过引入 events 模块，并通过实例化 EventEmitter 类来绑定和监听事件，

 如下实例：

* */
// 引入 events 模块

var events=require('events');

//console.log(events);

var EventEmitter=new events.EventEmitter();

//广播 和接收广播

EventEmitter.on('to_mime',function(data){

    console.log(data);

})

//监听to_parent的广播
EventEmitter.on('to_parent',function(data){
    //console.log('接收到了这个广播事件');

    console.log(data);

    EventEmitter.emit('to_mime','给mime发送的数据')

})

setTimeout(function(){
    console.log('开始广播...');
    //广播to_parent事件
    EventEmitter.emit('to_parent','发送的数据')

},1000);