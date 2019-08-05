;(function($){
    "use strict";

    $.fn.banner = function(options){
        var ban = {};
        var that = this;
        
        //解析参数
        ban.list = options.list === false ? false : true;
        ban.autoPlay = options.autoPlay === false ? false : true;
        ban.delayTime = options.delayTime || 2000;
        ban.moveTime = options.moveTime || 300;
        //判断传入的index处理当前显示的索引
            //这个值在clickIndexChange中是要走的，点击的是要进来的
            //此值在clickBtnChange中是要进来的，点击时没有当前索引，需要假设（通过±表示要进来的索引）
        if(options.index >= 0 && options.index <= options.imgs.length-1){
            ban.index = options.index;
        }else if(options.index > options.imgs.length-1){
            ban.index = options.imgs.length - 1;
        }else{
            ban.index = 0;
        }
        //设置点击btn要走的图
        ban.preIndex = 0; 

        //创建ul、li插入banner
        ban.createUl = function(){
            if(!ban.list) return 0;
            
            this.ul = $("<ul>");
            var str = "";
            for(var i = 0; i < options.imgs.length; i++){
                str += `<li></li>`;
                // str += `<li>${i+1}</li>`;
            }
            this.ul.html(str);
            that.append(this.ul);

            this.ul.css({
                width:"100%",
                height:26,
                "text-align":"center",
                display:"flex",
                "justify-content":"center",
                position:"absolute",
                bottom:10,
                margin:0,
                padding:0,
                "list-style":"none",
            }).children("li").css({
                "box-sizing":"border-box",
                "align-self":"center",
                float:"left",
                width:10,
                height:10,
                "border-radius":"50%",
                border:"2px solid rgba(255, 255, 255, 0.7)",
                margin:"0 4px"
            }).eq(ban.index).css({
                width:14,
                height:14,
                border:"2px solid hsla(0, 0%, 100%, .5)",
                background:"rgba(255, 255, 255)",
                "background-clip":"padding-box",
            })

            this.clickIndexChange();
        }
        
        //点击li改变index
        ban.clickIndexChange = function(){
            // console.log(that.ul.children("li"))
            var _that = this;
            this.ul.children("li").on("click", function(){
                // console.log(_that.index);        //当前index
                // console.log($(this).index());    //点击元素的索引
                if($(this).index() > _that.index){
                    // console.log("左移");
                    _that.clickIndexMove(1, $(this).index());
                }else if($(this).index() < _that.index){
                    // console.log("右移");
                    _that.clickIndexMove(-1, $(this).index());
                }

                _that.index = $(this).index();

                _that.ul.children("li").css({
                    width:10,
                    height:10,
                    background:"",
                    color:""
                }).eq($(this).index()).css({
                    width:14,
                    height:14,
                    border:"2px solid hsla(0, 0%, 100%, .5)",
                    background:"rgba(255, 255, 255)",
                    "background-clip":"padding-box",
                })
            })
        }

        ban.clickIndexMove = function(lr, iNowIndex){
            //end()上一步，  parent()父级
                options.imgs.eq(this.index).css({
                    left:0
                }).stop().animate({
                    left:-options.imgs.eq(0).width() * lr
                },this.moveTime).end().eq(iNowIndex).css({
                    left:options.imgs.eq(0).width() * lr
                }).stop().animate({
                    left:0
                },this.moveTime)
        }

        //点击左右键切换
        ban.clickBtnChange = function(){
            var _that = this;
            if(!(options.left != undefined && options.left.length > 0 && options.right != undefined && options.right.length > 0)) return 0;

            options.left.on("click", function(){
                if(_that.index == 0){
                    _that.index = options.imgs.length - 1;
                    _that.preIndex = 0;
                }else{
                    _that.index--;
                    _that.preIndex = _that.index + 1;
                }
                _that.clickBtnMove(1);
            })
            options.right.on("click", this.rightClick.bind(this))
        }

        ban.rightClick = function(){
            if(this.index == options.imgs.length - 1){
                this.index = 0;
                this.preIndex = options.imgs.length - 1;
            }else{
                this.index++;
                this.preIndex = this.index - 1;
            }
            this.clickBtnMove(-1);
        }

        ban.clickBtnMove = function(lr){
            options.imgs.eq(this.index).css({
                left:-options.imgs.eq(0).width() * lr
            }).stop().animate({
                left:0
            }, this.moveTime).end().eq(this.preIndex).css({
                left:0
            }).stop().animate({
                left:options.imgs.eq(0).width() * lr
            }, this.moveTime)

            //渲染li样式
            if(!ban.list) return;
            this.ul.children("li").css({
                width:10,
                height:10,
                background:"",
                color:""
            }).eq(this.index).css({
                width:14,
                height:14,
                border:"2px solid hsla(0, 0%, 100%, .5)",
                background:"rgba(255, 255, 255)",
                "background-clip":"padding-box",
            })
        }

        ban.autoAction = function(){
            var _that = this;
            if(!this.autoPlay) return 0;

            this.t = setInterval(()=>{
                this.rightClick();
            },this.delayTime);

            that.hover(function(){
                clearInterval(_that.t);
            },function(){
                _that.t = setInterval(()=>{
                    _that.rightClick();                    
                },_that.delayTime);
            })
        }

        ban.createUl();
        ban.clickBtnChange();
        ban.autoAction();
    }
})(jQuery);