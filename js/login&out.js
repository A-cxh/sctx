;$(document).ready(function(){
    var msg = localStorage.getItem("LoginUser");
    
    if(msg){
        $(".p2").show().find("span").html(JSON.parse(msg).user);
        $(".p2").css({
            display:"inline-block"
        })
        $(".p1").hide();
    }else{
        $(".p1").show();
        $(".p2").hide();
    }
    
    $(".p2 .out").on("click", function(){
        $(".p1").show();
        $(".p2").hide();
        localStorage.removeItem("LoginUser");
    })
})