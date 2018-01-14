exports.getMime=function(fs,extname){  /*获取后缀名的方法*/
    //把读取数据改成同步
    var data=fs.readFileSync('./mime.json');
    //data.toString() 转换成json字符串
    var Mimes=JSON.parse(data.toString());  /*把json字符串转换成json对象*/
    return Mimes[extname] || 'text/html';
}
