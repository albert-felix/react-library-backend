require("../config/db");

const Book = require("../models/book");
const User = require("../models/user");


const seedBooks = () => {
  const bookData = [
    {
      title: "The Power of your Subconscious Mind",
      author: "Joseph Murphy",
      copies: 5,
      description:
        "It is an awesome book... psychological aspects of mind is expressed in an understandable manner.",
      ISBN: "978-8192910963"
    },
    {
      title: "Think and Grow Rich",
      author: "Napoleon Hill",
      copies: 5,
      description:
        "Think and Grow Rich by Napoleon Hill is one of the bestselling motivational books of all-time. Inspired by a suggestion from industrialist Andrew Carnegie, Hill explains the philosophy that helped the wealthiest and most accomplished members of society succeed.",
      ISBN: "123-456"
    },
    {
      title: "Word Power Made Easy",
      author: "Norman Lewis",
      copies: 5,
      description:
        "A core book about English language and correct word usage; those who are preparing to sit for CAT, GMAT, GRE, TOEFL and other such examinations would definitely stand to greatly benefit from this book. Anybody who wants to improve one's vocabulary will also find it very useful.",
      ISBN: "978-8183071000"
    },
    {
      title: "The Girl in Room 105",
      author: "Chetan Bhagat",
      copies: 5,
      description: "This is not a love story. It is an unlove story.",
      ISBN: "978-1542040464"
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      copies: 5,
      description:
        "Paulo Coelho's enchanting novel has inspired a devoted following around the world. This story, dazzling in its powerful simplicity and inspiring wisdom, is about an Andalusian shepherd boy named Santiago who travels from his homeland in Spain to the Egyptian desert in search of a treasure buried in the Pyramids. Along the way he meets a Gypsy woman, a man who calls himself",
      ISBN: "978-8172234980"
    }
  ];

  bookData.forEach(item => {
    const book = new Book({
      title: item.title,
      author: item.author,
      copies: item.copies,
      description: item.description,
      ISBN: item.ISBN
    });

    book
      .save()
      .then(console.log)
      .catch(console.error);
  });
};

const clearBooks = () => {
  Book.remove({})
    .then(console.log)
    .catch(console.error);
};

const clearUsers = () => {
  User.remove({})
  .then(console.log)
  .catch(console.error)
};

// clearBooks();
// seedBooks();
// clearUsers();