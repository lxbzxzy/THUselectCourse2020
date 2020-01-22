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
    return await db.collection('lecture').add({
      data:{
        lectureId: event.lectureId,
        volume1:event.volume1,
        volume2:event.volume2,
        volume3:event.volume3,
        volume4:event.volume4
      }
    })
  }catch(e){
    console.error(e)
  }
}

  /*return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }*/