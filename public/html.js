const timer = () => {
  let timeLeft = 20;
  const timerElement = document.getElementById("msg");
  var timerInterval = setInterval(() => {
    timerElement.textContent = `Time left: ${timeLeft--} seconds`;
    if (timeLeft < 0) {
      clearInterval(timerInterval);
      timerElement.textContent = "Server did not responded";
    }
  }, 1000);
  return timerInterval;
};

const fetching = async (Obj, intnum) => {
  console.log("Server Called");
  // console.log(Obj);
  let headersList = {
    Accept: "*/*",
    // "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify(Obj);

  // let response = await fetch("http://localhost:3000/attendance", {
  let response = await fetch("https://pcte.live/attendance", {
    // let response = await fetch("https://my-attendance-manager.onrender.com/attendance", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  // console.log(response);
  let data = await response.json();
  // console.log(data);

  if (response.status == 401) {
    console.log("Invalid user");
    document.getElementById("msg").textContent = "Invalid Credentials";
    clearInterval(intnum);
    document.getElementById("submit").style.background = "#0f0";
    document.getElementById(
      "submit_box"
    ).innerHTML = `  <input onclick="submit()" id="submit" type="submit" value="Login">`;
  } else if (response.status == 200) {
    document.getElementById("msg").textContent = "Email Sent Successfully";
    document.getElementById("submit").style.background = "#0f0";
    clearInterval(intnum)
  }
};

// fetch();

const collect_data = (intnum) => {
  let email = document.getElementById("email").value;
  let usernaam = document.getElementById("usernaam").value;
  let password = document.getElementById("password").value;
  let option = document.getElementById("option").value;

  if (email == "" || usernaam == "" || password == "" || option == "") {
    document.getElementById("msg").textContent = "No Credentials Found";
    document.getElementById("submit").style.background = "#0f0";

    clearInterval(intnum);
    document.getElementById("submit_box").disabled = "false";
    //  = `  <input onclick="submit()" id="submit" type="submit" value="Login">`;
    return 0;
  }

  let e_email = CryptoJS.AES.encrypt(email, inkipinkiponki).toString();
  let e_usernaam = CryptoJS.AES.encrypt(usernaam, inkipinkiponki).toString();
  let e_password = CryptoJS.AES.encrypt(password, inkipinkiponki).toString();
  let e_option = CryptoJS.AES.encrypt(option, inkipinkiponki).toString();

  // console.log(email, usernaam, password,option);
  // console.log(e_email, e_usernaam, e_password,e_option);

  //    return {email"2244177","qQrQ|Q4","ykashyap.pcte@gmail.com"}
  //    return {email,usernaam,password};
  return {
    username: `${e_usernaam}`,
    password: `${e_password}`,
    email: `${e_email}`,
    option: `${e_option}`,
  };
};

const submit = () => {
  try {
    document.getElementById("msg").textContent = "";
    document.getElementById("submit").style.background = "#006200";
    // document.getElementById("submit_box").innerHTML = `<center> <img id="load" height="50px" src="./loading.gif"/> </center>`;
    document.getElementById("submit_box").disabled = "true";
    document.getElementById("msg").textContent =
      "Requesting Server and waiting for response";

    let intnum = timer();
    const detail_obj = collect_data(intnum);
    if (detail_obj == 0) {
      return 0;
    }

    // console.log(detail_obj);
    fetching(detail_obj, intnum);
  } catch (err) {
    console.log(err, "This Error Occured");
  }
};

document.getElementById("rememberme").addEventListener("click", () => {
  let email = document.getElementById("email").value;
  let usernaam = document.getElementById("usernaam").value;
  let password = document.getElementById("password").value;
  let option = document.getElementById("option").value;

  localStorage.setItem("email", email);
  localStorage.setItem("usernaam", usernaam);
  localStorage.setItem("password", password);
  localStorage.setItem("option", option);

  document.getElementById("msg").textContent = "Information Saved"
});

document.getElementById("forgetme").addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

const rememberme = () => {
  }

  // document.getElementById("rememberme").style.background = "white";
  document.getElementById("usernaam").value = localStorage.getItem("usernaam");
  document.getElementById("password").value = localStorage.getItem("password");
  document.getElementById("option").value = localStorage.getItem("option");
  document.getElementById("email").value = localStorage.getItem("email");

rememberme();
 