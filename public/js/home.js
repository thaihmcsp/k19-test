$.ajax({
  url:'/user',
  type:'GET'
})
.then(data=>{
  let classList = []
  $('#class').append(`
  <option value='all'>all</option>
  `)
  for(let i=0; i<data.data.length; i++){
    if(classList.includes(data.data[i].class) === false){
      classList.push(data.data[i].class)
      let option = `
      <option value='${data.data[i].class}'>${data.data[i].class}</option>
      `
      $('#class').append(option)
    }
  }
  $('.buttonList').html('')
  const totalPage = Math.ceil(data.data.length / 5)
  for(let i = 1; i <= totalPage; i++){
    let button = `<button onclick='getData(${i})'>${i}</button>`
    $('.buttonList').append(button)
  }

  for(let i=0; i < 5; i++){
    const div = `<div>${data.data[i].username}</div>`
    $('.data').append(div)
  }
})
.catch(err=>{
  console.log(err);
})

async function getData (page){
  try {
    const className = $('#class').val()
    console.log(39, className);
    $('.data').html('')
    const data = await $.ajax({
      url:`/user/page/${page}/${className}`,
      type:'GET'
    })
    for(let i=0; i<data.length; i++){
      const div = `<div>${data[i].username}</div>`
      $('.data').append(div)
    }
  } catch (error) {
    console.log(error);
  }
}

async function changeClass (){
  const className = $('#class').val()
  console.log(className);
  try {
    const data = await $.ajax({
      url:'/user/class/'+className,
      type:'GET'
    })
    $('.buttonList').html('')
    const totalPage = Math.ceil(data.length / 5)
    for(let i = 1; i <= totalPage; i++){
      let button = `<button onclick='getData(${i})'>${i}</button>`
      $('.buttonList').append(button)
    }
    $('.data').html('')
    for(let i=0; i < 5; i++){
      console.log(data[i]);
      const div = `<div>${data[i].username}</div>`
      $('.data').append(div)
    }
  
  } catch (error) {
    console.log(error);
  }
}

// làm chức đăng ký, đổi mk
// làm phân trang theo phân loại

async function logout (){
  try {
    const res = await $.ajax({
      url:'/user/logout',
      type:'POST'
    })
    console.log(88, res);
  } catch (error) {
    console.log(error);
  }
}