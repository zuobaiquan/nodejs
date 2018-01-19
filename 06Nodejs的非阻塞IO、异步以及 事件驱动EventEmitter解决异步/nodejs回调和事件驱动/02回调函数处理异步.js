var fs=require('fs');
function getMime(callback){
    fs.readFile('mime.json',function(err,data){
        callback(data);
    })
}
getMime(function(result){
    console.log(result.toString());
})
