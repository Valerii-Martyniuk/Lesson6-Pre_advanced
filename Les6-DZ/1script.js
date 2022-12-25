let firstRegExp = /^\w{3,}$/;
let emailRegExp = /^\w+@\w+\.\w+$/;

// data check

function checkShadow(sel) {
  $(sel).on("input", function () {
    if (firstRegExp.test(this.value)) {
      $(this).css("boxShadow", " 0 0 5px 0 green");
      console.log(this.parentElement);
    } else if (this.value == "") {
      $(this).css("boxShadow", "none");
    } else {
      $(this).css("boxShadow", " 0 0 5px 0 red");
    }
  });
}

function checkShadowEmail(sel) {
  $(sel).on("input", function () {
    if (emailRegExp.test(this.value)) {
      $(this).css("boxShadow", " 0 0 5px 0 green");
    } else if (this.value == "") {
      $(this).css("boxShadow", "none");
    } else {
      $(this).css("boxShadow", " 0 0 5px 0 red");
    }
  });
}
checkShadowEmail(".Email");
checkShadow(".FirstName");
checkShadow(".LastName");
checkShadow(".Password");

// push data

let Acount = [];
if (localStorage.length > 0 && localStorage.getItem("Acounts")) {
  let vv = localStorage.getItem("Acounts");
  Acount = JSON.parse(vv);
}
$(".sign-btn").on("click", function () {
  let newAcount = {
    name: $(".FirstName").val(),
    LastName: $(".LastName").val(),
    Email: $(".Email").val(),
    Password: $(".Password").val(),
  };
  if ($(".Email").val() | ($(".Password").val() == "")) {
    return alert("fill in the blank ");
  }
  if (
    !Acount.some(
      (name) => name.Email.toLowerCase() === newAcount.Email.toLowerCase()
    )
  ) {
    Acount.push(newAcount);
    let toJson = JSON.stringify(Acount);
    localStorage.setItem("Acounts", toJson);
    document.getElementById("myForm").reset();
    $(".Email, .FirstName, .LastName, .Password").css("boxShadow", "none");
  } else {
    alert("This account not available");
    $(".Email").css("boxShadow", " 0 0 5px 0 red");
  }
  console.log(Acount);
});
$(".TextSignIn").click(function () {
  $(".signUp").toggle();
  $(".SignIn").toggle();
});

// Sign In Page
document.querySelector(".signIn-btn").addEventListener("click", function () {
  let newAcount = {
    Email: document.querySelector(".signInEmail").value,
    Password: document.querySelector(".signInPassword").value,
  };
  if (
    Acount.some(
      (name) =>
        name.Email.toLowerCase() === newAcount.Email.toLowerCase() &&
        name.Password.toLowerCase() === newAcount.Password.toLowerCase()
    )
  ) {
    let filter = Acount.filter(
      (acc) => acc.Email.toLowerCase() === newAcount.Email.toLowerCase()
    );
    document.querySelector(
      ".accName"
    ).textContent = `${filter[0].name} ${filter[0].LastName}`;
    document.querySelector(".accEmail").textContent = `${filter[0].Email} `;
    document.querySelector(".SignIn").style.display = "none";
    document.querySelector(".accountInfo").style.display = "block";
    document.getElementById("myForm2").reset();
  } else {
    alert("write correct data");
  }
});
document.querySelector(".account-btn").addEventListener("click", function () {
  document.querySelector(".signUp").style.display = "block";
  document.querySelector(".accountInfo").style.display = "none";
});
