# Meetech

Welcome to meetech. This is a networking app that allows you to see events, mark as attending as message other users.

https://meetech.up.railway.app/

![Meetech header pic](https://github.com/RafaMR/Meetech.com/blob/master/public/images/meetech%20(2).png)


## Views

#####  Home
- Home - navbar, names, examples -random, search


##### Authentication   
- Sign Up - Allows visitors to create an account
- Sign In - Allows existing users to sign in



##### Profile   

- See your profile
- Edit


##### Events   
- Single-event page
- Edit event

##### Messages   
- List of chats where a user is participant
- Conversation between two users

## Route Handlers

- **Home**

	```javascript
	GET - '/' - Renders home page: navbar, search, some random events
	```
	#### Sign-up
	```javascript
	GET - '/authentication/sign-up' - Renders sign up page
	```
	```javascript
	POST - '/authentication/sign-up' - Handles account registration  
	```
		
	#### Sign-in

	```javascript
	GET - '/authentication/sign-in' - Renders sign in page  
	```
	```javascript
	POST - '/authentication/sign-in' - Handles existing user authentication  
	```

	#### Sign-out

	```javascript
	POST - '/authentication/sign-out' - Handles user sign-out
	```


	#### Profile

	```javascript
	GET - '/profile/:id' - Loads user with params.id from collection, renders profile page.
	```

	```javascript
	GET - '/profile/edit' - Edits renders profile edit view.  
	```

	```javascript
	POST - '/profile/edit'
	```

	```javascript
	POST - '/profile/delete' - Deletes profile
	```


	#### Events

	
	```javascript
	GET - '/event/create' - Renders event creation page  
	```
	```javascript
	GET - '/event/:id' - Loads specific event
	```
	```javascript
	POST - '/event/:id/edit' - Handles edit form submission.  
	```
	```javascript
	POST - '/event/:id/delete' - Handles deletion.
	```

	#### Messages

	```javascript
	GET - '/messages/:senderId - Gets a list of chats for logged-in user
	```
	
	```javascript
	GET - '/:recipientId/:senderId - Gets all the messages between two users
	```
	
	```javascript
	POST - '/:recipientId/:senderId - Handles sending a message
	```




## Models

#### User

- name: string, required
- email: string, required
- passwordHashAndSalt: string, required
- picture: string, not required
- city: string, required
- zipCode: string, not required
- linkedIn: string, not required
- jobTitle: string, not required


#### Events

- name: string, required
- type: string, not required
- date: date, not required
- location: string, required
- picture: file, not required
- description: string, not required, max length 200
- creator: logged-in user
- likeCount: number, required
- timestamps: default

### RSVP

- user: mongoose.Types.ObjectId, required
- event: mongoose.Types.ObjectId, required


#### Messages

- message: string
- sender: mongoose.Types.ObjectId
- recipient: mongoose.Types.ObjectId
- createdAt: time
- updatedAt: time
- timestamps: default

#### Likes

- event: mongoose.Types.ObjectId
- user: mongoose.Types.ObjectId



## Tools used


<p align="left"> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/javascript-colored.svg" width="36" height="36" alt="Javascript" /></a> <a href="https://developer.mozilla.org/en-US/docs/Glossary/HTML5" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/html5-colored.svg" width="36" height="36" alt="HTML5" /></a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg" width="36" height="36" alt="React" /></a> <a href="https://www.w3.org/TR/CSS/#css" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/css3-colored.svg" width="36" height="36" alt="CSS3" /></a> <a href="https://getbootstrap.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/bootstrap-colored.svg" width="36" height="36" alt="Bootstrap" /></a> <a href="https://sass-lang.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/sass-colored.svg" width="36" height="36" alt="Sass" /></a> <a href="https://nodejs.org/en/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nodejs-colored.svg" width="36" height="36" alt="NodeJS" /></a> <a href="https://expressjs.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/express-colored.svg" width="36" height="36" alt="Express" /></a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/mongodb-colored.svg" width="36" height="36" alt="MongoDB" /></a> <a href="https://www.heroku.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/heroku-colored.svg" width="36" height="36" alt="Heroku" /></a> </p> 


## To-do list

- Add maps (leaflet or google maps) with locations for the events
- Include a search bar for events
- Send confirmation e-mail when people register for an event
