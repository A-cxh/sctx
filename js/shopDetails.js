class GetInf{
    constructor(){
        this.box1 = $("#content").find(".table");
        this.box2 = $("#content").find(".bbox").find(".bimg");
        this.box3 = $("#content").find(".small");
        this.box4 = $("#content").find(".details").find(".title");
        this.box5 = $("#content").find(".num").find("i");
        this.getTnf();
    }

    getTnf(){
        // console.log(localStorage.getItem("shopInf"));
        this.inf = JSON.parse(localStorage.getItem("shopInf"));
        // console.log(this.inf);
        this.display();
    }

    display(){
        var str1 = "";
        str1 += `<img src="${this.inf.url}" />`;
        this.box1.html(str1);
        this.box2.html(str1);
        this.box3.html(str1);

        var str2 = "";
        str2 += `<h2>${this.inf.name}</h2>
                <p class = "price"><span>售价</span>${this.inf.price}</p>`;
        this.box4.html(str2);

        var str3 = "";
        str3 +=  `${this.inf.num}`;
        this.box5.html(str3);
    }
}

new GetInf()