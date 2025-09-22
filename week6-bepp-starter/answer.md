#### What does this line of code do?
```javascript
req.user = await User.findOne({ _id }).select("_id");
```
The code is a common pattern in web development for authentication or authorization to efficiently load only the user's ID into the request object for later use

#### What are userSchema.statics.signup/login?
They’re static methods on your Mongoose model. Instead of being tied to one document, you call them directly on the model (User.signup(...)). They let you keep signup/login logic close to the User schema.

#### Why use them?
Keep all user-related logic (validation, hashing, etc.) in one place.
Easy to reuse anywhere by just calling User.signup() or User.login().
Keeps code consistent and cleaner than rewriting the same steps in every controller.
#### Pros
- Organized and reusable
- Enforces consistent rules for signup/login
- Makes your model more expressive
#### Cons
- Business logic gets tied to the schema → harder to swap DB later
- Can make the model “fat” if you add too much
- Sometimes harder to test in isolation

#### Alternatives
Service layer – put logic in userService.js, call it from controllers. (cleaner in bigger apps)
Controller logic – keep models simple, do everything in the controller. (fine for small apps)
Mongoose middleware – e.g. pre('save') for hashing passwords automatically.