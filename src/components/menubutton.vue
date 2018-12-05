<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >
    <el-row style="height: 50px; margin-top: 5px;" >
        <el-col :span="12" :offset="8" >
            <div class="form-inline" style="width: 120px;cursor: pointer;float: left"
                 v-for="item in menuList" >
                <div style="float: left;text-align: left" v-show="item.key!=0" >
                    <div :style="{'float': 'left',
                    'text-align': 'left',
                    'color':isVip?'#D6BE98':'#FFFFFF'
                    }" >
                        <span :style="item.textStyle" @click="onClickMenu(item.key)" >{{item.text}}</span >
                        <div :class="isVip?'circleDiv-Vip':'circleDiv'" v-show="activedIndex==item.key" >
                        </div >
                    </div >
                    <div v-show="item.key!=menuList.length-1"
                         style="width: 2px;height: 12px; border: 1px solid #FFFFFF;
                         float: left; margin-left: 40px;margin-top: 8px;opacity: 0.6"
                    ></div >
                </div >

            </div >
        </el-col >
    </el-row >

</template >

<script >
    var _this
    export default {
	    name: "MenuButton",
	    props: {
		    menuList: {
			    type: Array,
			    default: []
		    },
		    menuChanged: {
			    type: Function,
			    default: null
		    },
		    isVip: {
			    type: Boolean,
			    default: false,
		    }
	    },
	    data() {
		    _this = this;
		    return {
			    activedIndex: "0",
			    textSelectedStyle: {
				    "text-align": "left",
				    "font-size": "18px",
				    "font-family": 'PingFangSC-Semibold',
				    "opacity": 1.0,
			    },
			    textNormalStyle: {
				    "text-align": "left",
				    "font-size": "18px",
				    "font-family": 'PingFangSC-Semibold',
				    "opacity": 0.5,
			    },

		    }
	    },
	    methods: {
		    setTextStyle() {
			    for (let i = 0; i < _this.menuList.length; i++) {
				    if (_this.menuList[i].key == _this.activedIndex) {
					    _this.menuList[i].textStyle = _this.textSelectedStyle;
				    } else {
					    _this.menuList[i].textStyle = _this.textNormalStyle;
				    }
			    }
		    },
		    onClickMenu(index) {
			    if (_this.activedIndex != index) {
				    _this.activedIndex = index;
				    _this.menuChanged(index);
				    _this.isVip = false;
				    _this.setTextStyle();
			    }
		    },
	    },
	    computed: {},
	    filters: {},
	    created: function () {
		    _this.activedIndex = 1;
		    _this.setTextStyle();
	    },
	    mounted: function () {

	    },
	    destroyed: function () {

	    }
    }

</script >
<style >
     /*span {*/
     /*text-align: left;*/
     /*font-size: 18px;*/
     /*font-family: 'SourceHanSansCN-Semibold';*/
     /*color: #C1C1C1*/
     /*}*/

     .circleDiv {
	     width: 6px;
	     height: 6px;
	     border: 1px solid #FFFFFF;
	     border-radius: 50%;
	     background-color: #FFFFFF;
	     text-align: center;
	     margin-top: 10px;
	     margin-left: 15px;
     }

     .circleDiv-Vip {
	     width: 6px;
	     height: 6px;
	     border: 1px solid #D6BE98;
	     border-radius: 50%;
	     background-color: #D6BE98;
	     text-align: center;
	     margin-top: 10px;
	     margin-left: 15px;
     }
</style >
