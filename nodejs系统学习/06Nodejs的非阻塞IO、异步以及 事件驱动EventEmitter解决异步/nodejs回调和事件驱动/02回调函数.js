/**
 * Created by Administrator on 2017/7/3 0003.
 */
var fs=require('fs');
function getMime(callback){

    fs.readFile('mime.json',function(err,data){
        //console.log(data.toString());
        //return data;
        callback(data);
    })

}

getMime(function(result){

    console.log(result.toString());
})