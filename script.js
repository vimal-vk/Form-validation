var data = {
  "name": [false, ""],
  "mobile": [false, ""],
  "email": [false, ""],
  "gender": [false, ""],
  "year": [false, ""],
  "langg": [false, []],
  "feedback": [false, ""]
}

var submitData = [false, false]

function startVerify() {
  document.getElementsByName('email')[0].addEventListener('input', () => {
    checkEmail()
  })
  document.getElementsByName('email')[0].addEventListener('click', () => {
    checkEmail()
  })
  document.getElementsByName('name')[0].addEventListener('input', () => {
    checkName()
  })
  document.getElementsByName('name')[0].addEventListener('click', () => {
    checkName()
  })
  document.getElementsByName('mobile')[0].addEventListener('input', () => {
    checkMobile()
  })
  document.getElementsByName('mobile')[0].addEventListener('click', () => {
    checkMobile()
  })
  document.getElementsByName('gender').forEach((ele) => {
    ele.addEventListener('click', () => {
      data.gender[1] = ele.value
      checkGender()
    })
  })
  document.getElementsByName('year')[0].addEventListener('click', () => {
    checkYear()
  })
  document.getElementsByName('langg').forEach((ele) => {
    ele.addEventListener('click', () => {
      checkYear()
      let langg = ele.value
      if (ele.checked && !data.langg[1].includes(langg)) {
        data.langg[1].push(langg)
      }
      else {  
        if (data.langg[1].includes(langg)) {
          data.langg[1].pop(langg)
          console.log('hi')
        }
      }
    })
  })
  document.getElementsByName('feedback')[0].addEventListener('click', () => {
    checkFeedback()
  })
  document.getElementsByName('feedback')[0].addEventListener('input', () => {
    checkFeedback()
  })
}

function submit() {
  var flag = true
  checkFeedback()
  for (var item in data) {
    if (item != 'langg' && data[item][0] == true) {
      console.log(item)
      flag = false
      if (submitData[0] == false) {
        submitData[0]=true
        createErrorMessage('button-div', 'Please check all the fields filled properly')
      }
      break
    }
  }
  if (flag) {
    if (submitData[0]) {
      submitData[0]=false
      removeErrorMessage('button-div-error')
    }
    removeAllDetails()
    alldetails()
  }
}

function checkFeedback() {
  checkYear()
  var feedback = document.getElementsByName('feedback')[0].value
  data.feedback[1] = feedback
  if (feedback.length >= 20) {
    if (data.feedback[0]) {
      data.feedback[0]=false
      removeErrorMessage('feedback-div-error')
    }
  }
  else {
    if (data.feedback[0] == false) {
      data.feedback[0]=true
      createErrorMessage('feedback-div', 'Feeback should not be less than 20 letters')
    } 
  }
}

function checkGender() {
  checkMobile()
  if (data.gender[1] === "") {
    if (data.gender[0] == false) {
      data.gender[0] = true
      createErrorMessage("gender-div","Please click on a gender option")
    }
  }
  else {
    if (data.gender[0]) {
      removeErrorMessage('gender-div-error')
      data.gender[0]=false
    }
  }
}

function checkMobile() {
  checkName()
  var mobile = document.getElementsByName("mobile")[0].value
  data.mobile[1] = mobile
  if (mobile === "" || mobile.length!=10){
    if (data.mobile[0] === false) {
      data.mobile[0] = true;
      createErrorMessage("mobile-div","Enter a 10 digit mobile number")
    }
  }
  else {
    if (data.mobile[0]) {
      removeErrorMessage("mobile-div-error")      
    }
    data.mobile[0] = false
  }
}

function checkName() {
  checkEmail()
  var name = document.getElementsByName("name")[0].value
  data.name[1] = name
  if (name === "") {
    if (data.name[0] === false) {
      data.name[0] = true;
      createErrorMessage("name-div","Enter a valid name")
    }
  }
  else {
    if (data.name[0]) {
      removeErrorMessage("name-div-error")      
    }
    data.name[0] = false
  }
}

function checkEmail() {
  var email = document.getElementsByName("email")[0].value
  data.email[1] = email
  if (email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
    if (data.email[0]) {
      removeErrorMessage("email-div-error")  
    }
    data.email[0] = false
  }
  else {
    if (data.email[0] === false) {
      data.email[0] = true;
      createErrorMessage("email-div", "Enter a valid email address")
    }
  }
}

function checkYear() {
  checkGender()
  var year = document.getElementById("year").value
  data.year[1] = year
  if (year != "") {
    if (data.year[0]) {
      removeErrorMessage('year-div-error')
    }
    data.year[0] = false
  }
  else {
    if (data.year[0] === false) {
      data.year[0] = true
      createErrorMessage("year-div","Select a valid year")
    }
  }

}

function createErrorMessage(divName,msg) {
  var div = document.getElementById(divName)
  var h5 = document.createElement("h5")
  h5.setAttribute("id", divName+ "-error")
  h5.textContent = msg
  div.appendChild(h5) 
}

function removeErrorMessage(div) {
  var divName = document.getElementById(div)
  divName.remove()
}

function alldetails() {
  var div = document.getElementById('result-div')
  var h3 = document.createElement('h3')
  h3.textContent = 'Your info saved successfully'
  div.appendChild(h3)
  var h2 = document.createElement('h2')
  h2.textContent = "Provided information"
  div.appendChild(h2)
  for (var ele in data) {
    var result = document.createElement('h4')
    result.textContent = ele + " : " + data[ele][1]
    div.appendChild(result)
  }
}

function removeAllDetails() {
  var div = document.getElementById('result-div')
  div.remove()
  var main = document.getElementsByClassName('main-div')[0]
  div = document.createElement('div')
  div.setAttribute('id', 'result-div')
  main.appendChild(div)
}