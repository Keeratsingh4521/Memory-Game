const Cards = document.querySelectorAll(".card");
let matchCard = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipcard(e) {
    let clickedCard = e.target; // getting user clicked card

    // Prevents flipping the same card or flipping if the deck is disabled
    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");

        // If no card is flipped, assign clickedCard to cardOne
        if (!cardOne) {
            return cardOne = clickedCard; // Set cardOne and exit the function
        }

        cardTwo = clickedCard; // Assign clickedCard to cardTwo
        disableDeck = true; // Disable further flips until comparison is done

        // Get the image sources of both cards
        let cardOneImg = cardOne.querySelector("img").src;
        let cardTwoImg = cardTwo.querySelector("img").src;

        // Compare the two cards
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) { // If the images match
        matchCard++; // Increment matched value by one

        if (matchCard == 8) {
            setTimeout(() => {
                shuffleCard(); // Calling shuffleCard function after 1 sec
            }, 1000);
        }

        cardOne.removeEventListener("click", flipcard);
        cardTwo.removeEventListener("click", flipcard);

        // Reset the card variables and enable the deck
        cardOne = cardTwo = null;
        disableDeck = false; // Allow flipping more cards
    } else {
        // If the images don't match, shake and flip them back after delays
        setTimeout(() => {
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake");
        }, 400);

        setTimeout(() => {
            cardOne.classList.remove("shake", "flip");
            cardTwo.classList.remove("shake", "flip");

            // Reset the card variables and enable the deck
            cardOne = cardTwo = null;
            disableDeck = false;
        }, 1200);
    }
}

function shuffleCard() {
    matchCard = 0;
    cardOne = cardTwo = null;
    
    // Creating an array of 16 items where each item is repeated twice
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    
    // Shuffling array randomly
    arr.sort(() => Math.random() - 0.5); // Correct random sorting

    // Assigning images to cards
    Cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `images/img-${arr[index]}.png`;
        card.addEventListener("click", flipcard); // Re-enable click listener
    });
}

// Add the click event listener to each card
Cards.forEach(card => {
    card.classList.add("flip");
    card.addEventListener("click", flipcard);
});

// Call shuffleCard to initialize the game
shuffleCard();
