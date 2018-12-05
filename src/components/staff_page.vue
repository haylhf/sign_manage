<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >
    <div >
        <table style="width: 100%;height: 100%;" >
            <tr >
                <td width="30%" style="text-align: center;" >
                    <StaffDepartControl
		                    style="margin-left: 25%;margin-top: 40px;
		                    -webkit-transform: skew(1deg);
		                    -webkit-transform-origin: right;"
		                    v-for="item in leftDeparList"
		                    :isVip="isVip"
		                    :departInfo="item" ></StaffDepartControl >
                </td >
                <td width="40%" style="text-align: center;" >
                    <div style="text-align: center;" v-show="showSignView" >
                        <div v-show="isVip==true" id="photoVip" v-for="u in animationList" class="card-member-vip" >
                            <img :src="u.photo"
                                 style="width: 252px;height: 252px;border-radius: 50%;
                                 align-items: center;justify-content: center;
                                 overflow: hidden;
                                 margin-top: 92px;margin-left: 5px;" />
                            <div class="col-center-block text-center label" >
                                <div style="min-height: 60px;margin-top: 135px;
                                     font-size: 48px;color: #FFFFFF;font-family: PingFangSC-Semibold;" >
                                    {{u.name}}
                                </div >
                            </div >
                        </div >
                        <div v-show="isVip==false" id="photo" v-for="u in animationList" class="card-member" >
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
                        </div >
                    </div >
                </td >
                <td width="30%" style="text-align: center;" >
                    <div style="margin-left: 40%; margin-top: 10px;" >
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

    var MaxShowCount = 5;
    var resetId = 0;
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
		    }
	    },
	    methods: {
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
			    let isNeedUpdate = false;
			    if (_this.isVip != isShowVIP) {
				    _this.isVip = isShowVIP
				    _this.userDataList = [];
				    _this.leftDeparList = [];
				    _this.rightStaffList = [];
				    _this.animationList = [];
				    isloadData = false;
				    isNeedUpdate = true;
			    }
			    if (!infoList || infoList.length == 0) {
				    return;
			    }
			    if (_this.userDataList.length > 0) {
				    _this.userDataList = _this.userDataList.concat(infoList);
			    }
			    else {
				    _this.userDataList = infoList;
				    isNeedUpdate = true;
			    }
			    if (isNeedUpdate) {
				    setTimeout(()=> {
					    _this.showToUIAndPlay();
				    }, 50)
			    }
		    },

		    showToUIAndPlay() {
			    if (isloadData == true) {
				    return;
			    }
			    isloadData = true;
			    _this.showSignView = true;
			    console.log("showToUIAndPlay")
			    if (_this.userDataList.length > 0) {
				    let data = null;
				    try {
					    for (let i = 0; i < 1; i++) {
						    data = _this.userDataList[i];
						    _this.userDataList.splice(0, 1);
						    data.showTime = new Date();
						    break;
					    }
					    _this.animationList[0] = data;
				    }
				    catch (ex) {
					    console.log(ex);
				    }
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
							    $('#photo').animateCss('flipInY', () => {
								    if (_this.userDataList.length > 0) {
									    $('#photo').animateCss('zoomOutRight', () => {
										    isloadData = false;
										    _this.showToUIAndPlay();
									    });
								    }
								    else {
									    isloadData = false;
									    _this.resetAnimation();
								    }
							    });
						    }
					    }
					    catch (ex) {
						    console.log(ex);
					    }
				    }, 300)

				    try {
					    if (_this.rightStaffList.length >= MaxShowCount) {
						    _this.rightStaffList.splice(_this.rightStaffList.length - 1, 1)
					    }
				    } catch (ex) {
					    console.log(ex);
				    }
				    _this.rightStaffList.unshift(data);

			    }
			    else {
				    isloadData = false;
			    }
		    },
		    resetAnimation()
		    {
			    resetId = setTimeout(()=> {
				    let dtime = new Date() - _this.animationList[0].showTime; // 计算时间差
				    let diffSeconds = Math.floor(dtime / (1000));//总秒数差值
				    if (diffSeconds >= 15) {//超过15s
					    if (_this.userDataList.length == 0) {
						    _this.showSignView = false;
					    }
				    }
				    window.clearTimeout(resetId);
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
	    margin-left: 25%;
	    animation-duration: 800ms;
	    background-image: url('../../src/assets/img/card_menber.png');
	    background-repeat: no-repeat;
	    background-size: 100%;
    }

    .card-member-vip {
	    width: 420px;
	    height: 680px;
	    margin-left: 25%;
	    animation-duration: 800ms;
	    background-image: url('../../src/assets/img/vip/card_vip.png');
	    background-repeat: no-repeat;
	    background-size: 100%;
    }

</style >
