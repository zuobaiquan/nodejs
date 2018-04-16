var fs=require('fs');
//console.log('1');

//fs.readFile('mime.json',function(err,data){
//    //console.log(data);
//    console.log('2');
//})
//console.log('3');

function getMime(){
    //1
    fs.readFile('mime.json',function(err,data){
        //console.log(data.toString());
        return data;//3
    })
    //2
    //return '123';
}

console.log(getMime());/*由于异步操作没有拿到数据，如何解决，通过异步操作*/
