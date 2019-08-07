;class IndexShops{
    constructor(){
        this.box1 = $(".banner2").find(".ms1").find("dl");
        this.box2 = $(".banner2").find(".ms2").find("dl");
        this.box3 = $(".banner2").find(".ms3").find("dl");
        this.box4 = $(".banner2").find(".ms4").find("dl");
        this.box5 = $(".newShops").find(".ns-c").find("ul");
        this.box6 = $(".banner4").find(".ns1").find("dl");
        this.box7 = $(".banner4").find(".ns2").find("dl");
        this.box8 = $(".banner4").find(".ns3").find("dl");
        this.box9 = $(".goodShops").find(".gs-c-c").find("ul");
        this.box10 = $(".yiShu").find(".ys-b-c").find("ul");
        this.box11 = $(".banner9").find(".rx1").find("dl");
        this.box12 = $(".banner9").find(".rx2").find("dl");
        this.box13 = $(".banner9").find(".rx3").find("dl");
        this.box14 = $(".youBi").find(".yb-b-c").find("ul");
        this.box15 = $("header").find(".header-r").find(".t-num");

        this.url = "http://localhost/GulpTest/sctx/data/data.json";

        this.load();
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
                console.log(that.res);
                that.display();
            },
            error:function(res){
                console.log(res);
            }
        })
        this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
        var str15 = 0;
        this.goods.forEach((goodsVal)=>{
            str15 += parseInt(goodsVal.num);
            
        })
        this.box15.html(str15);
    }

    display(){
        var str1 = "";
        for(var i = 0; i < 4; i++){
            str1 += `<dd>
                        <a href="shopDetails.html" target="_blank">
                            <img src="${this.res[i].url}" title = "${this.res[i].name}" id = "${this.res[i].goodsid}"/>
                            <p title = "${this.res[i].name}">${this.res[i].name}</p>
                            <span>${this.res[i].price}</span><span class = "prePrice">${this.res[i].preprice}</span>
                        </a>
                    </dd>`;
        }
        this.box1.html(str1);

        var str2 = "";
        for(var i = 4; i < 8; i++){
            str2 += `<dd>
                        <a href="shopDetails.html" target="_blank">
                            <img src="${this.res[i].url}" title = "${this.res[i].name}" id = "${this.res[i].goodsid}"/>
                            <p title = "${this.res[i].name}">${this.res[i].name}</p>
                            <span>${this.res[i].price}</span><span class = "prePrice">${this.res[i].preprice}</span>
                        </a>
                    </dd>`;
        }
        this.box2.html(str2);

        var str3 = "";
        for(var i = 8; i < 12; i++){
            str3 += `<dd>
                        <a href="shopDetails.html" target="_blank">
                            <img src="${this.res[i].url}" title = "${this.res[i].name}" id = "${this.res[i].goodsid}"/>
                            <p title = "${this.res[i].name}">${this.res[i].name}</p>
                            <span>${this.res[i].price}</span><span class = "prePrice">${this.res[i].preprice}</span>
                        </a>
                    </dd>`;
        }
        this.box3.html(str3);

        var str4 = "";
        for(var i = 12; i < 16; i++){
            str4 += `<dd>
                        <a href="shopDetails.html" target="_blank">
                            <img src="${this.res[i].url}" title = "${this.res[i].name}" id = "${this.res[i].goodsid}"/>
                            <p title = "${this.res[i].name}">${this.res[i].name}</p>
                            <span>${this.res[i].price}</span><span class = "prePrice">${this.res[i].preprice}</span>
                        </a>
                    </dd>`;
        }
        this.box4.html(str4);
        
        var str5 = "";
        for(var i = 16; i < 20; i++){
            str5 += `<li>
                        <a href="shopDetails.html" target="_blank">
                            <img src="${this.res[i].url}"  title = "${this.res[i].name}"  id = "${this.res[i].goodsid}"/>
                            <h4 title="${this.res[i].name}">${this.res[i].name}</h4>
                            <p>${this.res[i].price}</p>
                        </a>
                    </li>`;
        }
        this.box5.html(str5);

        var str6 = "";
        for(var i = 20; i < 24; i++){
            str6 += `<dd>
                        <a href="shopDetails.html" target="_blank">
                            <i><em>${i-19}</em></i>
                            <img src="${this.res[i].url}" title = "${this.res[i].name}"  id = "${this.res[i].goodsid}"/>
                            <p title = "${this.res[i].name}">${this.res[i].name}</p>
                            <span>${this.res[i].price}</span>
                        </a>
                    </dd>`;
        }
        this.box6.html(str6);

        var str7 = "";
        for(var i = 24; i < 28; i++){
            str7 += `<dd>
                        <a href="shopDetails.html" target="_blank">
                            <i><em>${i-19}</em></i>
                            <img src="${this.res[i].url}" title = "${this.res[i].name}"  id = "${this.res[i].goodsid}"/>
                            <p title = "${this.res[i].name}">${this.res[i].name}</p>
                            <span>${this.res[i].price}</span>
                        </a>
                    </dd>`;
        }
        this.box7.html(str7);

        var str8 = "";
        for(var i = 28; i < 32; i++){
            str8 += `<dd>
                        <a href="shopDetails.html" target="_blank">
                            <i><em>${i-19}</em></i>
                            <img src="${this.res[i].url}" title = "${this.res[i].name}"  id = "${this.res[i].goodsid}"/>
                            <p title = "${this.res[i].name}">${this.res[i].name}</p>
                            <span>${this.res[i].price}</span>
                        </a>
                    </dd>`;
        }
        this.box8.html(str8);

        var str9 = "";
        for(var i = 32; i < 36; i++){
            str9 += `<li>
                        <a href="shopDetails.html" target="_blank">
                            <img src="${this.res[i].url}"  title = "${this.res[i].name}" id = "${this.res[i].goodsid}">
                            <h4 title="${this.res[i].name}">${this.res[i].name}</h4>
                            <p>${this.res[i].price}</p>
                        </a>
                    </li>`;
        }
        this.box9.html(str9);

        var str10 = "";
        for(var i = 36; i < 40; i++){
            str10 += `<li>
                        <a href="shopDetails.html" target="_blank">
                            <img src="${this.res[i].url}"  title = "${this.res[i].name}"  id = "${this.res[i].goodsid}"/>
                            <h4 title="${this.res[i].name}">${this.res[i].name}</h4>
                            <p>${this.res[i].price}</p>
                        </a>
                    </li>`;
        }
        this.box10.html(str10);

        var str11 = "";
        for(var i = 40; i < 43; i++){
            str11 += `<dd>
                        <a href="shopDetails.html" target="_blank">
                            <i><em>${i-39}</em></i>
                            <img src="${this.res[i].url}" title = "${this.res[i].name}"  id = "${this.res[i].goodsid}"/>
                            <p title = "${this.res[i].name}">${this.res[i].name}</p>
                            <span>${this.res[i].price}</span>
                        </a>
                    </dd>`;
        }
        this.box11.html(str11);

        var str12 = "";
        for(var i = 43; i < 46; i++){
            str12 += `<dd>
                        <a href="shopDetails.html" target="_blank">
                            <i><em>${i-39}</em></i>
                            <img src="${this.res[i].url}" title = "${this.res[i].name}"  id = "${this.res[i].goodsid}"/>
                            <p title = "${this.res[i].name}">${this.res[i].name}</p>
                            <span>${this.res[i].price}</span>
                        </a>
                    </dd>`;
        }
        this.box12.html(str12);

        var str13 = "";
        for(var i = 46; i < 49; i++){
            str13 += `<dd>
                        <a href="shopDetails.html" target="_blank">
                            <i><em>${i-39}</em></i>
                            <img src="${this.res[i].url}" title = "${this.res[i].name}"  id = "${this.res[i].goodsid}"/>
                            <p title = "${this.res[i].name}">${this.res[i].name}</p>
                            <span>${this.res[i].price}</span>
                        </a>
                    </dd>`;
        }
        this.box13.html(str13);

        var str14 = "";
        for(var i = 49; i < 53; i++){
            str14 += `<li>
                        <a href="shopDetails.html" target="_blank">
                            <img src="${this.res[i].url}"  title = "${this.res[i].name}" id = "${this.res[i].goodsid}"/>
                            <h4 title="${this.res[i].name}">${this.res[i].name}</h4>
                            <p>${this.res[i].price}</p>
                        </a>
                    </li>`;
        }
        this.box14.html(str14);
        
        this.addEventInf();
    }
    
    addEventInf(){
        var that = this;
        $(document).on("click", "img", function(){
            console.log(this)
            console.log(this.id);
            for(var i = 0; i < that.res.length; i++){
                if(this.id == that.res[i].goodsid){
                    console.log(that.res[i]);
                    localStorage.setItem("shopInf", JSON.stringify(that.res[i]));
                }
            }
        })
    }

}

new IndexShops();