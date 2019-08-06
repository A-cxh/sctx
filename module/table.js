;define(function(){
    class Table{
        constructor(options){
            this.aul = options.aul;
            this.otab = options.otab;
            this.obimg = options.obimg;

            this.addEvent();
        }
        addEvent(){
            var that =this;
            this.aul.on("click", "li", function(){
                // console.log($(this).html());
                // console.log(that.otab.html());
                that.otab.html($(this).html());
                that.obimg.html($(this).html());
            })
        }
    }

    return Table;
})