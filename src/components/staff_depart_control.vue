<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >
    <div style="width: 220px;height: 40px;" >
        <el-row >
            <el-col :span="8" >
                <span :style="{'float': 'left',
                 'font-size':'18px',
                 'font-family': 'PingFangSC-Semibold',
                 'color':isVip?'#D6BE98':'#FFFFFF'
                 }" >{{departInfo.departName}}</span >
            </el-col >
            <el-col :span="8" :offset="8" >
                <span :style="{'float': 'right',
                 'font-size':'18px',
                 'font-family': 'SquareFont',
                 'color':isVip?'#D6BE98':'#FFFFFF'
                 }" >{{departInfo.currentValue}}/{{departInfo.totalValue}}</span >
            </el-col >
        </el-row >
        <div style="margin-top: 5px;" >
            <div class="progress"
                 :style="{'background-color':'transparent',
                 'border':isVip?'1px solid #D6BE98':'1px solid #FFFFFF',
                 'height': '6px',
                 'border-radius': '0px'
                 }" >
                <div class="progress-bar" role="progressbar" :aria-valuenow="departInfo.currentValue"
                     aria-valuemin="0" :aria-valuemax="departInfo.totalValue"
                     :style="{ 'width': getPercent(departInfo.currentValue,departInfo.totalValue),
				    'background-color':isVip?'#D6BE98':'#FFFFFF'}" >
                    <!--<span >40%</span>-->
                </div >
            </div >
        </div >
    </div >
</template >

<script >
    var _this
    export default {
	    name: "StaffDepartControl",
	    components: {},
	    props: {
		    departInfo: {
			    type: Object,
			    default: null
		    },
		    isVip: {
			    type: Boolean,
			    default: false,
		    }
	    },
	    data() {
		    _this = this;
		    return {}
	    },
	    methods: {
		    getPercent(cValue, tValue) {
			    if (tValue == 0) {
				    return "0%"
			    }
			    let value = Math.floor((cValue / tValue) * 100);
			    return `${value}%`;
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

</style >
