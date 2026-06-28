# CodeChallenger

A coding challenge platform powered by the Anthropic Claude API. 
Challenges are generated and evaluated entirely by AI.

**Live demo:** https://code-challenger-app.netlify.app/


## Features

- **Configurable challenges** - choose language, difficulty (beginner → expert), and expected solution length
- **Custom requests** - describe what you want, e.g. *"something with a matrix"* or *"a graph traversal problem"*, and the AI builds it
- **In-browser editor** - write your solution with syntax highlighting, no setup required
- **AI-evaluated submissions** - simulated console output and pass/fail evaluation against the challenge criteria
- **Hints and solutions** - progressive hints and a model solution for every challenge

## Tech stack

**Frontend:** React, Vite, React Router, PrismJS  [repo](https://github.com/TimHuitt/code-challenger-client)
**Backend:** Node.js, Express - [repo](https://github.com/TimHuitt/code-challenger-server)
**AI:** Anthropic Claude API  
**Hosting:** Netlify (frontend + serverless functions)
