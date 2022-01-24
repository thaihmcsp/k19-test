async function login (){
  try {
    const username = $('#username').val()
    const password = $('#password').val()
    const res = await $.ajax({
      url:'/user/login',
      type:'POST',
      data:{username:username, password:password}
    })
    if(res.token){
      setCookie('userID', res.token, 30)
      window.location.href = '/home'
    }
  } catch (error) {
    console.log(error); 
    alert('sai user, pass')
  }
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}