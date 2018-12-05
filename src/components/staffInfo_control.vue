<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >
    <div style="width: 200px;height: 100px;position: relative" >
        <el-row >
            <el-col :span="18" >
                <div style="margin-right: 20px;margin-top: 29px;float: right" >
                    <span :style="{'float': 'right',
                         'font-size':'20px',
                         'font-family': 'PingFangSC-Semibold',
                         'color':isVip?'#D6BE98':'#FFFFFF'
                         }" >
                        {{staffInfo.name}}
                    </span >
                    <br >
                    <span :style="{'float': 'right',
                         'font-size':'12px',
                         'font-family': 'SquareFont',
                         'color':isVip?'#D6BE98':'#FFFFFF',
                          'margin-right': '2px',
                          'margin-top': '10px'
                         }" >
                        {{staffInfo.id != null ? staffInfo.id:staffInfo.departName}}
                    </span >
                </div >
            </el-col >
            <el-col :span="6" >
                <div :class="isVip?'card-member-small-vip':'card-member-small'" >
                    <img style="margin-top: 18px;border-radius: 50%;align-items: center;justify-content: center;
                                overflow: hidden;" :src="staffInfo.photo" width="64px;" height="64px;" />
                </div >
            </el-col >
        </el-row >
    </div >
</template >

<script >
    var _this
    export default {
	    name: "StaffInfoControl",
	    components: {},
	    props: {
		    staffInfo: {
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
	    methods: {},
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
    .card-member-small {
	    vertical-align: middle;
	    text-align: center;
	    height: 90px;
	    width: 90px;
	    background-image: url('../../src/assets/img/normal_card_s.png');
	    background-repeat: no-repeat;
	    background-size: 100%;
	    background-position: top;
    }

    .card-member-small-vip {
	    vertical-align: middle;
	    text-align: center;
	    height: 90px;
	    width: 90px;
	    background-image: url('../../src/assets/img/vip/VIP_card_s.png');
	    background-repeat: no-repeat;
	    background-size: 100%;
	    background-position: top;
    }

</style >
