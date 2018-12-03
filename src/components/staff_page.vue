<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" >
     <table style="width: 100%;height: 100%;position: fixed;" >
            <tr style="height: 100%" >
                <td width="30%" style="text-align: center;" >
                    <div >
                        <StaffDepartControl v-for="item in staffList"
                                            :ref="staffDepart"
                                            :departInfo="item" ></StaffDepartControl >
                    </div >
                </td >
                <td style="text-align: center;" >

                </td >
                <td width="30%" style="text-align: right" >

                </td >
            </tr >
        </table >
</template >

<script >

    import Vue from 'vue'
    import StaffDepartControl from '../components/staff_depart_control.vue';
    var _this
    export default {
	    name: "StaffPage",
	    components: {
		    StaffDepartControl,
	    },
	    data() {
		    _this = this;
		    return {
			    staffDepart: {},
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
    span {
	    text-align: center;
	    font-family: 'SquareFont';
	    font-size: 18px;
	    color: #AEAEAE;
    }
</style >
