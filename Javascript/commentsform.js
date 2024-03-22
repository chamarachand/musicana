let form = document.getElementById('form');
let commentDiv = document.getElementById('comment-div');
let comment = document.getElementById('comment-text-area');
let errorText = document.getElementById('error-text-area');
let errorRadio = document.getElementById('error-radio');
let radioDiv = document.getElementById('radio-div');         
let radioValues = document.querySelectorAll('input[type="radio"]');
let TodaySelect = form.elements['pop-up1'];
let FutureSelect = form.elements['pop-up2'];
let submit = document.getElementById('submit');
let resetPopup = document.querySelector('.reset-popup');
let formMain = document.getElementById("main");
let submitMsg = document.getElementById("submit-msg");
let restrict = document.getElementById("restrict-interaction");

/* Function prevents the submission from occuring and checks if a radio button is selected and the text area's not empty.
Error messages are also activated using this function.*/
submit.addEventListener("click", function(event) {
    event.preventDefault();

    let radio = false;
    let text = false;
    let checked = false;

    for (let i = 0; i < radioValues.length; i++)        //checks if a radio button is selected
    {   
        if (radioValues[i].checked)
        {
            checked = true;
            errorRadio.style.display = "none";
            break;
        }
    }
    
    if (checked === false)          //shows error message when nothing is selected
    {
        radioDiv.style.border = "red 2px solid";
        errorRadio.style.display = "block";
    }
    else
    {
        radio = true;
        radioDiv.style.border = "none";
    }

    if (comment.value === "")      //shows error message when text field is empty
    {
        errorText.style.display = "block";
        commentDiv.style.border = "red 2px solid";
    }
    else
    {
        text = true;
        commentDiv.style.border = "none";
        errorText.style.display = "none";
    }

    if (text === true && radio === true)      //calls the submitForm() function if all the requirements are met
    {
        console.log("submit");
        submitForm();
    }
  });

function getSelectedRadio(radioArray)       //checks if a radio button is selected and returns value if it is
{
    for (let i = 0; i < radioArray.length; i++)
    {
        if (radioArray[i].checked)
        {
            return radioArray[i].value;
        }
    }
}

function getSelectedText(selectList)        //gets selected choice from options list
{
    return selectList.options[ selectList.selectedIndex ].text;
}

function submitForm() 
{
    let email = "dinuka.20220315@iit.ac.lk";
    let subject = "Feedback Submission - Musicana";
    let body = "Satisfaction rating: " + getSelectedRadio(radioValues) + "/10 \nComment: " + comment.value + "\nMethod used to complete task: " + getSelectedText(TodaySelect) + "\nPreferred method to complete task: " + getSelectedText(FutureSelect);
    let mailtoContent = "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

    formMain.style.display = "none";
    submitMsg.scrollIntoView();     //scrolls to the top of the page to prevent any interference from the footer
    submitMsg.style.display = "block";
    setTimeout(function() {
        window.location.href = mailtoContent;   //opens user's default email client and creates a pre-populated message after 3 seconds.
    }, 3000);
}

function clearForm()
{   
    resetPopup.style.display = "block";
    restrict.style.display = "block";
}

function yesButton()
{
    resetPopup.style.display = "none";
    form.reset();
    radioDiv.style.border = "none";
    commentDiv.style.border = "none";
    errorText.style.display = "none";
    errorRadio.style.display = "none";
    restrict.style.display = "none";
}

function noButton()
{
    resetPopup.style.display = "none";
    restrict.style.display = "none";
}



