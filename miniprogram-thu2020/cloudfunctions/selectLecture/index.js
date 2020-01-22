// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const wxContext = cloud.getWXContext()
cloud.init({
  env: 'selectcourse-1zg2v',
})

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  switch(event.lecture){
    case 'lecture1':{
      return await db.collection('student').where({
        studentId: event.studentId
      }).update({
        data: {
          lecture1: event.lectureId
        }
      })
    }
    break;
    case 'lecture2': {
      return await db.collection('student').where({
        studentId: event.studentId
      }).update({
        data: {
          lecture2: event.lectureId
        }
      })
    }
    break;
    case 'lecture3': {
      return await db.collection('student').where({
        studentId: event.studentId
      }).update({
        data: {
          lecture3: event.lectureId
        }
      })
    }
    break;
    case 'lecture4': {
      return await db.collection('student').where({
        studentId: event.studentId
      }).update({
        data: {
          lecture4: event.lectureId
        }
      })
    }
    break;
    default:
    return 'error: no such lecture'
  }
}