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
        console.log(info);
       $('tbody').html(template('tpl',info))
       $('#page').bootstrapPaginator({
        bootstrapMajorVersion: 3,
        currentPage: page,
        totalPages: Math.ceil(info.total / info.size),
        onPageClicked: function (a, b, c, d) {
          page = d
          render()
        }
      });
      }
    })
  }
  render()
})