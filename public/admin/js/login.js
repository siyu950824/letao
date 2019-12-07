$(function () {
  var $form = $('form')
  $form.bootstrapValidator({
    fields: {
      // username对应的表单中name属性叫做username
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength: {
            min: 3,
            max: 10,
            message: '用户名长度为3~12位'
          },
          callback: {
            message: '用户名错误'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 14,
            message: '密码长度为3~12位'
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    },
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    }
  })
  $('.btn-reset').on('click', function () {
    $form.data('bootstrapValidator').resetForm(true)
  })
  $('.btn-login').on('click', function () {
  //   e.preventDefault()
  //    $.ajax({
  //     url:'/employee/employeeLogin',
  //     type:'post',
  //     data:$form.serialize(),
  //     success:function(info){
  //          if(info.success){
  //            location.href='index.html'
  //          }else if(info.error===1000){
  //            alert('用户名错误')
  //          }else{
  //            alert('密码错误')
  //          }
  //     },
  //    })
  })
  $form.on('success.form.bv', function (e) {
    e.preventDefault()
    $.ajax({
      url: '/employee/employeeLogin',
      type: 'post',
      data: $form.serialize(),
      success: function (info) {
        if (info.success) {
          location.href = 'index.html'
        } else if (info.error === 1000) {
          $form.data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback')
        } else {
          $form.data('bootstrapValidator').updateStatus('password', 'INVALID','callback')
        }
      },
    })
  })
})