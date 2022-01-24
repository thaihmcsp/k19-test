async function changePage (page){
  try {
    const res = await $.ajax({
      url:'/page/changePage/'+page,
      type:'GET'
    })
    $('.listUser').html(res)
  } catch (error) {
    console.log(error);
  }
}