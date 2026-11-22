-- Migration number: 0005 	 2026-10-15T10:37:26.908Z

DELETE FROM questions;
INSERT INTO questions (id, body) VALUES (1, 'Is Javascript single-threaded?');
INSERT INTO questions (id, body) VALUES (2, 'Different data types in Javascript?');
INSERT INTO questions (id, body) VALUES (3, 'Different ways to create an Object in Javascript?');
INSERT INTO questions (id, body) VALUES (4, 'What is rest and spread operator?');
INSERT INTO questions (id, body) VALUES (5, 'What is a higher-order function?');
INSERT INTO questions (id, body) VALUES (6, 'What is a Temporal dead zone?');
INSERT INTO questions (id, body) VALUES (7, 'What is the difference between Call, Apply, and Bind methods?');
INSERT INTO questions (id, body) VALUES (8, 'What are the features of ES6?');
INSERT INTO questions (id, body) VALUES (9, 'How to make an object immutable? (seal and freeze methods)?');
INSERT INTO questions (id, body) VALUES (10, 'What is Event delegation?');
INSERT INTO questions (id, body) VALUES (11, 'What are server-sent events?');
INSERT INTO questions (id, body) VALUES (12, 'What is TypeScript?');
INSERT INTO questions (id, body) VALUES (13, 'What is explicit and implicit type assignment?');
INSERT INTO questions (id, body) VALUES (14, 'Difference between any, unknown and never in TypeScript?');
INSERT INTO questions (id, body) VALUES (15, 'How do you give the type of Arrays?');
INSERT INTO questions (id, body) VALUES (16, 'What is Type Inference in array?');
INSERT INTO questions (id, body) VALUES (17, 'What are tuples?');
INSERT INTO questions (id, body) VALUES (18, 'What are readonly tuples?');
INSERT INTO questions (id, body) VALUES (19, 'How to give the types for Objects?');
INSERT INTO questions (id, body) VALUES (20, 'How to have optional properties in Objects?');
INSERT INTO questions (id, body) VALUES (21, 'Explain enum in TypeScript?');
INSERT INTO questions (id, body) VALUES (22, 'What is String enum?');
INSERT INTO questions (id, body) VALUES (23, 'What are Type Aliases?');
INSERT INTO questions (id, body) VALUES (24, 'What are interfaces?');
INSERT INTO questions (id, body) VALUES (25, 'How to extend interfaces?');
INSERT INTO questions (id, body) VALUES (26, 'What are Union types?');
INSERT INTO questions (id, body) VALUES (27, 'How to give the return type in function?');
INSERT INTO questions (id, body) VALUES (28, 'How to give type of parameters in function?');
INSERT INTO questions (id, body) VALUES (29, 'How to give optional, default and rest parameters in function?');
INSERT INTO questions (id, body) VALUES (30, 'What is casting in TypeScript?');
INSERT INTO questions (id, body) VALUES (31, 'How to give type of a variable in Class?');
INSERT INTO questions (id, body) VALUES (32, 'What is public, private and protected in TypeScript classes?');
INSERT INTO questions (id, body) VALUES (33, 'What is the readonly keyword in reference to classes in TypeScript?');
INSERT INTO questions (id, body) VALUES (34, 'How to implement overriding in classes of TypeScript?');
INSERT INTO questions (id, body) VALUES (35, 'What are Abstract classes?');
INSERT INTO questions (id, body) VALUES (36, 'What are Generics in TypeScript. Give examples in functions, classes and type aliases.');
INSERT INTO questions (id, body) VALUES (37, 'What is Partial, utility type.');
INSERT INTO questions (id, body) VALUES (38, 'What is Required, utility type.');
INSERT INTO questions (id, body) VALUES (39, 'What is Record, utility type.');
INSERT INTO questions (id, body) VALUES (40, 'What is Omit, utility type.');
INSERT INTO questions (id, body) VALUES (41, 'What is Pick, utility type.');
INSERT INTO questions (id, body) VALUES (42, 'What is Exclude, utility type.');
INSERT INTO questions (id, body) VALUES (43, 'What is Readonly, utility type.');
INSERT INTO questions (id, body) VALUES (44, 'What does `<meta name="viewport" />` mean?');
INSERT INTO questions (id, body) VALUES (45, 'When was the last time you took ownership or did a deep dive into a problem?');
INSERT INTO questions (id, body) VALUES (46, 'Design a scalable admin dashboard for monitoring cloud infrastructure, with real-time updates from multiple sources.');
INSERT INTO questions (id, body) VALUES (47, 'How would you cache frequently accessed data on the client in a single-page app?');
INSERT INTO questions (id, body) VALUES (48, 'How would you improve SEO for a React single-page app?');
INSERT INTO questions (id, body) VALUES (49, 'Describe a time you shipped a feature under a tight deadline.');
INSERT INTO questions (id, body) VALUES (50, 'How do you keep up with frontend trends?');
INSERT INTO questions (id, body) VALUES (51, 'Where do you use the observer pattern in frontend development?');
INSERT INTO questions (id, body) VALUES (52, 'How do you validate a form that sends file data?');
INSERT INTO questions (id, body) VALUES (53, 'Explain the Context API, and how you use it to share state across components.');
INSERT INTO questions (id, body) VALUES (54, 'What is the difference between the Shadow DOM and the Virtual DOM?');
INSERT INTO questions (id, body) VALUES (55, 'Describe a time a project you worked on failed, and how you handled it.');
INSERT INTO questions (id, body) VALUES (56, 'What is JSX, and why is it used in React?');
INSERT INTO questions (id, body) VALUES (57, 'What are components in React?');
INSERT INTO questions (id, body) VALUES (58, 'What is the difference between state and props?');
INSERT INTO questions (id, body) VALUES (59, 'What is your experience with React and modern frontend development?');
INSERT INTO questions (id, body) VALUES (60, 'Describe a hard project and how you got past the obstacles.');
INSERT INTO questions (id, body) VALUES (61, 'How do you handle a disagreement on a team?');
INSERT INTO questions (id, body) VALUES (62, 'How do you learn a new technology?');
INSERT INTO questions (id, body) VALUES (63, 'The team is behind on a critical feature. How would you handle that?');
INSERT INTO questions (id, body) VALUES (64, 'How do you manage state in a large app?');
INSERT INTO questions (id, body) VALUES (65, 'What is a micro-frontend, and when would you use one?');
INSERT INTO questions (id, body) VALUES (66, 'Design the frontend for an order-tracking screen with live updates, offline support, and many concurrent users.');
INSERT INTO questions (id, body) VALUES (67, 'Describe a project you owned from start to finish.');
INSERT INTO questions (id, body) VALUES (68, 'When did you pick a simpler library instead of a popular one, and why?');
INSERT INTO questions (id, body) VALUES (69, 'Where do you want your career to go?');
INSERT INTO questions (id, body) VALUES (70, 'What is the difference between `var`, `let`, and `const`?');
INSERT INTO questions (id, body) VALUES (71, 'How do you debug JavaScript?');
INSERT INTO questions (id, body) VALUES (72, 'What is the difference between `==` and `===`?');
INSERT INTO questions (id, body) VALUES (73, 'What are the SOLID principles?');
INSERT INTO questions (id, body) VALUES (74, 'Why does the Single Responsibility Principle matter?');
INSERT INTO questions (id, body) VALUES (75, 'How do you apply the Open/Closed Principle in JavaScript?');
INSERT INTO questions (id, body) VALUES (76, 'What does the Liskov Substitution Principle mean in practice?');
INSERT INTO questions (id, body) VALUES (77, 'How does Interface Segregation apply in JavaScript, which has no formal interfaces?');
INSERT INTO questions (id, body) VALUES (78, 'What is the Dependency Inversion Principle, and how do you use it in JavaScript?');
INSERT INTO questions (id, body) VALUES (79, 'Give a real example of SOLID in JavaScript.');
INSERT INTO questions (id, body) VALUES (80, 'How do you use object-oriented programming in JavaScript?');
INSERT INTO questions (id, body) VALUES (81, 'What is `srcset` in HTML?');
INSERT INTO questions (id, body) VALUES (82, 'What is the difference between `display: none` and `visibility: hidden`?');
INSERT INTO questions (id, body) VALUES (83, 'How do you improve frontend performance?');
INSERT INTO questions (id, body) VALUES (84, 'What does the `new` operator do?');
INSERT INTO questions (id, body) VALUES (85, 'Can you bind `this` on an arrow function? What happens if you call an arrow function with `new`?');
INSERT INTO questions (id, body) VALUES (86, 'Which of these is true for React context in React 16.3 and later?

- Context can only be read in class components with `this.context`.
- A context is created with `React.createContext()`.
- The only way to read a context in a function component is the `Consumer` component.
- Context values must be primitive types.');
INSERT INTO questions (id, body) VALUES (87, 'What are React portals, and when would you use them?');
INSERT INTO questions (id, body) VALUES (88, 'How do you handle authentication and authorization in a React app?');
INSERT INTO questions (id, body) VALUES (89, 'What are Suspense and concurrent rendering, and how do they help performance?');
INSERT INTO questions (id, body) VALUES (90, 'How do you avoid stale closures in `useEffect`?');
INSERT INTO questions (id, body) VALUES (91, 'How would you keep state across page reloads?');
INSERT INTO questions (id, body) VALUES (92, 'How does React batch state updates, and when does it not?');
INSERT INTO questions (id, body) VALUES (93, 'What does TypeScript buy you on a frontend project?');
INSERT INTO questions (id, body) VALUES (94, 'What is the difference between `useEffect` and `useLayoutEffect`?');
INSERT INTO questions (id, body) VALUES (95, 'How does the virtual DOM work?');
INSERT INTO questions (id, body) VALUES (96, 'How does a browser turn a page into pixels?');
INSERT INTO questions (id, body) VALUES (97, 'How do you handle API errors and retries?');
INSERT INTO questions (id, body) VALUES (98, 'How do you raise a Lighthouse score?');
INSERT INTO questions (id, body) VALUES (99, 'How do you handle environment variables and secrets in the frontend?');
INSERT INTO questions (id, body) VALUES (100, 'What are bubbling and capturing?');
INSERT INTO questions (id, body) VALUES (101, 'How does a browser render a page (the critical rendering path)?');
INSERT INTO questions (id, body) VALUES (102, 'What are reflow and repaint?');
INSERT INTO questions (id, body) VALUES (103, 'How does `async` / `await` work underneath?');
INSERT INTO questions (id, body) VALUES (104, 'What is hoisting?');
INSERT INTO questions (id, body) VALUES (105, 'What are hooks, and why were they added?');
INSERT INTO questions (id, body) VALUES (106, 'What is the difference between `useMemo` and `useCallback`?');
INSERT INTO questions (id, body) VALUES (107, 'How would you make a React app faster?');
INSERT INTO questions (id, body) VALUES (108, 'How do you handle errors in a React app?');
INSERT INTO questions (id, body) VALUES (109, 'How do you make React components accessible?');
INSERT INTO questions (id, body) VALUES (110, 'What React anti-patterns should you avoid?');
INSERT INTO questions (id, body) VALUES (111, 'How do you use TypeScript well in React?');
INSERT INTO questions (id, body) VALUES (112, 'How would you speed up a large React app (build, runtime, network, and monitoring)?');
INSERT INTO questions (id, body) VALUES (113, 'How would you design a frontend architecture that can grow?');
INSERT INTO questions (id, body) VALUES (114, 'What is hydration?');
INSERT INTO questions (id, body) VALUES (115, 'How would you cache data in a React app?');
INSERT INTO questions (id, body) VALUES (116, 'How would you design a progressive web app?');
INSERT INTO questions (id, body) VALUES (117, 'How do you integrate APIs without wasting requests?');
INSERT INTO questions (id, body) VALUES (118, 'How do you keep a frontend secure?');
INSERT INTO questions (id, body) VALUES (119, 'How do you watch and debug performance in production?');
INSERT INTO questions (id, body) VALUES (120, 'What are time and space complexity? Give an example.');
INSERT INTO questions (id, body) VALUES (121, 'What is the difference between synchronous and asynchronous code?');
INSERT INTO questions (id, body) VALUES (122, 'Which data structures do you use most in frontend work?');
INSERT INTO questions (id, body) VALUES (123, 'How do you approach a frontend system-design question?');
INSERT INTO questions (id, body) VALUES (124, 'Design a scalable admin dashboard.');
INSERT INTO questions (id, body) VALUES (125, 'Design a frontend for live updates, such as a stock dashboard.');
INSERT INTO questions (id, body) VALUES (126, 'Design a system that can show very large tables.');
INSERT INTO questions (id, body) VALUES (127, 'How would you implement role-based access?');
INSERT INTO questions (id, body) VALUES (128, 'How do you handle environment config and build pipelines?');
INSERT INTO questions (id, body) VALUES (129, 'How would you design a multilingual React app?');
INSERT INTO questions (id, body) VALUES (130, 'Design a notification system (in-app, toast, and live).');
INSERT INTO questions (id, body) VALUES (131, 'How do you observe a frontend (monitoring, logs, analytics)?');
INSERT INTO questions (id, body) VALUES (132, 'Explain how React actually works, not just how you use it.');
INSERT INTO questions (id, body) VALUES (133, 'How do you handle shared dependencies and version clashes in a monorepo?');
INSERT INTO questions (id, body) VALUES (134, 'What concurrent rendering features did React 18 add?');
INSERT INTO questions (id, body) VALUES (135, 'How do you fetch data so it still works as the app grows?');
INSERT INTO questions (id, body) VALUES (136, 'Which progressive-web-app features actually bring people back?');
INSERT INTO questions (id, body) VALUES (137, 'How do you design layouts that are both responsive and adaptive?');
INSERT INTO questions (id, body) VALUES (138, 'How do you work offline and resolve sync conflicts?');
INSERT INTO questions (id, body) VALUES (139, 'How do you keep code quality consistent in review?');
INSERT INTO questions (id, body) VALUES (140, 'How do you find, track, and shrink technical debt?');
INSERT INTO questions (id, body) VALUES (141, 'Explain how React re-renders work.');
INSERT INTO questions (id, body) VALUES (142, 'What runs first, `Promise.then` or `setTimeout`?');
INSERT INTO questions (id, body) VALUES (143, 'Why does `this` behave differently in arrow functions?');
INSERT INTO questions (id, body) VALUES (144, 'Is the DOM part of JavaScript?');
INSERT INTO questions (id, body) VALUES (145, 'Why does blocking JavaScript freeze the UI?');
INSERT INTO questions (id, body) VALUES (146, 'What is a good way to share dependencies in a monorepo?');
INSERT INTO questions (id, body) VALUES (147, 'How do you handle server rendering and hydration in a complex app?');
INSERT INTO questions (id, body) VALUES (148, 'Why do React 18''s concurrent features matter?');
INSERT INTO questions (id, body) VALUES (149, 'How do you fetch data efficiently at scale?');
INSERT INTO questions (id, body) VALUES (150, 'How do you design CI/CD for a frontend with several environments?');
INSERT INTO questions (id, body) VALUES (151, 'How do you use feature flags in a large React app?');
INSERT INTO questions (id, body) VALUES (152, 'How do you monitor errors in production?');
INSERT INTO questions (id, body) VALUES (153, 'How do you set up A/B tests in React?');
INSERT INTO questions (id, body) VALUES (154, 'Which progressive-web-app features improve the experience?');
INSERT INTO questions (id, body) VALUES (155, 'How do you design a layout that works from a phone up to a 4K screen?');
INSERT INTO questions (id, body) VALUES (156, 'How do you add offline support and sync data later?');
INSERT INTO questions (id, body) VALUES (157, 'How do you run code review so it actually helps?');
INSERT INTO questions (id, body) VALUES (158, 'How do you manage technical debt in an old codebase?');
INSERT INTO questions (id, body) VALUES (159, 'What is the difference between `placeholderData` and `initialData` in TanStack Query?');
INSERT INTO questions (id, body) VALUES (160, 'How does each one interact with `staleTime`?');
INSERT INTO questions (id, body) VALUES (161, 'What are callbacks, promises, and `async` / `await`?');
INSERT INTO questions (id, body) VALUES (162, 'How does JavaScript work under the hood?');
INSERT INTO questions (id, body) VALUES (163, 'How does inheritance work in JavaScript, and how do you write it in ES5?');
INSERT INTO questions (id, body) VALUES (164, 'Walk through a performance project. How did you find the bottleneck, how did you measure the improvement, and what did you trade away?');
INSERT INTO questions (id, body) VALUES (165, 'How do closures, hoisting, and execution context work?');
INSERT INTO questions (id, body) VALUES (166, 'How do equality and type coercion work?');
INSERT INTO questions (id, body) VALUES (167, 'Explain every CSS `position` value: static, relative, absolute, fixed, sticky.');
INSERT INTO questions (id, body) VALUES (168, 'How do you give flex items different widths?');
INSERT INTO questions (id, body) VALUES (169, 'What are LCP, FID, and CLS?');
INSERT INTO questions (id, body) VALUES (170, 'How does a browser turn HTML and CSS into pixels?');
INSERT INTO questions (id, body) VALUES (171, 'What does frames per second mean in a UI, and why does smooth rendering matter?');
INSERT INTO questions (id, body) VALUES (172, 'Why are `transform` and `opacity` cheaper to animate than properties that cause layout or paint?');
INSERT INTO questions (id, body) VALUES (173, 'Design "send message" in a chat. Cover tagging people, the components, how the client talks to the server, and where state lives.');
INSERT INTO questions (id, body) VALUES (174, 'What is canvas, and when is it faster than drawing with the DOM?');
INSERT INTO questions (id, body) VALUES (175, 'Why use semantic HTML instead of only `div`s?');
INSERT INTO questions (id, body) VALUES (176, 'How do media queries and relative units make a layout work on many screens?');
INSERT INTO questions (id, body) VALUES (177, 'What is the critical rendering path, how is the CSSOM built, and how does the event loop fit in?');
INSERT INTO questions (id, body) VALUES (178, 'What are `forwardRef` and `useImperativeHandle`?');
INSERT INTO questions (id, body) VALUES (179, 'Design the data for a chat app. How do you avoid prop drilling? When is client rendering the right choice?');
INSERT INTO questions (id, body) VALUES (180, 'What resource hints do you use, and how do you make interactions feel faster?');
INSERT INTO questions (id, body) VALUES (181, 'Design a maps app. Cover canvas versus the DOM, map tiles, what you draw at each zoom, debounce and throttle while panning, state for the map, layers, and UI, tile and geocoding and routing and traffic services, web workers, keyboard, touch, screen readers, and errors.');
INSERT INTO questions (id, body) VALUES (182, 'Design WhatsApp on the web. Cover live messages, sync, state, several sessions, and scale.');
INSERT INTO questions (id, body) VALUES (183, 'Tell about a production bug you shipped. What was the cause, and what did you change so it would not happen again?');
INSERT INTO questions (id, body) VALUES (184, 'How do you work with a difficult stakeholder when the pressure is high?');
INSERT INTO questions (id, body) VALUES (185, 'Design Netflix, leaving out video playback. Cover the UI structure, sign-in, performance, and write pseudocode for debounce.');
INSERT INTO questions (id, body) VALUES (186, 'How do you center an element? Cover Flexbox, the box model, and CSS specificity.');
INSERT INTO questions (id, body) VALUES (187, 'Design a multiplayer game. Name features and interactions, then split them into must-have, next, and later.');
INSERT INTO questions (id, body) VALUES (188, 'Talk about a hard project, mentoring someone, and a conflict you handled.');
INSERT INTO questions (id, body) VALUES (189, 'What do the main HTTP status codes mean?');
INSERT INTO questions (id, body) VALUES (190, 'Which data structure do you like most, and why?');
INSERT INTO questions (id, body) VALUES (191, 'How would you scale a project you have already built?');
INSERT INTO questions (id, body) VALUES (192, 'The team wrote 100,000 lines. The client reports a serious bug. Everyone else is on leave. What do you do?');
INSERT INTO questions (id, body) VALUES (193, 'How does a hash map work?');
INSERT INTO questions (id, body) VALUES (194, 'How does a React component''s lifecycle work, and how do you cut extra renders?');
INSERT INTO questions (id, body) VALUES (195, 'Walk through a project you built. When do you render on the client, and when on the server? What do Webpack and React do under the hood, and what trade-offs did you make?');
INSERT INTO questions (id, body) VALUES (196, 'How do you test a feature after you build it, and why do unit tests matter?');
INSERT INTO questions (id, body) VALUES (197, 'What happens when you start promises inside a loop? Cover timing, how you would speed it up, and the edge cases.');
INSERT INTO questions (id, body) VALUES (198, 'How do you build a product from scratch? Cover components, how data moves, patterns, performance, CI/CD, a slow network, and CSS animation that stays smooth.');
INSERT INTO questions (id, body) VALUES (199, 'What would you ask before building an autosuggest box? Split the answers into what it must do and how well it must do it.');
INSERT INTO questions (id, body) VALUES (200, 'Explain the event loop, hoisting, the scope chain, closures, and `var` versus `let` versus `const`.');
INSERT INTO questions (id, body) VALUES (201, 'Prototypes versus classes. How does memory work, and how do async APIs meet the execution flow?');
INSERT INTO questions (id, body) VALUES (202, 'Lifecycle methods versus hooks. How do you memoize, and how do you stop extra renders?');
INSERT INTO questions (id, body) VALUES (203, 'Walk through a project, including a dashboard you made load faster, a fight across teams, a hard refactor, and a call you made under pressure.');
INSERT INTO questions (id, body) VALUES (204, 'Walk through a project. Cover the architecture, where state lives, performance, how it would scale, and what was hard.');
INSERT INTO questions (id, body) VALUES (205, 'Explain the event loop, async work, execution order, promises, and microtasks versus macrotasks.');
INSERT INTO questions (id, body) VALUES (206, 'How does JavaScript run code? Cover the call stack, the callback queue, and the event loop. Why does `Promise.resolve().then(...)` run before `setTimeout(...)`?');
INSERT INTO questions (id, body) VALUES (207, 'What does the browser do when it hits a script tag? What is the difference between `async` and `defer`, and how does each affect painting?');
INSERT INTO questions (id, body) VALUES (208, 'Where do you debounce, and where do you throttle? Cover search, infinite scroll, resize, and cutting API calls.');
INSERT INTO questions (id, body) VALUES (209, 'Which browser APIs are sync, which are async, and what blocks the thread?');
INSERT INTO questions (id, body) VALUES (210, 'What happens after an API call, from the browser''s point of view?');
INSERT INTO questions (id, body) VALUES (211, 'Design a site where admins write and publish articles stored as Markdown, and readers browse, search, and read them. Cover who can do what, how you render Markdown safely, client versus server rendering, whether a CDN helps, how search engines find posts, infinite scroll versus pages, caching, and a rough guess of daily posts, file size, and concurrent readers.');
INSERT INTO questions (id, body) VALUES (212, 'What is the difference between `||` and `??`?');
INSERT INTO questions (id, body) VALUES (213, 'What was your most useful work, what do you do when you are stuck, and what do you want from a new team?');
INSERT INTO questions (id, body) VALUES (214, 'When does React render, where should state live, when do you lift it, and when do you keep it next to the component that uses it? Then walk through a project you built.');
INSERT INTO questions (id, body) VALUES (215, 'What is reconciliation in React?');
INSERT INTO questions (id, body) VALUES (216, 'Why are keys important in React lists?');
INSERT INTO questions (id, body) VALUES (217, 'When should `useEffect` not be used?');
INSERT INTO questions (id, body) VALUES (218, 'When can `useMemo` hurt performance?');
INSERT INTO questions (id, body) VALUES (219, 'Explain `React.memo`.');
INSERT INTO questions (id, body) VALUES (220, 'Explain controlled versus uncontrolled components.');
INSERT INTO questions (id, body) VALUES (221, 'What is prop drilling?');
INSERT INTO questions (id, body) VALUES (222, 'What is server state?');
INSERT INTO questions (id, body) VALUES (223, 'Explain optimistic UI updates.');
INSERT INTO questions (id, body) VALUES (224, 'How would you render 50,000 rows?');
INSERT INTO questions (id, body) VALUES (225, 'What is the difference between debounce and throttle?');
INSERT INTO questions (id, body) VALUES (226, 'What is a closure?');
INSERT INTO questions (id, body) VALUES (227, 'Explain shallow comparison.');
INSERT INTO questions (id, body) VALUES (228, 'Why is immutability important in React?');
INSERT INTO questions (id, body) VALUES (229, 'Explain SSR versus CSR versus SSG.');
INSERT INTO questions (id, body) VALUES (230, 'What are error boundaries?');
INSERT INTO questions (id, body) VALUES (231, 'What is code splitting?');
INSERT INTO questions (id, body) VALUES (232, 'What should not be unit tested?');
INSERT INTO questions (id, body) VALUES (233, 'Why prefer React Testing Library over Enzyme?');
INSERT INTO questions (id, body) VALUES (234, 'How do you test async React components?');
INSERT INTO questions (id, body) VALUES (235, 'How would you design a scalable React application?');
INSERT INTO questions (id, body) VALUES (236, 'How would you structure a live analytics dashboard?');
INSERT INTO questions (id, body) VALUES (237, 'Explain role-based access in a frontend app.');
INSERT INTO questions (id, body) VALUES (238, 'What is normalization in state management?');
INSERT INTO questions (id, body) VALUES (239, 'How do you modernize a legacy frontend?');
INSERT INTO questions (id, body) VALUES (240, 'How do senior frontend engineers think differently?');
INSERT INTO questions (id, body) VALUES (241, 'What happens, step by step, when you open a URL?');
INSERT INTO questions (id, body) VALUES (242, 'Design a patient-monitoring dashboard over websockets. It needs live updates, thousands of devices, low latency, and staying up. Cover reconnects, heartbeats, backpressure, message order, and more servers.');
INSERT INTO questions (id, body) VALUES (243, 'How would you keep a dashboard usable with millions of records?');
INSERT INTO questions (id, body) VALUES (244, 'Walk through a project, then explain the event loop, async work, execution order, and promises.');
INSERT INTO questions (id, body) VALUES (245, 'What is TypeScript, and why do we need it?');
INSERT INTO questions (id, body) VALUES (246, 'What is the difference between `any` and `unknown`?');
INSERT INTO questions (id, body) VALUES (247, 'What are union and intersection types?');
INSERT INTO questions (id, body) VALUES (248, 'What does `never` mean?');
INSERT INTO questions (id, body) VALUES (249, 'What is the difference between optional, required, and `readonly` properties?');
INSERT INTO questions (id, body) VALUES (250, 'When should you let TypeScript infer a type, and when should you write it?');
INSERT INTO questions (id, body) VALUES (251, 'Why use a generic instead of `any`?');
INSERT INTO questions (id, body) VALUES (252, 'What are `keyof` and `typeof`?');
INSERT INTO questions (id, body) VALUES (253, 'Why is TypeScript not runtime safety?');
INSERT INTO questions (id, body) VALUES (254, 'Explain JavaScript fundamentals, ES6, closures, scope, events, and browser APIs.');
INSERT INTO questions (id, body) VALUES (255, 'Explain semantic HTML, accessibility, forms, and HTML habits that hold up.');
INSERT INTO questions (id, body) VALUES (256, 'Explain Flexbox, Grid, positioning, responsive layout, and CSS specificity.');
INSERT INTO questions (id, body) VALUES (257, 'Why do you want this job, and why are you leaving your current one?');
INSERT INTO questions (id, body) VALUES (258, 'When do you use a `Map`, and when a plain object? When do you copy with spread, and when with `Object.assign`?');
INSERT INTO questions (id, body) VALUES (259, 'Walk through a project. Cover the architecture, where state lives, how it would scale, and what you owned. Then components, extra renders, state patterns, React Native rendering, memoization, performance, APIs, and a large UI.');
INSERT INTO questions (id, body) VALUES (260, 'Design a trading app like Zerodha or Groww. Cover a watchlist, stock search, market orders, and live prices. Then websockets, keeping state in sync, cache, rendering, how APIs are called, how components talk, and errors.');
INSERT INTO questions (id, body) VALUES (261, 'Talk about something you owned, a decision you made, and how you work with other people.');
INSERT INTO questions (id, body) VALUES (262, 'Which of the given HTML snippets is styled by `p ~ ul { background-color: red; }`?');
INSERT INTO questions (id, body) VALUES (263, 'A basic Node middleware question about how a request moves, how middleware chains, and who writes the response.');
INSERT INTO questions (id, body) VALUES (264, 'Walk through a recent frontend project. What would you redesign, what was slow, and what would you change today?');
INSERT INTO questions (id, body) VALUES (265, 'Tell about a hard project, a disagreement with a teammate, and a tradeoff you had to make.');
INSERT INTO questions (id, body) VALUES (266, 'How would you handle a production incident, stakeholders who disagree on priority, and technical debt with a tight deadline?');
INSERT INTO questions (id, body) VALUES (267, 'Tell me about your frontend experience.');
INSERT INTO questions (id, body) VALUES (268, 'How big is your team?');
INSERT INTO questions (id, body) VALUES (269, 'Have you ever designed an application from scratch?');
INSERT INTO questions (id, body) VALUES (270, 'What excites you about this role?');
INSERT INTO questions (id, body) VALUES (271, 'What does your AI-assisted workflow look like beyond basic prompting?');
INSERT INTO questions (id, body) VALUES (272, 'How do you keep code quality high when using AI?');
INSERT INTO questions (id, body) VALUES (273, 'How do you test AI-generated code?');
INSERT INTO questions (id, body) VALUES (274, 'How do you keep token spend low when working with AI coding agents?');
INSERT INTO questions (id, body) VALUES (275, 'What makes a good design system?');
INSERT INTO questions (id, body) VALUES (276, 'Explain the CSS box model.');
INSERT INTO questions (id, body) VALUES (277, 'How does CSS specificity work?');
INSERT INTO questions (id, body) VALUES (278, 'What are the core principles of responsive design?');
INSERT INTO questions (id, body) VALUES (279, 'How would you debug a slow React app?');
INSERT INTO questions (id, body) VALUES (280, 'What is the difference between an object and a `Map`?');
INSERT INTO questions (id, body) VALUES (281, 'What is the difference between `Map` and `WeakMap`, and how does garbage collection fit in?');
INSERT INTO questions (id, body) VALUES (282, 'How would you scale a frontend application from 1,000 to 100,000 daily users?');
INSERT INTO questions (id, body) VALUES (283, 'What protocol would you use to integrate an LLM-powered chatbot into a frontend application?');
INSERT INTO questions (id, body) VALUES (284, 'How can you create a deep copy of an object in JavaScript?

- `Object.create(obj)`
- `JSON.parse(JSON.stringify(obj))`
- `Array.from(obj)`
- `Object.assign({}, obj)`');
INSERT INTO questions (id, body) VALUES (285, 'Which `Array.prototype` methods return a new array every time?

- `map`, `filter`, `slice`
- `map`, `filter`, `sort`, `slice`, `splice`
- `map`, `filter`, `sort`
- `map`, `filter`, `sort`, `slice`');
INSERT INTO questions (id, body) VALUES (286, 'How would you detect a cycle in a directed graph? The approach is enough.');
INSERT INTO questions (id, body) VALUES (287, 'Design a digital wallet. Cover creating a wallet, the balance, transfers, history, payment processing, and failures. Then architecture, how services talk, the database, the API, scale, security, idempotency, cache, and an audit log.');
INSERT INTO questions (id, body) VALUES (288, 'Explain the virtual DOM, reconciliation, the render lifecycle, Fiber, memoization, Suspense, code splitting, and lazy loading. Say why React works that way.');
INSERT INTO questions (id, body) VALUES (289, 'Talk about a large project, something you owned, mentoring, a disagreement, a technical decision, working across teams, and a process you improved.');
INSERT INTO questions (id, body) VALUES (290, 'How would you center a div without using `display`?');
INSERT INTO questions (id, body) VALUES (291, 'What is the difference between `forEach`, `map`, `filter`, and `reduce`?');
INSERT INTO questions (id, body) VALUES (292, 'Which React hooks have you used?');
INSERT INTO questions (id, body) VALUES (293, 'When do you use `useCallback`, and when `useMemo`?');
INSERT INTO questions (id, body) VALUES (294, 'Why and when do you write a custom hook?');
INSERT INTO questions (id, body) VALUES (295, 'What is the difference between `setState` and `useState`?');
INSERT INTO questions (id, body) VALUES (296, 'A custom hook has two `useEffect`s, one with `[]` and one with dependencies. When does each run if the component re-renders?');
INSERT INTO questions (id, body) VALUES (297, 'How do you pass data from a child to its parent?');
INSERT INTO questions (id, body) VALUES (298, 'How was that done before `forwardRef`?');
INSERT INTO questions (id, body) VALUES (299, 'What are the ways to pass data between components?');
INSERT INTO questions (id, body) VALUES (300, 'What are hydration issues in React, and how do you fix them?');
INSERT INTO questions (id, body) VALUES (301, 'Explain dynamic routing in Next.js.');
INSERT INTO questions (id, body) VALUES (302, 'Explain Redux architecture and the data flow.');
INSERT INTO questions (id, body) VALUES (303, 'Which hooks come with Redux, and how do you read state in a component?');
INSERT INTO questions (id, body) VALUES (304, 'Can you have more than one reducer, and can one component read from several of them?');
INSERT INTO questions (id, body) VALUES (305, 'What are Redux middlewares, and which ones have you used?');
INSERT INTO questions (id, body) VALUES (306, 'Why do we use Webpack or Vite, and when is one better than the other?');
INSERT INTO questions (id, body) VALUES (307, 'What are Core Web Vitals, and how do you measure them?');
INSERT INTO questions (id, body) VALUES (308, 'Which library do you use for React unit tests, and why? How would you test a button click with React Testing Library and Jest?');
INSERT INTO questions (id, body) VALUES (309, 'Walk through a project. Design a component library other teams can extend. Cover the folders, how it scales, reuse, accessibility, state, and the component API.');
INSERT INTO questions (id, body) VALUES (310, 'How do you use AI while coding, where do you stop trusting it, and how do you check what it wrote?');
INSERT INTO questions (id, body) VALUES (311, 'Walk through a project. Cover the architecture, performance, state, a hard part, scale, and working with other teams.');
INSERT INTO questions (id, body) VALUES (312, 'What is memoization? When do you use `useMemo`, and how is it different from `useCallback`? `React.lazy` versus a dynamic import, why lazy-load, and how you split code.');
INSERT INTO questions (id, body) VALUES (313, 'Where do you use Singleton, Factory, Observer, and Module?');
INSERT INTO questions (id, body) VALUES (314, 'Explain hooks, `useEffect`, custom hooks, the component lifecycle, state updates, and controlled versus uncontrolled components.');
INSERT INTO questions (id, body) VALUES (315, 'Explain closures, hoisting, scope, the execution context, the event loop, async JavaScript, and promise chaining.');
INSERT INTO questions (id, body) VALUES (316, 'Which of these pseudo-element rules are invalid?

- `p::first-line { ... }`
- `h1::first-letter { ... }`
- `span::last-line { ... }`
- `.header::after::first-line { ... }`');
INSERT INTO questions (id, body) VALUES (317, 'Which of these are valid CSS transforms?

- `matrix()`
- `modify()`
- `skip()`
- `rotate()`');
INSERT INTO questions (id, body) VALUES (318, 'Which of these arrived with HTML5?

- Drag and drop
- 2D drawing on a web page
- Timed media playback
- New elements such as `<section>`, `<article>`, and `<footer>`');
INSERT INTO questions (id, body) VALUES (319, 'Design a financial dashboard. Live transaction volume refreshes every 5 seconds. A chart shows daily revenue for 30 days and does not need to be live. An error-rate gauge is pushed over a websocket. The first paint should not wait on heavy resources.');
INSERT INTO questions (id, body) VALUES (320, 'How would you notify the user, without a refresh, when money arrives, a loan offer appears, or another alert fires?');
INSERT INTO questions (id, body) VALUES (321, 'The app has more than 200 hardcoded Tailwind values and the styles do not match. How would you replace them with design tokens?');
INSERT INTO questions (id, body) VALUES (322, 'Walk through a project. Compare client rendering, server rendering, and streaming. How do you animate and style an accordion? How do you speed a page up, and how did you measure it?');
INSERT INTO questions (id, body) VALUES (323, 'Walk through a past project and a decision you made.');
INSERT INTO questions (id, body) VALUES (324, 'When would you pick React, and when Next.js?');
INSERT INTO questions (id, body) VALUES (325, 'What is the difference between `forEach` and `map`, and which do you use on a large list?');
INSERT INTO questions (id, body) VALUES (326, 'Walk through a project. What did you build, what was hard, what did you speed up, and what did you decide?');
INSERT INTO questions (id, body) VALUES (327, 'How do you measure frontend performance? Which Core Web Vitals have you improved? How do you work with design? Tell about a change that made the product better.');
INSERT INTO questions (id, body) VALUES (328, 'Talk about mentoring, something you owned, a conflict, planning a project, a hard technical decision, and where you want to go.');
INSERT INTO questions (id, body) VALUES (329, 'Walk through a project. Why this role, and not a general software role?');
INSERT INTO questions (id, body) VALUES (330, 'Your homepage’s LCP jumped from 2.1s to 4.8s after a release. How do you investigate? What if the frontend did not change? How do you tell if the backend is the cause?');
INSERT INTO questions (id, body) VALUES (331, 'Chrome shows multiple forced reflows. How do you debug and fix them? Which APIs force layout? Why doesn’t React do this for you?');
INSERT INTO questions (id, body) VALUES (332, 'A React dashboard with 100,000 rows gets slow after live updates. What do you optimize first? Why isn’t pagination enough? When would virtualization not help?');
INSERT INTO questions (id, body) VALUES (333, 'Animations drop frames on low-end Android phones. How do you investigate?');
INSERT INTO questions (id, body) VALUES (334, 'Scrolling feels laggy only on long pages. How do you debug it?');
INSERT INTO questions (id, body) VALUES (335, 'The page loads quickly, but nothing is clickable for 4 seconds. How do you investigate?');
INSERT INTO questions (id, body) VALUES (336, 'Lighthouse is excellent locally and Core Web Vitals are poor in production. Why?');
INSERT INTO questions (id, body) VALUES (337, 'A third-party analytics script made the page sluggish. What do you do?');
INSERT INTO questions (id, body) VALUES (338, 'A React page re-renders often, but the DOM barely changes. Why is it still slow?');
INSERT INTO questions (id, body) VALUES (339, 'How do you tell whether a slowdown is JavaScript or browser rendering?');
INSERT INTO questions (id, body) VALUES (340, 'Infinite scroll gets slower after every page. Why?');
INSERT INTO questions (id, body) VALUES (341, 'A modal opens with a noticeable delay. How do you speed it up?');
INSERT INTO questions (id, body) VALUES (342, 'A page has 10,000 DOM nodes. What problems can that cause?');
INSERT INTO questions (id, body) VALUES (343, 'Scrolling gets slow after several dropdowns have been opened. How do you debug it?');
INSERT INTO questions (id, body) VALUES (344, 'A page is fine on desktop and slow on mobile. What do you look at?');
INSERT INTO questions (id, body) VALUES (345, 'How do you reduce layout shift in production?');
INSERT INTO questions (id, body) VALUES (346, 'Your CSS file is 2 MB. How do you shrink it?');
INSERT INTO questions (id, body) VALUES (347, 'How do you optimize a page with many expensive shadows and blurs?');
INSERT INTO questions (id, body) VALUES (348, 'The browser spends more time in “Recalculate Style” than in “Layout.” What does that mean?');
INSERT INTO questions (id, body) VALUES (349, 'How do you know an optimization actually helped?');
INSERT INTO questions (id, body) VALUES (350, 'When would you use `will-change`?');
INSERT INTO questions (id, body) VALUES (351, 'Why measure before you optimize?');
INSERT INTO questions (id, body) VALUES (352, 'A dashboard freezes whenever the filters change. How do you investigate?');
INSERT INTO questions (id, body) VALUES (353, 'How would you explain browser rendering to a junior developer?');
INSERT INTO questions (id, body) VALUES (354, 'What is the biggest mistake frontend engineers make when optimizing rendering?');
INSERT INTO questions (id, body) VALUES (355, 'Offscreen sections on a heavy dashboard should stop costing layout and paint until the user scrolls to them. How do you use `content-visibility`, and what do you trade? Is it the same as `display: none`?');
INSERT INTO questions (id, body) VALUES (356, 'Why is animating `width` or `top` slower than animating `transform`? Which CSS properties trigger layout? Which ones are GPU-accelerated?');
INSERT INTO questions (id, body) VALUES (357, 'What is the difference between reflow and repaint? Can a reflow trigger a repaint? Can a repaint happen without a reflow?');
INSERT INTO questions (id, body) VALUES (358, 'Scrolling is janky, and DevTools shows repeated “Recalculate Style” and “Layout.” How do you debug and fix it? What is layout thrashing? What is a long task? How do you cut main-thread work?');
INSERT INTO questions (id, body) VALUES (359, 'Walk through a project, a decision, a production bug, and a time you were under pressure. How do you use AI, and how do you check what it wrote?');
INSERT INTO questions (id, body) VALUES (360, 'What is scope?');
INSERT INTO questions (id, body) VALUES (361, 'What is the call stack?');
INSERT INTO questions (id, body) VALUES (362, 'What is a callback?');
INSERT INTO questions (id, body) VALUES (363, 'What is a promise?');
INSERT INTO questions (id, body) VALUES (364, 'What is `async`/`await`?');
INSERT INTO questions (id, body) VALUES (365, 'What are object methods?');
INSERT INTO questions (id, body) VALUES (366, 'What is a prototype?');
INSERT INTO questions (id, body) VALUES (367, 'What is `this`?');
INSERT INTO questions (id, body) VALUES (368, 'What does `bind` do?');
INSERT INTO questions (id, body) VALUES (369, 'What does `call` do?');
INSERT INTO questions (id, body) VALUES (370, 'What does `apply` do?');
INSERT INTO questions (id, body) VALUES (371, 'What is a constructor function?');
INSERT INTO questions (id, body) VALUES (372, 'What are ES6 classes?');
INSERT INTO questions (id, body) VALUES (373, 'What is inheritance?');
INSERT INTO questions (id, body) VALUES (374, 'What is `map`?');
INSERT INTO questions (id, body) VALUES (375, 'What is `filter`?');
INSERT INTO questions (id, body) VALUES (376, 'What is `reduce`?');
INSERT INTO questions (id, body) VALUES (377, 'What is `forEach`?');
INSERT INTO questions (id, body) VALUES (378, 'What are `some` and `every`?');
INSERT INTO questions (id, body) VALUES (379, 'What is `find`?');
INSERT INTO questions (id, body) VALUES (380, 'What is `findIndex`?');
INSERT INTO questions (id, body) VALUES (381, 'What is `splice`?');
INSERT INTO questions (id, body) VALUES (382, 'What is `slice`?');
INSERT INTO questions (id, body) VALUES (383, 'What is debouncing?');
INSERT INTO questions (id, body) VALUES (384, 'What is throttling?');
INSERT INTO questions (id, body) VALUES (385, 'What is currying?');
INSERT INTO questions (id, body) VALUES (386, 'What is memoization?');
INSERT INTO questions (id, body) VALUES (387, 'What is the difference between a deep copy and a shallow copy?');
INSERT INTO questions (id, body) VALUES (388, 'What is the spread operator?');
INSERT INTO questions (id, body) VALUES (389, 'What is the rest operator?');
INSERT INTO questions (id, body) VALUES (390, 'What is destructuring?');
INSERT INTO questions (id, body) VALUES (391, 'What is optional chaining?');
INSERT INTO questions (id, body) VALUES (392, 'What is the DOM?');
INSERT INTO questions (id, body) VALUES (393, 'What is the BOM?');
INSERT INTO questions (id, body) VALUES (394, 'What is event bubbling?');
INSERT INTO questions (id, body) VALUES (395, 'What is event capturing?');
INSERT INTO questions (id, body) VALUES (396, 'What is `localStorage`?');
INSERT INTO questions (id, body) VALUES (397, 'What is `sessionStorage`?');
INSERT INTO questions (id, body) VALUES (398, 'What are cookies?');
INSERT INTO questions (id, body) VALUES (399, 'What is the Fetch API?');
INSERT INTO questions (id, body) VALUES (400, 'What is Axios?');
INSERT INTO questions (id, body) VALUES (401, 'What are template literals?');
INSERT INTO questions (id, body) VALUES (402, 'What are modules?');
INSERT INTO questions (id, body) VALUES (403, 'What is a `Set`?');
INSERT INTO questions (id, body) VALUES (404, 'What is a `Map`?');
INSERT INTO questions (id, body) VALUES (405, 'What is the difference between `Promise.all` and `Promise.allSettled`?');
INSERT INTO questions (id, body) VALUES (406, 'What are generators?');
INSERT INTO questions (id, body) VALUES (407, 'What is the difference between `null` and `undefined`?');
INSERT INTO questions (id, body) VALUES (408, 'What is `NaN`?');
INSERT INTO questions (id, body) VALUES (409, 'What is type coercion?');
INSERT INTO questions (id, body) VALUES (410, 'What is a memory leak?');
INSERT INTO questions (id, body) VALUES (411, 'Walk through a project. How does a feature move from the requirement to monitoring? How do you find a production bug? How have you improved Core Web Vitals, splitting, lazy loading, the bundle, images, cache, memoization, virtualization, extra renders, and the network?');
INSERT INTO questions (id, body) VALUES (412, 'A disagreement, a production incident, a hard decision, working with product and design, something you owned, mentoring, a tight deadline, and a mistake you learned from.');
INSERT INTO questions (id, body) VALUES (413, 'When would you use Context and `useReducer`, and when Redux or Zustand?');
INSERT INTO questions (id, body) VALUES (414, 'When would you use CSS-in-JS, and when Tailwind?');
INSERT INTO questions (id, body) VALUES (415, 'Design a real-time monitoring dashboard.');
INSERT INTO questions (id, body) VALUES (416, 'How would you reduce time to interactive?');
INSERT INTO questions (id, body) VALUES (417, 'How do you prevent XSS and CSRF?');
INSERT INTO questions (id, body) VALUES (418, 'For a product catalog, which is better, server rendering or incremental static regeneration?');
INSERT INTO questions (id, body) VALUES (419, 'Tell me about a time you defended a technology decision.');
INSERT INTO questions (id, body) VALUES (420, 'How do you keep code quality high?');
INSERT INTO questions (id, body) VALUES (421, 'The backend APIs are late. What do you do?');
INSERT INTO questions (id, body) VALUES (422, 'Tell me about mentoring a junior developer.');
INSERT INTO questions (id, body) VALUES (423, 'Design a stock trading app like Upstox. Show many stocks, live prices, search, portfolio gain and loss, buy and sell, and manage the portfolio. Cover the API shapes, client versus server versus hybrid rendering, polling versus WebSockets versus server-sent events, virtualization, state, cache, pagination, splitting, lazy loading, extra renders, and staying responsive under many users and a live market.');
INSERT INTO questions (id, body) VALUES (424, 'Walk through previous projects, your role, and a normal day. How does your SDLC and a sprint work? How do code review and merge work? What do you look for in someone else''s pull request? Design principles such as SOLID. A few questions on CI/CD.');
INSERT INTO questions (id, body) VALUES (425, 'How do `Promise.all`, `Promise.race`, `Promise.allSettled`, and `Promise.any` differ?');
INSERT INTO questions (id, body) VALUES (426, 'What is the difference between an arrow function and a regular function for `this`, `arguments`, and `new`?');
INSERT INTO questions (id, body) VALUES (427, 'What is the difference between currying and partial application?');
INSERT INTO questions (id, body) VALUES (428, 'What is a polyfill?');
INSERT INTO questions (id, body) VALUES (429, 'How do you turn an object into an array? Cover keys, values, and entries.');
INSERT INTO questions (id, body) VALUES (430, 'What is the difference between `for...in` and `for...of`?');
INSERT INTO questions (id, body) VALUES (431, 'What does strict mode change in JavaScript?');
INSERT INTO questions (id, body) VALUES (432, 'What is the difference between `useState` and `useRef`?');
INSERT INTO questions (id, body) VALUES (433, 'What is the difference between `type` and `interface` in TypeScript?');
INSERT INTO questions (id, body) VALUES (434, 'What is type narrowing in TypeScript?');
INSERT INTO questions (id, body) VALUES (435, 'How does `useReportWebVitals` work in Next.js?');
INSERT INTO questions (id, body) VALUES (436, 'When would you use Lighthouse, Chrome DevTools, and WebPageTest to measure performance?');
INSERT INTO questions (id, body) VALUES (437, 'What is tree shaking?');
INSERT INTO questions (id, body) VALUES (438, 'How do you optimize images on the web?');
INSERT INTO questions (id, body) VALUES (439, 'Explain `flex-grow`, `flex-shrink`, and `flex-basis`.');
INSERT INTO questions (id, body) VALUES (440, 'What is the difference between `px`, `rem`, and `em`?');
INSERT INTO questions (id, body) VALUES (441, 'What is the difference between CSS and Sass/SCSS?');
INSERT INTO questions (id, body) VALUES (442, 'What is a monorepo? What are the benefits and the problems?');
INSERT INTO questions (id, body) VALUES (443, 'What is the difference between a Web Worker and a Service Worker?');
INSERT INTO questions (id, body) VALUES (444, 'What is CORS, and how is it different from CSRF?');
INSERT INTO questions (id, body) VALUES (445, 'How have you optimized performance in a Next.js app?');
INSERT INTO questions (id, body) VALUES (446, 'How do you split tests among unit, integration, and end-to-end?');
INSERT INTO questions (id, body) VALUES (447, 'How do you estimate a task and break a feature into work?');
INSERT INTO questions (id, body) VALUES (448, 'Consider the following JavaScript code and determine what the output will be, with an explanation.

```js
function Foo() {
  this.value = 42;
}

Foo.prototype.getValue = function () {
  return this.value;
};

const obj1 = new Foo();
const obj2 = {
  value: 24,
  getValue: obj1.getValue,
};

console.log(obj1.getValue()); // A
console.log(obj2.getValue()); // B

setTimeout(function () {
  console.log(obj1.getValue()); // C
  obj2.value = 100;
  console.log(obj2.getValue()); // D
}, 0);

Promise.resolve().then(() => {
  obj1.value = 84;
  console.log(obj1.getValue()); // E
});

console.log(obj1.getValue()); // F
```

What will be printed at lines A, B, C, D, E, and F?');
INSERT INTO questions (id, body) VALUES (449, 'Explain how each output is determined, considering JavaScript’s event loop and `this` binding.');
INSERT INTO questions (id, body) VALUES (450, 'What will be the output of this code, and why?

```js
function mysteryFunction(a) {
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result += (a[i] % 2 === 0) ? a[i] : 0;
  }
  return result;
}

console.log(mysteryFunction([1, 2, 3, 4, 5]));
```');
INSERT INTO questions (id, body) VALUES (451, 'You are given two input boxes, First Name and Last Name, and a Submit button. If the user leaves First Name or Last Name empty and clicks Submit, show “Invalid Input” under that input. The message and the input border should be red. If the inputs are valid, append the name to a list. If the user already exists, show “User already exists” in red.');
INSERT INTO questions (id, body) VALUES (452, 'Given products and special offers, build a page that lists Black Friday products in decreasing order by total product count, showing each product’s title and price. Expected order: Boots $11, T-Shirt $35, Chess Board $19, 1984 $22.

```js
async function displayBlackFridayProducts() {
  const { products, offers } = await getProductsAndDeals();
}

displayBlackFridayProducts();

function getProductsAndDeals() {
  return new Promise((resolve, reject) => {
    resolve({
      products: [
        { id: "product_1", title: "Baker", category: "kitchen", price: 12, discount: 0, count: { warehouse: 2, store: 3, reserve: 5 } },
        { id: "product_2", title: "1984", category: "books", discount: 22, price: 22, count: { warehouse: 2 } },
        { id: "product_3", title: "T-Shirt", category: "clothing", discount: 5, price: 35, count: { store: 3, reserve: 5 } },
        { id: "product_4", title: "Boots", category: "clothing", discount: 34, price: 11, count: { warehouse: 6, store: 1, reserve: 3 } },
        { id: "product_5", title: "Chess Board", category: "games", discount: 0, price: 19, count: { warehouse: 2, store: 3 } },
        { id: "product_6", title: "Fifa 2023", category: "games", price: 64, discount: 12, count: { warehouse: 2, store: 3, reserve: 5 } },
        { id: "product_7", title: "God of War", category: "games", discount: 22, price: 44, count: { warehouse: 2, store: 3, reserve: 5 } },
      ],
      offers: [
        { id: "offer_1", title: "Black Friday Deals", code: "BF_2023", product: "product_5" },
        { id: "offer_2", title: "Black Friday Deals", code: "BF_2023", product: "product_2" },
        { id: "offer_3", title: "Black Friday Deals", code: "BF_2023", product: "product_4" },
        { id: "offer_4", title: "Christmas Deals", code: "CH_2023", product: "product_1" },
        { id: "offer_5", title: "Black Friday Deals", code: "BF_2023", product: "product_3" },
        { id: "offer_6", title: "Black Friday Deals", code: "BF_2023", product: "product_5" },
        { id: "offer_7", title: "Cyber Monday Deals", code: "CM_2023", product: "product_7" },
        { id: "offer_8", title: "Cyber Monday Deals", code: "CM_2023", product: "product_5" },
      ],
    });
  });
}
```');
INSERT INTO questions (id, body) VALUES (453, 'Design an accordion collapse component using plain JavaScript.');
INSERT INTO questions (id, body) VALUES (454, 'Design a data table component with search. Requirements: add rows dynamically; store rows in local storage and restore them on refresh; debounce the search phrase; filter rows when the phrase matches any column.');
INSERT INTO questions (id, body) VALUES (455, 'Design a file-system UI on the web (any framework). Use a recursive component, props, events, and parent-child data flow.');
INSERT INTO questions (id, body) VALUES (456, 'Build a responsive layout with CSS Grid and Flexbox that adapts across screen sizes.');
INSERT INTO questions (id, body) VALUES (457, 'Build a dynamic React form whose fields change based on user input (a dropdown that reveals related fields).');
INSERT INTO questions (id, body) VALUES (458, 'How would you fetch and display data asynchronously with Axios in React, including loading states, errors, parallel requests, and retries after network failures?');
INSERT INTO questions (id, body) VALUES (459, 'Write code for an HTTP interceptor and for auth guards.');
INSERT INTO questions (id, body) VALUES (460, 'Write a function that checks whether a string is a palindrome, ignoring characters that are not letters or digits.');
INSERT INTO questions (id, body) VALUES (461, 'Given an array of integers, find every pair that sums to a target.');
INSERT INTO questions (id, body) VALUES (462, 'What does this print?

```js
let str = "medium";
str[0] = "k";
console.log(str);
```');
INSERT INTO questions (id, body) VALUES (463, 'What does this print?

```js
console.log(0.1 + 0.2 == 0.3);
```');
INSERT INTO questions (id, body) VALUES (464, 'What does this print?

```js
(function () {
  var x = y = 3;
})();

console.log(typeof x !== "undefined");
console.log(typeof y !== "undefined");
```');
INSERT INTO questions (id, body) VALUES (465, 'What does this print?

```js
let arr = [1, 2, 3];
arr[10] = 99;
console.log(arr.length);
console.log(arr);
```');
INSERT INTO questions (id, body) VALUES (466, 'What does this print?

```js
const a = {};
const b = { key: "b" };
const c = { key: "c" };
a[b] = 123;
a[c] = 456;
console.log(a[b]);
```');
INSERT INTO questions (id, body) VALUES (467, 'What does this print? How would you change the loop so it prints 0 through 4?

```js
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), i * 1000);
}
```');
INSERT INTO questions (id, body) VALUES (468, 'Add the numbers in an array without loops and without array methods.');
INSERT INTO questions (id, body) VALUES (469, 'What does this print?

```js
var foo = function bar() {
  return 1;
};

console.log(typeof bar);
```');
INSERT INTO questions (id, body) VALUES (470, 'What does this print?

```js
let x = 10;
let y = (x++, x + 1);
console.log(y);
```');
INSERT INTO questions (id, body) VALUES (471, 'What does this print?

```js
console.log(1 < 2 < 3);
console.log(3 > 2 > 1);
```');
INSERT INTO questions (id, body) VALUES (472, 'What does this print?

```js
const a = [1, 2, 3];
const b = [1, 2, 3];
const c = "1,2,3";

console.log(a == c);
console.log(b == c);
console.log(a == b);
```');
INSERT INTO questions (id, body) VALUES (473, 'Remove every number that appears more than once. `[1, 2, 3, 3, 4, 4, 5]` should become `[1, 2, 5]`.');
INSERT INTO questions (id, body) VALUES (474, 'Write a function that counts how many times each character appears in a string.');
INSERT INTO questions (id, body) VALUES (475, 'Build a searchable dropdown in React that fetches and filters API results as the user types. Also debounce the search, and handle an empty result list and API errors.');
INSERT INTO questions (id, body) VALUES (476, 'Find the union and the intersection of two sorted arrays. Example: `[1, 3, 4, 6, 7]` and `[2, 3, 4, 5]`.');
INSERT INTO questions (id, body) VALUES (477, 'Given votes such as `[''a'', ''a'', ''b'', ''b'', ''a'', ''b'', ''c'']`, return the candidate with the most votes. If there is a tie, the one who appears first wins.');
INSERT INTO questions (id, body) VALUES (478, 'What does this print?

```js
let obj1 = {};
let obj2 = {};
console.log(obj1 == obj2);
console.log(obj1 === obj2);
```');
INSERT INTO questions (id, body) VALUES (479, 'What does this print?

```js
console.log("a");

setTimeout(() => {
  console.log("b");
}, 0);

const promise = new Promise((resolve) => {
  console.log("e");
  resolve("c");
});

promise.then((result) => {
  console.log(result);
});

console.log("d");
```');
INSERT INTO questions (id, body) VALUES (480, 'Fetch data from an API and handle a null or empty response, a loading state, and errors.');
INSERT INTO questions (id, body) VALUES (481, 'Build a simple restaurant listing: infinite scroll, cuisine and rating filters, a responsive layout, and unit tests.');
INSERT INTO questions (id, body) VALUES (482, 'Find the nth largest number in an array.');
INSERT INTO questions (id, body) VALUES (483, 'What does this print?

```js
console.log(a);
var a = 10;
```');
INSERT INTO questions (id, body) VALUES (484, 'What does this print?

```js
console.log(b);
let b = 10;
```');
INSERT INTO questions (id, body) VALUES (485, 'What does this print?

```js
foo();
function foo() {
  console.log("Hello");
}
```');
INSERT INTO questions (id, body) VALUES (486, 'What does this print?

```js
bar();
var bar = function () {
  console.log("Hi");
};
```');
INSERT INTO questions (id, body) VALUES (487, 'What does each call return?

```js
const obj = {
  name: "JS",
  regular: function () {
    return this.name;
  },
  arrow: () => {
    return this.name;
  },
};

console.log(obj.regular());
console.log(obj.arrow());
```');
INSERT INTO questions (id, body) VALUES (488, 'What does this print?

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
```');
INSERT INTO questions (id, body) VALUES (489, 'What does `typeof null` print?');
INSERT INTO questions (id, body) VALUES (490, 'What does this print?

```js
console.log(0 == "0");
console.log(0 === "0");
```');
INSERT INTO questions (id, body) VALUES (491, 'What does this print?

```js
const a = {};
const b = {};
a[b] = "hello";
console.log(a[b]);
```');
INSERT INTO questions (id, body) VALUES (492, 'What does this print?

```js
console.log([] + []);
console.log([] + {});
console.log({} + []);
```');
INSERT INTO questions (id, body) VALUES (493, 'What does this print, and in what order?

```js
console.log("start");
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
console.log("end");
```');
INSERT INTO questions (id, body) VALUES (494, 'What does this print?

```js
let x = 5;
function test() {
  let x = 10;
  console.log(x);
}
test();
console.log(x);
```');
INSERT INTO questions (id, body) VALUES (495, 'What does this print?

```js
let obj1 = { name: "A" };
let obj2 = obj1;
obj2.name = "B";
console.log(obj1.name);
```');
INSERT INTO questions (id, body) VALUES (496, 'What do the two calls print?

```js
function outer() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}

const counter = outer();
counter();
counter();
```');
INSERT INTO questions (id, body) VALUES (497, 'What does this print?

```js
(function () {
  var x = (y = 5);
})();

console.log(typeof x);
console.log(typeof y);
```');
INSERT INTO questions (id, body) VALUES (498, 'What does this print?

```js
function foo(a, b) {
  arguments[0] = 99;
  console.log(a);
}

foo(1, 2);
```');
INSERT INTO questions (id, body) VALUES (499, 'What does this print?

```js
const [a = 1, b = 2] = [undefined, null];
console.log(a, b);
```');
INSERT INTO questions (id, body) VALUES (500, 'What does this print?

```js
const arr = [1, , 3];
console.log(arr.length);
console.log(arr[1]);
```');
INSERT INTO questions (id, body) VALUES (501, 'What does this print?

```js
const person = {
  name: "Alice",
  greet: function () {
    setTimeout(function () {
      console.log(this.name);
    }, 1000);
  },
};

person.greet();
```');
INSERT INTO questions (id, body) VALUES (502, 'What does this print?

```js
const obj = Object.freeze({ name: "Test" });
obj.name = "Changed";
console.log(obj.name);
```');
INSERT INTO questions (id, body) VALUES (503, 'What does this print?

```js
const { a, b } = { b: 1, a: 2 };
console.log(a, b);
```');
INSERT INTO questions (id, body) VALUES (504, 'What does this print?

```js
const arr = [1, 2, 3];
const copy = [...arr];
copy[0] = 9;
console.log(arr[0]);
```');
INSERT INTO questions (id, body) VALUES (505, 'What does `NaN === NaN` print?');
INSERT INTO questions (id, body) VALUES (506, 'What does `typeof function () {}` print?');
INSERT INTO questions (id, body) VALUES (507, 'Write `fetchKeys`. It walks a nested object or array and returns every path that points at a primitive.

`{ a: { b: { c: 1 }, d: 2 }, e: 3 }` → `["a.b.c", "a.d", "e"]`

`[1, { a: 2, b: [3, 4] }, 5]` → `["0", "1.a", "1.b.0", "1.b.1", "2"]`');
INSERT INTO questions (id, body) VALUES (508, 'Write `processDomainOperation(operations)`. Each row is an operation with up to three strings: the op, a domain, and an IP.

- `PUT` stores a domain and its IP.
- `GET` returns that IP, or `"404"` if the domain is missing.
- `COUNT` counts domains that equal the query or end with `"." + query`.

Sample input:

```js
[
  ["PUT", "www.apple.com", "10.20.30.40"],
  ["PUT", "jobs.apple.com", "10.20.30.50"],
  ["PUT", "sites.google.com", "142.258.145.693"],
  ["GET", "sample.com"],
  ["GET", "www.apple.com"],
  ["COUNT", "apple.com"],
  ["COUNT", "com"],
]
```

Expected output: `["404", "10.20.30.40", "2", "3"]`');
INSERT INTO questions (id, body) VALUES (509, 'What does this print?

```js
const p = new Promise((resolve) => {
  console.log("1");
  setTimeout(() => {
    resolve();
  });
});

Promise.resolve().then(() => console.log("2"));
setTimeout(() => console.log("3"));
p.then(() => console.log("4"));
setTimeout(() => console.log("5"));
```');
INSERT INTO questions (id, body) VALUES (510, 'What do the two logs show?

```js
let person1 = {
  name: "Anil Kumar",
  address: { line1: "Patna", line2: "Bihar" },
};

let person2 = { ...person1 };
person1.name = "Ravi Kumar";
person1.address.line1 = "Hyderabad";

console.log(person1);
console.log(person2);
```');
INSERT INTO questions (id, body) VALUES (511, 'What does this print?

```js
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};

console.log(shape.diameter());
console.log(shape.perimeter());
```');
INSERT INTO questions (id, body) VALUES (512, 'Starting from `{ foo: [1], switch: false }`, what is the state after these dispatches? The reducer cases are written `"SET FOO"` and `"PUSH FOO"` (with a space).

```js
dispatch({ type: "SET_FOO", foo: [1, 2] });
dispatch({ type: "PUSH_FOO", foo: 3 });
dispatch({ type: "PUSH_FOO", foo: 6 });
```

`SET FOO` replaces `foo` and sets `switch` to `true`. `PUSH FOO` appends to `foo` and flips `switch`.');
INSERT INTO questions (id, body) VALUES (513, 'In a function component, load data from the network when the component mounts and show it. You can ignore the case where the component unmounts before the request finishes. How do you do that with hooks?');
INSERT INTO questions (id, body) VALUES (514, 'How do you implement debounce and throttle?');
INSERT INTO questions (id, body) VALUES (515, 'How do you design a table that sorts, filters, and paginates?');
INSERT INTO questions (id, body) VALUES (516, 'Reverse a string without a built-in reverse.');
INSERT INTO questions (id, body) VALUES (517, 'How do you remove duplicates from an array?');
INSERT INTO questions (id, body) VALUES (518, 'Find the first character in a string that appears once.');
INSERT INTO questions (id, body) VALUES (519, 'Implement throttle.');
INSERT INTO questions (id, body) VALUES (520, 'Merge two sorted arrays.');
INSERT INTO questions (id, body) VALUES (521, 'How would you implement infinite scroll?');
INSERT INTO questions (id, body) VALUES (522, 'How would you write a custom hook that fetches data?');
INSERT INTO questions (id, body) VALUES (523, 'Write a function that returns `{ a: 1 }`.');
INSERT INTO questions (id, body) VALUES (524, 'Rewrite it as an arrow function.');
INSERT INTO questions (id, body) VALUES (525, 'An arrow function that only returns a value can drop `return` and the braces, as in `() => 2`. Do the same for an object `{ a: 1 }`. What does this return, and why?

```js
const getObject = () => { a: 1 };
getObject();
```');
INSERT INTO questions (id, body) VALUES (526, 'If those braces are a block, why is `a: 1` inside it not a syntax error?');
INSERT INTO questions (id, body) VALUES (527, 'What does this print, and in what order?

```js
console.log("A");

setTimeout(() => {
  console.log("B");
  Promise.resolve().then(() => console.log("C"));
}, 0);

Promise.resolve().then(() => {
  console.log("D");
  setTimeout(() => console.log("E"), 0);
});

console.log("F");
```');
INSERT INTO questions (id, body) VALUES (528, 'Build a generic Angular list that fetches data and paginates.');
INSERT INTO questions (id, body) VALUES (529, 'Next week the user list needs infinite scroll, and another list still needs pages. What breaks if both inherit the same base class?');
INSERT INTO questions (id, body) VALUES (530, 'What if one list should not have a loading state?');
INSERT INTO questions (id, body) VALUES (531, 'In React for the web, what happens if you pass an array to `style`?

```jsx
const styles = {
  container: { backgroundColor: "blue" },
  text: { color: "white" },
};

function Box() {
  return (
    <div style={[styles.container, styles.text]}>Hello World</div>
  );
}
```

- React merges the objects, like React Native.
- React throws or ignores the styles, because `style` wants one object.
- This only works with styled-components or Emotion.
- React applies only the first object.');
INSERT INTO questions (id, body) VALUES (532, 'What shows on the screen?

```jsx
function App() {
  const data = [];
  const var1 = 10;
  const var2 = 0;

  return (
    <div>
      {data.length && <p>Data Loaded</p>}
      {var1 && <p>Var1 is {var1}</p>}
      {var2 && <p>Var2 is {var2}</p>}
    </div>
  );
}
```

- "Data Loaded", "Var1 is 10", and "Var2 is 0"
- Only "Var1 is 10"
- `0`, "Var1 is 10", `0`
- "Var1 is 10" and "Var2 is 0"');
INSERT INTO questions (id, body) VALUES (533, 'Why is this `useEffect` invalid?

```jsx
useEffect(async () => {
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();
  console.log(data);
}, []);
```

- React forbids `async` / `await` inside `useEffect`.
- An async function returns a Promise, and `useEffect` wants nothing or a cleanup function.
- `fetch` cannot run inside `useEffect`.
- Async functions block rendering.');
INSERT INTO questions (id, body) VALUES (534, 'Is using `index` as the key correct here?

```jsx
function WeekDays() {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <ul>
      {days.map((day, index) => (
        <li key={index}>{day}</li>
      ))}
    </ul>
  );
}
```

- Index keys always make React faster.
- Index keys are always wrong.
- Index keys are safe here because the list never changes order or shape.
- React throws if the key is an index.');
INSERT INTO questions (id, body) VALUES (535, 'Why is this a syntax error?

```jsx
function App() {
  return (
    <h1>Hello</h1>
    <p>Welcome to React</p>
  );
}
```

- JSX becomes one `React.createElement` call, and a function can return only one value.
- The DOM needs a single root for the whole document.
- Components must use `render()` to show more than one element.
- Browsers cannot parse tags that are not inside a `div`.');
INSERT INTO questions (id, body) VALUES (536, 'What happens to focus and the typed value when you click Swap?

```jsx
function App() {
  const [swap, setSwap] = useState(false);

  return (
    <>
      {swap ? (
        <input key="b" placeholder="B" />
      ) : (
        <input key="a" placeholder="A" />
      )}
      <button onClick={() => setSwap((s) => !s)}>Swap</button>
    </>
  );
}
```

- React sees two `input`s in the same place and keeps state and focus.
- The `key` changed, so React throws away the old input and makes a new one.
- Only the placeholder changes. The DOM node stays.
- `key` is only allowed inside `map`.');
INSERT INTO questions (id, body) VALUES (537, 'What is wrong with `tax` here?

```jsx
function App() {
  const [price, setPrice] = useState(10);
  const [tax, setTax] = useState(0);

  useEffect(() => {
    setTax(price * 2);
  }, [price]);

  return <p>Tax: {tax}</p>;
}
```

- The component crashes because `useEffect` cannot set state.
- `tax` stays one step behind `price` because `setTax` is async.
- The dependency array is missing `tax`, so this loops forever.
- `tax` is derived from `price`, so keeping it in state is unnecessary.');
INSERT INTO questions (id, body) VALUES (538, 'In React 19, what happens to text typed into `Form` when `mode` goes from `"visible"` to `"hidden"` and back?

```jsx
function Form() {
  const [text, setText] = useState("");

  return (
    <input
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Type something"
    />
  );
}

function App() {
  const [mode, setMode] = useState("visible");

  return (
    <>
      <button
        onClick={() =>
          setMode((m) => (m === "visible" ? "hidden" : "visible"))
        }
      >
        Toggle
      </button>
      <Activity mode={mode}>
        <Form />
      </Activity>
    </>
  );
}
```

- The component stays mounted in the background and keeps `text`.
- The component unmounts and `text` resets to `""`.
- React throws because a component cannot render while hidden.
- `text` is saved, but the input DOM node is deleted and recreated.');
INSERT INTO questions (id, body) VALUES (539, 'This runs without a thrown error, but the header never shows. What is wrong?

```jsx
import header from "./Header";

function App() {
  return (
    <div>
      <header />
    </div>
  );
}
```

- The import needs curly braces.
- React components must start with a capital letter.
- The component must be wrapped in a fragment inside the `div`.
- `header` is a reserved word.');
INSERT INTO questions (id, body) VALUES (540, 'The modal flashes at the top, then jumps to the center. What is the best fix?

```jsx
function Modal() {
  const ref = useRef(null);
  const [top, setTop] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const height = ref.current.getBoundingClientRect().height;
    setTop(window.innerHeight / 2 - height / 2);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top,
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      Centered Modal
    </div>
  );
}
```

- Nothing is wrong. The jump is expected.
- Add more dependencies to `useEffect`.
- Measure in `useLayoutEffect` instead of `useEffect`.
- Delay the measurement with `setTimeout`.');
INSERT INTO questions (id, body) VALUES (541, 'What are `map`, `filter`, and `reduce`? Write a polyfill for `reduce`.');
INSERT INTO questions (id, body) VALUES (542, 'What is debouncing? Write `debounce`.');
INSERT INTO questions (id, body) VALUES (543, 'Flatten `[1, [2, 3, [4, 5], 6]]` to `[1, 2, 3, 4, 5, 6]`.');
INSERT INTO questions (id, body) VALUES (544, 'Write a curried version of a function.');
INSERT INTO questions (id, body) VALUES (545, 'How do you retry a fetch?');
INSERT INTO questions (id, body) VALUES (546, 'Write a function that waits 10 seconds using a Promise.');
INSERT INTO questions (id, body) VALUES (547, 'Deep-clone an object. Handle objects, arrays, `null`, and `undefined`.');
INSERT INTO questions (id, body) VALUES (548, 'Turn a nested object into a flat dictionary of keys and values.');
INSERT INTO questions (id, body) VALUES (549, 'Schedule a graph of async tasks. A task starts only after its prerequisites finish, and at most `N` tasks run at once.');
INSERT INTO questions (id, body) VALUES (550, 'Write `mapLimit(inputs, limit, iteratee, callback)`. Map inputs with an async function, never run more than `limit` at once, keep output order, and start the next task as soon as one finishes.');
INSERT INTO questions (id, body) VALUES (551, 'Build a search box that waits before calling the API, and cancel an in-flight request so an old response cannot overwrite a newer one.');
INSERT INTO questions (id, body) VALUES (552, 'Find and fix a bug caused by async state updates.');
INSERT INTO questions (id, body) VALUES (553, 'Build a restaurant list. Filter by category, rating, and price. Search as the user types. Infinite-scroll a large set. Keep the components split up, rendering cheap, and handle a failed request.');
INSERT INTO questions (id, body) VALUES (554, 'Write a helper that runs several async operations.');
INSERT INTO questions (id, body) VALUES (555, 'Implement the core array transforms.');
INSERT INTO questions (id, body) VALUES (556, 'Build reusable form state. Cover validation, errors, and submit.');
INSERT INTO questions (id, body) VALUES (557, 'Flatten a nested array so the top-level items come out first and the nested items come later.');
INSERT INTO questions (id, body) VALUES (558, 'How do you keep `this` pointing at `obj` if you call `print` later?');
INSERT INTO questions (id, body) VALUES (559, 'Write a polyfill for `bind`.');
INSERT INTO questions (id, body) VALUES (560, 'Implement a small state subscription system, like a pub-sub or a basic select/dispatch store.');
INSERT INTO questions (id, body) VALUES (561, 'Design a reusable component such as tabs or an accordion. Cover structure, props, state, and reuse.');
INSERT INTO questions (id, body) VALUES (562, 'You are given objects that point at each other in a hierarchy. Build that structure and walk it efficiently.');
INSERT INTO questions (id, body) VALUES (563, 'Implement `Promise`.');
INSERT INTO questions (id, body) VALUES (564, 'Memoize a function that returns a promise. The cache has a fixed size, drops the least recently used entry, expires entries, and clears itself.');
INSERT INTO questions (id, body) VALUES (565, 'Design a chess board. If you do not know chess, design Snake and Ladder. Can the design grow to several players, custom boards, computer players, and saved games?');
INSERT INTO questions (id, body) VALUES (566, 'Insert spaces using a dictionary. `spaceSeparator("helloworld")` is `"hello world"`. `spaceSeparator("helloworldhi")` is `"hello world hi"`. `spaceSeparator("helloworldh")` is `""`. The dictionary has `hi`, `hello`, and `world`.');
INSERT INTO questions (id, body) VALUES (567, 'What do `data(0)` and `data(5)` return?

```js
const data = (x) => x * 2 || 100;
```');
INSERT INTO questions (id, body) VALUES (568, 'When do you use Flexbox, and when do you use Grid? Build a layout with Grid.');
INSERT INTO questions (id, body) VALUES (569, 'Longest substring without repeating characters.

```
Input: "aaa"
Output: 1

Input: "abcdefabcbb"
Output: 6
```');
INSERT INTO questions (id, body) VALUES (570, 'Reverse the vowels inside each word of a string.

```
Input: "helloworld"
Output: "hollowerld"

Input: "programming"
Output: "prigrammong"
```');
INSERT INTO questions (id, body) VALUES (571, 'Build a React app that searches a string against a list of cities and highlights the matching text as you type.');
INSERT INTO questions (id, body) VALUES (572, 'You get a list of functions that each return an async job. Run them all at once. Then run them one after another. Then run them one after another without `async` / `await`.');
INSERT INTO questions (id, body) VALUES (573, 'Walk a referral tree and add up values through it.');
INSERT INTO questions (id, body) VALUES (574, 'Write breadth-first search.');
INSERT INTO questions (id, body) VALUES (575, 'Reverse each word in a string. `"Hello World"` becomes `"olleH dlroW"`.');
INSERT INTO questions (id, body) VALUES (576, 'Design tic-tac-toe. Cover the board, turns, a win, a draw, and an N by N board.');
INSERT INTO questions (id, body) VALUES (577, 'Build a React viewer for nested JSON that you can edit.');
INSERT INTO questions (id, body) VALUES (578, 'Build a file explorer. Tell files from folders, nest folders with recursion, add a file into a folder, and turn a file into a folder on double-click.');
INSERT INTO questions (id, body) VALUES (579, 'Implement an `EventEmitter` in JavaScript.');
INSERT INTO questions (id, body) VALUES (580, 'Draw a box. Show a circle that follows the mouse inside the box. Then show the circle only on click. Then speed the tracking up with `useRef`.');
INSERT INTO questions (id, body) VALUES (581, 'Debug a React issue, then design a social feed on the client. Fake the server with promises. Cover infinite scroll, likes, nested comments, and how you would speed it up.');
INSERT INTO questions (id, body) VALUES (582, 'Build a React component that loads data from an API, shows it, handles loading and errors, and paginates.');
INSERT INTO questions (id, body) VALUES (583, 'Flatten a deeply nested object.');
INSERT INTO questions (id, body) VALUES (584, 'How is `async` / `await` different from promises? Write a helper that runs several async jobs.');
INSERT INTO questions (id, body) VALUES (585, 'Check a structured input with a stack. Cover the edge cases.');
INSERT INTO questions (id, body) VALUES (586, 'Build a dropdown you can reuse, with search. It has to stay fast on a long list. Cover debounce and only drawing the rows on screen.');
INSERT INTO questions (id, body) VALUES (587, 'Build a dropdown. Cover how you split it, reuse, accessibility, keyboard, state, edge cases, and speed. Include ARIA, focus, and screen readers. Controlled versus uncontrolled, open and close, a click outside, and keeping state in sync. Extra renders, memoization, and cleaning up listeners.');
INSERT INTO questions (id, body) VALUES (588, 'In plain HTML, CSS, and JavaScript, build infinite scroll and a list of 10,000+ items that only draws what is on screen. Compare `IntersectionObserver` with measuring scroll position. What is the cost of 10,000 real nodes versus a virtual list? How do you keep the scroll position steady as items load, and what happens on a fast scroll or a window resize?');
INSERT INTO questions (id, body) VALUES (589, 'Design a toast as an npm package. Cover strict types, the public API, how another app installs it, peer dependencies, tree-shaking, bundle size, re-renders, animation, the queue, folders, and unit tests. Can you expose it without a provider? How do several toasts queue or stack? How do you theme it without a fat bundle, render custom content, survive server rendering, and support screen readers and the keyboard?');
INSERT INTO questions (id, body) VALUES (590, 'Take a number `n` and draw an `n` by `n` grid. Cells start empty. Click an empty cell and it becomes one more than the highest number already on the grid. Click a filled cell and it becomes that highest number.

```
_ _ _
_ _ _
_ _ _

click the first cell

1 _ _
_ _ _
_ _ _

click another empty cell

1 2 _
_ _ _
_ _ _

click the first cell again

2 2 _
_ _ _
_ _ _
```

While you build it, avoid extra renders, compute the max cheaply, and decide what is stored versus derived.');
INSERT INTO questions (id, body) VALUES (591, 'A pattern `"abcd"` and a string `"axxxbbxxxccxd"`. Do the pattern''s characters show up in the string in that order, with other characters allowed in between?');
INSERT INTO questions (id, body) VALUES (592, 'Given a number, return the next palindrome that is strictly larger. Watch `999` and `12921`.');
INSERT INTO questions (id, body) VALUES (593, 'Write `calc` so `calc(8).sum(3).mul(3).val()` is `33`.');
INSERT INTO questions (id, body) VALUES (594, 'Split an array into two parts so the absolute difference of their sums is as small as possible, and return both parts. `[2, 3, 4, 1]` can split into `[2, 3]` and `[4, 1]`. What if the array is huge? What if values can be negative? What do you trade between time and memory?');
INSERT INTO questions (id, body) VALUES (595, 'In plain JavaScript and CSS, build an `n` by `n` memory grid. Random cells light up in an order. The player then has 10 seconds to click those cells in that order. Show green for a right click and red for a wrong one. Animate the click order at the end.');
INSERT INTO questions (id, body) VALUES (596, 'Write an async recursive walk that finds every file whose name matches a regex.');
INSERT INTO questions (id, body) VALUES (597, 'A circular route of gas stations. Find the starting index where you can complete the loop.');
INSERT INTO questions (id, body) VALUES (598, 'Build a GitHub pull-request page in React: search, the list, status pills, and comments. Before coding, say how the data is shaped, how you fetch it, how you split components, and where state lives.');
INSERT INTO questions (id, body) VALUES (599, 'Given an HTML node, delete every sibling and leave the node itself. What if it has no parent, or no siblings?');
INSERT INTO questions (id, body) VALUES (600, 'Why does this child still re-render?

```jsx
const Child = React.memo(({ onClick }) => {
  return <button onClick={onClick}>Click</button>;
});
```');
INSERT INTO questions (id, body) VALUES (601, 'What does this print?

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```');
INSERT INTO questions (id, body) VALUES (602, 'Stop calling an API after 3 failures in a row.');
INSERT INTO questions (id, body) VALUES (603, 'Write one function that throttles calls and also fires a last call after the user stops.');
INSERT INTO questions (id, body) VALUES (604, 'Write a React hook that fetches data and is safe to reuse.');
INSERT INTO questions (id, body) VALUES (605, 'What does this interval log, and why?

```jsx
function Counter() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      console.log(count);
    }, 1000);

    return () => clearInterval(id);
  }, []);
}
```');
INSERT INTO questions (id, body) VALUES (606, 'Build a dropdown you can reuse. Cover design, edge cases, accessibility, state, performance, and how it would grow.');
INSERT INTO questions (id, body) VALUES (607, 'Write a typed function that takes a number and returns its square.');
INSERT INTO questions (id, body) VALUES (608, 'Type a function that accepts a string or a number and returns its length.');
INSERT INTO questions (id, body) VALUES (609, 'Type a user with `id`, `name`, and an optional `email`.');
INSERT INTO questions (id, body) VALUES (610, 'Type an array of users.');
INSERT INTO questions (id, body) VALUES (611, 'Type a function that returns nothing.');
INSERT INTO questions (id, body) VALUES (612, 'Write a generic function that returns the same value it receives.');
INSERT INTO questions (id, body) VALUES (613, 'Type the props of a button: label, click handler, and an optional disabled flag.');
INSERT INTO questions (id, body) VALUES (614, 'Type an input''s change event in React.');
INSERT INTO questions (id, body) VALUES (615, 'Write a function that only accepts keys of an object.');
INSERT INTO questions (id, body) VALUES (616, 'What is wrong here?

```ts
let value: unknown;
console.log(value.toUpperCase());
```');
INSERT INTO questions (id, body) VALUES (617, 'Build a crypto portfolio tracker in React Native. The starter is a `FlatList` of coins with `name`, `symbol`, `price`, and `holdings`. Example rows: Bitcoin at 105000 with 0.5 held, Ethereum at 3500 with 10 held.

Show each coin''s name, symbol, price, holdings, and total value. Add up the portfolio. Format money with commas. Stay smooth when the data changes, including 1000+ assets.');
INSERT INTO questions (id, body) VALUES (618, 'Fake a websocket every 2 seconds. Flash a row green when its price goes up and red when it goes down, and only that row. Avoid extra renders. Show the portfolio''s gain or loss as a percent. If updates arrive too fast, show a warning toast and batch them.');
INSERT INTO questions (id, body) VALUES (619, 'Add search, sort by highest value, highest gain, or name, pull to refresh, save the portfolio on the device, and show an error with a retry when the API fails.');
INSERT INTO questions (id, body) VALUES (620, 'Build a prototype of an "AI Document Vault".

- A vault UI with a file and folder explorer.
- Upload one or more documents, including drag and drop.
- Show the selected document, plus an AI summary and a cleaned-up markdown version.
- A small backend that accepts uploads, stores the files (local disk is enough), and stores the summary and markdown next to each file.
- On upload, call an LLM to write a short summary and a markdown cleanup. The original, the summary, and the markdown must stay linked.');
INSERT INTO questions (id, body) VALUES (621, 'Sort an array that contains only `0`, `1`, and `2`, in linear time.');
INSERT INTO questions (id, body) VALUES (622, 'A matrix of `0`s and `1`s, a start, and a destination. Can you reach the destination?');
INSERT INTO questions (id, body) VALUES (623, 'Longest substring with all unique characters. `abcabcbb` has length `3`.');
INSERT INTO questions (id, body) VALUES (624, 'Split an array into two parts whose sums are equal.');
INSERT INTO questions (id, body) VALUES (625, 'Longest increasing subsequence. Then make it faster than `O(n²)`.');
INSERT INTO questions (id, body) VALUES (626, 'A sorted array has exactly one value that appears more than 25% of the time. Find it.');
INSERT INTO questions (id, body) VALUES (627, 'Reverse a linked list between two positions, in one pass.');
INSERT INTO questions (id, body) VALUES (628, 'Build a color picker. Show the colors, select one, and make the selection visible.');
INSERT INTO questions (id, body) VALUES (629, 'JavaScript output questions on hoisting, scope, closures, and the execution context. Explain the order, not only the result.');
INSERT INTO questions (id, body) VALUES (630, 'Design a custom structure that behaves like a queue, with extra constraints and edge cases. Pick the structure, the complexity, the state changes, and the edges.');
INSERT INTO questions (id, body) VALUES (631, 'Pick one item at random when each item has a weight. Talk about the distribution, a fast lookup, and how it scales.');
INSERT INTO questions (id, body) VALUES (632, 'Build a button that scales on hover, efficiently.');
INSERT INTO questions (id, body) VALUES (633, 'Reverse `"abc"` to `"cba"`.');
INSERT INTO questions (id, body) VALUES (634, 'Is a string a palindrome? `level`, `racecar`, and `abba` are.');
INSERT INTO questions (id, body) VALUES (635, 'Can you delete at most one character and get a palindrome? `"aba"` is already one, `"abca"` becomes one, `"abc"` does not.');
INSERT INTO questions (id, body) VALUES (636, 'What does this print?

```js
let x = 10;

(function () {
  console.log(x);
  let x = 20;
  console.log(x);
})();
```

- `10` and `undefined`
- `10` and `20`
- `undefined` and `20`
- `ReferenceError`');
INSERT INTO questions (id, body) VALUES (637, 'What does this print?

```js
function delay() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

async function test() {
  console.log(1);
  await delay();
  console.log(2);
}

test();
console.log(3);
```

- `1 3 2`
- `1 2`, with a 1-second delay before `2`
- `1 2 3`
- `3 1 2`');
INSERT INTO questions (id, body) VALUES (638, 'What does this print?

```js
const person1 = {
  firstName: "Ginny",
  getName: function () {
    return this.firstName;
  },
};

const person2 = {
  firstName: "Jhonny",
  getName: () => {
    return this.firstName;
  },
};

const getName1 = person1.getName;
const getName2 = person2.getName;

console.log(person1.getName(), getName1(), person2.getName(), getName2());
```

- `Ginny`, `undefined`, `undefined`, `undefined`
- `undefined`, `undefined`, `undefined`, `undefined`
- `Ginny`, `undefined`, `Jhonny`, `Jhonny`
- `Ginny`, `Ginny`, `Jhonny`, `Jhonny`');
INSERT INTO questions (id, body) VALUES (639, 'What do `(4.98234).toFixed(1)` and `(4.1345).toFixed(1)` return?

- `"5.0"`, `"4.1"`
- `"4.9"`, `"4.1"`
- `"5"`, `"4"`
- `"5.0"`, `"4.2"`');
INSERT INTO questions (id, body) VALUES (640, 'Write `groupBy`. Group these users by `team` into `{ Payments: [...], Risk: [...] }`.

```js
const users = [
  { name: "John", team: "Payments" },
  { name: "Alice", team: "Risk" },
  { name: "Bob", team: "Payments" },
];
```');
INSERT INTO questions (id, body) VALUES (641, 'Write a task scheduler class. Add a task, remove a task, run one task, and run every pending task.');
INSERT INTO questions (id, body) VALUES (642, 'Build a shopping cart. Add and remove products, change quantities, show the total, disable checkout when the cart is empty, and update the screen as the cart changes.');
INSERT INTO questions (id, body) VALUES (643, 'Longest consecutive sequence, in optimal time.');
INSERT INTO questions (id, body) VALUES (644, 'Implement an LRU cache. `get` and `put` are both `O(1)`.');
INSERT INTO questions (id, body) VALUES (645, 'Build a currency exchange calculator. Pick a source and destination currency, update the amounts as either side changes, reject bad input, and show a loading state while rates load.');
INSERT INTO questions (id, body) VALUES (646, 'Given a string, delete exactly one contiguous substring so the rest has all unique characters. Return the longest length you can get.');
INSERT INTO questions (id, body) VALUES (647, 'Deep-clone a value. When you meet an array, append its length to the clone and leave the original alone. `{ skills: ["React", "TypeScript"] }` becomes `{ skills: ["React", "TypeScript", 2] }`.');
INSERT INTO questions (id, body) VALUES (648, 'Are two strings anagrams? Do not use `sort` or `join`. Talk about the approach, the complexity, and the edge cases.');
INSERT INTO questions (id, body) VALUES (649, 'Longest common substring. `"abcdef"` and `"zabcf"` share `"abc"`, length `3`.');
INSERT INTO questions (id, body) VALUES (650, 'Implement `Array.prototype.map`.');
INSERT INTO questions (id, body) VALUES (651, 'Implement a singleton class.');
INSERT INTO questions (id, body) VALUES (652, 'Use a closure for a counter, a private variable, and currying.');
INSERT INTO questions (id, body) VALUES (653, 'What does a mix of `setTimeout`, promises, and `async`/`await` print? Explain the order.');
INSERT INTO questions (id, body) VALUES (654, 'Implement `debounce` and `once`.');
INSERT INTO questions (id, body) VALUES (655, 'Write `retry(fetchData, retries)`. Retry a failed call, stop on the first success, and reject when the retries run out. Do not use `async`/`await`.');
INSERT INTO questions (id, body) VALUES (656, 'Build a multi-step progress tracker. Only one step is active. Next completes the current step and leaves it highlighted. The number of steps is not fixed.');
INSERT INTO questions (id, body) VALUES (657, 'Build nested comments, like Reddit. Reply, delete, nest without a depth limit, collapse a thread, and highlight the selected comment.');
INSERT INTO questions (id, body) VALUES (658, '`calculator(10).add(5).multiply(2).subtract(8).value()` is `22`.');
INSERT INTO questions (id, body) VALUES (659, 'Build pagination. `<Pagination currentPage={6} totalPages={50} />` shows the first page, the last page, the current page, and one neighbor on each side, with ellipses in the gaps. Support the keyboard, and disable buttons that would leave the range.');
INSERT INTO questions (id, body) VALUES (660, 'Debug a React app. Look for extra renders, missing effect dependencies, expensive work during render, bad list keys, and timers that are never cleared. Then how you watch production errors, log frontend events, track API failures, measure Core Web Vitals, and debug a bug a user reported.');
INSERT INTO questions (id, body) VALUES (661, 'Review this search. What is wrong with the debounce, and would you approve the pull request?

```jsx
function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const debouncedSearchText = useDebounce(searchText, 10);

  const fetchSearchResults = useCallback(async (value) => {
    if (value.length > 0) {
      try {
        const baseURL = generateBaseURL();
        const response = await fetch(
          `${baseURL}/api/apartments/search?location=${value}`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error retrieving search results:", error);
      }
    } else {
      setSearchResults([]);
    }
  }, []);

  useEffect(() => {
    fetchSearchResults(debouncedSearchText);
  }, [debouncedSearchText, fetchSearchResults]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchText(value);
    setShowResults(value.length > 0);
    setIsDropdownOpen(true);
    fetchSearchResults(value);
  };

  const handleApartmentClick = (apartmentId) => {
    navigate(`/apartments/detail/${apartmentId}`);
    setIsDropdownOpen(false);
    setSearchText("");
  };

  const memoizedSearchResults = useMemo(() => {
    return searchResults.length > 0 ? (
      searchResults.map((result) => (
        <p
          key={result._id}
          onClick={() => handleApartmentClick(result._id)}
        >
          {result.address}
        </p>
      ))
    ) : (
      <p className="no-results">No matching results found</p>
    );
  }, [searchResults]);

  return (
    <div className="search-bar">
      <input
        data-testid="search-input"
        type="text"
        className="search-input"
        placeholder="Search for a location"
        value={searchText}
        onChange={handleInputChange}
      />
      <button
        className="search-button"
        onClick={() => fetchSearchResults(searchText)}
      >
        <FaSearch />
      </button>
      {isDropdownOpen && showResults && (
        <div data-testid="search-div" className="results-dropdown">
          {memoizedSearchResults}
        </div>
      )}
    </div>
  );
}
```

```js
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    setDebouncedValue(value);
    const handler = setTimeout(() => {
      console.log("Debounce timer expired");
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```');
INSERT INTO questions (id, body) VALUES (662, 'Build compound tabs in React and TypeScript. State lives in `useTabs`. Arrow keys move between tabs. Enter or Space activates one. Use `tablist`, `tab`, `tabpanel`, `aria-selected`, `aria-controls`, and `aria-labelledby`. The active tab looks different, the focus ring is visible, and there is no `any`.

```tsx
<Tabs defaultTab="overview">
  <Tabs.List>
    <Tabs.Tab id="overview">Overview</Tabs.Tab>
    <Tabs.Tab id="transactions">Transactions</Tabs.Tab>
    <Tabs.Tab id="settings">Settings</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel tabId="overview">Overview content here</Tabs.Panel>
  <Tabs.Panel tabId="transactions">Transactions content here</Tabs.Panel>
  <Tabs.Panel tabId="settings">Settings content here</Tabs.Panel>
</Tabs>
```');
INSERT INTO questions (id, body) VALUES (663, 'Build a Kanban board. Stages, in order, are Backlog (`0`), To Do (`1`), Ongoing (`2`), and Done (`3`). A task is `{ name, stage }`. `name` is unique. The new-task input starts empty. Create adds that name to Backlog and clears the input. An empty name does nothing. Each stage is a `<ul>` of `<li>`s. Each task has back, forward, and delete. Back and forward are disabled on the first and last stage. Test ids: `create-task-input`, `create-task-button`, `stage-0` through `stage-3`, and for a task named `abc`, `abc-name`, `abc-back`, `abc-forward`, `abc-delete`. Spaces in a name become hyphens in the id. The board starts with tasks `1` and `2`, both in Backlog.');
INSERT INTO questions (id, body) VALUES (664, 'What is the minimum number of swaps to sort `[5, 3, 1, 7, 2, 6, 4]` ascending, and descending?

- `4, 5`
- `5, 4`
- `4, 4`
- `5, 5`');
INSERT INTO questions (id, body) VALUES (665, 'What does this print?

```js
console.log(1);
setTimeout(() => console.log(2));
Promise.resolve().then(() => console.log(3));
console.log(4);
```');
INSERT INTO questions (id, body) VALUES (666, 'Given an integer `n`, subtract the sum of its odd digits from the sum of its even digits. `412` is `5`. `1203` is `-2`.');
INSERT INTO questions (id, body) VALUES (667, 'An image is a matrix of integers. Replace each cell with the average of the cells that share a corner with it. Do not include the cell itself. `[[1, 4], [7, 10]]` becomes `[[7, 6], [5, 4]]`.');
INSERT INTO questions (id, body) VALUES (668, 'One alphabet is a rearrangement of another. Can one string be turned into the other by a substitution cipher? `"aacb"` and `"aabc"` can. `"aa"` and `"bc"` cannot.');
INSERT INTO questions (id, body) VALUES (669, 'Run a list of promises one after another.');
INSERT INTO questions (id, body) VALUES (670, 'Design a tree of files and folders. Lookups should be as close to constant time as you can get. Then print the tree.');
INSERT INTO questions (id, body) VALUES (671, 'Given a list of promises, settle with the earliest index that resolves, not merely whichever promise finishes first.');
INSERT INTO questions (id, body) VALUES (672, 'Fetch records into a table. Add search, column sorting, pagination, a loading state, and an empty state.');
INSERT INTO questions (id, body) VALUES (673, 'Rebuild a dashboard from a screenshot. Match the layout, type, spacing, and how it behaves on a small screen.');
INSERT INTO questions (id, body) VALUES (674, 'Design autocomplete. Debounce the requests, move with the keyboard, highlight the match, show loading, an empty state, and errors, cancel a stale request, and cache earlier searches. Also virtualize a long list, and expose the right `aria` attributes.');
INSERT INTO questions (id, body) VALUES (675, 'What does this do?

```js
function Foo(x) {
  function bar() {
    return x;
  }

  this.baz = function () {
    return x;
  };
}

Foo.prototype.baz = function () {
  return x;
};

const obj = new Foo(10);
obj.baz();
obj.bar();
```

How would you expose `bar` and still keep `x` private?');
INSERT INTO questions (id, body) VALUES (676, 'Write a reusable `memoize`.');
INSERT INTO questions (id, body) VALUES (677, 'Build "People you may know" with HTML, CSS, and JavaScript. Show user cards. Connect removes a card. See more loads more people from an API and appends them. How would you attach fewer click listeners?');
INSERT INTO questions (id, body) VALUES (678, 'Build a tooltip, first with HTML and CSS, then with JavaScript. It sits above the link, the arrow is centered, and it can sit on any side. How do you pick the side, and how do you avoid one tooltip node per target?');
INSERT INTO questions (id, body) VALUES (679, 'Maximum subarray sum. Also return the start index and the end index.');
INSERT INTO questions (id, body) VALUES (680, 'Implement `String.prototype.repeat` so `"Hi".repeat(3)` is `"HiHiHi"`. Do better than appending one copy at a time.');
INSERT INTO questions (id, body) VALUES (681, 'Parse `"(1,2,3),(4,5,6),(7,8,9)"` into `[[1, 2, 3], [4, 5, 6], [7, 8, 9]]`. Then `tuple(str).multiply(2)` is `80`.');
INSERT INTO questions (id, body) VALUES (682, 'Design a calculator with unlimited undo, including a jump back to any earlier step. Then turn it into `createCalculator()`, `execute`, `undo`, and `undoTo(4)`.');
INSERT INTO questions (id, body) VALUES (683, 'A binary search tree. Do any three nodes sum to zero?');
INSERT INTO questions (id, body) VALUES (684, 'A binary matrix is sorted in each row. Which row has the most `1`s? Both dimensions can be huge.');
INSERT INTO questions (id, body) VALUES (685, 'Rebuild a UI from a mockup. Use semantic HTML, Flexbox or Grid, and a layout that holds up on a small screen.');
INSERT INTO questions (id, body) VALUES (686, 'Build a reusable autocomplete. It calls a configurable endpoint, filters with a function you pass in, shows suggestions, and fills the input when one is picked. Then debounce the calls, cancel a stale request, cache repeated queries, and skip the request until the query is long enough.');
INSERT INTO questions (id, body) VALUES (687, 'Show a deep copy.');
INSERT INTO questions (id, body) VALUES (688, 'Show a shallow copy.');
INSERT INTO questions (id, body) VALUES (689, 'What does this print?

```js
const user = {
  name: "Gourav",
  getName() {
    return this.name;
  },
};

const getName = user.getName;

console.log(user.getName());
console.log(getName());
```');
INSERT INTO questions (id, body) VALUES (690, '`sum(1)(2)(3)(4)` is `10`.');
INSERT INTO questions (id, body) VALUES (691, 'Implement `Array.prototype.reduce`. Cover a missing initial value, an empty array, holes, the callback arguments, mutation, and `this` inside the callback.');
INSERT INTO questions (id, body) VALUES (692, 'Call an API and abort it if it runs longer than a given time.');
INSERT INTO questions (id, body) VALUES (693, 'Implement inheritance with the prototype chain. Cover `prototype`, `__proto__`, `Object.create`, constructors, `instanceof`, `new`, `call` / `apply` / `bind`, and classes versus prototypes.');
INSERT INTO questions (id, body) VALUES (694, 'Build a login form. Email or username, password, validation, submit, a loading state, an error, and a success state. Also structure, state, accessibility, reuse, and edge cases.');
INSERT INTO questions (id, body) VALUES (695, 'What is `123[''toString''].length + ''123''`?');
INSERT INTO questions (id, body) VALUES (696, 'Implement `Promise.all`. What if the second promise rejects? What if the third resolves before the first? How do you keep the original order? Cover values that are not promises, and an empty array.');
INSERT INTO questions (id, body) VALUES (697, 'Design a React higher-order component for role-based access.');
INSERT INTO questions (id, body) VALUES (698, 'Build a React timer with Start, Pause, and Reset.');
INSERT INTO questions (id, body) VALUES (699, 'Build a React counter, write unit tests for it, and write unit tests for a function that calls an API.');
INSERT INTO questions (id, body) VALUES (700, 'Implement `Array.prototype.forEach`.');
INSERT INTO questions (id, body) VALUES (701, 'Implement `Array.prototype.filter`.');
INSERT INTO questions (id, body) VALUES (702, 'Write a polyfill for `JSON.stringify`.');
INSERT INTO questions (id, body) VALUES (703, 'Move every `0` to the end of an array and keep the order of the other values.');
INSERT INTO questions (id, body) VALUES (704, 'Implement binary search.');
INSERT INTO questions (id, body) VALUES (705, 'Write a function that checks whether two objects are deeply equal.');
INSERT INTO questions (id, body) VALUES (706, 'Implement a React list that can add an item and delete an item.');
INSERT INTO questions (id, body) VALUES (707, 'How do you use Context so a consumer does not re-render when an unrelated context value changes?');
INSERT INTO questions (id, body) VALUES (708, 'How do you stop a sibling from re-rendering when the parent updates, if you cannot use `React.memo`, `useMemo`, or `useCallback`?');
INSERT INTO questions (id, body) VALUES (709, 'Write a `useDebounce` hook, and use it on a search input.');
