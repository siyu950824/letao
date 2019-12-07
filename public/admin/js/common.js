$(document).ajaxStart(function() {
  NProgress.start()
})


$(document).ajaxError(function() {
  alert('服务器繁忙')
})

$(document).ajaxStop(function() {
  setTimeout(function() {
    NProgress.done()
  }, 500)
  
})
$('.conceal').on('click',function(){
  $('.sidebar, .content,.cont-head').toggleClass('now')
})
$('.loginout').on('click',function(){
  console.log(1);
  $('.outModal').modal('show')
})
$('.btn-out').on('click',function(){
  $.ajax({
    type:'get',
    url:'/employee/employeeLogout',
    success:function(info){
      if(info.success){
        location.href='login.html'
      }   
    }
  })
})
$('.category').on('click',function(){
  $('.second').slideToggle()
})
