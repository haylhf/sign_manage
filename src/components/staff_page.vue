<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml"
          xmlns:display="http://www.w3.org/1999/xhtml">
    <div >
        <table style="width: 100%;height: 100%;" >
            <tr >
                <td width="20%" style="text-align: center;" >
                    <StaffDepartControl
		                    style="margin-left: 25%;margin-top: 40px;
		                     -webkit-transform: skew(1deg);
		                     -webkit-transform-origin: right;"
		                    v-for="item in leftDeparList"
		                    :isVip="isVip"
		                    :departInfo="item" ></StaffDepartControl >
                </td >
                <td width="60%" style="text-align: center;" >
                    <el-row v-show="showSignView" type="flex" class="row-bg" justify="center">
                        <div v-show="isVip==true" id="photoVip" v-for="u in animationList" class="card-member-vip"
                             :style="{'animation-duration': animationDur}" >
                            <img :src="u.photo"
                                 style="width: 235px;height: 235px;border-radius: 50%;
                                 align-items: center;justify-content: center;
                                 overflow: hidden;
                                 margin-top: 100px;margin-left: 6px;" />
                            <div class="col-center-block text-center label" >
                                <div style="min-height: 80px;margin-top: 120px;
                                     font-size: 48px;color: #FFFFFF;font-family: PingFangSC-Semibold;" >
                                    {{u.name}}
                                </div >
                            </div >
                        </div >
                        <el-col :span="7" v-show="isVip==false" id="photo" v-for="u in animationList" class="card-member"
                             :style="{'animation-duration': animationDur}" >
                            <img :src="u.photo"
                                 style="width: 200px;height: 200px;border-radius: 50%;
                                 align-items: center;justify-content: center;
                                 overflow: hidden;
                                 margin-top: 131px;margin-left: 6px;" />
                            <div class="col-center-block text-center label" >
                                <div style="min-height: 80px;margin-top: 40px;
                                     font-size: 48px;color: #FFFFFF;font-family: PingFangSC-Semibold;" >
                                    {{u.name}}
                                </div >
                                <span style="font-size: 24px;color: #FFFFFF;font-family: SquareFont;" >
                                    {{u.id != null ? u.id : u.departName}}
                                </span >
                            </div >
                        </el-col >
                    </el-row >
                </td >
                <td width="20%" style="text-align: center;" >
                    <div style="margin-left: 20%; margin-top: 10px;" >
                        <StaffInfoControl style="margin-bottom: 40px;"
                                          v-for="item in rightStaffList"
                                          :staffInfo="item"
                                          :isVip="isVip"
                        ></StaffInfoControl >
                    </div >
                </td >
            </tr >
        </table >
    </div >

</template >

<script >
    import StaffDepartControl from '../components/staff_depart_control.vue';
    import StaffInfoControl from '../components/staffInfo_control.vue';

    $.fn.extend({
	    animateCss: function (animationName, callback) {
		    var animationEnd = (function (el) {
			    var animations = {
				    animation: 'animationend',
				    OAnimation: 'oAnimationEnd',
				    MozAnimation: 'mozAnimationEnd',
				    WebkitAnimation: 'webkitAnimationEnd',
			    };

			    for (var t in animations) {
				    if (el.style[t] !== undefined) {
					    return animations[t];
				    }
			    }
		    })(document.createElement('div'));

		    this.addClass('animated ' + animationName).one(animationEnd, function () {
			    $(this).removeClass('animated ' + animationName);
			    if (typeof callback === 'function') callback();
		    });

		    return this;
	    },
    });

    var MaxShowCount = 6;
    var resetId = null;
    var isloadData = false;
    var _this
    export default {
	    name: "StaffPage",
	    components: {
		    StaffDepartControl,
		    StaffInfoControl,
	    },
	    props: {
		    tagDepartList: {
			    type: Array,
			    default: null
		    },
	    },
	    data() {
		    _this = this;
		    return {
			    leftDeparList: [
//				     {
//				         departName: "人事部",
//				         currentValue: 40,
//				         totalValue: 100,
//				     },
			    ],
			    rightStaffList: [
				    // {
				    //     name: "张 三",
				    //     departName: "人事部",
				    //     photo: require("../assets/img/male.png")
				    // },
				    // {
				    //     name: "张 三",
				    //     departName: "投资部",
				    //     photo: require("../assets/img/male.png")
				    // },
				    //
			    ],
			    animationList: [],
			    userDataList: [],
			    showSignView: false,
			    isVip: false,
			    animationDur: '600ms'
		    }
	    },
	    methods: {
		    getAnimationDuration()
		    {
			    let delayTime = 1000;
			    if(_this.userDataList.length > 1) {
			        delayTime = parseInt(1000 / _this.userDataList.length)
                }
			    return `${delayTime}ms`
		    },
		    updateDepartmentData(infoList, tagList) {
			    _this.tagDepartList = tagList;
			    for (let item of infoList) {
				    let isFound = false;
				    for (let i = 0; i < _this.leftDeparList.length; i++) {
					    if (_this.leftDeparList[i].tagId == item.tagId) {
						    isFound = true;
						    _this.leftDeparList[i].totalValue = item.totalStaff.length;
						    _this.leftDeparList[i].currentValue = item.currentRecordList.length;
						    break;
					    }
				    }
				    if (!isFound) {
					    try {
						    if (_this.leftDeparList.length >= MaxShowCount) {
							    _this.leftDeparList.splice(0, 1)
						    }
					    } catch (ex) {
						    console.log(ex);
					    }
					    _this.leftDeparList.push({
						    tagId: item.tagId,
						    totalValue: item.totalStaff.length,
						    currentValue: item.currentRecordList.length,
						    //departName
					    })
				    }
			    }

			    for (let i = 0; i < _this.leftDeparList.length; i++) {
				    if (_this.leftDeparList[i].departName && _this.leftDeparList[i].departName != "") {
					    continue;
				    }
				    for (let item of _this.tagDepartList) {
					    if (item.tag_id == _this.leftDeparList[i].tagId) {
						    _this.leftDeparList[i].departName = item.tag_name;
						    break;
					    }
				    }
			    }

		    },

		    updateStaffData(infoList, isShowVIP) {
			    let isNeedNowPlay = false;
			    if (_this.isVip != isShowVIP) {
				    _this.isVip = isShowVIP
				    _this.userDataList = [];
				    _this.leftDeparList = [];
				    _this.rightStaffList = [];
				    _this.animationList = [];
				    isloadData = false;
				    isNeedNowPlay = true;
			    }
			    if (!infoList || infoList.length == 0) {
				    return;
			    }
			    if (_this.userDataList.length > 0) {
				    _this.userDataList = _this.userDataList.concat(infoList);
			    }
			    else {
				    _this.userDataList = infoList;
				    isNeedNowPlay = true;
			    }
			    if (isNeedNowPlay) {
				    _this.showToUIAndPlay();
			    }
		    },

		    showToUIAndPlay() {
			    if (isloadData == true) {
				    return;
			    }
			    isloadData = true;
			    _this.showSignView = true;
			    console.log("showToUIAndPlay")
			    _this.animationDur = _this.getAnimationDuration();
			    if (_this.userDataList.length > 0) {
				    let data = null;
				    try {
					    for (let i = 0; i < 1; i++) {
						    data = _this.userDataList[i];
						    _this.userDataList.splice(0, 1);
						    data.showTime = new Date();
						    break;
					    }
					    if(_this.animationList.length >= 3) {
                            _this.animationList.splice(0,1);
                        }
					    _this.animationList.push(data);
				    }
				    catch (ex) {
					    console.log(ex);
				    }
				    try {
					    if (_this.rightStaffList.length >= MaxShowCount) {
						    _this.rightStaffList.splice(_this.rightStaffList.length - 1, 1)
					    }
				    } catch (ex) {
					    console.log(ex);
				    }
				    _this.rightStaffList.unshift(data);
				    console.log("userDataList size: " + _this.userDataList.length);
				    if (_this.userDataList.length < 10) {
					    _this.playAnimationByUserData();
				    } else {
					    isloadData = false;
					    _this.showToUIAndPlay();//continue next item
				    }
			    }
			    else {
				    isloadData = false;
				    _this.resetAnimation();
			    }
		    },

		    playAnimationByUserData() {
			    setTimeout(()=> {
				    try {
					    if (_this.isVip) {
						    $('#photoVip').animateCss('flipInY', () => {
							    if (_this.userDataList.length > 0) {
								    $('#photoVip').animateCss('zoomOutRight', () => {
									    isloadData = false;
									    _this.showToUIAndPlay();
								    });
							    }
							    else {
								    isloadData = false;
								    _this.resetAnimation();
							    }
						    });
					    } else {
						    // $('#photo').animateCss('flipInY', () => {
							    if (_this.userDataList.length >= 0) {
								    $('#photo').animateCss('zoomOutLeft', () => {
									    isloadData = false;
									    _this.showToUIAndPlay();
								    });
							    }
							    else {
								    isloadData = false;
								    _this.resetAnimation();
							    }
						    // });
					    }
				    }
				    catch (ex) {
					    console.log(ex);
					    isloadData = false;
					    _this.showToUIAndPlay();
				    }
			    }, 0)
		    },

		    resetAnimation()
		    {
			    if (resetId != null) {
				    window.clearTimeout(resetId);
			    }
			    resetId = setTimeout(()=> {
				    let dtime = new Date() - _this.animationList[0].showTime; // 计算时间差
				    let diffSeconds = Math.floor(dtime / (1000));//总秒数差值
				    if (diffSeconds >= 15) {//超过15s
					    if (_this.userDataList.length == 0) {
						    _this.showSignView = false;
					    }
				    }
			    }, 16 * 1000)
		    },

		    doAnimate(data) {
			    $('#photo').animateCss('zoomOutRight', () => {
//                    $('#photo').removeClass("animated zoomOutRight");
//                    console.log("Remove right out!");
				    _this.animationList[0].photo = require("../assets/img/menber_card.png");
				    _this.animationList[0].name = "胡 通";
				    $('#photo').animateCss('flipInY', () => {

					    _this.animationList[0].photo = require("../assets/img/menber_card.png");
					    _this.animationList[0].name = "胡 通";
				    });
			    });
		    },
		    resetUI()
		    {
			    _this.showSignView = false;
			    _this.leftDeparList = [];
			    _this.rightStaffList = [];

		    }
	    },
	    computed: {},
	    filters: {},
	    created: function () {

	    },
	    mounted: function () {

	    },
	    destroyed: function () {

	    }
    }

</script >
<style >
    .card-member {
	    width: 420px;
	    height: 680px;
	    margin-left: 2%;
	    /*animation-duration: 600ms;*/
	    background-image: url('../../src/assets/img/card_menber.png');
	    background-repeat: no-repeat;
	    background-size: 100%;
    }

    .card-member-vip {
	    width: 420px;
	    height: 680px;
	    margin-left: 25%;
	    /*animation-duration: 600ms;*/
	    background-image: url('../../src/assets/img/vip/card_vip.png');
	    background-repeat: no-repeat;
	    background-size: 100%;
    }

</style >
