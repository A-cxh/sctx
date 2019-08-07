require.config({
    baseUrl:"../module",
    paths:{
        floor:"floor",
        Mag:"Magnifier",
        tab:"table",
        ms:"mstime"
    }
})

require(["floor", "Mag", "tab", "ms"], function(f,m,t,ms){
    new f({
        list:$(".floorList"),
        zero:$(".F0"),
        first:$(".F1"),
        second:$(".F2"),
        third:$(".F3")
    })

    new t({
        aul:$("#content").find(".imgBox").find("ul"),
        otab:$("#content").find(".imgBox").find(".table"),
        obimg:$("#content").find(".imgBox").find(".bimg")
    })

    new m({
        sbox:$("#content").find(".simg"),
        span:$("#content").find(".simg").find("span"),
        bbox:$("#content").find(".bbox"),
        bimg:$("#content").find(".bbox").children(".bimg")
    })

    new ms({
        obox:$(".todayMs").find(".tm-l-tit").find("b"),
        year:2019,
        month:8,
        day:9,
        hour:0,
        minute:0,
        second:0
    })
})