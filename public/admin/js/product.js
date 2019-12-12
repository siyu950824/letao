$(function(){
  var page=1
  var pageSize=2
  var arr=[]
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
  $('.btn-add').on('click', function () {
    $('.addModal').modal('show')
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        $('.dropdown-menu').html(template('dropdownTpl', info))
      }
    })
  })
  $('.dropdown-menu').on('click', 'a', function () {
    var content = $(this).text()
    var id = $(this).data('id')
    $('.text').text(content)
    $('[name=brandId]').val(id)
    $('form').data('bootstrapValidator').updateStatus('brandId', 'VALID')
  })

  $('#file').fileupload({
    done: function (e, data) {
      var info = data.result
      console.log(data);
      
      console.log(info)
      // $('.brandLogo').attr('src', info.picAddr)
      $('<img src="'+info.picAddr+'" class="brandLogo" width="100"  height="100" alt="">').appendTo('.img_box')
    
    arr.push(data.result)
     if(arr.length>=3) {
      $('[name=picArr]').val(JSON.stringify(arr))
      $('form').data('bootstrapValidator').updateStatus('picArr', 'VALID')
     }
    }
  })
  $('form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
     num: {
        validators: {
          notEmpty: {
            message: '请输入商品的库存'
          },
          regexp:{
            regexp:/^[1-9]\d{0,4}$/,
            message: '库存范围1~99999'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品尺码'
          },
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message: '请输入正确的尺码格式：比如32-42'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品原价'
          }
        }
      },
      Price: {
        validators: {
          notEmpty: {
            message: '请输入商品价格'
          }
        }
      },
      picArr: {
        validators: {
          notEmpty: {
            message: '请上传3张图片'
          }
        }
      },
    }
  })
  $('form').on('success.form.bv', function(e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      data: $('form').serialize(),
      success: function(info) {
        console.log(info)
        if (info.success) {
          $('.addModal').modal('hide')
          $('form').data('bootstrapValidator').resetForm(true)
          page = 1
          render()
          $('.text').text('请选择二级分类')
          $('.img_box img').remove()
          arr = []
        }
      }
    })
  })
 
})