# Wolt assignment

## How to run locally

You have to have nodejs. I used version 12

```sh
npm install
npm test
npm start
```

Open `https://localhost:5002`


## TODO

- check visual difference
  - font in the list is not bold enough
  - letter-spacing is weird

- maybe instead of isToday use `todayLabel: null | string` ?

- what is "Card" responsibility, and what is List? Maybe to extract some parts from App.tsx