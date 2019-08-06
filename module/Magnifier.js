;define(function(){
    class Magnifier{
        constructor(options){
            this.sbox = options.sbox;
            this.span = options.span;
            this.bbox = options.bbox;
            this.bimg = options.bimg;

            this.addEvent();
        }

        addEvent(){
            var that = this;
            this.sbox.hover(function(){
                that.show();
            }, function(){
                that.hidden();
            })

            this.sbox.on("mousemove", function(){
                that.move();
            })
        }

        show(){
            this.span.css({
                display:"block"
            })
            this.bbox.css({
                display:"block"
            })
        }
        hidden(){
            this.span.css({
                display:"none"
            })
            this.bbox.css({
                display:"none"
            })
        }

        move(){
            let l = event.pageX - this.sbox.offset().left - this.span.width()/2;
            let t = event.pageY - this.sbox.offset().top - this.span.height()/2;

            if(l < 0) l = 0;
            if(t < 0) t = 0;
            if(l > this.sbox.width() - this.span.width()) l = this.sbox.width() - this.span.width();
            if(t > this.sbox.innerHeight() - this.span.innerHeight()) t = this.sbox.innerHeight() - this.span.innerHeight();

            console.log(l, t)
            this.span.css({
                left:l,
                top:t
            })

            let nx = l /this.span.width() * this.bbox.width();
            let ny = t / this.span.height() * this.bbox.height();

            this.bimg.css({
                left:-nx,
                top:-ny
            })
        }

    }

    return Magnifier;
})
