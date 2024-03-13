## React App Documentation


## Introduction
Welcome to the documentation for our React app powered by Vite! This documentation will guide you through running the app and understanding its features.

## Getting Started
To run the app locally, make sure you have Node.js and npm installed on your machine.

Clone the repository from GitHub:

git clone https://github.com/Pmilicaa/Posts.git


Install dependencies:

npm install


Running the App
To start the development server and run the app, use the following command:


npm run dev
This will start the Vite development server and open your default web browser to display the app.

## App Features
Showing All Posts
The app displays a list of posts fetched from the server. Posts are shown on the homepage.

## Filtering by User
Users can filter posts by author. There is a select component that allows users to select a specific author, and the app will display only posts created by that user.

## Searching
Users can search for posts using a search bar. Entering keywords in the search bar filters the posts to display only those containing the entered keywords.

## Pagination
Posts are paginated, meaning they are displayed in groups or pages. Users can navigate between pages to view different sets of posts. The UI should include navigation controls such as "Next" and "Previous" buttons to facilitate pagination.

## Viewing Comments
Users can view comments associated with each post. Clicking on a post should expand it to display its comments.

## Navigation
Users can navigate between pages of posts using pagination controls. They can move to the next or previous page to view additional posts.
