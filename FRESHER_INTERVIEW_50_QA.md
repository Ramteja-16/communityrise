# Top 50 Fresher Technical & Behavioral Interview Questions & Answers

A complete, structured preparation guide for **Fresher / Entry-Level Full-Stack Developers (React + Python/Django)**.

---

## 📌 Section 1: Core Web Fundamentals (HTML, CSS, JavaScript) — Q1 to Q10

### Q1: What is the difference between HTML5 semantic tags and non-semantic tags?
**Answer:**  
- **Semantic tags** clearly describe their meaning to both the browser and developer (e.g., `<header>`, `<nav>`, `<article>`, `<section>`, `<footer>`). They improve SEO and accessibility.
- **Non-semantic tags** provide no context about the content inside them (e.g., `<div>`, `<span>`).

### Q2: What is the CSS Box Model?
**Answer:**  
Every HTML element is considered a rectangular box consisting of:
1. **Content**: The actual text, image, or children.
2. **Padding**: Transparent space around content inside the border.
3. **Border**: Border surrounding padding and content.
4. **Margin**: Space outside the border to separate elements.

### Q3: What is the difference between `let`, `const`, and `var` in JavaScript?
**Answer:**  
- `var`: Function-scoped, can be re-declared and updated, hoisted with `undefined`.
- `let`: Block-scoped `{ }`, cannot be re-declared in same scope, can be updated.
- `const`: Block-scoped `{ }`, cannot be re-declared or reassigned.

### Q4: Explain JavaScript Closures with an example.
**Answer:**  
A closure is a function that remembers and accesses variables from its outer lexical scope even after the outer function has finished executing.
```js
function outerFunction(outerVariable) {
  return function innerFunction(innerVariable) {
    console.log(`Outer: ${outerVariable}, Inner: ${innerVariable}`);
  };
}
const newFunction = outerFunction("Hello");
newFunction("World"); // Prints: Outer: Hello, Inner: World
```

### Q5: What is the Event Loop in JavaScript?
**Answer:**  
JavaScript is single-threaded. The event loop continuously monitors the Call Stack and Task/Microtask Queue. When the Call Stack is empty, it moves queued callbacks (like `setTimeout`, Promises) to the Call Stack for execution.

### Q6: What is the difference between `==` and `===` in JavaScript?
**Answer:**  
- `==` (Abstract Equality): Compares values after performing type coercion (`"5" == 5` is `true`).
- `===` (Strict Equality): Compares both value and data type without coercion (`"5" === 5` is `false`).

### Q7: What are Promises and Async/Await in JavaScript?
**Answer:**  
- **Promise**: An object representing the eventual completion (or failure) of an asynchronous operation (States: `pending`, `fulfilled`, `rejected`).
- **Async/Await**: Syntactic sugar over Promises that makes asynchronous code look synchronous and readable.

### Q8: What is Event Bubbling vs Event Capturing?
**Answer:**  
- **Event Bubbling**: The event starts at the target element and propagates upwards to parent elements in the DOM tree (default behavior).
- **Event Capturing**: The event starts at the topmost parent (`window`) and trickles down to the target element.

### Q9: What is DOM and Virtual DOM?
**Answer:**  
- **DOM**: Real Document Object Model in browser memory. Updating it directly is slow because it causes browser layout recalculations (reflows).
- **Virtual DOM**: A lightweight JavaScript memory representation of the DOM used by React. React compares Virtual DOM with real DOM (diffing) and updates only changed nodes (reconciliation).

### Q10: What is localStorage vs sessionStorage vs Cookies?
**Answer:**  
- `localStorage`: Stores data with no expiration date (persists browser restarts, max ~5-10MB).
- `sessionStorage`: Stores data for one tab session (cleared when tab closes, max ~5MB).
- `Cookies`: Small data fragments sent with HTTP requests to the server (max ~4KB, used for auth/session tokens).

---

## 📌 Section 2: React.js & Frontend Concepts — Q11 to Q20

### Q11: What are React Hooks? Name 3 essential hooks.
**Answer:**  
Hooks are functions that let functional components use state and lifecycle features.
1. `useState`: Manages local component state.
2. `useEffect`: Handles side effects (data fetching, subscriptions, DOM mutations).
3. `useContext`: Accesses values from React Context without prop drilling.

### Q12: What is Prop Drilling and how do you avoid it?
**Answer:**  
Prop drilling occurs when passing data down through multiple levels of nested child components that do not need the data themselves. Avoid it using **React Context API**, custom state stores, or Redux.

### Q13: What is the purpose of the `key` prop in React lists?
**Answer:**  
The `key` prop helps React identify which items in a list have changed, been added, or removed during DOM diffing. It ensures efficient rendering and preserves component state.

### Q14: What is the difference between Controlled and Uncontrolled Components?
**Answer:**  
- **Controlled Component**: Form input value is driven by React state (`value={state}` and `onChange`).
- **Uncontrolled Component**: Form input value is handled directly by the DOM using refs (`useRef`).

### Q15: What is the useEffect dependency array and what happens if it is omitted?
**Answer:**  
- Empty array `[]`: Effect runs **once** when component mounts.
- Array with values `[data]`: Effect runs on mount and whenever `data` changes.
- Omitted dependencies: Effect runs on **every single render** (can cause infinite loops).

### Q16: What is Higher-Order Component (HOC)?
**Answer:**  
An HOC is a pure function that takes a component as an argument and returns an enhanced component (e.g., `withAuth(MyComponent)`).

### Q17: What is Vite and why is it preferred over Create React App (CRA)?
**Answer:**  
Vite uses native ES modules during development and `esbuild` for ultra-fast compilation. It provides instant dev server startup and hot module replacement (HMR), unlike CRA which bundles all code using Webpack on startup.

### Q18: What is Tailwind CSS and what are its advantages?
**Answer:**  
Tailwind CSS is a utility-first CSS framework. Advantages:
1. Write styling directly in HTML/JSX using utility classes (`px-4 py-2 bg-black text-white`).
2. Generates minimal production CSS bundles via purging unused classes.
3. Easy responsive design (`sm:`, `md:`, `lg:` breakpoints).

### Q19: How do you handle conditional rendering in React?
**Answer:**  
1. **Ternary Operator**: `{isLoggedIn ? <UserDashboard /> : <LoginForm />}`
2. **Logical AND (`&&`)**: `{hasNotifications && <Badge />}`
3. **If-else statements**: Inside component functions before return.

### Q20: What is React Fragment (`<></>`) and why is it used?
**Answer:**  
Fragments group multiple elements without adding an extra wrapper node (like an unnecessary `<div>`) to the real DOM, avoiding DOM bloat.

---

## 📌 Section 3: Python & Core Programming — Q21 to Q30

### Q21: What are Python's primary data types?
**Answer:**  
- Numeric: `int`, `float`, `complex`
- Sequence: `str`, `list`, `tuple`
- Mapping: `dict`
- Set: `set`, `frozenset`
- Boolean: `bool` (`True`/`False`)

### Q22: What is the difference between List and Tuple in Python?
**Answer:**  
- **List**: Mutable `[1, 2, 3]`, elements can be modified, slower execution.
- **Tuple**: Immutable `(1, 2, 3)`, elements cannot be modified, faster execution & memory efficient.

### Q23: What is Python List Comprehension? Give an example.
**Answer:**  
A concise way to create lists based on existing iterables.
```python
# Create list of even squares
squares = [x**2 for x in range(10) if x % 2 == 0]
# Output: [0, 4, 16, 36, 64]
```

### Q24: What is `*args` and `**kwargs` in Python?
**Answer:**  
- `*args`: Passes a variable number of non-keyword (positional) arguments as a tuple.
- `**kwargs`: Passes a variable number of keyword arguments as a dictionary.

### Q25: What is the difference between `is` and `==` in Python?
**Answer:**  
- `==`: Compares **values** of two objects for equality.
- `is`: Compares **identity/memory address** of two objects.

### Q26: What is a Python Decorator? Give an example.
**Answer:**  
A function that takes another function as an argument and extends its behavior without modifying it.
```python
def my_decorator(func):
    def wrapper():
        print("Before function execution")
        func()
        print("After function execution")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")
```

### Q27: How does Python manage memory (Garbage Collection)?
**Answer:**  
Python uses **Reference Counting** and a **Generational Garbage Collector**. When an object's reference count drops to 0, its memory is deallocated automatically.

### Q28: What is the difference between `__init__` and `__str__` in Python classes?
**Answer:**  
- `__init__`: Constructor method called automatically when creating an object instance to initialize attributes.
- `__str__`: Returns a readable string representation of the object when printed.

### Q29: What is Global Interpreter Lock (GIL) in Python?
**Answer:**  
GIL is a mutex that allows only one thread to execute Python bytecode at a time. It prevents multi-threading CPU-bound race conditions, but multiprocessing is used for CPU parallelism.

### Q30: Explain `try-except-finally` block in Python.
**Answer:**  
- `try`: Code that might raise an exception.
- `except`: Catches and handles specific exceptions.
- `finally`: Executes code **always**, regardless of whether an exception occurred (used for cleanup).

---

## 📌 Section 4: Django & Backend Web Architecture — Q31 to Q38

### Q31: What is Django MVT Architecture?
**Answer:**  
- **Model**: Database interface & schema definition.
- **View**: Business logic that receives HTTP requests and fetches model data.
- **Template**: HTML layout rendered with data (or JSON serialized in REST APIs).

### Q32: What is Django REST Framework (DRF) and why use it?
**Answer:**  
DRF is a powerful toolkit for building Web APIs on top of Django. It provides serializers, authentication policies, automatic API browser interfaces, and ModelViewSets.

### Q33: What is the difference between Django `makemigrations` and `migrate`?
**Answer:**  
- `python manage.py makemigrations`: Inspects `models.py` and creates Python migration files tracking schema changes.
- `python manage.py migrate`: Executes pending migration files against the real database (`db.sqlite3` or PostgreSQL).

### Q34: What is Django ORM and what is QuerySet?
**Answer:**  
- **Django ORM**: Object-Relational Mapper that converts Python objects to SQL queries.
- **QuerySet**: A collection of database objects returned by ORM queries (e.g., `Issue.objects.filter(status='OPEN')`). QuerySets are **lazy** (evaluated only when iterated over).

### Q35: What is a Django Serializer?
**Answer:**  
A serializer converts complex Django querysets or model instances into JSON/XML payloads for API responses, and parses JSON input back into validated Python objects.

### Q36: What is a ModelViewSet in DRF?
**Answer:**  
`ModelViewSet` provides full CRUD actions (`list`, `create`, `retrieve`, `update`, `destroy`) automatically for a model in a single class.

### Q37: What is `@action` decorator in DRF?
**Answer:**  
Used inside a `ModelViewSet` to add custom API routes (e.g., `@action(detail=True, methods=['post']) def approve_funding(self, request, pk=None)` creates `/api/issues/{id}/approve_funding/`).

### Q38: What is Django `AbstractUser` vs `AbstractBaseUser`?
**Answer:**  
- `AbstractUser`: Keeps Django's default user fields (`username`, `first_name`, `email`, permissions) while allowing custom fields (`role`, `skills`).
- `AbstractBaseUser`: Complete custom user implementation from scratch (requires manual setup of password hashing and permissions).

---

## 📌 Section 5: Database (SQL & ORM) & Data Structures — Q39 to Q44

### Q39: What is Primary Key vs Foreign Key?
**Answer:**  
- **Primary Key**: A unique identifier for each row in a database table.
- **Foreign Key**: A field in one table that links to the Primary Key of another table, establishing a relationship.

### Q40: What are Database Indexes and why use them?
**Answer:**  
Indexes are data structures (like B-Trees) built on columns to speed up data retrieval queries (`SELECT`), though they slightly slow down writes (`INSERT`/`UPDATE`).

### Q41: Explain One-to-Many and Many-to-Many relationships.
**Answer:**  
- **One-to-Many**: One parent record links to multiple child records (e.g., One `User` posts many `Issues`). Defined via `ForeignKey`.
- **Many-to-Many**: Multiple records link to multiple records (e.g., Many `Volunteers` assigned to many `Issues`). Defined via `ManyToManyField`.

### Q42: What is the difference between Stack and Queue?
**Answer:**  
- **Stack**: LIFO (Last In First Out) — e.g. Undo button, Call Stack.
- **Queue**: FIFO (First In First Out) — e.g. Print jobs, Task Queue.

### Q43: What is the time complexity of Array/List Lookup by index vs Search by value?
**Answer:**  
- Lookup by index: **O(1)** (Constant time).
- Search by value: **O(n)** (Linear time).

### Q44: What is ACID in relational databases?
**Answer:**  
- **Atomicity**: Transactions are all-or-nothing.
- **Consistency**: Data stays valid according to constraints.
- **Isolation**: Concurrent transactions do not conflict.
- **Durability**: Saved data persists even during crashes.

---

## 📌 Section 6: Git, REST APIs & Web Security — Q45 to Q48

### Q45: What is CORS and how do you resolve CORS errors?
**Answer:**  
CORS (Cross-Origin Resource Sharing) is a browser security feature blocking requests from one origin (e.g., `http://localhost:3000`) to another (e.g., `http://localhost:8000`). Resolved in Django by adding `django-cors-headers` middleware and setting `CORS_ALLOWED_ORIGINS`.

### Q46: What are standard HTTP status codes?
**Answer:**  
- `200 OK`: Request succeeded.
- `201 Created`: Resource created.
- `400 Bad Request`: Invalid input data.
- `401 Unauthorized`: Authentication required.
- `403 Forbidden`: Authenticated but lack permission.
- `404 Not Found`: Endpoint or resource does not exist.
- `500 Internal Server Error`: Backend crash.

### Q47: What is `.gitignore` and why is it important?
**Answer:**  
`.gitignore` specifies intentionally untracked files that Git should ignore (e.g. `node_modules/`, `db.sqlite3`, `.env`, `__pycache__/`). It prevents pushing heavy binaries and secret API keys to GitHub.

### Q48: What is the difference between `git pull` and `git fetch`?
**Answer:**  
- `git fetch`: Downloads changes from remote repository but does not merge into local code.
- `git pull`: Downloads remote changes **and** automatically merges them into current working branch (`fetch + merge`).

---

## 📌 Section 7: HR & Behavioral Questions for Freshers — Q49 & Q50

### Q49: Tell me about yourself and your project "Community Rise".
**Answer:**  
"I am a passionate Full-Stack Developer skilled in React, Tailwind CSS, Python, and Django REST Framework. Recently, I built **Community Rise**, a monorepo web application designed to solve civic issues and skill matching. It connects skilled individuals to paid gigs, empowers volunteers with verified experience badges, and enables citizen teams to tackle emergencies like power pole collapses with government-funded grants. I implemented live REST endpoints, role-based dashboards, and deployed the app on Render and Vercel."

### Q50: How do you handle bugs or technical blockers when working on a project?
**Answer:**  
"When I run into a blocker, I follow a systematic approach:
1. Read error logs and stack traces carefully.
2. Use debugging tools like console logs, Django debug tools, or network inspection tabs.
3. Search official documentation or community resources (Stack Overflow/GitHub issues).
4. If stuck, isolate the problem with a minimal reproducible test case or consult senior team members for guidance."
