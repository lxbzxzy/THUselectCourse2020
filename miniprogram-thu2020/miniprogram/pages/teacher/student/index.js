const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    general:true,
    selected:true,
    studentInfo:[],
    student0:{
      studentId:'学号',
      studentName:'姓名',
      lecture1: 1, lecture2: 2, lecture3: 3, lecture4: 4,
    },
    detailStudent:{},
  },
  
  onLoad:function(){
    var that=this;
    wx.cloud.callFunction({
      name: 'studentAll',
      success: function (ret) {
        that.setData({ studentInfo: ret.result.data })
      }
    })
  },

  select:function(){
    this.setData({
      selected:false
    })
  },
  notselect: function () {
    this.setData({
      selected: true
    })
  },

  transferDay: function (num) {
    if (num == 1) return '一'; if (num == 2) return '二';
    if (num == 3) return '三'; if (num == 4) return '四';
    if (num == 5) return '五'; if (num == 6) return '六';
    if (num == 7) return '日';
  },
  transferTime: function (num) {
    if (num == 1) return '上午';
    if (num == 2) return '下午';
    if (num == 3) return '晚上';
  },

  studentDetail:function(e){
    var num = e.currentTarget.dataset.index;
    /*
    var detailStudent=this.data.studentInfo[num];
    这个是一个引用
    */
    var detailStudent={
      studentId:'0',
      studentName:'',
      lecture1: '', lecture2: '', lecture3: '', lecture4: '',
    }
    detailStudent.studentId = this.data.studentInfo[num].studentId;
    detailStudent.studentName = this.data.studentInfo[num].studentName;
    var id;
    console.log(detailStudent)
    this.setData({
      detailStudent:detailStudent
    })
    id = this.data.studentInfo[num].lecture1;
    console.log(id)
    if (id != null) detailStudent.lecture1 = parseInt(id / 100) + '周周' + this.transferDay(parseInt((id % 100) / 10)) + this.transferTime(id % 10);
    else detailStudent.lecture1='未修';
    id = this.data.studentInfo[num].lecture2;
    if (id != null) detailStudent.lecture2 = parseInt(id / 100) + '周周' + this.transferDay(parseInt((id % 100) / 10)) + this.transferTime(id % 10);
    else detailStudent.lecture2 = '未修';
    id = this.data.studentInfo[num].lecture3;
    if (id != null) detailStudent.lecture3 = parseInt(id / 100) + '周周' + this.transferDay(parseInt((id % 100) / 10)) + this.transferTime(id % 10);
    else detailStudent.lecture3 = '未修';
    id = this.data.studentInfo[num].lecture4;
    if(id!=null) detailStudent.lecture4 = parseInt(id / 100) + '周周' + this.transferDay(parseInt((id % 100) / 10)) + this.transferTime(id % 10);
    else detailStudent.lecture4 = '未修';
    this.setData({
      detailStudent:detailStudent,
      general:false
    })
  },

  returnGeneral: function () {
    this.setData({
      general: true
    })
  },
})