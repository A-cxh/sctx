;class Car{
    constructor(){
        this.dd = $("#shops").find(".car").find("dl");
        this.box1 = $(".jiesuan").find("span").find("i");
        this.box2 = $(".jiesuan").find("span").find("b");
        this.box3 = $("header").find(".header-r").find(".t-num");

        this.url = "http://localhost/GulpTest/sctx/data/data.json";

        this.load();
        this.addRemove();
        this.status = 0;
        // this.adduser();
    }

    load(){
        var that = this;
        Ajax({
            type: "post",
            url: this.url,
            data: {
                columnName: "cb",
                cb: "qfh"
            },
            success:function(res){
                that.res = JSON.parse(res);
                // console.log(that.res);
                that.getCookie();
            },
            error:function(res){
                console.log(res);
            }
        })
    }

    getCookie(){
        this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
        // console.log(this.goods);
        // console.log(this.res)
        this.display();
    }

    display(){
        var str = "";
        var str1 = 0;
        var str2 = 0;
        var str3 = 0;
        var allstr1 = 0;
        var allstr2 = 0;
        if(this.goods.length == 0){
            if(this.goods.length == 0){
                var str3 = "";
                str3 = `<p class = "null">
                            <i></i>
                            <span>
                                购物车还是空空的呢，快去看看心怡的商品吧~
                                <a href="shopList.html">去购物></a>
                            </span>
                        </p>`;
                this.dd.html(str3);
            }
        }else{
            this.res.forEach((resVal)=>{
                this.goods.forEach((goodsVal)=>{
                    if(resVal.goodsid == goodsVal.id){
                        // console.log(parseInt(resVal.price.slice(1,resVal.price.length-1)))
                        str += `<dd myindex = "${resVal.goodsid}">
                                    <ul>
                                        <li>
                                            <input type="checkbox" name="" id="check">
                                            <img src="${resVal.url}" >
                                            <span>${resVal.name}</span>
                                        </li>
                                        <li>${resVal.price}</li>
                                        <li><input type="number" min = 1 max = "${resVal.num}" name="" id="num" value = "${goodsVal.num}"></li>
                                        <li>${parseInt(resVal.price.slice(1,resVal.price.length-1))*goodsVal.num}</li>
                                        <li class = "del">删除</li>
                                    </ul>
                                </dd>`;
                        str3 += parseInt(goodsVal.num);

                        allstr1 += parseInt(goodsVal.num);
                        allstr2 += parseInt(resVal.price.slice(1,resVal.price.length-1))*goodsVal.num;
                    }
                })
            })

            // $("#shops").find("dl").find("dd").find("input[type='checkbox']").click(function () {
            //     /*初始化选择为TURE*/
            //     $("#allCheck")[0].checked = true;
            //     /*获取未选中的*/
            //     var nocheckedList = new Array();
            //     $("#shops").find("dl").find("dd").find("#check").not(":checked").each(function () {
            //         nocheckedList.push($(this).val());
            //     });

            //     /*状态显示*/
            //     if (nocheckedList.length == $("#shops").find("dl").find("dd").find("#check").length) {
            //         $("#allCheck")[0].checked = false;
            //     } else if (nocheckedList.length == 0) {
            //         $("#allCheck")[0].checked = true;
            //     } else if (nocheckedList.length) {
            //         $("#allCheck")[0].checked = false;
            //     }
            // });
            // // 全选/取消
            // $("#allCheck").click(function () {
            //     // alert(this.checked);
            //     console.log($("#shops").find("dl").find("dd").find("#check"))
            //     if ($(this).is(":checked")) {
            //         $("#shops").find("dl").find("dd").find("#check").each(function () {
            //             $(this).prop("checked", true);
            //         });

            //     } else {
            //         $("#shops").find("dl").find("dd").find("#check").each(function () {
            //             $(this).removeAttr("checked", false);
            //             // 根据官方的建议：具有 true 和 false 两个属性的属性，
            //             // 如 checked, selected 或者 disabled 使用prop()，其他的使用 attr()
            //             $(this).prop("checked", false);
            //         });
            //     }
            // });
            var that = this;
            // 改数量
            $(document).on("mousedown", "#num", function(){
                var prenum = $(this).val();
                var preprice = $(this).parent().prev("li").html();
                var preAddprice = preprice.slice(1, preprice.length-1) * prenum;
                $(document).on("mouseup", "#num", function(){
                    var check = $("#allCheck").prop("checked");
                    $("#shops").find("dl").find("dd").find("#check").prop("checked", check);
                    // var check1 = $("#check").prop("checked");
                    // $("#shops").find("dl").find("dd").find("#check").prop("checked", check1);

                    var mynum = $(this).val();
                    var myprice = $(this).parent().prev("li").html();
                    var myAddprice = myprice.slice(1, myprice.length-1) * mynum;
                    if($("#shops").find("dl").find("dd").find("#check").is(":checked")) that.status = 1;
                    if(!$("#shops").find("dl").find("dd").find("#check").is(":checked")) that.status = 0;
                    // console.log(myAddprice);
    
                    if(that.status == 1){
                        str1 = allstr1 + parseInt(mynum) - parseInt(prenum);
                        str2 = allstr2 + parseInt(myAddprice) - parseInt(preAddprice);
                    }
                    if(that.status == 0){
                        str1 = 0;
                        str2 = 0;
                    }
                    that.box1.html(str1);
                    that.box2.html(str2);  
                })
            });
            // 全选
            $(".jiesuan").on("change", "#allCheck", function(){
                // console.log($(this).is(":checked"));
                var check = $(this).prop("checked");
                $("#shops").find("dl").find("dd").find("#check").prop("checked", check);
                if($(this).is(":checked")) that.status = 1;
                if(!$(this).is(":checked")) that.status = 0;
                // console.log(that.status);
                if(that.status == 1){
                    str1 = allstr1;
                    str2 = allstr2;
                }
                if(that.status == 0){
                    str1 = 0;
                    str2 = 0;
                }
                // console.log(str1);
                that.box1.html(str1);
                that.box2.html(str2);  
            });
            // 选单个
            $(document).on("change", "#check", function(){
                $(this).prop("checked");
                var mynum = $(this).parent().nextAll().children("#num").val();
                var myprice = $(this).parent().nextAll().html();
                myprice = myprice.slice(1, myprice.length-1);
                if($(this).is(":checked")) that.status = 1;
                if(!$(this).is(":checked")) that.status = 0;
                // console.log(that.status);
                if(that.status == 1){
                    str1 += parseInt(mynum);
                    str2 += parseInt(mynum)*parseInt(myprice);
                }
                if(that.status == 0){
                    str1 -= parseInt(mynum);
                    str2 -= parseInt(mynum)*parseInt(myprice);
                }
                // console.log(str1);
                that.box1.html(str1);
                that.box2.html(str2);       
            })

            this.dd.html(str);
            
            this.box3.html(str3);
        }
    }

    addRemove(){
        var that = this;
        $(document).on("click", ".del" ,function(){
            // console.log($(this).parent().parent().attr("myindex"));
            that.index = $(this).parent().parent().attr("myindex");
            $(this).parent().parent().remove();
            that.changeCookie(function(i){
                that.goods.splice(i,1);
            });
            // console.log(that.index);
            // console.log(JSON.parse(getCookie("userGoods"))[1]);

            var userGoods = JSON.parse(getCookie("userGoods"))[1];
            for(var i = 0; i < userGoods.length; i++){
                if(userGoods[i].id == that.index){
                    userGoods.splice(i,1);
                }
            }
            // console.log([JSON.parse(localStorage.getItem("LoginUser")) ,userGoods]);
            setCookie("userGoods", JSON.stringify([JSON.parse(localStorage.getItem("LoginUser")) ,userGoods]));
        })
        
        $(document).on("input", "#num", function(){
            var _this = this;
            that.index = $(this).parent().parent().parent().attr("myindex");
            that.changeCookie(function(i){
                that.goods[i].num = $(_this).val();
                // console.log($(_this).val())
            })
        })
    }

    changeCookie(callback){
        var i;
        this.goods.some((val, index)=>{
            i = index;
            return val.id == this.index;
        })
        callback(i);
        setCookie("goods", JSON.stringify(this.goods));
        this.display()
    }

    // adduser(){
    //     console.log(getCookie("goods"))
    // }
}

new Car();