<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div>
        <table style="width: 100%;height: 100%;">
            <tr>
                <td width="30%" style="text-align: center;">
                    <StaffDepartControl
                            style="margin-left: 25%;margin-top: 40px;-webkit-transform: skew(1deg); -webkit-transform-origin: right;"
                            v-for="item in staffList"
                            :departInfo="item"></StaffDepartControl>
                </td>
                <td width="40%" style="text-align: center;">
                    <div style="text-align: center;">
                        <div id="photo" v-for="u in animationList" class="card-member">
                            <img :src="u.photo"
                                 style="width: 200px;height: 200px;border-radius: 50%;

                                align-items: center;justify-content: center;
                                overflow: hidden;
                                margin-top: 131px;margin-left: 6px;"/>
                            <div class="col-center-block text-center label">
                                <div style="min-height: 80px;margin-top: 40px;
                                font-size: 48px;color: #FFFFFF;font-family: PingFangSC-Semibold;">
                                    {{u.name}}
                                </div>
                                <span style="font-size: 24px;color: #FFFFFF;font-family: SquareFont;">
                                    {{u.id != null ? u.id : u.departName}}
                                </span>
                            </div>
                        </div>
                    </div>
                </td>
                <td width="30%" style="text-align: center;">
                    <div style="margin-left: 40%; margin-top: 10px;">
                        <StaffInfoControl style="margin-bottom: 40px;"
                                          v-for="item in staffInfoList"
                                          :staffInfo="item"
                        ></StaffInfoControl>
                    </div>
                </td>
            </tr>
        </table>
    </div>

</template>

<script>
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
                staffList: [
                    // {
                    //     departName: "人事部",
                    //     currentValue: 40,
                    //     totalValue: 100,
                    // },
                ],
                staffInfoList: [
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
                userList: [],
            }
        },
        methods: {
            updateDepartmentData(infoList, tagList) {
                _this.tagDepartList = tagList;
                for (let item of infoList) {
                    let isFound = false;
                    for (let i = 0; i < _this.staffList.length; i++) {
                        if (_this.staffList[i].tagId == item.tagId) {
                            isFound = true;
                            _this.staffList[i].totalValue = item.totalStaff.length;
                            _this.staffList[i].currentValue = item.currentRecordList.length;
                            break;
                        }
                    }
                    if (!isFound) {
                        try {
                            if (_this.staffList.length >= MaxShowCount) {
                                _this.staffList.splice(0, 1)
                            }
                        } catch (ex) {
                            console.log(ex);
                        }
                        _this.staffList.push({
                            tagId: item.tagId,
                            totalValue: item.totalStaff.length,
                            currentValue: item.currentRecordList.length,
                            //departName
                        })
                    }
                }

                for (let i = 0; i < _this.staffList.length; i++) {
                    if (_this.staffList[i].departName && _this.staffList[i].departName != "") {
                        continue;
                    }
                    for (let item of _this.tagDepartList) {
                        if (item.tag_id == _this.staffList[i].tagId) {
                            _this.staffList[i].departName = item.tag_name;
                            break;
                        }
                    }
                }

            },

            updateStaffData(infoList) {
                if (_this.userList.length > 0) {
                    _this.userList = _this.userList.concat(infoList);
                }
                else {
                    _this.userList = infoList;
                    setTimeout(() => {
                        _this.showToUIAndPlay();
                    }, 0);
                }
            },

            showToUIAndPlay() {
                console.log("showToUIAndPlay")
                if (_this.userList.length > 0) {
                    let data = null;
                    for (let i = 0; i < 1; i++) {
                        data = _this.userList[i];
                        break;
                    }
                    _this.userList.splice(0, 1);
                    _this.animationList[0] = data;
                    setTimeout(()=>{
                        $('#photo').animateCss('zoomOutRight', () => {
                            $('#photo').animateCss('flipInY', () => {
                                _this.showToUIAndPlay();
                            });
                        });
                    },100)

                    try {
                        if (_this.staffInfoList.length >= MaxShowCount) {
                            _this.staffInfoList.splice(_this.staffInfoList.length-1, 1)
                        }
                    } catch (ex) {
                        console.log(ex);
                    }
                    _this.staffInfoList.unshift(data);
                }
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

</script>
<style>
    .card-member {
        width: 420px;height: 680px;
        margin-left: 25%;
        animation-duration: 800ms;
        background-image: url('../../src/assets/img/card_menber.png');
        background-repeat: no-repeat;
        background-size: 100%;
    }

</style>
