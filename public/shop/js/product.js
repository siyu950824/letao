$(function() {
  var id = location.search.split("=")[1]
  $.ajax({
    type: "get",
    url: "/product/queryProductDetail",
    data: {
      id: id
    },
    success: function(info) {
      console.log(info)
      var sizeArr = []
      var temp = info.size.split("-")
      for (var i = temp[0]; i < temp[1]; i++) {
        sizeArr.push(i)
      }
      info.sizeArr = sizeArr
      $(".mui-scroll").html(template("tpl", info))
      // 初始化轮播图
      mui(".mui-slider").slider({
        interval: 5000
      })
      mui(".mui-numbox").numbox()
    }
  })
  $(".mui-scroll").on("click", ".size span", function() {
    $(this)
      .addClass("now")
      .siblings()
      .removeClass("now")
  })
  // 加入购物车
  $(".btn-add").on("click", function() {
    var num = $(".mui-numbox-input").val()
    var size = $(".now").text()
    if (!size) {
      return mui.toast("请选择尺码")
    }
    $.ajax({
      type: "post",
      url: "/cart/addCart",
      data: {
        productId: id,
        num: num,
        size: size
      },
      success: function(info) {
        console.log(info)
        if (info.error) {
          location.href = "login.html?form" + location.href
        }
        if (info.success) {
          mui.confirm(
            "恭喜你，加入购物车成功",
            "温馨提示",
            ["去购物车", "继续逛逛"],
            function(e) {
              if (e.index === 0) {
                location.href = "cart.html"
              }
            }
          )
        }
      }
    })
  })
})
