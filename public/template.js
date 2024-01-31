var navigation_is_hide = true; // 左侧导航栏是否收起
var options_is_hide = true; // 更多操作栏是否收起
var shapes = ["m-square1", "m-circle1", "m-square2", "m-circle2"]; // 鼠标点击特效样式表

// window.addEventListener( 'resize', function() { // 监听窗口大小改变
//     location.reload();
// });

document.getElementById("menu").addEventListener('click', function(){ // 小屏-菜单按钮
    if(navigation_is_hide) {
        document.getElementById("navigationMain").style.width = "30vh";
        document.getElementById("menu").style.borderBottom = "1px solid #ddd";
        document.getElementById("menu").innerHTML = "◁ 收起";
        document.getElementById("navigationList").style.display = "block";
        document.getElementById("navLogo").style.display = "block";
        document.getElementById("navSearchBox").style.display = "block";
        document.getElementById("navIcon").style.display = "none";
        document.getElementById("optionsListBar1").innerHTML = "- 返回顶部 -";
        document.getElementById("optionsListBar2").innerHTML = "- 关于本站 -";
    }
    else {
        document.getElementById("navigationMain").style.width = "6vh";
        document.getElementById("menu").style.border = "";
        document.getElementById("menu").innerHTML = "☰";
        document.getElementById("navigationList").style.display = "none";
        document.getElementById("navLogo").style.display = "none";
        document.getElementById("navSearchBox").style.display = "none";
        document.getElementById("navIcon").style.display = "block";
        document.getElementById("optionsListBar1").innerHTML = "▲";
        document.getElementById("optionsListBar2").innerHTML = "Z";
    }
    navigation_is_hide = !navigation_is_hide;
});

document.getElementById("options").addEventListener('click', function(){ // 更多操作按钮
    if(options_is_hide) {
        document.getElementById("options").style.color = "#43b244";
        document.getElementById("optionsList").style.height = "10vh";
        document.getElementById("optionsListBar1").style.opacity = "1";
        document.getElementById("optionsListBar2").style.opacity = "1";
    }
    else {
        document.getElementById("options").style.color = "rgb(82, 82, 82)";
        document.getElementById("optionsList").style.height = "0";
        document.getElementById("optionsListBar1").style.opacity = "0";
        document.getElementById("optionsListBar2").style.opacity = "0";
    }
    options_is_hide = !options_is_hide;
});

document.getElementById("optionsListBar1").addEventListener('click', function() { // 返回顶部
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

document.getElementById("optionsListBar2").addEventListener('click', function() { // 关于本站
    console.log("about");
});

document.getElementById("navSearch").addEventListener('keyup', function(event) { // 导航栏-搜索框
    var input_content;
    if(event.key === 'Enter') { // 按下的是回车键
        input_content = document.getElementById("navSearch").value;
        if(input_content == "help") // 搜索帮助
            createSearchHelp();
        else if(input_content == "#ma-on") { // 开启鼠标点击特效
            document.addEventListener("click", mouseAnimate);
            raiseAlert("鼠标点击特效已开启", 1400);
        }
        else if(input_content == "#ma-off") { // 关闭鼠标点击特效
            document.removeEventListener("click", mouseAnimate);
            raiseAlert("鼠标点击特效已关闭", 1400);
        }
        else // 帮助提示
            raiseAlert("输入help查看搜索帮助", 1400);
    }
});

function destroy_alertBox() {
    var element = document.getElementById("alertBox");
    if (element) element.parentNode.removeChild(element);
}

function myMap(x, a, b, c, d) { // 将x从范围a~b比例映射到c~d
    if (x <= a) return c; 
    if (x >= b) return d;
    return c + (d - c) * ((x - a) / (b - a));
}

function mouseAnimate(event) { // 鼠标点击特效
    var shape = document.createElement("div");
    shape.classList.add("mouse-shape");
    shape.classList.add(shapes[Math.floor(Math.random() * shapes.length)]);
    shape.style.left = (event.clientX - 15) + "px";
    shape.style.top = (event.clientY - 15) + "px";
    document.body.appendChild(shape);
    setTimeout(function() {
        document.body.removeChild(shape);
    }, 910);
}

function raiseAlert(text, time){ // 开启一个提示框
    var warnbox = document.createElement('div');
    warnbox.id = "alertBox";
    warnbox.innerHTML = text;
    document.body.appendChild(warnbox);
    setTimeout(destroy_alertBox, time);
}

function createSearchHelp(){ // 打开搜索指南
    var help_mask = document.createElement("div");
    var help_box = document.createElement("div");
    var scrollfield = document.createElement("div");
    var help_title = document.createElement("div");
    help_mask.id = "searchHelpMask";
    help_box.id = "searchHelpBox";
    scrollfield.classList.add("help-box-scrollfield");
    help_title.classList.add("help-box-title");
    help_title.innerHTML = "※ 搜索指南 ※";
    // 以下添加搜索指令 style: blue/orange/red/green/default
    scrollfield.appendChild(help_title);
    scrollfield.appendChild(createHelpList("help", "打开搜索指南"));
    scrollfield.appendChild(createHelpList("#ma-on", "打开鼠标点击特效", "green"));
    scrollfield.appendChild(createHelpList("#ma-off", "关闭鼠标点击特效", "red"));
    // 以上添加搜索指令
    help_mask.addEventListener("click", function() {
        document.body.removeChild(document.getElementById("searchHelpBox"));
        document.body.removeChild(document.getElementById("searchHelpMask"));
    });
    help_box.appendChild(scrollfield);
    document.body.appendChild(help_mask);
    document.body.appendChild(help_box);
}

function createHelpList(inst, illu, style){ // 搜索指令、介绍、样式选项
    var help_list = document.createElement("div");
    var help_inst = document.createElement("div");
    var help_illu = document.createElement("div");
    help_inst.innerHTML = inst;
    help_illu.innerHTML = illu;
    help_list.classList.add("help-box-list");
    help_inst.classList.add("help-box-inst");
    help_illu.classList.add("help-box-illu");
    switch(style){
        case "blue":
            help_inst.style.border = "1px solid #76C1FF";
            help_inst.style.backgroundColor = "#85EDFF";
            break;
        case "orange":
            help_inst.style.border = "1px solid #FFDB4B";
            help_inst.style.backgroundColor = "#FFF850";
            break;
        case "green":
            help_inst.style.border = "1px solid #37C42F";
            help_inst.style.backgroundColor = "#54D97F";
            break;
        case "red":
            help_inst.style.border = "1px solid #FF7777";
            help_inst.style.backgroundColor = "#FFA1A1";
            break;
    }
    help_list.appendChild(help_inst);
    help_list.appendChild(help_illu);
    return help_list;
}
