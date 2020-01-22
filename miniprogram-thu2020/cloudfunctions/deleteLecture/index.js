// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'selectcourse-1zg2v',
})

const db=cloud.database()
const wxContext = cloud.getWXContext()
//const id = event.selectedID;
// 云函数入口函数
exports.main = async (event, context) => {
  try{
    return await db.collection('lecture').where({
      lectureId:event.lectureId
    }).remove()
  }catch(e){
    console.error(e);
  }
}

  /*return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }*/