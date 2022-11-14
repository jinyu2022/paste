// ==UserScript==
// @name         强制粘贴
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  对某些禁止粘贴的网页实现强制粘贴
// @author       jinyu
// @match        https://webapp.leke.cn/homework-answer-correct/index.html?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=leke.cn
// @grant        unsafeWindow
// ==/UserScript==
//--------------代码以GPL-3.0开源, 请遵守协议-------------- //

(function() {
    'use strict';
var div2 = document.createElement("div")
div2.style = "top: 100px;background-color: red;width:200px;height:100px;z-index: 1000;position: fixed;text"
div2.append("请等待页面完全加载完后点击这里以启用粘贴脚本")
document.body.appendChild(div2);
div2.addEventListener("click", PasteLeke)
var person = new Object();//方便查找题号于数字

function PasteLeke() {
div2.remove()
var div1 = document.createElement("div")
var textare1 = document.createElement("textare")//输入文本的文本框
div1.style = "top: 100px;background-color: red;width:200px;height:100px;z-index: 1000;position: fixed;left:10px"
div1.innerHTML = '<textarea style="width:100%" id="textare1" cols="25" rows="5" placeholder="请输入要粘贴的文本"></textarea><select id="select1"><option vaule="0">选择题号</option></select><button style="float: right;" id="button1" type="submit" vaule="ghf">确认</button>'
document.body.appendChild(div1);
var UserTextare = document.getElementById("button1")
UserTextare.addEventListener("click", PasteOK)//监听点击动作
var ifra = document.getElementsByClassName('ke-edit-iframe');//获取文本框的iframe，根据class，类型是数组
    console.log(ifra)
var cn = new Array();//存题号
var bd = new Array();//放答案的文本框
var options = new Array()
var sel = document.getElementById("select1")//用户选择题号的下拉框
for (let fra of ifra){
    console.log(fra)
    var p1 = fra.parentNode;
    console.log(p1)
    var p2 = p1.parentNode;
    var p3 = p2.parentNode;
    var p4 = p3.parentNode;//一路向上获取父元素
    console.log(p4)
    var cnd = p4.firstChild.firstChild;//获取子元素的em题号
    var key = cnd.innerText;//获取题号
    var value = fra.contentWindow.document.getElementsByClassName("ke-content")//在iframe下寻找文本框
    var option = document.createElement("option")//用户选择题号的下拉框
    option.value = key
    console.log("添加题号：",option.value)
    option.innerHTML = key
    sel.append(option)
    person[key] = value;
    console.log(person)
};

};
function PasteOK(){
    var UserText = document.getElementById("textare1").value//用户输入的文本框
     console.log(UserText)
    var UserOption = document.getElementById("select1").value//用户选择的题号
    console.log(UserOption)
    var LekeBody = person[UserOption]//获取题号对应的文本框
    console.log(LekeBody)
    LekeBody[0].append(UserText)
}
    // Your code here...
})();
