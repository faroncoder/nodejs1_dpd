/**
 * Created by cc on 14-2-13.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/test');
var M_Type = mongoose.model('type',{
    name:String
});
var S_Type = new M_Type();

/**
 * 发送响应
 * @param res
 * @param data
 */
var send = function(res,data){
    data.time = ((new Date()).getTime() / 1000).toFixed(0);
    res.send(data);
}

/**
 * 列表
 * @param req
 * @param res
 */
exports.list = function(req,res){
    M_Type.find({},function(err,list){
        send(res,list);
    })
}

/**
 * 添加
 * @param req
 * @param res
 */
exports.add = function(req,res){
    const data = req.body;
    if(data && data.name){
        M_Type.find({name:data.name},function(err,list){
            if(err){
            }else{
                if(list.length == 0){
                    //添加
                    S_Type.name = data.name;
                    S_Type.save(function(err,data){
                        if(err){
                            send(res,{msg:"添加失败",err:err});
                        }else{
                            send(res,{msg:"添加成功"});
                        }
                    });
                }else{
                    //已存在
                    send(res,{msg:"已存在",status:"warning"});
                }
            }
        });
    }else{
        this.send(res,data);
    }
}

