<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div>
        <div class="left-panel">
            <div v-show="bigMode">
                <el-row style="margin-left: 90px">
                    <el-col :span="1">
                        <img :src="getLabel()" style="height: 40px;width: 80px">
                    </el-col>
                    <el-col :span="5">
                        <div class="department-title">信息工程部</div>
                    </el-col>
                    <el-col :span="5" :offset="12">
                        <div class="signed-percent">{{curDepSignedNum}} / {{curDepNum}}</div>
                    </el-col>
                </el-row>


            </div>
            <div v-show="!bigMode">

            </div>
        </div>

    </div>
</template>

<script>
    var _this;
    export default {
        name: "NameListPage",
        components: {},
        data() {
            _this = this;
            return {
                bigMode: true,
                curDepSignedNum: 9,
                curDepNum: 15
            }
        },
        methods: {
            getLabel() {
                return require("../assets/img/department_label.png");
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
    .left-panel {
        margin-left: 30px;
        margin-top: 100px;
        width: 60%;
        height: 100%;
    }

    .department-title {
        font-family: PingFangSC-Semibold, sans-serif;
        height: 50px;
        margin-left: 36px;
        font-size: 36px;
        color: #959595;
        letter-spacing: 1px;
    }

    .signed-percent {
        font-family: SquareFont;
        font-size: 36px;
        color: #959595;
        letter-spacing: 2px;
        text-align: right;
    }

</style>
