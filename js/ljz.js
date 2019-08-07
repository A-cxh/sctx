;class Ljz{
    constructor(){
        this.arr = Array.from($("img"));
        this.ClientH = $(window).height();
        this.addEvent();
    }
    
    addEvent(){
        var that = this;
        var t;
        $(document).ready(()=>{
            $(document).on("scroll", ()=>{
                // console.log($(document).scrollTop());
                clearTimeout(t)
                t = setTimeout(function(){
                    for(var i = 0; i < that.arr.length;i++){
                        // console.log($(that.arr[i]).offset().top - $(document).scrollTop());
                        if($(that.arr[i]).offset().top - $(document).scrollTop() < that.ClientH){
                            $(that.arr[i]).attr("src", $(that.arr[i]).attr("ljz"));
                            that.arr.splice(i,1)
                        }
                    }
                },100);
            })
        })
    }
}

new Ljz();