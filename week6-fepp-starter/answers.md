## Iteration 6
### Backend (Iterations 1–5)
- Model had `email` + `password`.
- Login and signup logic lived in the model using `userSchema.statics`.
- Model handled validation, hashing, and password checks.
- Controllers stayed clean.

### Monday’s Version
- Added `name` and `timestamps` to the model.
- Still used static `signup` and `login` methods.
- Added stronger validation with the `validator` library.

### Backend-v2
- Model is very simple (just `email` + `password`).
- All login logic moved to the controller.
- `bcrypt` is imported in the controller instead of the model.
- Controllers are now bigger since they do both request handling and authentication.

### Key Points
- `userSchema.statics.login` exists to keep login logic inside the model instead of in controllers.
- In model methods we use `this.findOne(...)`; in controllers we use `User.findOne(...)`.
- `bcrypt` goes wherever the password logic lives (model or controller).

### Our Choice
We’ll stick with the **model statics approach** (like Monday’s version).  
It keeps controllers smaller, puts all auth logic in one place, and follows good MVC practices.

## Iteration 7
### Backend folder / Monday
- `userSchema.statics.signup` and `login` handle validation, password hashing, and authentication inside the model.
- Backend folder: simple schema (`email` + `password`).  
- Monday: added `name` and timestamps with stronger validation.
- Controllers stay clean and just call `User.signup(...)` or `User.login(...)`.
- Uses `this.create(...)` / `this.findOne(...)` inside the model so logic is self-contained.
- Easier to maintain, test, and follows MVC best practices.

### Backend-v2 
- Signup/login logic lives in the controller.
- Uses `User.create(...)` / `User.findOne(...)` since the model is imported.
- Validator is imported in the controller for input checks.
- Controllers are bigger and mix request handling with authentication logic.

### Our Choice
We will use the **model statics approach** (like Monday / backend folder).  
It keeps controllers simple, centralizes authentication logic, and is easier to maintain and test.
