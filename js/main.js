require.config({
    baseUrl:"../module",
    paths:{
        floor:"floor"
    }
})

require(["floor"], function(f){
    new f({
        list:$(".floorList"),
        zero:$(".F0"),
        first:$(".F1"),
        second:$(".F2"),
        third:$(".F3")
    })
})