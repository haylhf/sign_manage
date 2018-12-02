<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div style="height:100%; width:105%; overflow-y: auto;padding-right: 42px" @mousewheel="scroll">
        <ul>
            <li v-for="(item, index) in textList" style="margin-top: 50px;cursor:pointer" v-on:click="onClick(index)">
                <span style="font-size: 56px;color: white;margin-right: 10px"
                      v-show="index === activeIndex">&bull;</span>
                <span :class="filterStyle(index)">{{item}}</span>
            </li>
        </ul>
    </div>
</template>

<script>

    var _this;
    var clearDeltaYinterval;
    export default {
        name: "TextScroller",
        props: {
            textList: {
                type: Array,
                default: []
            },
            positionChanged: {
                type: Function,
                default: null
            },
            currentIndex: {
                type: Number,
                default:0
            }
        },
        data() {
            _this = this;
            return {
                activeIndex: 0,
                deltaY: 0,
            }
        },
        methods: {
            scroll(e) {
                _this.deltaY += e.deltaY;
                if(_this.deltaY > 250) {
                    if(_this.activeIndex < _this.textList.length -1) {
                        _this.activeIndex++;
                        _this.deltaY = 0;
                        _this.positionChanged(_this.activeIndex);
                    }
                } else if(_this.deltaY < -250) {
                    if(_this.activeIndex > 0) {
                        _this.activeIndex--;
                        _this.deltaY = 0;
                        _this.positionChanged(_this.activeIndex);
                    }
                }
            },
            onClick(index) {
                _this.activeIndex = index;
                _this.positionChanged(_this.activeIndex);
            },
            filterStyle(index) {
                let style = 'normal-text';
                if (index === _this.activeIndex) {
                    style = 'active-text';
                } else if (Math.abs(index - _this.activeIndex) === 1) {
                    style = 'next-active-text'
                }
                return style;
            }
        },
        computed: {},
        filters: {},
        watch: {
            currentIndex:function (newValue, oldValue) {
                if(newValue != oldValue && newValue != _this.activeIndex) {
                    _this.activeIndex = newValue;
                }
            }
        },
        created: function () {
            clearDeltaYinterval = setInterval(()=>{
                _this.deltaY = 0;
            },1000)
        },
        mounted: function () {

        },
        destroyed: function () {
            clearInterval(clearDeltaYinterval);
        }
    }

</script>
<style>
    .active-text {
        font-family: PingFangSC-Semibold, sans-serif;
        font-size: 48px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: right;
    }

    .next-active-text {
        font-family: PingFangSC-Semibold, sans-serif;
        font-size: 36px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: right;
        filter: alpha(Opacity=80);
        -moz-opacity: 0.8;
        opacity: 0.8;
    }

    .normal-text {
        font-family: PingFangSC-Semibold, sans-serif;
        font-size: 24px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: right;
        filter: alpha(Opacity=40);
        -moz-opacity: 0.4;
        opacity: 0.4;
    }
</style>
