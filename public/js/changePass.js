async function changePass (){
  try {
    const username = $('#username').val()
    const password = $('#password').val()
    const newPass = $('#newPass').val()

    const data = await $.ajax({
      url:'/user/61de3af732ab19f24673827f',
      type:'PUT',
      data:{username: username, password: password, newPass: newPass}
    })
    console.log(12, data);
  } catch (error) {
    console.log(14, error);
  }
}