// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'selectcourse-1zg2v'
})
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('teacher').where({
      teacherId: event.teacherId
    }).update({
      data:{
        openId:''
      }
    })
  } catch (e) {
    console.error(e)
  }
}