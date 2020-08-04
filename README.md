# Pomodoro Timer

Source code can be accessed at [my GitHub repository](https://github.com/petra-vozarova/pomodoro-app),
or you can see deployed [pomodoro timer application](https://petra-vozarova.github.io/pomodoro-app/) in action.
## Introduction
This web-application helps users to **keep a track of work and break time**. The length of these two sessions can be adjusted as necessary. 
If the work session ends, the alarm is triggered and the break session starts automatically. 
## Functionality

### Sessions' Length
By default, the work session is set to 25 minutes and break to 5 minutes. This can be changed to a maximum of 60 minutes and a minimum of 1 minute.The user can **adjust time** before the session starts or when it is paused, but not while it is running.

### Display
When the page is loaded, the display renders the length of the work session set to 25 minutes. It contains **buttons to start/pause sessions or to reset the app** to its default state. 
### Time
Time is displayed in minutes: seconds format. **Date object** is used to accurately keep track of the time and to account for any interruptions of sessions (when the timer is paused).

### Time Out
When time runs out, the timer displays `00:00`. Depending on what type of session ended, **the audio clips are played**. The timer resets to other sessions and starts to count down the time automatically.

### Animations
Various animations are used in the app.

#### Sun Animation
It plays **while the session is running**. Moving from the left to the right side of the page it imitates **rising and setting the sun**.The animation **receives information about the state of the timer**, such as when it is passed, the length of the session, or the type of session

#### Sky Animation
This animation **accompanies sun animation** and changed the background color of the page. It also receives the information of when the timer is paused and its length is adjusted depending on the length of sessions.

#### Clouds Animation
Moving clouds are **independent of the timer state**.This animation starts running when the app is loaded.


## Local Deployment

To run the application locally, please download the source code from: [GitHub Source Code](https://github.com/petra-vozarova/pomodoro-app)


###  Prerequisites

This application was written in Node.js using React and ReactDom dependencies. In order to run the application you will need to have the npm package installed on your local device.

Before starting the app, please make sure that you are in the correct directory that ends with `\pomodoro-app`.

In the command line run the following code:
`npm start`

Now, the app should be up and running on your local port.
Please navigate to:
[local port 3000](http://localhost:3000/pomodoro-app)

#### Thank you for your time and interest in my pomodoro timer application. I hope that you enjoy it! 