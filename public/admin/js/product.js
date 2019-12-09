$(function(){
  var page=1;
  var pageSize=2
  function render(){
    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info)
      }
    })
  }
  render()
})