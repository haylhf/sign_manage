<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >
    <div>
        <div id="tour" class="zebra" style="position: fixed;z-index: -100;">
            <div class="wrap" >
                <div class="switcher-wrap slider" >
                    <ul id="img-slider" >
                        <li class="li_img text-center" v-for="u in userList"
                            style="float: left;width: 300px;height: 600px;
                            background-image: url('../../src/assets/img/card_menber.png');
" >
                            <img :src="u.photo"
                                 style="width: 180px;height: 180px;border-radius: 50%;
                                align-items: center;justify-content: center;
                                overflow: hidden;
                                margin-top: 30px" />
                            <div class="col-center-block text-center label" >
                                <div style="min-height: 80px;margin-top: 20px;
                                font-size: 48px;color: #515151;" >
                                    {{u.name}}
                                </div >
                                <span style="font-size: 24px;color: #515151;" >
                                    {{u.departName}}
                                </span >
                            </div >
                        </li >
                    </ul >
                </div >
            </div >
        </div >

        <table style="width: 100%;height: 100%;" >
            <tr >
                <td width="30%" style="text-align: center;" >
                    <StaffDepartControl style="margin-left: 25%;margin-top: 40px;"
                                        v-for="item in staffList"
                                        :departInfo="item" ></StaffDepartControl >
                </td >
                <td style="text-align: center;" >

                </td >
                <td width="30%" style="text-align: center;" >
                    <div style="margin-left: 40%; margin-top: 10px;" >
                        <StaffInfoControl style="margin-bottom: 40px;"
                                          v-for="item in staffInfoList"
                                          :staffInfo="item"
                        ></StaffInfoControl >
                    </div >
                </td >
            </tr >
    </table >
    </div>

</template >

<script >
    $(document).ready(function () {
        $('#img-slider li').bind({
            reposition: function() {
                // var degrees = $(this).data('roundabout').degrees,
                //     roundaboutBearing = $(this).parent().data('roundabout').bearing,
                //     rotateY = Math.sin((roundaboutBearing - degrees) * (Math.PI/180)) * 9;
                //
                // $(this).css({
                //     "-webkit-transform": 'rotate(' + rotateY + 'deg)',
                //     "-moz-transform": 'rotate(' + rotateY + 'deg)',
                //     "-ms-transform": 'rotate(' + rotateY + 'deg)',
                //     "-o-transform": 'rotate(' + rotateY + 'deg)',
                //     "transform": 'rotate(' + rotateY + 'deg)'
                // });
            }
        });

        $(document).click(()=>{
            $('#img-slider').roundabout('animateToNextChild');
//            $('#img-slider').roundabout('animateToNextChild');
        })

	    $('.jQ_sliderSwitch li').on('click', function () {
		    var $elem = $(this);
		    var index = $elem.index();

		    $('#img-slider').roundabout('animateToChild', index);

		    return false;
	    });

	    $('#img-slider').roundabout({
		    minScale: 0.1,
		    maxScale: 1,
		    duration: 750
	    }).bind({
		    animationEnd: function (e) {

		    }
	    });

    });
    import StaffDepartControl from '../components/staff_depart_control.vue';
    import StaffInfoControl from '../components/staffInfo_control.vue';
    var _this
    export default {
	    name: "StaffPage",
	    components: {
		    StaffDepartControl,
		    StaffInfoControl,
	    },
	    data() {
		    _this = this;
		    return {
			    staffList: [
				    {
					    departName: "人事部",
					    currentValue: 40,
					    totalValue: 100,
				    },
				    {
					    departName: "产品部",
					    currentValue: 50,
					    totalValue: 100,
				    },
				    {
					    departName: "开发部",
					    currentValue: 28,
					    totalValue: 100,
				    },
				    {
					    departName: "投资部",
					    currentValue: 80,
					    totalValue: 100,
				    }
			    ],
			    staffInfoList: [
				    {
					    name: "张 三",
					    departName: "人事部",
				    },
				    {
					    name: "张 三",
					    departName: "投资部",
				    },
				    {
					    name: "张 三",
					    departName: "开发部",
				    },
				    {
					    name: "李海峰",
					    departName: "投资部",
				    },
			    ],
			    userList: [
				    {
					    name: "张 一",
					    departName: "人事部",
					    photo: require("../assets/img/male.png")
				    },
				    {
					    name: "张 二",
					    departName: "投资部",
					    photo: require("../assets/img/male.png")
				    },
				    {
					    name: "张 三",
					    departName: "开发部",
					    photo: require("../assets/img/male.png")
				    },
			    ]
		    }
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

</style >
