const emojiSearchInput = document.getElementById("emoji-search");
const emojiDisplayArea = document.getElementById("emoji-display");
const emojiFilterContainer = document.getElementById("emoji-filter");

emojiFilterContainer.addEventListener("click", (event) => {
    const clickedButton = event.target.closest(".filter-button");
    
    if (clickedButton) {
        event.preventDefault();
        const selectedCategory = clickedButton.getAttribute("data-category");
        applyFilter(selectedCategory);
    }
});

const applyFilter = (category) => {
    let filteredEmojis;

    if (category.toLowerCase() === "all") {
        filteredEmojis = emojiList;
    } else {
        filteredEmojis = emojiList.filter(emoji => {
            return emoji.description.toLowerCase().includes(category.toLowerCase()) ||
                   emoji.aliases.some(alias => alias.toLowerCase().startsWith(category.toLowerCase())) ||
                   emoji.tags.some(tag => tag.toLowerCase().startsWith(category.toLowerCase()));
        });
    }

    renderEmojis(filteredEmojis);
};

const renderEmojis = (emojis = emojiList) => {
    emojiDisplayArea.innerHTML = "";
    emojis.forEach(emoji => {
        const emojiElement = document.createElement("div");
        const emojiCharacter = document.createElement("span");
        emojiCharacter.style.width = "50px";
        emojiCharacter.style.fontSize = "50px";
        emojiCharacter.innerText = emoji.emoji;
        emojiCharacter.classList.add('animate__animated', 'animate__backInDown');
        emojiCharacter.style.cursor = "pointer";
        emojiDisplayArea.append(emojiCharacter);
    });
};

window.addEventListener("load", () => {
    renderEmojis(emojiList);
});

emojiSearchInput.addEventListener('keyup', (event) => {
    const searchValue = event.target.value;
    applyFilter(searchValue);
});

emojiDisplayArea.addEventListener("click", (event) => {
    navigator.clipboard.writeText(event.target.innerText);
    alert("Emoji copied to clipboard!");
    console.log(event.target);
});