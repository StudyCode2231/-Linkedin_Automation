const puppet = require("puppeteer");
// in credential make your own credential array an use it 
const { post } = require("./post");
let browserOpenPromise = puppet.launch({
  headless: false,
  defaultViewport: false,
  args: ["--start-fullscreen"],
  // args: ["--force"]
});

browserOpenPromise
  .then(function (browser) {
    console.log("Browser is opened");
    //   adding page to the browserOpenPromise
    let pagesArrayPromise = browser.pages();
    return pagesArrayPromise;
  })
  .then(function (allPages) {
    currentPage = allPages[0];
    console.log("New Tab is created");
    let linkedinHomePagePromise = currentPage.goto(
      "https://www.linkedin.com/home"
    );
    return linkedinHomePagePromise;
  })
  .then(function () {
    console.log("Opened Linkedin Home Page!!!!");
    // Wait for 2 sec then click using time out function
    setTimeout(function () {}, 2000);
    // Now click on the login button
    let clickOnLginPromise = currentPage.click(
      "a[class='nav__button-secondary']"
    );
    return clickOnLginPromise;
  })
  .then(function () {
    console.log("Clicked on login button!!!");
    //   Now its time to type inside the user name
    let userNameTypedPromise = currentPage.type(
      "input[id='username']",
      credential[0],
      { delay: 300 }
    );
    return userNameTypedPromise;
  })
  .then(function () {
    console.log("Username is typed!!!!");
    //   Now its time to type the password
    let passwordIsTypedPromise = currentPage.type(
      "input[id='password']",
      credential[1],
      { delay: 200 }
    );
    return passwordIsTypedPromise;
  })
  .then(function () {
    console.log("Password is typed!!!!!");
    //   Now its time to click on sign button
    setTimeout(function () {}, 2000);
    let clickOnSignPromise = currentPage.click(
      "button[class='btn__primary--large from__button--floating']"
    );
    return clickOnSignPromise;
  })
  .then(function () {
    console.log("Successfully signed in linkedin!!!!");
    //   Now lets move to your profile page
    let movedToProfilePagePromise = waitAndClick("a[class='ember-view block']");
    return movedToProfilePagePromise;
  })
  // Posting some content on linkedin
  .then(function () {
    // wait and click on the start post button in my profile section
    let clickedOnStartPostPromise = waitAndClick(
      ".optional-action-target-wrapper.artdeco-button.artdeco-button--secondary.artdeco-button--2.artdeco-button--default"
    );
    return clickedOnStartPostPromise;
  })
  .then(function () {
    console.log("Started Making the post!!!!");
    let clickOnThePostContainerPromise = waitAndClick(
      "div[data-placeholder='What do you want to talk about?']"
    );
    return clickOnThePostContainerPromise;
  })
  .then(function () {
    console.log("Write some post brother");
    let writingPostPromise = currentPage.type(
      "div[data-placeholder='What do you want to talk about?']",
      post[0],
      { delay: 20 }
    );
    return writingPostPromise;
  })
  .then(function () {
    console.log("Post writing done!!!");
    setTimeout(function () {}, 3000);
    let clickOnSendPostPromise = waitAndClick(
      "button[class='share-actions__primary-action artdeco-button artdeco-button--2 artdeco-button--primary ember-view']"
    );
    return clickOnSendPostPromise;
  })
  .then(function () {
    console.log("All set!!!!!");
  });

// Function waitAndClick defination
function waitAndClick(btnCss) {
  // making a new promise here-> this function is not involve in chaining so we have to make a personal/local promise for it
  let clickPromise = new Promise(function (resolve, reject) {
    // waitForselector() is a function which will wait for the selector until the page gets load.
    let waitForCss = currentPage.waitForSelector(btnCss);
    waitForCss
      .then(function () {
        //  waiting is done now we have to click on the required button
        console.log("button is found");
        let clickedPromise = currentPage.click(btnCss);
        return clickedPromise;
      })
      .then(function () {
        console.log("Successfully clicked!!!!");
        resolve();
      })
      .catch(function (err) {
        console.log(err);
        reject();
      });
  });
  return clickPromise;
}
