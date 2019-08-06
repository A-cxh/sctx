;class ShopList{
    constructor(){
        this.box1 = $("#shopList").find(".remai");
        this.box2 = $("#main").find(".aside").find("ul");
        this.box3 = $("#main").find(".shops").find("ul");
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
    }

    display(){
        var str1 = "";
        for(var i = 4; i < 8; i++){
            str1 += `<dd>
                        <a href="shopDetails.html" target="_blank" class = "remaiList">
                            <img src="${this.res[i].url}" title="${this.res[i].name}" id = "${this.res[i].goodsid}">
                            <p title="${this.res[i].name}">${this.res[i].name}</p>
                            <span>特价:<b>${this.res[i].price}</b></span>
                            <i href="shopDetails.html" target="_blank">查看详情</i>
                        </a>
                    </dd>`;
        }
        this.box1.html(str1);

        var str2 = "";
        for(var i = 16; i < 20; i++){
            str2 += `<li>
                        <a href="shopDetails.html" target="_blank">
                            <img src="${this.res[i].url}" title="${this.res[i].name}" id = "${this.res[i].goodsid}"/>
                            <p title="${this.res[i].name}">${this.res[i].name}</p>
                            <span>${this.res[i].price}</span>
                        </a>
                    </li>`;
        }
        this.box2.html(str2);
        
        var str3 = "";
        for(var i = 0; i < 12; i++){
            str3 += `<li>
                        <a href="shopDetails.html" target="_blank">
                            <div class="imgBox">
                            <img src="${this.res[i].url}" title="${this.res[i].name}" id = "${this.res[i].goodsid}"/>
                            </div>
                            <p title="${this.res[i].name}">${this.res[i].name}</p>
                            <span>${this.res[i].price}<i>包邮</i></span>
                            <b></b>
                        </a>
                    </li>`;
        }
        this.box3.html(str3);

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

new ShopList();