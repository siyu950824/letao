$(function() {
  $(".btn-login").on("click", function() {
    var username = $("[name=username]").val()
    var password = $("[name=password]").val()
    if (!username) {
      MutationEvent.toast("用户名不能为空")
    }
    if (!password) {
      MutationEvent.toast("密码不能为空")
    }

    $.ajax({
      type: "post",
      url: "/user/login",
      data: $("form").serialize(),
      success: function(info) {
        if (info.success) {
          if (location.search.indexOf("?form") !== -1) {
            location.href = location.search.replace("?form", "")
          } else {
            location.href = "index.html"
          }
        } else {
          mui.toast("用户名或者密码错误")
        }
      }
    })
  })
})
