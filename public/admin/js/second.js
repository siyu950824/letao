$(function () {
  var page = 1;
  var pageSize = 5
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        $('tbody').html(template('tpl', info))
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
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        $('.dropdown-menu').html(template('dropdownTpl', info))
      }
    })
  })
  // 一级菜单
  $('.dropdown-menu').on('click', 'a', function () {
    var content = $(this).text()
    var id = $(this).data('id')
    $('.text').text(content)
    $('[name=categoryId]').val(id)
    $('form').data('bootstrapValidator').updateStatus('categoryId', 'VALID')
  })
  // 提交图片
  $('#file').fileupload({
    done: function (e, data) {
      var info = data.result
      $('.brandLogo').attr('src', info.picAddr)
      $('[name=brandLogo]').val(info.picAddr)
      $('form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
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
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入品牌的名称'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传品牌图片'
          }
        }
      }
    }
  })

  $('form').on('success.form.bv', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $('form').serialize(),
      success: function (info) {
        if (info.success){
          $('.addModal').modal('hide')
          $('form').data('bootstrapValidator').resetForm(true)
        }
        page = 1
        render()
        $('.brandLogo').attr('src', 'images/none.png')
        $('.text').text('请选择一级分类')
      }
    })
  })
})



