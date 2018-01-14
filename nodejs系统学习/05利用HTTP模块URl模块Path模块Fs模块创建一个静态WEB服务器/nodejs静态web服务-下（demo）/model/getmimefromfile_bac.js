exports.getMime=function(fs,extname){  /*获取后缀名的方法*/

  //.html
    console.log('1');
    fs.readFile('./mime.json',function(err,data){

        if(err){
            console.log('mime.json文件不存在');
            return false;
        }
        //console.log(data.toString());

        var Mimes=JSON.parse(data.toString());

        //console.log(Mimes[extname]);
        console.log('2');
        return Mimes[extname] || 'text/html';

    })

    console.log('3');

}
