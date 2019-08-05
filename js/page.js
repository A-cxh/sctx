$(function(){
    //console.log($(".pagination").pagination);
    $(".pagination").pagination(5,{
        items_per_page:1,
        // num_display_entries:5,
        num_edge_entries:2,
        prev_text:"上一页",
        next_text:"下一页",
        callback:function(index){
            
        }
    })
})