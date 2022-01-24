async function signUp (){
  try {
    // const username = $('#username').val()
    // const password = $('#password').val()
    // const data = await $.ajax({
    //   url:'/user/create',
    //   type:'POST',
    //   data:{username: username, password: password}
    // })
    const form = $('#form')[0]
    const dataForm = new FormData(form)

    const avatar = await $.ajax({
      url:'/profile',
      type:'POST',
      data: dataForm,
      contentType: false,
      processData: false
    })

    console.log(19, avatar);
    // console.log(10, data);
  } catch (error) {
    console.log(12, error);
  }
}

