const weatherURL = "https://devapi.qweather.com/v7/weather/now?";
var card_theme = 0; // 0: share  1: hobby  2: blog
var interval_is_on = true;
var dialog_idx = 0; // max: 3
const dialog_list = ["「 嗨，想我了吗♪ 」", "新的一天从一场美妙的邂逅开始♪", "这束鲜花，要心怀感激地收下哦♪", "可爱的少女心可是无所不能的哦♥"];
document.getElementById("toShare").style.color = "white";
document.getElementById("toShare").style.backgroundColor = "rgb(161, 227, 161)";
$("#weatherBody").hide();

var changeCard = setInterval(() => {
    if(card_theme == 0) {
        changeTheme(1);
        card_theme = 1;
    }
    else if(card_theme == 1) {
        changeTheme(2);
        card_theme = 2;
    }
    else if(card_theme == 2) {
        changeTheme(0);
        card_theme = 0;
    }
}, 5200);

let date = new Date();
let hours = date.getHours();
let min = date.getMinutes();
document.getElementById("clock").innerHTML = hours + " : " + min;
setInterval(() => {
    let date = new Date();
    let hours = date.getHours();
    let min = date.getMinutes();
    document.getElementById("clock").innerHTML = hours + " : " + min;
}, 60000);

function changeDialog() {
    dialog_idx += 1;
    if(dialog_idx > 3) dialog_idx = 0;
    document.getElementById("dialog").innerHTML = dialog_list[dialog_idx];
}

function changeTheme(target) { // 0: share  1: hobby  2: blog
    var dir = 'top';
    if(window.innerWidth >= 870) // 如果大屏模式
        dir = 'left';
    if(target == 1) { // to hobby
        document.getElementById("cardImg").style.background = "linear-gradient(to " + dir + ", rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)), url(./assets/home_card4.jpg) no-repeat";
        document.getElementById("cardImg").style.backgroundSize = "cover";
        document.getElementById("imgAuthor1").innerHTML = "By miHoYo";
        resetTitleStyle();
        document.getElementById("toHobby").style.color = "white";
        document.getElementById("toHobby").style.backgroundColor = "rgb(161, 227, 161)";
    }
    else if(target == 2) { // to blog
        document.getElementById("cardImg").style.background = "linear-gradient(to " + dir + ", rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)), url(./assets/home_card3.jpg) no-repeat";
        document.getElementById("cardImg").style.backgroundSize = "cover";
        document.getElementById("imgAuthor1").innerHTML = "原创拍摄";
        resetTitleStyle();
        document.getElementById("toBlog").style.color = "white";
        document.getElementById("toBlog").style.backgroundColor = "rgb(161, 227, 161)";
    }
    else if(target == 0) { // to share
        document.getElementById("cardImg").style.background = "linear-gradient(to " + dir + ", rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)), url(./assets/home_card1.jpg) no-repeat";
        document.getElementById("cardImg").style.backgroundSize = "cover";
        document.getElementById("imgAuthor1").innerHTML = "By 米山舞よねやままい";
        resetTitleStyle();
        document.getElementById("toShare").style.color = "white";
        document.getElementById("toShare").style.backgroundColor = "rgb(161, 227, 161)";
    }
}

function resetTitleStyle() {
    document.getElementById("toShare").style.color = "rgb(47, 47, 47)";
    document.getElementById("toHobby").style.color = "rgb(47, 47, 47)";
    document.getElementById("toBlog").style.color = "rgb(47, 47, 47)";
    document.getElementById("toShare").style.backgroundColor = "#e9e9e9";
    document.getElementById("toHobby").style.backgroundColor = "#e9e9e9";
    document.getElementById("toBlog").style.backgroundColor = "#e9e9e9";
}

document.getElementById("cardImg").addEventListener('click', function() {
    document.getElementById("imgAuthor1").style.opacity = "1";
    setTimeout(function() {
        document.getElementById("imgAuthor1").style.opacity = "0";
    }, 1400);
});

document.getElementById("scrollBox").addEventListener('click', function() { changeDialog(); });
document.getElementById("mobileBox").addEventListener('click', function() {
    document.getElementById("mobileBox").style.transform = "translateX(-100%)";
    changeDialog();
    setTimeout(function() {
        document.getElementById("mobileBox").style.transform = "translateX(0)";
    }, 2000);
});

document.getElementById("toBlog").addEventListener('click', function(){
    if(interval_is_on) {
        clearInterval(changeCard); // 清除定时器
        interval_is_on = false;
    }
    resetTitleStyle();
    document.getElementById("toBlog").style.color = "white";
    document.getElementById("toBlog").style.backgroundColor = "rgb(161, 227, 161)";
    changeTheme(2);
    card_theme = 2;
});

document.getElementById("toHobby").addEventListener('click', function(){
    if(interval_is_on) {
        clearInterval(changeCard);
        interval_is_on = false;
    }
    resetTitleStyle();
    document.getElementById("toHobby").style.color = "white";
    document.getElementById("toHobby").style.backgroundColor = "rgb(161, 227, 161)";
    changeTheme(1);
    card_theme = 1;
});

document.getElementById("toShare").addEventListener('click', function(){
    if(interval_is_on) {
        clearInterval(changeCard);
        interval_is_on = false;
    }
    resetTitleStyle();
    document.getElementById("toShare").style.color = "white";
    document.getElementById("toShare").style.backgroundColor = "rgb(161, 227, 161)";
    changeTheme(0);
    card_theme = 0;
});

document.addEventListener('mousemove', function(event) {
    var scroll_box = document.getElementById("scrollBox");
    var mouseX = event.clientX;
    var imgW = scroll_box.offsetWidth;
    var winW = window.innerWidth;
    if(mouseX <= winW * 0.6 && mouseX >= 0)
        scroll_box.style.transform = "translateX(-"+ myMap(mouseX, 0, winW * 0.6, 0, imgW) +"px)";
});

document.getElementById("cityCfm").addEventListener('click', function() {
    var location = document.getElementById("iptCity").value;
    var url = weatherURL + "location=" + location + "&key=fc58b4c6ca6345c8a712f413753dfae4";
    switch(location) {
        case "101210101":
            document.getElementById("cityName").innerHTML = "杭州";
            break;
        case "101010100":
            document.getElementById("cityName").innerHTML = "北京";
            break;
        case "101190101":
            document.getElementById("cityName").innerHTML = "南京";
            break;
        case "101020100":
            document.getElementById("cityName").innerHTML = "上海";
            break;
        case "101280601":
            document.getElementById("cityName").innerHTML = "深圳";
            break;
        case "101310101":
            document.getElementById("cityName").innerHTML = "海口";
            break;
    }
    $.get(url, function(data) { // 请求天气数据
        $("#weatherMask").hide();
        $("#weatherBody").show();
        document.getElementById("updatedTime").innerHTML = "更新时间: " + data.now.obsTime;
        document.getElementById("cityTemp").innerHTML = data.now.temp + "℃";
        document.getElementById("para1").innerHTML = data.now.text;
        document.getElementById("para2").innerHTML = data.now.humidity + "%";
        document.getElementById("para3").innerHTML = data.now.windDir;
        document.getElementById("para4").innerHTML = data.now.vis + "km";
    }).fail(function() { // 请求失败
        raiseAlert("ERROR: 天气请求失败!", 3000);
    });
});