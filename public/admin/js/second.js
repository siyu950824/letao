$(function(){
  var page=1;
  var pageSize=5
  function render(){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
      page:page,
      pageSize:pageSize
      },
      success:function(info){
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
$('.btn-add').on('click',function(){
  $('.addModal').modal('show')
  $.ajax({
    type:'get',
    url:'/category/queryTopCategoryPaging',
    data:{
      page:1,
      pageSize:100
    },
    success:function(info){
      console.log(info);
     $('.dropdown-menu').html(template('dropdownTpl',info))
    }
  })
})
})



