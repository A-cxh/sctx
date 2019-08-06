require.config({
    baseUrl:"../module",
    paths:{
        floor:"floor",
        Mag:"Magnifier",
        tab:"table"
    }
})

require(["floor", "Mag", "tab"], function(f,m,t){
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
})