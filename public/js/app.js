console.log("I Call API to Login");
import * as auth from './auth.js';

const storeEmail = (email) => {
    localStorage.setItem("email", email);
};

const storeToken = (token) => {
    localStorage.setItem("token", token);
};

const checkToken = () => {
    return localStorage.getItem("token");
};
const removeTokenAndEmail = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
}

document.addEventListener("DOMContentLoaded", async function() {
    const loginForm = document.getElementById("loginForm");
    const messageDiv = document.querySelector(".message");
    const loginFormSection = document.querySelector(".loginFormSection");
    const loggedIn = document.querySelector(".loggedIn");
    const pageHeader = document.querySelector(".pageHeader");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    //Login Form
    loginForm.addEventListener("submit", function(e){
        e.preventDefault();
        const emailVal = emailInput.value;
        const passwordVal = passwordInput.value;
         
         //loginFormSection.style.display = "none";
         const xhr = new XMLHttpRequest();
         xhr.open("POST", "https://reqres.in/api/login", true)
         xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
         xhr.onreadystatechange = () => {
             if(xhr.readyState === 4) {
                 
                if (xhr.status === 200) {
                    if (emailVal === "eve.holt@reqres.in" && passwordVal === "cityslicka") {
                        const response = JSON.parse(xhr.responseText);
                        console.log("Response from server: ", response); // Log the response for debugging
                        if (response.token) {
                            storeToken(response.token);
                            localStorage.setItem('email', emailVal);
                            messageDiv.textContent = "Hello, " + emailVal;
                            loginFormSection.style.display = "none";
                            loggedIn.style.display = "block";
                            pageHeader.style.display = "block";
                        } else {
                            messageDiv.textContent = "Authentication failed. Please try again.";
                            loggedIn.style.display = "none";
                            loginFormSection.style.display = "block";
                            pageHeader.style.display = "none";
                        }
                    }    
                } else {
                     
                    if(xhr.statusText) {
                        messageDiv.textContent = xhr.statusText;
                    } else {
                        messageDiv.textContent = "Error occurred while logging in. Please try again later.";
                    }
                    if (xhr.status === 400) {
                        console.log(xhr.responseText);
                        const response = JSON.parse(xhr.responseText);
                        const error = document.querySelector(".error");
                        error.textContent = response.error;
                        //console.log(response.error)
                        //console.error("Error occurred while logging in. Status: ", xhr.status, "Message: ", xhr.statusText);
                    }
                }
            }
         };
         const data = JSON.stringify({ email: emailVal, password: passwordVal });
         xhr.send(data);
    });  
    //Check Token
    const token = checkToken();  
    if (token) {
        const localEmail = localStorage.getItem("email");
        messageDiv.textContent = "Hello, " + localEmail;
        loginFormSection.style.display = "none";
        loggedIn.style.display = "block";
        pageHeader.style.display = "block";
    } else {
        loggedIn.style.display = "none";
        loginFormSection.style.display = "block";
        pageHeader.style.display = "none";
    }
    // Logout 
    const logoutLink = document.querySelector(".pageHeaderLogoutLink");
    logoutLink.addEventListener("click", function(e){
        e.preventDefault();
        removeTokenAndEmail(); 
        loginFormSection.style.display = "block";
        pageHeader.style.display = "none";
        loggedIn.style.display = "none";
    });
});

 