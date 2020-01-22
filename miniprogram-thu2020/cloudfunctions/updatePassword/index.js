// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'selectcourse-1zg2v',
})

const db=cloud.database()
const wxContext = cloud.getWXContext()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
  return await db.collection('password')
    .where({
      idNumber:event.id,
      password:event.oldPassword
    }).update({
      data: {
        password: event.newPassword
      }
    })
  } catch (e) {
    console.error(e)
  }
}