import * as roslib from "../../rosjs/roslib.js";
import can from "../../util/init.js"

import VideoUtils from '../../util/videoUtils';
//import { GEHelper } from '../graphicEngine/GEHelper';

console.log("start");
var ultra_sonic = [0,0,0,0,0,0,0,0];
var ros, imu, video;
var us_1 = 0; 
var us_2 = 0;
var us_3 = 0;
var us_4 = 0;
var us_5 = 0;
var us_6 = 0;
var us_7 = 0;
var us_8 = 0;
var cnt=1;

module.exports = {
    getBlocks() {
        return {
			ros_start: {
				color: "#CCCCCC",
				outerLine: "#999999",
				skeleton: "basic",
				template: "시작하기 ws : // %1 : %2 %3",
				params: [{
					type: "Block",
					accept: "string"
				},{
					type: "Block",
					accept: "string"
				},{
					type: "Indicator",
					img: "block_icon/ros-icon.png",
					size: 10
				}],
				events: {},
				def: {
					params: [{
						type: "text",
						params: [ "192.168.5.191" ]
					},{
						type: "number",
						params: [ "9090" ]
					},
						null
					],
					type: "ros_start"
				},
				class: "test",
				paramsKeyMap: {
					IP: 0,
					PORT: 1
				},
				func: function(sprite, script) {
					var ip = script.getValue("IP", script);
					var port = script.getNumberValue("PORT", script);
					var addr = 'ws://'+ip+':'+port;
					ros = new ROSLIB.Ros({
						url : addr.toString()
					});
				}
			},
			ros_sub_cam: {
				color: "#CCCCCC",
				outerLine: "#999999",
				skeleton: "basic",
				template: "카메라 영상 보이기%1",
				params: [
					{
					type: "Indicator",
					img: "block_icon/ros-icon.png",
					size: 10
					}
				],
				events: {},
				def: {
					type: "ros_sub_cam"
				},
				func: function(sprite, script) {
					var camera_s = new ROSLIB.Topic({
				        ros : ros,
						//name : '/usb_cam/image_raw/compressed',
						name : '/xycar_c1_sensor',
						//messageType : 'sensor_msgs/CompressedImage'
						messageType : 'xycar_msgs/xycar_sensor'
					
					});
					camera_s.subscribe(function(message) {
						if(message.comp_camera_b){
							var video = message.compressed_camera.data
							if(Entry.engine.return_state()){
								//var video = message.data
								var canvas = document.getElementById("entryCanvas");
								var ctx = canvas.getContext('2d');
								var image = new Image();
								image.onload = function() {
									ctx.drawImage(image, 0, 0);
								};
								image.src = `data:image/jpeg;base64,${video}`;
							}else{
								camera_s.unsubscribe();
							}
						}
						/*
						if(Entry.engine.return_state()){
							var video = message.data
							var canvas = document.getElementById("entryCanvas");
							var ctx = canvas.getContext('2d');
							var image = new Image();
                            image.onload = function() {
                                ctx.drawImage(image, 0, 0);
                            };
                            image.src = `data:image/jpeg;base64,${video}`;
						}else{
							camera_s.unsubscribe();
						}
						*/
					});
				},
				syntax: {js: [], py: [],},
			},
			ros_sub_us: {
				color: "#CCCCCC",
				outerLine: "#999999",
				skeleton: "basic",
				template: "초음파 메세지 받아오기 %1",
				params: [
					{
						type: "Indicator",
						img: "block_icon/ros-icon.png",
						size: 10
					},
				],
				events: {
                    /*viewAdd: [
                        function() {
                            if (Entry.container) {
								Entry.variableContainer._addList();//리스트 만들어짐
								Entry.variableContainer.setListName("초음파")//이름 바꿔주기
                            }
                        },
                    ],*/
                    viewDestroy: [
                        function(block, notIncludeSelf) {
                            if (Entry.container) {
								Entry.container.inputValue.setName(Lang.Blocks.VARIABLE_get_canvas_input_value);
                                Entry.container.hideProjectAnswer(block, notIncludeSelf);
                            }
                        },
                    ],
                },
				def: {
					type: "ros_sub_us"
				},
				class: "test",
				func: function (sprite, script) {
					var list = Entry.variableContainer.lists_;
					console.log(list)
					var us_s = new ROSLIB.Topic({
				        ros : ros,
						//name : "/xycar_ultrasonic",
						name : '/xycar_c1_sensor',
						//messageType : "std_msgs/Int32MultiArray"
						messageType : 'xycar_msgs/xycar_sensor'
					});
					us_s.subscribe(function(message) {
						if(message.ultra_sonic_b){
							ultra_sonic = message.ultra_sonic.data
							if (cnt==1){
								if (Entry.container) {
									Entry.variableContainer._addList();//리스트 만들어짐
									Entry.variableContainer.setListName("초음파")//이름 바꿔주기
								}
								cnt = cnt+1;
							}				
							us_1 = ultra_sonic[Object.keys(ultra_sonic)[0]];
							us_2 = ultra_sonic[Object.keys(ultra_sonic)[1]];
							us_3 = ultra_sonic[Object.keys(ultra_sonic)[2]];
							us_4 = ultra_sonic[Object.keys(ultra_sonic)[3]];
							us_5 = ultra_sonic[Object.keys(ultra_sonic)[4]];
							us_6 = ultra_sonic[Object.keys(ultra_sonic)[5]];
							us_7 = ultra_sonic[Object.keys(ultra_sonic)[6]];
							us_8 = ultra_sonic[Object.keys(ultra_sonic)[7]];

							if(Entry.engine.return_state()){
								Entry.variableContainer.setListValue(0, us_1);
								Entry.variableContainer.setListValue(1, us_2);
								Entry.variableContainer.setListValue(2, us_3);
								Entry.variableContainer.setListValue(3, us_4);
								Entry.variableContainer.setListValue(4, us_5);
								Entry.variableContainer.setListValue(5, us_6);
								Entry.variableContainer.setListValue(6, us_7);
								Entry.variableContainer.setListValue(7, us_8);
								
								Entry.variableContainer.updateViews();
							}else{
								Entry.variableContainer.removeList();//리스트 멈춤
								//Entry.variableContainer.delList();//리스트 삭제
								us_s.unsubscribe();
								cnt = 1;
							}
						}
						/*
						if (cnt==1){
							if (Entry.container) {
								Entry.variableContainer._addList();//리스트 만들어짐
								Entry.variableContainer.setListName("초음파")//이름 바꿔주기
                            }
							cnt = cnt+1;
						}
						ultra_sonic = message.data						
						us_1 = ultra_sonic[Object.keys(ultra_sonic)[0]];
						us_2 = ultra_sonic[Object.keys(ultra_sonic)[1]];
						us_3 = ultra_sonic[Object.keys(ultra_sonic)[2]];
						us_4 = ultra_sonic[Object.keys(ultra_sonic)[3]];
						us_5 = ultra_sonic[Object.keys(ultra_sonic)[4]];
						us_6 = ultra_sonic[Object.keys(ultra_sonic)[5]];
						us_7 = ultra_sonic[Object.keys(ultra_sonic)[6]];
						us_8 = ultra_sonic[Object.keys(ultra_sonic)[7]];

						if(Entry.engine.return_state()){
							Entry.variableContainer.setListValue(0, us_1);
							Entry.variableContainer.setListValue(1, us_2);
							Entry.variableContainer.setListValue(2, us_3);
							Entry.variableContainer.setListValue(3, us_4);
							Entry.variableContainer.setListValue(4, us_5);
							Entry.variableContainer.setListValue(5, us_6);
							Entry.variableContainer.setListValue(6, us_7);
							Entry.variableContainer.setListValue(7, us_8);
							
							Entry.variableContainer.updateViews();
						}else{
							Entry.variableContainer.removeList();//리스트 멈춤
							//Entry.variableContainer.delList();//리스트 삭제
							us_s.unsubscribe();
							cnt = 1;
						}*/
					});
				}
			},
			ros_pub_motor:{
				color: "#CCCCCC",
				outerLine: "#999999",
				skeleton: "basic",
				template: "MOTOR에 angle %1 speed %2 %3",
				params: [{
					type: "Block",
					accept: "string"
				}, {
					type: "Block",
					accept: "string"
				}, {
						type: "Indicator",
						img: "block_icon/ros-icon.png",
						size: 10
					}
				],
				events: {},
				def: {
					params:[{
						type: "number",
						params: ["30"]
					}, {
						type: "number",
						params: ["20"]
					},
						null
					],
					type: "ros_pub_motor"
				},
				paramsKeyMap:{
					angle: 0,
					speed: 1
				},
				func: function(sprite, script) {
					var angle_v = script.getNumberValue("angle", script);
					var speed_v = script.getNumberValue("speed", script);
					
					var time = new Date().getSeconds()
					
					var xycar_motor = new ROSLIB.Topic({
						ros : ros,
						name : '/xycar_motor',
						messageType : '/xycar_msgs/xycar_motor'
					});
					var motor = new ROSLIB.Message({
						header: {
							seq : 0 ,
							stamp : 8768,
							frame_id : "motor"
						},
						angle : angle_v,
						speed : speed_v
					});
					xycar_motor.publish(motor);
				}
			},
		};
    },
};