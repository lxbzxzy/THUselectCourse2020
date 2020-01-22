const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    general:true,
    week: 0,
    day: 0,
    dayShow: '',
    dealingItem0: {
      id:0,
      time: '开课时间',
      lecture1: 'exp1',
      lecture2: 'exp2',
      lecture3: 'exp3',
      lecture4: 'exp4',
      style:''
    },
    dealtData:[],

    classmateLecture1:[],
    classmateLecture2: [],
    classmateLecture3: [],
    classmateLecture4: [],
    nowSelect:'',
    nowId:0
  },

  studentInfo:[],
  courseInfo:[],

  dealWithData:function(){
    var studentInfo=this.studentInfo;
    var courseInfo=this.courseInfo;
    var dealingDataPre=[];
    for(let i in courseInfo){
      var dealingItem = {
        id: 0,
        time: '开课时间',
        lecture1: '..',
        lecture2: '..',
        lecture3: '..',
        lecture4: '..',
        style: ''
      }
      var id = courseInfo[i].lectureId;
      dealingItem.id = id;
      dealingItem.time = parseInt(id / 100) + '周周' + this.transferDay(parseInt((id % 100) / 10)) + this.transferTime(id % 10);
      if (parseInt(id / 100) == this.data.week) { dealingItem.style = 'style0' }
      else if (parseInt(id / 100) > this.data.week) { dealingItem.style = 'style1' }
      else if (parseInt(id / 100) < this.data.week) { dealingItem.style = 'style2' }
      dealingDataPre.push(dealingItem)
    }
    this.setData({ dealtData: dealingDataPre })
    
    var dealingData=[];
    for(let i in courseInfo){
      var dealingItem={
        id:0,
        time: '开课时间',
        lecture1: '..',
        lecture2: '..',
        lecture3: '..',
        lecture4: '..',
        style:''
      }
      var id=courseInfo[i].lectureId;
      dealingItem.id=id;
      dealingItem.time = parseInt(id / 100) + '周周' + this.transferDay(parseInt((id % 100) / 10)) + this.transferTime(id % 10);
      if(parseInt(id/100)==this.data.week){dealingItem.style='style0'}
      else if (parseInt(id / 100) > this.data.week) { dealingItem.style = 'style1' }
      else if (parseInt(id / 100) < this.data.week){ dealingItem.style = 'style2' }
      var lecNum1 = 0, lecNum2 = 0, lecNum3 = 0, lecNum4 = 0;
      for(let j in studentInfo){
        if(studentInfo[j].lecture1==id){lecNum1++}
        dealingItem.lecture1=lecNum1+'/'+courseInfo[i].volume1;
        if (studentInfo[j].lecture2 == id) { lecNum2++ }
        dealingItem.lecture2 = lecNum2 + '/' + courseInfo[i].volume2;
        if (studentInfo[j].lecture3 == id) { lecNum3++ }
        dealingItem.lecture3 = lecNum3 + '/' + courseInfo[i].volume3;
        if (studentInfo[j].lecture4 == id) { lecNum4++ }
        dealingItem.lecture4 = lecNum4 + '/' + courseInfo[i].volume4;
      }
      dealingData.push(dealingItem)
    }
    this.setData({dealtData:dealingData})
  },

  onShow: function () {
    this.setData({
      week: app.globalData.week,
      day: app.globalData.day,
      basicInfo: app.globalData.userInfo,
    })
    wx.showToast({
      title: '加载中',
      duration:1000,
      icon:'loading'
    })
    this.setData({ dayShow: this.transferDay(this.data.day) })
    var that=this;
    wx.cloud.callFunction({
      name: 'lectureAll',
      success: function (res) {
        that.courseInfo=res.result.data
        wx.cloud.callFunction({
          name: 'studentAll',
          success: function (ret) {
            that.studentInfo=ret.result.data;
            that.dealWithData();
          }
        })
      }
    })
  },

  transferNum: function (num) {
    if (num == 0) return 'lecture1';
    if (num == 1) return 'lecture2';
    if (num == 2) return 'lecture3';
    if (num == 3) return 'lecture4';
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

  lectureDetail: function(e){
    var num = e.currentTarget.dataset.index;
    var id=this.data.dealtData[num].id;
    var nowSelect = parseInt(id / 100) + '周周' + this.transferDay(parseInt((id % 100) / 10)) + this.transferTime(id % 10);
    this.setData({general:false,nowSelect:nowSelect,nowId:id})
    var studentInfo=this.studentInfo;
    var classmateLecture1=[];
    for(let i1 in studentInfo){
      var studentDetail={
        studentName:'',studentId:''
      }
      if(studentInfo[i1].lecture1==id){
        studentDetail.studentName = studentInfo[i1].studentName;
        studentDetail.studentId = studentInfo[i1].studentId;
        classmateLecture1.push(studentDetail);
      }
    }
    var classmateLecture1 = [];
    for (let i1 in studentInfo) {
      var studentDetail = {
        studentName: '', studentId: ''
      }
      if (studentInfo[i1].lecture1 == id) {
        studentDetail.studentName = studentInfo[i1].studentName;
        studentDetail.studentId = studentInfo[i1].studentId;
        classmateLecture1.push(studentDetail);
      }
    }
    this.setData({classmateLecture1:classmateLecture1})
    var classmateLecture2 = [];
    for (let i2 in studentInfo) {
      var studentDetail = {
        studentName: '', studentId: ''
      }
      if (studentInfo[i2].lecture2 == id) {
        studentDetail.studentName = studentInfo[i2].studentName;
        studentDetail.studentId = studentInfo[i2].studentId;
        classmateLecture2.push(studentDetail);
      }
    }
    this.setData({ classmateLecture2: classmateLecture2 })
    var classmateLecture3 = [];
    for (let i3 in studentInfo) {
      var studentDetail = {
        studentName: '', studentId: ''
      }
      if (studentInfo[i3].lecture3 == id) {
        studentDetail.studentName = studentInfo[i3].studentName;
        studentDetail.studentId = studentInfo[i3].studentId;
        classmateLecture3.push(studentDetail);
      }
    }
    this.setData({ classmateLecture3: classmateLecture3 })
    var classmateLecture4 = [];
    for (let i4 in studentInfo) {
      var studentDetail = {
        studentName: '', studentId: ''
      }
      if (studentInfo[i4].lecture4 == id) {
        studentDetail.studentName = studentInfo[i4].studentName;
        studentDetail.studentId = studentInfo[i4].studentId;
        classmateLecture4.push(studentDetail);
      }
    }
    this.setData({ classmateLecture4: classmateLecture4 })
  },

  returnGeneral:function(){
    this.setData({
      general:true
    })
  },

  addCourse:function(){
    wx.navigateTo({
      url: '/pages/teacher/addtime/index',
    })
  },

  deleteLecture:function(){
    var that=this;
    wx.showModal({
      title: '提示',
      content: '您即将删除此课程！本操作可将课程信息删除，但不会影响学生选课信息，若要删除学生选课信息，请先进行手动退课然后进行本操作！',
      success:function(res){
        if(res.confirm){
          wx.cloud.callFunction({
            name:'deleteLecture',
            data:{lectureId:that.data.nowId},
            success:function(){
              wx.showModal({
                title: '提示',
                content: '删除课程成功，请确认所有选取该课程的同学已退课',
                showCancel:false,
                success:function(re){
                  if(re.confirm){
                    that.setData({
                      general:true
                    })
                    that.onShow()
                  }
                }
              })
            }
          })
        }
      }
    })
  }
})