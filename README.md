# tech networking app

### Requirements

- Node
- Mongo
- Auth (cookies & sessions)
- 3 models: users + two others
- All CRUD at least in one of the models
- Deployment: Heroku & atlas

## Pages

- Home - navbar, names, examples -random, search

- Sign Up - Allows visitors to create an account.
- Sign In - Allows existing users to sign in.

- Profile - profile
- Profile edit - Allows us to edit our profile.
- _Profile delete?_

- Event page - model event, attendees?

- Trips - people & visitors & events

- _Messages ?_

## Questions

- Should we have two Home pages? One for unlogged and one for logged-in?

## Route Handlers

- **Home & sign up, sign in**

GET - '/' - Renders home page: navbar, search, some random events

GET - '/authentication/sign-up' - Renders sign up page
POST - '/authentication/sign-up' - Handles account registration  
GET - '/authentication/sign-in' - Renders sign in page  
POST - '/authentication/sign-in' - Handles existing user authentication  
POST - '/authentication/sign-out' - Handles user sign-out

- **Profile**

GET - '/profile/:id' - Loads user with params.id from collection, renders profile page.
GET - '/profile/edit' - Edits renders profile edit view.  
POST - '/profile/edit'
_POST - '/profile/delete' - Deletes profile_

- **Events**

GET - '/event/' - Renders random events?

GET - '/event/create' - Renders event creation page  
POST - '/event/create' - Handles new event creation

GET - '/event/:id/edit' - Loads events from database, renders event edit page

POST - '/event/:id/edit' - Handles edit form submission.  
POST - '/event/:id/delete' - Handles deletion.

- **Trips**

GET - '/trip/create' - Renders event creation page  
POST - '/trip/create' - Handles new event creation

GET - '/trip/:id/edit' - Loads trips from database, renders trip edit page

POST - 'trip/:id/edit' - Handles edit form submission.  
POST - 'trip/:id/delete' - Handles deletion.

- **Messages**

GET - '/messages/ - Gets a list of chats
POST - '/messages/new - Creates a new chat

POST - 'trip/:id/edit' - Handles edit form submission.  
POST - 'trip/:id/delete' - Handles deletion.

## Models

#### User

- name: String, required
- email: String, required
- passwordHashAndSalt: String, required
- picture: String
- city: String, required
- zipCode (for map, not for profile info): string
- linkedIn (extra: api?)
- trips
- jobTitle

#### Events

- nameOfEvent: String, required
- type of event: conference, hackathon, coffee, workshops, job fair/fast interviews
- date of event
- location of event
- picture
- ~~attendees~~
- creator

### Attend / rsvp

- userId
- eventId

~~#### Trips~~

- location
- dates

#### Messages

- message
- sender
- recipient
- createdAt
- updatedAt

#### Mentor/mentoree (?)

## Wishlist

- Add location?
- Use of an API? https://www.meetup.com/api/schema/#p01-queries-section
