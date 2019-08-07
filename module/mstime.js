;define(function(){
    class Mstime{
        constructor(options){
            this.box = options.obox;
            this.syear = options.year;
            this.smonth = options.month;
            this.sday = options.day;
            this.shour = options.hour;
            this.sminute = options.minute;
            this.ssecond = options.second;

            this.init();
        }

        init(){
            let that = this;
        
            var t = setInterval(()=>{
                let now = new Date();
                let after = new Date(this.syear, this.smonth-1, this.sday, this.shour, this.sminute, this.ssecond);
                let leftTime = after - now;
                
                this.gdays = parseInt(leftTime / 1000 / 60 / 60 / 24);
                this.ghours = parseInt(leftTime / 1000 / 60 / 60 % 24);
                this.gminutes = parseInt(leftTime / 1000 / 60 % 60);
                this.gseconds = parseInt(leftTime / 1000 % 60);
                this.display();
                if(leftTime == 0){
                    clearTimeout(t);
                }
            },1000)
        }

        display(){
            var str = "";
            str += ` 距结束：${this.add0(this.ghours)}小时${this.add0(this.gminutes)}分${this.add0(this.gseconds)}秒`;
            this.box.html(str);;
        }

        add0(n){
            if(n < 10){
                return "0" + n;
            }
            else{
                return n;
            }
        }
    }

    return Mstime;
})