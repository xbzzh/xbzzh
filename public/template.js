let navigation_is_hide = true; // 左侧导航栏是否收起

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
    }
    else {
        document.getElementById("navigationMain").style.width = "6vh";
        document.getElementById("menu").style.border = "";
        document.getElementById("menu").innerHTML = "☰";
        document.getElementById("navigationList").style.display = "none";
        document.getElementById("navLogo").style.display = "none";
        document.getElementById("navSearchBox").style.display = "none";
        document.getElementById("navIcon").style.display = "block";
    }
    navigation_is_hide = !navigation_is_hide;
});
