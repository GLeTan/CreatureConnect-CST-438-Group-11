# Project 01 Retrospective and overview

[Video Walkthrough](https://www.youtube.com/watch?v=KDntyoOIiss&ab_channel=Rumkkee) 

[Github Repo](https://github.com/GLeTan/CreatureConnect-CST-438-Group-11)

## Overview

CreatureConnect lets people learn about animals they're interested in.
Users can search animals by their name to find information like their habitats, descriptions, and images.

API used is [here](https://en.wikipedia.org/w/api.php).

## Introduction

* How was communication managed
    * We used slack as our main form of communication. We also met 
        weekly to go over what needed to be done
* How many stories/issues were initially considered
    * We initially considered 14 issues.
* How many stories/issues were completed
    * We were able to compelete 12 stories in total

## Team Retrospective

### Anthony Guido
* Anthony's pull requests are [here](https://github.com/GLeTan/CreatureConnect-CST-438-Group-11/pulls/anthony-g-07)
* Anthony's Github issues are [here](https://github.com/GLeTan/CreatureConnect-CST-438-Group-11/issues?q=assignee%3Aanthony-g-07+is%3Aopen+)

#### What was your role / which stories did you work on
I worked on the database and connecting it to the sign up and log in buttons. I
also worked on the User Context to get User Id across screens.

+ What was the biggest challenge? 
  + The biggest  challenge was getting the database to work
+ Why was it a challenge?
  + I wasn't sure how to work the expo SQLite database
  + The documentation was very confusing to understand at first
  + I got help from a youtube video using expo SQLite to help work the database
+ Favorite / most interesting part of this project
  + When I got the database working, it was fun creating the different insert and select functions for the others to use
+ If you could do it over, what would you change?
  + I would try to get the database working earlier so that I could help with the frontend of the app
+ What is the most valuable thing you learned?
  + Use your resources to get help early so that I could focus on other parts of the project

### Gordon Tan

- https://github.com/GLeTan/CreatureConnect-CST-438-Group-11/pulls/GLeTan
- https://github.com/GLeTan/CreatureConnect-CST-438-Group-11/issues?q=assignee%3AGLeTan+is%3Aopen+

#### What was your role / which stories did you work on

+ What was the biggest challenge?
  + My biggest challenge is to how to start a project
+ Why was it a challenge?
  + I did not know who was supposed to get the files posted into github
  + I did not know the proper procedure to push files into github. This is got around with the use of Github Desktop's push function
  + Expo is not an app where there is a site with button to download it. Had to run it through console
  + The process of setting up android studio and environment variables is complicated. This is solved through expo's instructions on website
+ Favorite / most interesting part of this project
   + The most favorite part is the animals page
+ If you could do it over, what would you change?
   + I should communicate with my teammates much more often to do things earlier
+ What is the most valuable thing you learned?
   + I should ask for help or look for help

### Arturo Cesareo-Zacarias

- [Arturo's Pull Request's](https://github.com/GLeTan/CreatureConnect-CST-438-Group-11/pulls?q=is%3Apr+is%3Aclosed+assignee%3Arumkkee)
- [Arturo's Issues](https://github.com/GLeTan/CreatureConnect-CST-438-Group-11/issues?q=is%3Aclosed+assignee%3Arumkkee)

#### What was your role / which stories did you work on

+ What was the biggest challenge?
   + The biggest challenge was getting a relevant API to successfully return information about animals.
+ Why was it a challenge?
   + This was difficult as I was initially receiving an empty JSON response when calling the INaturalist API.
   + We addressed the challenge by reviewing where the error could be coming from, such as:
      + how I wrote the API call,
      + how the API is being called in tests, or
      + the instructions on using the API.
+ Favorite / most interesting part of this project
   + My favorite part of the project was seeing the Search page finally return an image and description of an animal that was searched.
+ If you could do it over, what would you change?
  + If I could do this over, I would review the instructions on using an API more carefully. 
+ What is the most valuable thing you learned?
  + I learned the importance of keeping active branches up-to-date with main, such as by:
     + pulling from main regularly when working on a long-living branch. 

### Ricardo Jose Nunez Lopez

- [Ricardo's Pull Request's](https://github.com/GLeTan/CreatureConnect-CST-438-Group-11/pulls?q=is%3Apr+is%3Aclosed+assignee%3AItzRikk)
- [Ricardo's Issues](https://github.com/GLeTan/CreatureConnect-CST-438-Group-11/issues?q=is%3Aissue+is%3Aclosed+assignee%3AItzRikk)

#### What was your role / which stories did you work on

+ What was the biggest challenge?
   + The biggest challenge was getting the emulator to run in my mac and working with typescript specificaly making the naviagtor to work.
+ Why was it a challenge?
   + This was difficult as I was initially because the emulator was crashing and giving a lot of error, and the naviagtor calls where just not working do to wrong calls and installing the right packages.
   + We addressed the challenge by reviewing where the error could be coming from, such as:
      + how I set up the emulator,
      + how to install the right navigations call, or
      + the instructions on how to implement the naviagtion.
+ Favorite / most interesting part of this project
   + My favorite part of the project was learning on how to work with typescript becuase is a new language i have never learned and made me happy know I was making progress and teaching myself how to code in typescript.
+ If you could do it over, what would you change?
  + If I could do this over, I would redo the project JS because i feel is more organice and easier to read and work on. 
+ What is the most valuable thing you learned?
  + I learned the importance of asking help to my teammates and been able to learn a new language.

## Conclusion

- How successful was the project?
  - We managed to get a working app that can pull from an API
  - We can store the content of the API to the database
  - Each user can save their own information on their own accounts
- What was the largest victory?
  - One of the largest victories was getting the API to work as it wasn't returning anything for a while
  - Getting the database to work as we could not open it for a while
- Final assessment of the project
  - We got most of what we set out to do
  - There were some functions that we did not get to implement in the app in the end
  - We did well to communicate what needed to be done and what we should avoid doing
