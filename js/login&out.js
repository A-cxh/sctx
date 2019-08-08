;$(document).ready(function(){
    var msg = localStorage.getItem("LoginUser");
    // var userGoods = Array.from(JSON.parse(getCookie("goods")));
    
    if(msg){

        $(".p2").show().find("span").html(JSON.parse(msg).user);
        $(".p2").css({
            display:"inline-block"
        });
        $(".p2").attr("status", "in");
        $(".p1").hide();
        userGoods = getCookie("userGoods") ? JSON.parse(getCookie("userGoods")) : [];
        if(userGoods.length <= 1){
            var goods = [];
        }else if(JSON.parse(getCookie("userGoods"))[0].user == JSON.parse(msg).user){
            var goods = JSON.parse(getCookie("userGoods"))[1];
        }else{
            var goods = [];
        }
        setCookie("goods", JSON.stringify(goods));
    }else{
        $(".p1").show();
        $(".p2").hide();
        $(".p2").removeAttr("status");
    }
    
    $(".p2 .out").on("click", function(){
        $(".p1").show();
        $(".p2").hide();
        $(".p2").removeAttr("status");
        localStorage.removeItem("LoginUser");
        setCookie("goods", "[]");

        // console.log(JSON.parse(getCookie("goods")).length);
        if(JSON.parse(getCookie("goods")).length == 0){
            var nullcar = "";
            nullcar = `<p class = "null">
                        <i></i>
                        <span>
                            购物车还是空空的呢，快去看看心怡的商品吧~
                            <a href="shopList.html">去购物></a>
                        </span>
                    </p>`;
            $("#shops").find(".car").find("dl").html(nullcar);
        }
    })
})