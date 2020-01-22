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
  switch (event.lecture) {
    case 'lecture1': {
      return await db.collection('student').where({
        studentId: event.studentId
      }).update({
        data: {
          lecture1: null
        }
      })
    }
      break;
    case 'lecture2': {
      return await db.collection('student').where({
        studentId: event.studentId
      }).update({
        data: {
          lecture2: null
        }
      })
    }
      break;
    case 'lecture3': {
      return await db.collection('student').where({
        studentId: event.studentId
      }).update({
        data: {
          lecture3: null
        }
      })
    }
      break;
    case 'lecture4': {
      return await db.collection('student').where({
        studentId: event.studentId
      }).update({
        data: {
          lecture4: null
        }
      })
    }
      break;
    default:
      return 'error: no such lecture'
  }
}

  /*return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }*/