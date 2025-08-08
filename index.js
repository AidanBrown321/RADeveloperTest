import { deck, users } from "./setup.js";

//Given a deck of cards
//Write a function that draw x cards and tell the user the remaining number of cards in each suit and each value
//
//i.e.
// {
//  hand:
//  [
//   {
//     suit: "Clubs",
//     value: "7"
//   },
//   ...
// ],
//   remainingSuits: {
//     spades: 1,
//     hearts: 2,
//     ...
//   },
//   remainingValues: {
//     A: 2,
//     K: 2,
//     Q: 3,
//     ...
//   }
// }

function drawCards(deck, num) {
  if (deck.length === 0) {
    throw new Error("No cards in the deck");
  }

  if (num > deck.length || num < 1 || !Number.isInteger(num)) {
    throw new Error("Invalid number of cards");
  }

  const hand = deck.slice(0, num);
  const remainingCards = deck.slice(num);

  // Sorts and counts suits
  const remainingSuits = {};
  remainingCards.forEach((card) => {
    remainingSuits[card.suit] = (remainingSuits[card.suit] || 0) + 1;
  });

  // Sorts and counts values
  const remainingValues = {};
  remainingCards.forEach((card) => {
    remainingValues[card.value] = (remainingValues[card.value] || 0) + 1;
  });

  return { hand, remainingSuits, remainingValues };
}

console.log(drawCards(deck, 5));

// Given an array of users
// Write a function that will remove any duplicates from the users array and show the number of total duplicates
// The duplicated user should be reduced to one insntace in the array
// i.e.
// userIn = [
//   {
//     name: 'Smith, John',
//     eyeColor: 'blue',
//     hairColor: 'red'
//   },
//   {
//     name: 'Smith, John',
//     eyeColor: 'blue',
//     hairColor: 'red'
//   }
// ]
// returnArray = {
//   returnUsers: {
//     name: 'Smith, John',
//     eyeColor: 'blue',
//     hairColor: 'red'
//   },
//   dupeCount: 1
// }

function deduplicateUsers(users) {
  const seenUsers = new Map();

  let dupeCount = 0;

  users.forEach((user) => {
    // makes a unique key to be able to check for duplicates
    const userKey = [user.name, user.eyeColor, user.hairColor].join("|");

    if (seenUsers.has(userKey)) {
      dupeCount++;
    } else {
      seenUsers.set(userKey, user);
    }
  });

  return {
    returnUsers: Array.from(seenUsers.values()),
    dupeCount: dupeCount,
  };
}

console.log(deduplicateUsers(users));

// ------------------------------------
// ------------------------------------
// ------------------------------------
// ------------------------------------
// ------------------------------------
// ------------------------------------
// --------NON CODING CHALLENGE--------
// ------------------------------------
// ------------------------------------
// ------------------------------------
// ------------------------------------
// ------------------------------------
// ------------------------------------

//Given a system that will allow users to create events that will be stored in a database
//And given that the database only allows searching by a single field
//And given that not all fields need to be viewable by a user
//How would you design a record object to allow you to search for events by multiple fields
//Given that you can control the object schema
//And given that all user editable fields are limited to numbers and letters
//NOTE: This question does not have a correct answer, it is a design question to see how you think about the problem

/* 
  Firstly, I want to outline the constraints and requirements from my understanding. There is an events table that 
  can only be indexed by a single column, but we want users to be able to search by multiple fields, and user input 
  is limited to letters and numbers.

  To make this work, I would add a new column that concatenates all the searchable field values together into one 
  string, separated by a delimiter like a pipe. This column would be normalized by trimming white space and making 
  all letters lowercase so the format is consistent. Since input is restricted to letters and numbers, we don’t need 
  to worry about escaping special characters. For example, if I had an event with the name “Concert”, location “Boise”, 
  and year “2025”, the searchable column could store concert|boise|2025. On the backend, the query would use the LIKE operator 
  to match user input against this column, such as:

  SELECT * FROM events WHERE searchable_column LIKE '%concert%' AND searchable_column LIKE '%boise%';

  This keeps the data in a single field, works within the indexing limitation, and still allows the user to search by any of 
  the chosen fields without exposing data that isn’t meant to be searchable.
*/
