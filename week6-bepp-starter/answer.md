What does this line of code do?
```javascript
req.user = await User.findOne({ _id }).select("_id");
```
The code is a common pattern in web development for authentication or authorization to efficiently load only the user's ID into the request object for later use

