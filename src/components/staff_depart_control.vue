<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >
    <div style="width: 220px;height: 40px;margin-left: 120px;margin-top: 50px" >
		<el-row >
			<el-col :span="8" >
               <span style="float: left;font-family: SourceHanSansCN-Medium;" >{{departInfo.departName}}</span >
			</el-col >
			<el-col :span="8" :offset="8" >
                <span style="float: right;" >{{departInfo.currentValue}}/{{departInfo.totalValue}}</span >
			</el-col >
		</el-row >
		<div style="margin-top: 5px;" >
			<div class="progress"
			     style="background-color: white;border: 1px solid #9D9D9D;height: 6px;border-radius: 0px" >
				<div class="progress-bar" role="progressbar" :aria-valuenow="departInfo.currentValue"
				     aria-valuemin="0" :aria-valuemax="departInfo.totalValue"
				     :style="{ 'width': getPercent(departInfo.currentValue,departInfo.totalValue),
				    'background-color': '#9D9D9D'}" >
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
	    },
	    data() {
		    _this = this;
		    return {
		    }
	    },
	    methods: {
		    getPercent(cValue, tValue)
		    {
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
    span {
	    text-align: center;
	    font-family: 'SquareFont';
	    font-size: 18px;
	    color: #AEAEAE;
    }
</style >
