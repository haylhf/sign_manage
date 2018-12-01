<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >
    <el-row style="height: 50px; margin-top: 5px;" >
        <el-col :span="12" :offset="8" >
            <div class="form-inline" style="width: 120px;cursor: pointer;float: left"
                 v-for="item in menuList" >
                <div style="float: left;text-align: left" >
                    <div style="float: left;text-align: left" >
                        <span :style="item.textStyle" @click="onClickMenu(item.key)" >{{item.text}}</span >
                        <div v-show="activedIndex==item.key" >
                            <div class="circleDiv" >
                            </div >
                        </div >
                    </div >
                    <div v-show="item.key!=menuList.length-1"
                         style="width: 2px;height: 12px; border: 1px solid #D4D4D4;
                         background-color: #D4D4D4;float: left; margin-left: 40px;margin-top: 3px;"
                    ></div >
                </div >

            </div >
        </el-col >
    </el-row >

</template >

<script >

    function setTextStyle() {
	    for (let i = 0; i < _this.menuList.length; i++) {
		    if (_this.menuList[i].key == _this.activedIndex) {
			    _this.menuList[i].textStyle = _this.textSelectedStyle;
		    } else {
			    _this.menuList[i].textStyle = _this.textNormalStyle;
		    }
	    }
    }

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
		    }
	    },
	    data() {
		    _this = this;
		    return {
                activedIndex: "0",
			    textSelectedStyle: {
				    "text-align": "left",
				    "font-size": "18px",
				    "font-family": 'SourceHanSansCN-Bold',
				    "color": "#515151",
                    "opacity": "1"
			    },
			    textNormalStyle: {
				    "text-align": "left",
				    "font-size": "18px",
				    "font-family": 'SourceHanSansCN-Bold',
				    "color": "#C1C1C1;",
                    "opacity": "0.7"
                },

		    }
	    },
	    methods: {
		    onClickMenu(index) {
			    _this.activedIndex = index;
			    _this.menuChanged(index);
			    setTextStyle();
		    },
	    },
	    computed: {},
	    filters: {},
	    created: function () {
		    setTextStyle();
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
     /*font-family: 'SourceHanSansCN-Bold';*/
     /*color: #515151;*/
     /*}*/

     .circleDiv {
	     width: 6px;
	     height: 6px;
	     border: 1px solid #878787;
	     border-radius: 50%;
	     background-color: #878787;
	     text-align: center;
	     margin-top: 5px;
	     margin-left: 15px;
     }
</style >
