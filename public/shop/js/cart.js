$(function() {
  function render() {
    $.ajax({
      type: "get",
      url: "/cart/queryCart",
      success: function(info) {
        console.log(info)
        if (info.error) {
          location.href = "login.html?form" + location.href
        }
        $("#OA_task_1").html(template("tpl", { rows: info }))
      }
    })
  }
  render()
  $("#OA_task_1").on("click", ".btn-delete", function() {
    var id = $(this).data("id")
    mui.confirm("你确定要删除这件商品吗?", "提示", ["确定", "取消"], function(
      e
    ) {
      if (e.index === 0) {
        // 发送ajax请求
        $.ajax({
          type: "get",
          url: "/cart/deleteCart",
          data: {
            id: [id]
          },
          success: function(info) {
            render()
          }
        })
      }
    })
  })
})
