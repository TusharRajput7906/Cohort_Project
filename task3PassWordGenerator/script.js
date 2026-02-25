let length = document.querySelector("#length");
let outer1 = document.querySelector(".outer1");
let outer2 = document.querySelector(".outer2");
let generate = document.querySelector("#generate");
let back = document.querySelector("#back");
let refresh = document.querySelector("#refresh");
let pass = document.querySelector("h1");

let str =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%&*";

function generated(len) {
  let passward = "";
  for (let i = 0; i < len; i++) {
    passward += str[Math.floor(Math.random() * str.length)];
  }
  pass.innerHTML = `Passward:${passward}`;
}
generate.addEventListener("click", () => {
  let len = Number(length.value);
  if (len < 8 || len > 16) {
    alert("Please make sure the length of the password is between 8 and 16");
    length.value = "";
  } else {
    generated(len);
    outer1.style.display = "none";
    outer2.style.display = "flex";
  }
});
back.addEventListener("click", () => {
  location.reload();
});
refresh.addEventListener("click", () => {
  let len = Number(length.value);
  generated(len);
});
