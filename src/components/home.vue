<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >
    <!--<img :src="getBgImg()"-->
    <!--style="min-width: 100%;min-height: 100%;position: fixed;z-index: -100;right:0; bottom: 0;"-->
    <!--v-show="!showAD" />-->
    <div style="min-width: 100%;min-height: 100%;position: fixed;" >
        <video v-show="!showAD" :src="getVideoBg()" autoplay muted loop
               style="min-width: 100%;min-height: 100%;position: fixed;z-index: -100;right:0; bottom: 0;" >
        </video >
        <video v-show="showAD" :src="getVideoWelcomeBg()" autoplay muted loop
               style="min-width: 100%;min-height: 100%;position: fixed;z-index: -100;right:0; bottom: 0;" >
        </video >
        <img v-show="showAD" :src="getWelcomeBg()"
             style="text-align:center;align-items: center; margin-left: -150px;margin-top: -170px; left: 50%;top: 50%;position: fixed;z-index: -100;" >
        <table style="width: 100%;height: 100%;position: fixed;" >
            <tr style="height: 10%" >
                <td width="30%" style="vertical-align: top;text-align: left" @click="toSetDeviceIds()" >
                    <div :class="isShowVIP?'up-left-line-vip':'up-left-line'" >
                        <img :src="getLogoImage()"
                             style="height: 50px;margin-top: 5px; margin-left: 120px; top: 0px; width: 280px;" >
                    </div >
                </td >
                <td style="text-align: center;" >
                    <MenuButton ref="menuButton" :menuList="menuList"
                                :menuChanged="onMenuChanged"
                                :isVip="isShowVIP"
                                style="margin-left: 60px"
                    ></MenuButton >
                </td >
                <td width="30%" style="text-align: right" >
                    <div :class="isShowVIP?'up-right-line-vip':'up-right-line'" >
                        <span style="font-size: 42px;margin-right: 80px;" >{{currentTime}}</span >
                    </div >
                </td >
            </tr >
            <tr style="height: 80%;" >
                <td colspan="3" >
                    <div style="margin-top: 0px;" >
                        <StaffPage v-show="currentIndex == 1"
                                   ref="staffPage"
                                   :isVip="isShowVIP"
                                   :tagDepartList="tagList" ></StaffPage >
                        <NameListPage ref="nameList" v-show="currentIndex == 2" ></NameListPage >
	                    <!--<el-button style="bottom: 0px" type="primary" @click="isShowVIP=!isShowVIP"-->
	                    <!--icon="el-icon-check"-->
	                    <!--&gt;TEST-->
	                    <!--</el-button >-->
                    </div >
                </td >
            </tr >
            <tr style="height: 10%;" >
                <td width="30%" style="text-align: left;" >
                    <div :class="isShowVIP?'down-left-line-vip':'down-left-line'" >
                        <br >
                        <div style="margin-left: 80px;" >
                            <span class="textlabel" >Check In</span >
                            <br >
                            <span class="textCount" >{{SignInFen}}</span >
                        </div >
                    </div >
                </td >
                <td ></td >
                <td width="30%" style="text-align: right;" >
                    <div :class="isShowVIP?'down-right-line-vip':'down-right-line'" >
                        <br >
                        <div style="margin-right: 80px;" >
                            <span class="textlabel" >Ratio</span >
                            <br >
                            <span style="font-size: 48px;" >{{SignInPer}}</span >
                        </div >
                    </div >
                </td >
            </tr >
        </table >
        <el-dialog title="签到设备" :visible.sync="confirmCancelDialog" width="30%"
                   :modal="false" >
                <el-input v-model="deviceIDList" placeholder="设备ID以逗号隔开"></el-input>
            <span slot="footer" class="dialog-footer" >
                <el-button @click="confirmCancelDialog = false"
                           icon="el-icon-close" >取 消</el-button >
                <el-button type="primary" @click="saveDeviceID()"
                           icon="el-icon-check" >确 定</el-button >
            </span >
        </el-dialog >
    </div >
</template >

<script >
    var currentInterval;
    var dataInterval;
    var showADTimerId;
    var refrehStaticTimeout;
    var mqttReconnectInterval = null;
    var isLoading = false;
    var hostname = MqttServer,
		    port = ServerPort,
		    clientId = `client-${newGuid()}`,
		    timeout = 30,
		    keepAlive = 100,
		    qos = 1,
		    cleanSession = false,
		    ssl = false,
		    userName = 'admin',
		    password = 'password',
		    sendTopic = "sign_feedback";
    var client = new Paho.MQTT.Client(hostname, port, clientId);
    //建立客户端实例
    var options = {
	    invocationContext: {
		    host: hostname,
		    port: port,
		    path: client.path,
		    clientId: clientId
	    },
	    timeout: timeout,
	    keepAliveInterval: keepAlive,
	    cleanSession: cleanSession,
	    useSSL: ssl,
	    userName: userName,
	    password: password,
	    onSuccess: onConnect,
	    onFailure: function (e) {
		    console.log(`connect failure: ${e}`);
	    },
    };
    $(document).ready(function () {
	    client.connect(options);//连接服务器并注册连接成功处理事件
	    client.onConnectionLost = onConnectionLost;//注册连接断开处理事件
	    client.onMessageArrived = onMessageArrived;//注册消息接收处理事件
    })

    function onConnect() {
	    console.log("connect successfully");
	    if (mqttReconnectInterval != null) {
		    clearInterval(mqttReconnectInterval);
		    mqttReconnectInterval = null;
	    }
	    for (let item of ServerTOPIC)//订阅主题
	    {
		    console.log(`subscribed server topic: ${item}`);
		    client.subscribe(item);
	    }
    }

    var isActived = true;
    window.ondeactivate = () => {
	    isActived = false;
    };
    window.onactivate = () => {
	    isActived = true;
    };
    window.onblur = () => {
	    isActived = false;
    };
    window.onfocus = () => {
	    isActived = true;
    };

    window.onclick = () => {
	    requestFullScreen();
	    //_this.btnTest();
    };

    function onConnectionLost(responseObject) {
	    if (responseObject.errorCode !== 0) {
		    console.log("连接已断开");
		    console.log("onConnectionLost:" + responseObject.errorMessage);
		    mqttReconnectInterval = setInterval(() => {
			    client.connect(options);
			    client.onConnectionLost = onConnectionLost;//注册连接断开处理事件
			    client.onMessageArrived = onMessageArrived;//注册消息接收处理事件
		    }, 2000);
	    }
    }

    function onMessageArrived(message) {
	    console.log("收到消息:" + message.payloadString);
	    console.log("主题：" + message.destinationName);
	    var data = null;
	    try {
		    data = jQuery.parseJSON(message.payloadString);
		    console.log("解析出来的：data：" + JSON.stringify(data));
	    } catch (e) {
		    console.log(e);
	    }
	    // while (isLoading) {
	    //    sleep(1000); //wait;
	    // }
	    if (data != null) {
		    switch (message.destinationName) {
			    case ServerTOPIC[0]: //statff
				    _this.isShowVIP = false;
				    onVisitorSign(data);
				    break;
			    case ServerTOPIC[1]://vip
				    if (_this.currentIndex == 1) {
					    _this.isShowVIP = true;
					    setTimeout(() => {
						    _this.isShowVIP = false;
					    }, 1000 * 15);
				    }
				    onVisitorSign(data);
				    break;
			    case ServerTOPIC[2]:
				    if (_this.currentIndex == 1) {
					    if (_this.$refs.staffPage) {
						    _this.$refs.staffPage.resetUI();
						    _this.showAD = true;
					    }
				    }
				    break;
			    default:
				    console.log("未知主题消息...")
				    break;
		    }
		    console.log(`show UI VIP:${_this.isShowVIP}`);
	    }
    }

    function onVisitorSign(signDataList) {
	    var dataList = [];
	    try {
		    console.log(signDataList.length)
		    _this.showAD = false;
		    //清除之前的timer，一分钟如果没有考勤信息过来，开始播放宣传片
		    if (showADTimerId != null) {
			    clearTimeout(showADTimerId);
		    }
		    showADTimerId = setTimeout(() => {
			    if (_this.currentIndex == 1) {
				    _this.showAD = true;
			    }
		    }, 1000 * 20);

		    for (let i = 0; i < signDataList.length; i++) {

			    let signData = signDataList[i];
                //如果在session中device_ids不为空，则只监听对应设备的ID
                if(!isUndefined(window.sessionStorage.getItem("device_id_list"))
                    && window.sessionStorage.getItem("device_id_list") !== ''
                    && window.sessionStorage.getItem("device_id_list") !== null) {
                    if(window.sessionStorage.getItem("device_id_list").indexOf(signData.device_id) === -1) {
                        continue;
                    }
                }
			    let data = Object.assign(signData.person.person_information);
			    try {
				    data.signTime = new Date(signData.timestamp * 1000).format("hh:mm:ss");
			    } catch (e) {
			    }
			    data.device_id = signData.device_id;
			    //data.photo = require('../assets/img/male.png'); //`http://api.vaiwan.com:8081/image/${signData.person.face_list[0].face_image_id}`;
			    if(isUndefined(signData.person.face_list) || signData.person.face_list.length == 0) {
			        data.photo = require('../assets/img/male.png');
                } else {
                    data.photo = `${PHOTO_URL}${signData.person.face_list[0].face_image_id}`;
                }
			    data.person_id = signData.person.person_id;
			    data.departName = _this.getTagNameByPersonId(data.person_id);
			    dataList.push(data);
		    }
		    if (_this.$refs.staffPage) {
			    _this.$refs.staffPage.updateStaffData(dataList, _this.isShowVIP);
		    }
	    } catch (e) {
		    console.log(e)
	    } finally {
	        if(refrehStaticTimeout != null) {
	            clearTimeout(refrehStaticTimeout);
            }
            refrehStaticTimeout = setTimeout(()=>{
                _this.refreshData();
            }, 800);
	    }
    }

    var _this;
    import StaffPage from '../components/staff_page.vue';
    import VipPage from '../components/vip_page.vue';
    import NameListPage from '../components/name_list_page.vue';
    import MenuButton from '../components/menubutton.vue';


    export default {
	    name: "home",
	    components: {
		    StaffPage,
		    VipPage,
		    MenuButton,
		    NameListPage,
	    },
	    data() {
		    _this = this;
		    return {
			    sendText: "Hello mqtt",
			    title: HOME_SCREEN_TITLE,
			    currentTime: "",
			    staffNum: 0,
			    signInNum: 0,
			    isShowVIP: false,
			    showAD: true,
			    radioMenu: "签到",
			    menuList: [
				    {
					    key: "0",
					    text: "部门",
				    },
				    {
					    key: "1",
					    text: "Martian",
				    },
				    {
					    key: "2",
					    text: "Name List",
				    }
			    ],
			    currentIndex: "1",
			    departmentSignData: [],
			    tagList: [],
                confirmCancelDialog: false,
                deviceIDList:"",
                SignInFen:"",
                SignInPer:""
		    }
	    },
	    methods: {
            toSetDeviceIds() {
              _this.confirmCancelDialog = true;
              _this.deviceIDList = window.sessionStorage.getItem("device_id_list");
            },
            saveDeviceID() {
                console.log("_this.deviceIDList" + _this.deviceIDList);
                window.sessionStorage.setItem("device_id_list", _this.deviceIDList);
                _this.confirmCancelDialog = false;
                showMessage(_this, "保存成功", 1);
            },
		    getVideoBg() {
			    var bg = require('../assets/img/signed_bg.mp4');
			    return bg;
		    },
		    getVideoWelcomeBg()
		    {
			    var bg = require('../assets/img/bg_waiting.mp4');
			    return bg;
		    },
		    getWelcomeBg() {
			    var bg = require('../assets/img/text_welcome.png');
			    return bg;
		    },
		    getLogoImage()
		    {
			    return _this.isShowVIP ? require("../assets/img/logo_gold.png") : require("../assets/img/logo_normal.png");
		    },
		    getTagNameByPersonId(personId) {
			    let res = "";
			    let tagId = _this.getTagIdByPersonId(personId);
			    if (tagId == "") {
				    return res;
			    }
			    res = _this.getTagNameByTagId(tagId);
			    return res;
		    },

		    getTagNameByTagId(tagId) {
			    let res = "";
			    for (let item of _this.tagList) {
				    if (item.tag_id == tagId) {
					    res = item.tag_name;
					    break;
				    }
			    }
			    return res;
		    },

		    getTagIdByPersonId(personId) {
			    let res = "";
			    for (let item of _this.departmentSignData) {
				    if (!item.totalStaff) {
					    break;
				    }
				    for (let user of item.totalStaff) {
					    if (user.staff_id == personId) {
						    res = item.tagId;
						    break;
					    }
				    }
				    if (res != "") {
					    break;
				    }
			    }
			    return res;
		    },

		    getPercent(cValue, tValue) {
			    if (tValue == 0) {
				    return `0%`;
			    }
			    let value = Math.floor((cValue / tValue) * 100);
			    return `${value}%`;
		    },
		    onMenuChanged(newKey) {
			    if (_this.currentIndex != newKey) {
				    _this.currentIndex = newKey;
				    _this.showAD = _this.currentIndex == 1;
				    _this.isShowVIP = false;
				    // if (_this.$refs.staffPage) {
					 //    _this.$refs.staffPage.updateStaffData([], _this.isShowVIP);
				    // }
                    if(_this.currentIndex == 2) {
                        _this.$refs.nameList.updateUI();
                    }
			    }
			    console.log("selected changed " + newKey);
		    },

		    btnTest() {

			    var id = Math.round(Math.random() * 1000000);
                onVisitorSign(JSON.parse(`
                    [
                      {
                        "device_id": "string",
                        "face_id": "string",
                        "face_image_id": "string",
                        "identity": "STRANGER",
                        "person": {
                          "face_list": [
                            {
                              "face_id": "string",
                              "face_image_id": "5be96c8d39f4996f237368a8",
                              "scene_image_id": "string"
                            }
                          ],
                          "identity": "STAFF",
                          "meta": {},
                          "person_id": "5c05403139f499088cfabc0f",
                          "person_information": {
                            "birthday": "string",
                            "company": "string",
                            "employed_date": "string",
                            "id": "string",
                            "identity_number": "string",
                            "name": "胡通",
                            "phone": "string",
                            "remark": "string",
                            "visit_end_timestamp": 0,
                            "visit_purpose": "0",
                            "visit_start_timestamp": 0,
                            "visit_time_type": "0",
                            "visitee_name": "string"
                          },
                          "tag_id_list": [
                            "string"
                          ],
                          "upload_time": 0
                        },
                        "scene_image_id": "string",
                        "score": 0,
                        "timestamp": 0,
                        "track_id": "string"
                      },
                      {
                        "device_id": "string",
                        "face_id": "string",
                        "face_image_id": "string",
                        "identity": "STRANGER",
                        "person": {
                          "face_list": [
                            {
                              "face_id": "string",
                              "face_image_id": "5c08c52339f49907e8a850b9",
                              "scene_image_id": "string"
                            }
                          ],
                          "identity": "STAFF",
                          "meta": {},
                          "person_id": "5c038e8439f4996f237370bb",
                          "person_information": {
                            "birthday": "string",
                            "company": "string",
                            "employed_date": "string",
                            "id": "string",
                            "identity_number": "string",
                            "name": "李玮",
                            "phone": "string",
                            "remark": "string",
                            "visit_end_timestamp": 0,
                            "visit_purpose": "0",
                            "visit_start_timestamp": 0,
                            "visit_time_type": "0",
                            "visitee_name": "string"
                          },
                          "tag_id_list": [
                            "string"
                          ],
                          "upload_time": 0
                        },
                        "scene_image_id": "string",
                        "score": 0,
                        "timestamp": 0,
                        "track_id": "string"
                      },
                      {
                        "device_id": "string",
                        "face_id": "string",
                        "face_image_id": "string",
                        "identity": "STRANGER",
                        "person": {
                          "face_list": [
                            {
                              "face_id": "string",
                              "face_image_id": "5c0809f0a7986c07b7d753f8",
                              "scene_image_id": "string"
                            }
                          ],
                          "identity": "STAFF",
                          "meta": {},
                          "person_id": "5c05403139f499088cfabc0f",
                          "person_information": {
                            "birthday": "string",
                            "company": "string",
                            "employed_date": "string",
                            "id": "string",
                            "identity_number": "string",
                            "name": "费费",
                            "phone": "string",
                            "remark": "string",
                            "visit_end_timestamp": 0,
                            "visit_purpose": "0",
                            "visit_start_timestamp": 0,
                            "visit_time_type": "0",
                            "visitee_name": "string"
                          },
                          "tag_id_list": [
                            "string"
                          ],
                          "upload_time": 0
                        },
                        "scene_image_id": "string",
                        "score": 0,
                        "timestamp": 0,
                        "track_id": "string"
                      }
                    ]`
                ));//方法1
		    },

		    getBgImg() {
			    var bg;
//			    if (_this.isShowVIP) {
//				    bg = vipBg;
//			    } else {
//				    bg = signInBg;
//			    }
			    return bg;
		    },

		    onSend() {
			    let strMsg = _this.sendText;// document.getElementById("msg").value;
			    if (strMsg) {
				    let message = new Paho.MQTT.Message(strMsg);
				    message.destinationName = sendTopic; //发送主题
				    client.send(message);
				    console.log(`send data: ${strMsg}`)
				    _this.sendText = "";
			    }
		    },
		    getSignIn() {
			    return _this.signInNum + " / " + _this.staffNum;
		    },

		    fetTotalSignData() {
			    $.ajax({
				    url: HOST + "user/getTotalSignData",
				    type: 'GET',
				    dataType: 'json',
				    success: function (data) {
					    if (data.code === 200) {
                            // if(JSON.stringify(data.data) != JSON.stringify(_this.departmentSignData)) {
                                _this.departmentSignData = data.data;
                                //console.log(`departmentSignData:\r\n${JSON.stringify(_this.departmentSignData)}`)
                                if (_this.currentIndex == 1) {
                                    if (_this.$refs.staffPage) {
                                        _this.$refs.staffPage.updateDepartmentData(_this.departmentSignData, _this.tagList);
                                    }
                                }
                            // }
					    }
				    },
				    error: function (data) {

				    }
			    })
		    },
		    fetchTag() {
			    $.ajax({
				    url: HOST + "tag/list",
				    type: 'POST',
				    dataType: 'json',
				    success: function (data) {
					    if (data.code === 200) {
						    _this.tagList = data.data;
						    //console.log(`_this.tagList:\r\n${JSON.stringify(_this.tagList)}`)
					    }
				    },
				    error: function (data) {

				    }
			    })
		    },
		    getTotalUserCount() {
			    $.ajax({
				    url: HOST + "user/getStaffNum",
				    type: 'GET',
				    dataType: 'json',
				    success: function (data) {
					    if (data.code == 200) {
						    _this.staffNum = data.data;
					    }
				    },
				    error: function (data) {

				    }
			    })
		    },
		    getSigninUserCount() {
			    $.ajax({
				    url: HOST + "user/getStaffSignInNum",
				    type: 'GET',
				    dataType: 'json',
				    success: function (data) {
					    if (data.code == 200) {
						    _this.signInNum = data.data;
					    }
				    },
				    error: function (data) {

				    }
			    })
		    },

		    refreshData() {
			    //dataInterval = setInterval(function doAnimation() {
                        _this.fetchTag();

                        _this.getTotalUserCount();
						_this.getSigninUserCount();
						//不在产生过人记录时就去更新部门信息
						_this.fetTotalSignData();
						//setTimeout(() => {
						//  if (_this.currentIndex == 1) {
						//    if (_this.$refs.staffPage) {
						//	    _this.$refs.staffPage.updateDepartmentData(_this.departmentSignData, _this.tagList);
						//    }
						//  }
						//}, 500)
			  	//}, 10000);//定时器
		    },


	    },
        watch: {
            'staffNum': function(newVal){
                _this.SignInFen =  _this.signInNum + " / " + newVal;
                if (newVal == 0) {
                    _this.SignInPer = `0%`;
                } else {
                    let value = Math.floor((_this.signInNum / newVal) * 100);
                    _this.SignInPer = `${value}%`;
                }
            },
            'signInNum': function(newVal){
                this.SignInFen = newVal + " / " + _this.staffNum;
                if (_this.staffNum == 0) {
                    _this.SignInPer = `0%`;
                } else {
                    let value = Math.floor((newVal / _this.staffNum) * 100);
                    _this.SignInPer = `${value}%`;
                }
            }
        },
	    computed: {},
	    filters: {},
	    created: function () {
            dataInterval = setInterval(function doAnimation() {
                _this.refreshData();
            }, 10000);//定时器
	    },
	    mounted: function () {
		    currentInterval = setInterval(() => {
			    _this.currentTime = new Date().format("yyyy-MM-dd hh:mm");
//			    _this.btnTest();

		    }, 2000);//定时器
            _this.fetTotalSignData();
            _this.fetchTag();
	    },
	    destroyed: function () {
		    clearInterval(currentInterval);
		    clearTimeout(showADTimerId);
		    clearInterval(dataInterval);
	    }

    }

</script >
<style >

    .up-left-line-vip {
	    margin-top: 20px;
	    width: 478px;
	    float: left;
	    background-image: url('../../src/assets/img/vip/line_u_l.png');
	    background-repeat: no-repeat;
	    background-size: 100%;
	    height: 60px;
	    background-position: bottom;
	    color: #D6BE98;

    }

    .up-right-line-vip {
	    margin-top: -25px;
	    width: 478px;
	    float: right;
	    background-image: url('../../src/assets/img/vip/line_u_r.png');
	    background-repeat: no-repeat;
	    background-size: 100%;
	    height: 60px;
	    background-position: bottom;
	    color: #D6BE98;

    }

    .down-left-line-vip {
	    width: 318px;
	    float: left;
	    background-image: url('../../src/assets/img/vip/line_b_l.png');
	    background-repeat: no-repeat;
	    background-size: 100%;
	    height: 100px;
	    background-position: top;
	    font-family: 'SquareFont';
	    color: #D6BE98;

    }

    .down-right-line-vip {
	    width: 318px;
	    float: right;
	    background-image: url('../../src/assets/img/vip/line_b_r.png');
	    background-repeat: no-repeat;
	    background-size: 100%;
	    height: 100px;
	    background-position: top;
	    font-family: 'SquareFont';
	    color: #D6BE98;
    }

    .up-left-line {
	    margin-top: 20px;
	    width: 478px;
	    float: left;
	    background-image: url('../../src/assets/img/line_deco_normal_LU.png');
	    background-repeat: no-repeat;
	    background-size: 100%;
	    height: 60px;
	    background-position: bottom;
	    color: #FFFFFF;

    }

    .up-right-line {
	    margin-top: 0px;
	    width: 478px;
	    float: right;
	    background-image: url('../../src/assets/img/line_deco_normal_RU.png');
	    background-repeat: no-repeat;
	    background-size: 100%;
	    height: 60px;
	    background-position: bottom;
	    color: #FFFFFF;

    }

    .down-left-line {
	    width: 318px;
	    float: left;
	    background-image: url('../../src/assets/img/line_deco_normal_LB.png');
	    background-repeat: no-repeat;
	    background-size: 100%;
	    height: 100px;
	    background-position: top;
	    font-family: 'SquareFont';
	    color: #FFFFFF;

    }

    .down-right-line {
	    width: 318px;
	    float: right;
	    background-image: url('../../src/assets/img/line_deco_normal_RB.png');
	    background-repeat: no-repeat;
	    background-size: 100%;
	    height: 100px;
	    background-position: top;
	    font-family: 'SquareFont';
	    color: #FFFFFF;
    }

    span {
	    text-align: center;
	    font-family: 'SquareFont';
    }

    .textlabel {
	    font-size: 18px;
	    font-family: 'PingFangSC-Semibold'
    }

    .textCount {
	    font-size: 48px;
	    font-family: 'SquareFont';
    }

    @font-face {
	    font-family: 'PingFangSC-Semibold';
	    src: url('../assets/font/PingFang_SC_Semibold.ttf');
	    font-weight: normal;
	    font-style: normal;
    }

    @font-face {
	    font-family: 'SquareFont';
	    src: url('../assets/font/Square.ttf');
	    font-weight: normal;
	    font-style: normal;
    }
</style >
