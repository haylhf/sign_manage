//Server root address
var IP = "http://192.168.0.119";
var HOST = IP + ":9090/";
var SYSTEMNAME = "Face";
var MqttServer = `192.168.0.119`;
var ServerPort = Number(61623);
var ServerTOPIC = ["staff/sign_in", "staff/vip/sign_in", "staff/sign_in/reset"];
var HOME_SCREEN_TITLE = "签到墙"
var PHOTO_URL = `http://192.168.0.119:9812/image/`;

var EveryPageNum = 10;
var MaxUpDownItems = 4;

var NUMBER_IN_LINE = 5;

const STATISTICS_DATE_MODE = {
	YEAR: 0,
	MONTH: 1,
	DAY: 2
}



