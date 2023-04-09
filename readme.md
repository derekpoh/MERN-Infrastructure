# National Library Board E-Book Loan Website

## Technologies & Tools used
  - MongoDB, Mongoose
  - Express
  - React
  - Node
  - Material UI
  - Github

## Timeframe
  - 1 week

## Description
This project represents our take on the NLB Mobile App. The application was developed using MERN Stack while we were attending the Software Engineering Immersive course at General Assembly.

Developed in 2016 by National Library Board Singapore, NLB Mobile was recently revamped in 2021 to improve user experience. Marketed as a personal library, the app provides a convenient platform to access library content anytime, anywhere. The app currently provides many unique services, which includes accessing eBooks and audiobooks online, borrowing physical items using your mobile device and many more. By providing such services, NLB hopes to nurture Readers for Life, Learning Communities and a Knowledgeable Nation. 

Incorporating many features into an application helps to increase its functionality and purpose. On the flipside, it can be detrimental to the user experience if the application does not provide a seamless and consistent transition between its features. Lack of visual hierarchy, misleading labels and information inconsistency were some of the pertaining issues that we identified during our user experience. By emulating several key features of NLB Mobile, we restructured and added our own features in an attempt to ameliorate our user journey; hoping to make book borrowing a more pleasant experience for everyone.

![guesthomepage](https://i.ibb.co/cth9Jxk/guesthomepage.jpg)

## Contribution
Team members:
  - [Zhongyuan](https://github.com/mazyuan85)
  - [Roslin](https://github.com/roscxn)
  - [Derek](https://github.com/derekpoh)

Special thanks to Team Uxable - [Faruq Surattee](https://www.linkedin.com/in/faruqkhansurattee/), [Graceilia Tay](https://www.linkedin.com/in/graceilia-t/), [Martyn Chan](https://www.linkedin.com/in/martynchan/) for identifying key UX/UI improvements, designing the wireframe and application prototype.


## Deployment
The application can be found at: https://national-library-board-e-book-loan.onrender.com/


## User Stories
| As a Guest, when I...                    |  I want to be able to...                
| :--------------------------------------- |:-----------------------------------------------|       
| View the Home Page                       |  - See a picture carousel containing snippets of library outlets<br>- See a featured carousel containing random books<br>- See a genres carousel containing different book genres
| Click on View All                        |  See a list of relevant books (each with a helper icon containing a brief book summary)
| Click on the hamburger menu              |  See a toggled menu which allows convenient access to most features
| Click on each individual book            |  See a page containing elaborate details pertaining to that book:<br>- Book Picture<br>- Book title, author, summary, further details, etc<br>- E-copies available
| Click on each genres logo                |  See a list of relevant books
| Use the search feature/bar               |  See a list of relevant books (matching title, description, etc) 

| As a verified user, when I...            |  I want to be able to...                
| :--------------------------------------- |:-----------------------------------------------|   
| View the book details                    |  - Borrow/Return a book<br>- After borrowing, given an option to set a reminder for that book<br>- Receive an email when the reminder date is due
| Access My Account features               |  - See a list of books that I currently have on loan<br>- See a list of books that I added as Favourites<br>- See a history of all the books that I have loaned<br>- Set my book preference 


## Project Architecture
To emulate the application, we navigated around NLB Mobile to understand the services and utilities it offered. After handpicking several important features of the application, we crafted our data model and wireframe to base our project upon.
<br/>
![wireframe1](https://i.ibb.co/kcPsfvh/wireframe2.jpg)
![wireframe2](https://i.ibb.co/sWBnjNC/wireframe3.jpg)

The project utilises the MVC approach, separating "src", "models", "routes" and "controllers" into different compartments. Data manipulation was done within "models" and "controllers" to render the frontend view.
![ERDdiagram](https://i.ibb.co/pPg8h9b/photo-6165525944429819088-w.jpg)

## Development Approach
We broke down the project into several major components:
 - Part 1: Navigation bar containing essential icons and user functions
 - Part 2: Carousel component to display various book categories
 - Part 3: Search bar function to display search results
 - Part 4: Book details page to facilitate book borrowing/return
 - Part 5: Calendar page to send reminders in the form of emails
 - Part 6: Individual pages containing a list of relevant books (e.g. genre, loans, recommended, etc)


## Breakdown of some features

### User Preference
![UserPreference](https://i.ibb.co/L6vcJKw/userpreferencespage.jpg)

### Recommended Books
![RecommendedBooks](https://i.ibb.co/c1PMwDP/recommendedpage.jpg)

### Book Details
![BookDetails](https://i.ibb.co/Jr11bWF/userbookdetails.jpg)

### Borrow Book
![BorrowBook](https://i.ibb.co/chKS9mg/borrowbookpopup.jpg)

### Set Reminder
![SetReminder](https://i.ibb.co/3YJcX0N/reminderpage.jpg)

### Loan History
![LoanHistory](https://i.ibb.co/vzG3R3f/userloanhistory.jpg)


## Key Learning Points
  - React state management
  - Learning to work in a group with a shared repository
  - Understanding the importance of communication and cooperation, especially in managing code conflicts
  - Thorough planning of the project (wireframes, project outlines, pseudocodes, etc) is imperative for smooth and efficient implementation of the application
  - Debugging and error finding through DevTools


## Future Development
As this was a course project for submission, there would unlikely be further changes made. However, if there were, possible improvements could include:
  - Adding a user option to update/delete their book reminder date
  - Adding additional platform options for users to receive their reminder notification (e.g. Telegram, phone message, etc)
  - Incorporate physical books into the application
  - Implement features for physical books (e.g. QR code scanner)


## Resources
Product Prototype: <a href="https://www.figma.com/proto/9qtRTFaMeLcVNzjBH9eAiL/UXDI-P3-NLB?node-id=403-12614&scali%20ng=scale-down&page-id=1%3A3&starting-point-node-id=116%3A7022">Figma</a><br/>
Midjourney