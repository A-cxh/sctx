define(function(){
    class Floor{
        constructor(options){
            this.btn = options.list;
            this.z = options.zero;
            this.f = options.first;
            this.s = options.second;
            this.t = options.third;
            this.addEvent();
        }
        addEvent(){
            var that = this;
            this.btn.on("click", "li", function(){
                // console.log($(this).index());
                switch($(this).index()){
                    case 0:
                        $(document).scrollTop(that.f.offset().top);break;
                    case 1:
                        $(document).scrollTop(that.s.offset().top);break;
                    case 2:
                        $(document).scrollTop(that.t.offset().top);break;
                    case 3:
                        $(document).scrollTop(that.z.offset().top);break;
                }
            })
        }
    }

    return Floor;
})