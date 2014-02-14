/**
 * Created by cc on 14-2-13.
 */
/**
 * 显示首页
 * @param req
 * @param res
 */
exports.index = function(req,res){
    res.render("type",{app:"type",key:"list",title:Math.random()});
}