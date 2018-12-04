<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <el-row>
        <el-col class="left-panel" :span="16">
            <div id="div-scroll" v-show="bigMode" style="margin-left: 90px;height: 725px;overflow-y: auto">
                <div v-for="department in departmentSignData">
                    <el-row style="height: 60px">
                        <el-col :span="1">
                            <img :src="getLabel()" style="height: 40px;width: 36px">
                        </el-col>
                        <el-col :span="5">
                            <div class="department-title">{{filterDepartmentName(department.tagId)}}</div>
                        </el-col>
                        <el-col :span="4" :offset="9">
                            <div class="signed-percent">{{formatNumber(department.currentRecordList.length)}} /
                                {{formatNumber(department.totalStaff.length)}}
                            </div>
                        </el-col>
                    </el-row>
                    <div>
                        <table>
                            <tr v-for="row in formatToMatrix(department.totalStaff)">
                                <td v-for=" item in row" style="width: 225px;height: 220px">
                                    <div :class="getMemberBgStyle(item.staff_id, department.currentRecordList)">
                                        <div class="number"> NO.{{item.person_information.id}}</div>
                                        <div style="margin-top: 12px;text-align: center">
                                            <img :src="getImage(item)"
                                                 style="width: 80px;height: 80px;border-radius: 50%;align-items: center;justify-content: center;">
                                        </div>
                                        <div class="member-name">{{item.person_information.name}}</div>
                                        <div class="department-small-label">{{filterDepartmentName(department.tagId)}}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div v-show="!bigMode">

            </div>
        </el-col>
        <el-col class="right-panel" :span="7">
            <div>
                <img :src="getIconLine()"/>
                <div style="height: 725px;overflow: hidden">
                    <TextScroller :text-list="departments" :position-changed="positionChanged"
                                  :current-index="calculatedIndex"></TextScroller>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    var _this;
    import TextScroller from "./text_scrollor.vue"

    export default {
        name: "NameListPage",
        components: {
            TextScroller
        },
        data() {
            _this = this;
            return {
                bigMode: true,
                curDepSignedNum: 9,
                curDepNum: 15,
                tagList: [],
                departmentSignData: [],
                departments: [],
                departmentHeightList: [],
                calculatedIndex:0
            }
        },
        methods: {
            positionChanged(index) {
                let div = document.getElementById('div-scroll');
                if(index > 0) {
                    div.scrollTop = _this.departmentHeightList[index -1];
                } else {
                    div.scrollTop = 0;
                }
            },
            getLabel() {
                return require("../assets/img/icon_department.png");
            },
            getIconLine() {
                return require("../assets/img/icon_list_line_off.png")
            },
            fetTotalSignData() {
                $.ajax({
                    url: HOST + "user/getTotalSignData",
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        if (data.code === 200) {
                            _this.departmentSignData = data.data;
                            _this.departments = _this.filterAllDepartment(_this.departmentSignData);
                            _this.calculateDepartmentHeight();
                            console.log(_this.departmentHeightList);
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
                        }
                    },
                    error: function (data) {

                    }
                })
            },
            filterDepartmentName(id) {
                let name = "";
                for (let i = 0; i < _this.tagList.length; i++) {
                    if (_this.tagList[i].tag_id === id) {
                        name = _this.tagList[i].tag_name;
                        break;
                    }
                }
                return name;
            },
            formatNumber(number) {
                if (number < 10) {
                    return "0" + number;
                } else {
                    return number;
                }
            },
            formatToMatrix(totalStaff) {
                let rows = new Array();
                for (let i = 0; i < totalStaff.length; i++) {
                    if (i % NUMBER_IN_LINE === 0) {
                        rows[parseInt(i / NUMBER_IN_LINE)] = new Array();
                    }
                    rows[parseInt(i / NUMBER_IN_LINE)].push(totalStaff[i]);
                }
                return rows;
            },
            calculateDepartmentHeight() {
                for (let i = 0; i < _this.departmentSignData.length; i++) {
                    if (i === 0) {
                        _this.departmentHeightList[i] = 60 + _this.formatToMatrix(_this.departmentSignData[i].totalStaff).length * 220;
                    } else {
                        _this.departmentHeightList[i] = 60 + _this.formatToMatrix(_this.departmentSignData[i].totalStaff).length * 220 + _this.departmentHeightList[i - 1];
                    }
                }
            },
            getImage(item) {
                return PHOTO_URL + item.face_list[0].face_image_id;
            },
            getMemberBgStyle(staffId, signInRecord) {
                let found = false;
                for (let i = 0; i < signInRecord.length; i++) {
                    if (signInRecord[i].person.person_id === staffId) {
                        found = true;
                        break;
                    }
                }
                if (found) {
                    return "member-bg";
                } else {
                    return "member-bg-disable"
                }
            },
            filterAllDepartment(signInDepartment) {
                let departments = [];
                for (let i = 0; i < signInDepartment.length; i++) {
                    departments[i] = _this.filterDepartmentName(signInDepartment[i].tagId)
                }
                return departments;
            }
        },
        computed: {},
        filters: {},
        created: function () {

        },
        mounted: function () {
            this.fetTotalSignData();
            this.fetchTag();
            document.getElementById('div-scroll').addEventListener('scroll', ()=> {
                for (let i = 0; i < _this.departmentHeightList.length; i++) {
                    if (document.getElementById('div-scroll').scrollTop < _this.departmentHeightList[i]) {
                        _this.calculatedIndex = i;
                        console.log("calculatedIndex: " + _this.calculatedIndex + " || " + document.getElementById('div-scroll').scrollTop);
                        break;
                    }
                }
            })
        },
        destroyed: function () {
            document.getElementById("div-scroll").addEventListener('scroll', null);
        }
    }

</script>
<style>
    .left-panel {
        margin-left: 30px;
        margin-top: 60px;
        height: 100%;
    }

    .right-panel {
        text-align: right;
        margin-top: 60px;
        height: 100%;
    }

    .department-title {
        font-family: PingFangSC-Semibold, sans-serif;
        height: 50px;
        margin-left: 5px;
        font-size: 36px;
        color: #FFFFFF;
        letter-spacing: 1px;
    }

    .signed-percent {
        font-family: SquareFont;
        font-size: 36px;
        color: #FFFFFF;
        letter-spacing: 2px;
        text-align: right;
    }

    .member-bg {
        width: 160px;
        height: 190px;
        background-image: url('../assets/img/menber_card.png');
    }

    .member-bg-disable {
        width: 160px;
        height: 190px;
        background-image: url('../assets/img/menber_card.png');
        filter: alpha(Opacity=40);
        -moz-opacity: 0.4;
        opacity: 0.4;
    }

    .member-name {
        font-family: PingFangSC-Semibold, sans-serif;
        font-size: 18px;
        color: #FFFFFF;
        text-align: center;
        padding-top: 10px;
    }

    .department-small-label {
        font-size: 12px;
        color: #FFFFFF;
        text-align: center;
        padding-top: 10px;
    }

    .number {
        font-family: SquareFont;
        font-size: 12px;
        color: #FFFFFF;
        text-align: center;
        padding-top: 15px;
    }

    ::-webkit-scrollbar-track-piece {
        background: rgba(252, 252, 252, 0.50); /*滚动条的背景颜色*/
        -webkit-border-radius: 4px; /*滚动条的圆角宽度*/
    }

    ::-webkit-scrollbar-thumb:vertical { /*垂直滚动条的样式*/
        background-color: #3763EB;
        -webkit-border-radius: 4px;
    }

    div::-webkit-scrollbar {
        width: 6px; /*滚动条的宽度*/
    }

</style>
