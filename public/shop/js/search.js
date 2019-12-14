$(function(){
  function render(){
    var history=localStorage.getItem('history')
    var arr=JSON.parse(history)||[]
    $('.history').html( template('tpl',{rows:arr}) )
   
  }
  render()
  // 清空历史记录
  $('.history').on('click', '.btn-clear', function(){
    mui.confirm('你确定要清除所有的记录吗',function(e){
      if(e.index===1){
        localStorage.removeItem('history')
        render()
      }
    }) 
  })
  // 删除历史记录
  $('.history').on('click','.btn-delete',function(){
    var that=this
    mui.confirm('你确定要清除这条记录',function(e){
      if(e.index===1){
       var index=$(that).data('index')
       var history=localStorage.getItem('history')
       var arr=JSON.parse(history)||[]
       arr.splice(index,1)
       localStorage.setItem('history',JSON.stringify(arr)) 
       render()
      }
    }) 
  })
  // 添加搜索记录
  $('.btn-search').on('click',function(){
     var content=$('.search input').val().trim()
     if(!content){
        return mui.toast('请输入关键字')
     }    
     var history=localStorage.getItem('history')
     var arr=JSON.parse(history)||[]
     var index=arr.indexOf(content)
     if(index !== -1){
        arr.splice(index,1)
     }
     arr.unshift(content)
     localStorage.setItem('history',JSON.stringify(arr))
     $('.search input').val('')
     location.href='searchList.html?key=' + content
  })
})