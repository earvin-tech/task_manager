# <p style="text-align: center">⚠️ Centralised Error Handling in Express.js: Why It Matters and How to Build It</p>

We as developers all know how important error handling is to our projects — it allows for the smooth operation of our code. Catching and handling errors ensures our applications can run without crashing due to both client-side and server-side issues.

When building an Express.js API, it can be tempting to haphazardly add try/catch blocks all over your routes. But as your codebase grows, this approach becomes very unorganised and difficult to track or maintain.

That’s where centralised error handling becomes useful.

With centralised error handling, we have one orderly place to manage errors across the entire application. It ensures consistency in responses, making debugging later on much simpler — both in development and in production.

This post will explain the importance of centralised error handling and how to implement it in an Express.js project. The demonstration will be based on a project example: the Task Manager API developed by Earvin Tumpao.

---
## ❌ The Problem With Scattered Try/Catch Blocks

At first, it might seem convenient to wrap all your Express route handlers in `try/catch` blocks. But doing this for every controller bloats your codebase, breaks DRY principles, and leads to repetitive logic instead of reusable patterns.

A problem with consistency also arises — some controllers might send different types of error messages: some custom, some generic, and some even exposing stack traces.

Even worse, important details like setting the right status code, logging the error, or hiding sensitive information in production can be easily forgotten or handled inconsistently.

Here’s a typical example of a controller without centralised handling:

```js
const getUser = async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    if (!user) return response.status(404).json({ message: "User not found" });

    response.json(user);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};
```
>It works — but imagine repeating that pattern in every controller.


---

## 🧩 What is Centralised Error Handling?

Centralised error handling is the practice of managing all application errors in a single place — typically through a custom middleware function in Express.

Rather than writing multiple `try/catch` blocks and sending error responses in every controller, you can forward errors using `next(err)` and let the centralised error handler take care of it.

This results in cleaner controllers that stay focused on business logic, while a single error handler is responsible for formatting the error response, setting the appropriate status code, and managing stack trace output in production.

---

## 🛠️ How to Build It in Express.js

Now that we understand why d error handling matters, let’s walk through how to implement it step-by-step in Express.

It only takes two steps:

1. Create the error handler middleware
2. Plug it into your Express applications — after all other routes

---

### 1️⃣ Create the Middleware

Inside `src/middleware/errorHandler.js`:

```js
const errorHandler = (err, request, response, next) => {
  console.error(err.stack); // Optional: send to external logging service

  const statusCode = response.statusCode !== 200 ? response.statusCode : 500;

  response.status(statusCode).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? "💥" : err.stack,
  });
};

module.exports = errorHandler;
```
✅ This function:
- Logs the error
- Sets a safe fallback status code (`500`)
- Sends back a clear message and stack trace (hidden in production)

### 2️⃣ Register the Middleware

In your `server.js` register the error handler **after all your routes**:

```js
const errorHandler = require("./middleware/errorHandler");

// Route definitions above...
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Error handler comes last
app.use(errorHandler);
```
It's important to make sure the error handler is last, as the other routes will pass on any uncaught errors to the error handler.

---

## 🧪 Putting It into Practice

In the Task Manager API project, each controller uses `try/catch`blocks to handle asynchronous logic — but instead of sending error responses directly from these controllers, they are forwarded to the centralised error handler using `next(err)`.

Here's an example from the UserController — the registerUser function:

```js
const registerUser = async (request, response, next) => {
  try {
    const { username, email, password } = request.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      response.status(400);
      return next(new Error("Username or email already exists"));
    }

    // Save logic...
    const newUser = new User({ username, email, password });
    await newUser.save();

    response.status(201).json({ message: "User created successfully" });
  } catch (err) {
    next(err); // Send to centralised error handler
  }
};
```
✅ Instead of sending a custom error response here, we delegate that responsibility to the centralised middleware.

This keeps controller code focused on its core logic — and every error flows through a single place, no matter what route or controller it comes from.

💡 Want to see the full implementation?
**Check out the** [Task Manager API](https://github.com/earvin-tech/task_manager/tree/ErrorHandling)

---

## ⚖️ Ethical Issues Solved by Centralised Error Handling

### 🔐 1. Leaking Sensitive Information
In many Express.js apps, developers accidentally expose stack traces or internal server messages, especially when there's no centralized error handler in place.

This poses a serious ethical concern:

- 🔓 Revealing file paths, schema structures, or internal logic could allow attackers to exploit your system
- 🛠️ It also creates uncertainty and confusion for regular users who don’t understand cryptic error output

With a centralized error handler, you can safely control what information gets shown in production:

` stack: process.env.NODE_ENV === "production" ? "💥" : err.stack`

✅ This ensures:

- No raw system messages are leaked
- Stack traces are hidden in live environments
- Every user sees a clear, user-friendly error

> 💡 Developers have a responsibility to protect users — not just their data, but also the structure of the system. Centralising error handling helps enforce that boundary.

### 💬 2. Inconsistent or Misleading Error Messages

If every controller formats errors differently, users may receive:

- Confusing or vague error messages ("Oops" or "Something broke")
- Errors with no status codes
- Totally different response formats across endpoints

This inconsistency creates unfair or unclear experiences, and can even impact accessibility for users who need precise feedback (e.g. screen readers, non-native speakers).

With centralised error handling:

- You define one format for every error
- You can localise or customise messages easily later
- You keep your API predictable for other devs

```js
res.status(404);
return next(new Error("Task not found"));
```
Combined with the error handler, this returns:

```js
{
  "message": "Task not found",
  "stack": "💥"
}
```
✅ This improves the user experience ethically and technically:

- Consistency builds trust
- Clear messages mean users aren’t blamed for errors they didn’t cause
- Developers consuming your API know exactly what to expect

> 🧠 Ethical development means building systems that respond clearly, fairly, and predictably — not just systems that “work.”
---

## 🧼 Final Thoughts

Centralised error handling isn’t just a nice-to-have — it’s a must for any Express.js project that’s meant to scale cleanly and be maintained long-term.

The benefits of managing errors in one place:
- 🧹 Cleaner, more focused controller logic
- 🔁 Consistent error responses across your entire API
- 🔒 Better security by hiding sensitive information in production
- 🪵 A single location for logging and debugging

Whether you're working solo or as part of a team, centralising your error logic sets a solid foundation for building reliable, user-friendly applications.

If you're just starting out with Express, it's one of the easiest upgrades you can make — and one of the most impactful. 

---

## 📚 References

1. Swagger, n.d. Describing responses. [online] Available at: https://swagger.io/docs/specification/describing-responses/ [Accessed 15 Apr. 2025].

2. Express.js, n.d. Error handling. [online] Available at: https://expressjs.com/en/guide/error-handling.html [Accessed 15 Apr. 2025].

3. Mozilla Developer Network (MDN), n.d. Control flow and error handling. [online] Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling [Accessed 15 Apr. 2025].

4. Raj, R., 2021. Node.js best practices. [blog] RisingStack Engineering. Available at: https://blog.risingstack.com/node-js-best-practices/ [Accessed 15 Apr. 2025].

5. Goldberg, Y., 2023. Node.js best practices – Error handling. [online] GitHub. Available at: https://github.com/goldbergyoni/nodebestpractices#3-error-handling-practices [Accessed 15 Apr. 2025].