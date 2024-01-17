# CashDash

Ever felt like your money just vanishes without a trace? 🕵️‍♂️ Well, CashDash is here to solve the mystery of the disappearing dollars!
No more sifting through crumpled receipts or squinting at boring spreadsheets.
Thrilling as a game of Clue, but instead of finding out who did it, you're finding out where your money went."

Let's dive into the colorful world of CashDash! 🌈

## Transaction panel

- Picture the transaction panel as your personal financial ledger. You can sift through your transactions, filter them by transaction type, and even search for a specific transaction. It's like having a financial detective at your disposal, ready to uncover any detail you need.

- Adding transactions? Piece of cake! 🍰 Choose categories, add an amount and optional note, and voila!

- The form validation and feedback system guides you through the process, ensuring you don't miss any crucial details.

- Made a mistake or need to change something? No problem. The transaction panel allows you to update or delete any transaction.

## Dashboard

- Now, let's talk about the dashboard, the crown jewel of CashDash. It's like the control center for financial clarity. 🚀

- Your total balance, income, and expenses are displayed in all their glory, giving you the big picture at a glance.

- Feast your eyes on our doughnut chart, where your top 5 expense categories are as visually tasty as actual doughnuts. 🍩 Then, there's the bar chart, where your income and expenses go head-to-head like two sumo wrestlers in a fiscal showdown. 💪

- And for the grand finale, the line chart! It's like watching your financial story unfold, with each month adding a twist to the plot. 📈

- Oh, and let's not forget the recent transactions card, showcasing your last 5 financial moves. It's like the highlight reel of your spending game.

- Remember, folks, <u>stay on top of your cash with CashDash!</u>

## Tech stack:

### Backend:
  - Node.js
  - Express
  - Sequelize + postgreSQL

### Frontend:
  - React
  - [Chakra UI](https://chakra-ui.com)
  - [Chart.js](https://www.chartjs.org)
  - [react-chartjs-2](https://react-chartjs-2.js.org)
    - React components based on Chart.js

## Installation:
1.  in "/" folder and "/client" folder:

    - `npm i `

2.  Make sure to have your postgreSQL db running

## Database structure:

- mock data:
  - amount stored in cents

| id | date       | category       | amount | note               | type    |
|----|------------|----------------|--------|--------------------|---------|
| 5  | 2023-08-29 | Housing        | 80000  | Rent               | expense |
| 6  | 2023-09-29 | Housing        | 80000  | Rent               | expense |
| 7  | 2023-10-29 | Housing        | 80000  | Rent               | expense |
| 8  | 2023-11-29 | Housing        | 80000  | Rent               | expense |
| 9  | 2023-12-29 | Housing        | 80000  | Rent               | expense |
| 11 | 2023-08-15 | Utilities      | 13000  | Electricity&Water  | expense |
| 12 | 2023-09-15 | Utilities      | 13000  | Electricity&Water  | expense |
| 13 | 2023-10-15 | Utilities      | 13000  | Electricity&Water  | expense |
| 14 | 2023-11-15 | Utilities      | 13000  | Electricity&Water  | expense |
| 15 | 2023-12-15 | Utilities      | 13000  | Electricity&Water  | expense |
| 17 | 2023-11-18 | Insurance      | 66589  | Car, yearly payment| expense |
| 18 | 2023-08-05 | Transportation | 3405   | Gas for car        | expense |
| 19 | 2023-09-11 | Transportation | 5481   | Gas for car        | expense |
| 20 | 2023-10-20 | Transportation | 4713   | Gas for car        | expense |
| 21 | 2023-12-01 | Transportation | 5122   | Gas for car        | expense |
| 28 | 2024-01-07 | Subscriptions  | 1799   | Netflix            | expense |
| 27 | 2023-12-07 | Subscriptions  | 1799   | Netflix            | expense |
| 25 | 2023-10-07 | Subscriptions  | 1799   | Netflix            | expense |
| 26 | 2023-11-07 | Subscriptions  | 1799   | Netflix            | expense |
| 23 | 2023-08-07 | Subscriptions  | 1799   | Netflix            | expense |
| 24 | 2023-09-07 | Subscriptions  | 1799   | Netflix            | expense |
| 29 | 2023-08-28 | Salary         | 261277 | Monthly Salary     | income  |
| 30 | 2023-09-28 | Salary         | 261277 | Monthly Salary     | income  |
| 31 | 2023-10-28 | Salary         | 261277 | Monthly Salary     | income  |
| 32 | 2023-11-28 | Salary         | 261277 | Monthly Salary     | income  |
| 33 | 2023-12-28 | Salary         | 261277 | Monthly Salary     | income  |
| 34 | 2023-09-28 | Rental Income  | 11389  | Quarterly dividend | income  |
| 35 | 2023-12-28 | Rental Income  | 9754   | Quarterly dividend | income  |
| 38 | 2024-01-07 | Food           | 2800   | Dinner with Jack   | expense |
| 39 | 2024-01-02 | Food           | 1959   | Groceries          | expense |
| 40 | 2023-12-23 | Food           | 7437   | Groceries          | expense |
| 41 | 2023-12-11 | Food           | 8192   | Groceries          | expense |
| 42 | 2023-11-29 | Food           | 10139  | Groceries          | expense |
| 43 | 2023-11-15 | Food           | 7166   | Groceries          | expense |
| 44 | 2023-11-01 | Food           | 1532   | Groceries          | expense |
| 45 | 2023-10-13 | Food           | 6611   | Groceries          | expense |
| 46 | 2023-10-01 | Food           | 3455   | Groceries          | expense |
| 47 | 2023-09-23 | Food           | 8825   | Groceries          | expense |
| 48 | 2023-09-09 | Food           | 10877  | Groceries          | expense |
| 49 | 2023-08-25 | Food           | 6326   | Groceries          | expense |
| 50 | 2023-08-13 | Food           | 11275  | Groceries          | expense |
| 56 | 2023-11-30 | Other          | 34700  | Christmas gifts    | expense |
| 57 | 2023-11-30 | Other          | 79900  | Flight to NYC      | expense |
| 58 | 2023-09-21 | Pets           | 120000 | Surgery            | expense |
| 22 | 2024-01-09 | Transportation | 2999   | Train ticket       | expense |
| 16 | 2024-01-11 | Utilities      | 13000  | Electricity&Water  | expense |
| 36 | 2024-01-03 | Freelancing    | 29900  | Creating a Website | income  |


## Notes
In the files I added comments and to-dos for bugs and refactoring. If you have any questions, feel free to reach out.

- server packages should have been installed in /server