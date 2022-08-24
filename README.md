# Kinside
> Front End Coding Challenge

# Local setup

```
cd frontend
npm ci
npm run dev

# Head to http://127.0.0.1:55173/
```

# Running e2e tests

```
cd e2e
npm ci

# Open the test runner with:
npm run cy:open

# Run all tests with:
npm run cy:run
```

# Remarks
> Time being sparse, I'd like to draw your attention to the following items:

- There is no unit test coverage
  - This is somewhat mitigated by having a set of e2e specs.
- The long list of movies is not virtualized
  - I'd normally impelement https://github.com/Akryum/vue-virtual-scroller
- This project is NOT dockerized. You will need to have port 55173 free on your local to be able to run it.
