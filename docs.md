# NOTE to interviewers

## Checklist
- I didn't do some of requirement
 ✅ 1. Setup
 ✅ 2. Authentication
 ✅ 3. Portfolio Management
 ✅ 4. Price Updates (API is bug, so I mocked data)
 ❌ 5. Historical Data and Performance Tracking
 ✅ 6. State Management
 ✅ 7. Styling
 ✅ 8. Code Quality and Structure
 ❌ 9. Unit testing
 ✅ 10. Documentation
 11. Bonus (I didn't create docker file. but push to firebase for a bit easier to review)

## Design
- websocket
	- I use singeleton design for websocket by putting it into a closure of a redux middleware. This design can make performance better
	- If we store websocket into redux store, it will work! but it is the wrong design data storing because redux doesn't recommend to store non-serializable items into store. More information here https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state
	- If we store websocket into top of context provider, It is a good design but performance will be lower. because context is not good for high data re-render frequency. They don't design context for that. Except you put websocket logic into provider and store websocket's messages into redux and use the data from redux. this is a good way. However, I recommend to use benefit from redux middleware for websocket. They provide us a good design of global state management and redux middleware is one of their strengths

- Virtualize Table
  - Virtualize table is a good way to create a large dataset table that help reducing process 
	- Virtualize table doesn't help reduce a bad performance of high data re-render frequency. so we must use another way (In this case, I didn't put the way to avoid high data re-render frequency into it)

	- Form 
	 - You can see I use Controller component to wrap Input because of performance of form that you can inspect re-rendering by devtool
	 - They also can help us control about validation and form state. This will be more obvious or clearer if we create a big form such as KYC