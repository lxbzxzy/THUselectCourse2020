// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'selectcourse-1zg2v',
})

const db=cloud.database()
const wxContext = cloud.getWXContext()

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('password')
    .where({
      idNumber:event.input1,
      name: event.input2,
      password:event.input3
    }).get()
}