$(function () {
  var page = 1;
  var pageSize = 5;
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize,
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
  })
  $('form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '分类名称不能为空'
          }
        }
      }
    }
  })
  $('form').on('success.form.bv', function(e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: {
        categoryName: $('[name=categoryName]').val()
      },
      success: function(info) {
        if (info.success) {
          $('.addModal').modal('hide')
          $('form').data('bootstrapValidator').resetForm(true)
          page = 1
          render()
        }
      }
    })
  })
})