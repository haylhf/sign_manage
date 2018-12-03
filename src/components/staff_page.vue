<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >
     <table style="width: 100%;height: 100%;" >
            <tr>
                <td width="30%" style="text-align: center;" >
                    <StaffDepartControl style="margin-left: 25%;margin-top: 40px;"
                                        v-for="item in staffList"
                                        :departInfo="item" ></StaffDepartControl >
                </td >
                <td style="text-align: center;" >

                </td >
                <td width="30%" style="text-align: center;" >
                    <div style="margin-left: 40%; margin-top: 10px;">
                        <StaffInfoControl style="margin-bottom: 40px;"
                                          v-for="item in staffInfoList"
                                          :staffInfo="item"
                        ></StaffInfoControl >
                    </div>
                </td >
            </tr >
     </table >
</template >

<script >
    import Vue from 'vue'
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
