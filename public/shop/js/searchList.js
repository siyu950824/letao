$(function(){
  var href=decodeURI(location.href)
  var key =href.split('=')[1]
  $('.search input').val(key)
  
  function render(){
    // 判断要传几个值
    var option={
      proName:key,
      page:1,
      pageSize:100,
    }
    var $now=$('.now')
    if($now.length===1){
      var name=$now.data('name')
      var value=$now.children('i').hasClass('fa-angle-up') ? 1: 2
      option[name] =value
    }
    $.ajax({
      type:'get',
      url:'/product/queryProduct',
      data :option,
      success:function(info){
        console.log(info);
     var html=template('tpl',info)
     $('.products').html(html)
      }
    })
  }
  render()
  $('.sort li[data-name]').on('click',function(){
     if($(this).hasClass('now')){
       $(this).children('i').toggleClass('fa-angle-up').toggleClass('fa-angle-down')

     }else{
       $(this).addClass('now').siblings().removeClass('now')
     }
     render()
  })
  $('.btn-search').on('click', function() {
    var content = $('.search input').val()
  
    location.href = 'searchList.html?key=' + content
  })
})