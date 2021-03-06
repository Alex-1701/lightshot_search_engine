const addressGenerator = (alphabet, lenght) => {
    const addresSpace = charCombinations(alphabet, lenght);
    return addresSpace;
}

module.exports = { addressGenerator };

/*
 * Generate all possible combinations from a list of characters for a given length
 */
function* charCombinations(chars, minLength, maxLength) {
    chars = typeof chars === "string" ? chars : "";
    minLength = parseInt(minLength) || 0;
    maxLength = Math.max(parseInt(maxLength) || 0, minLength);

    //Generate for each word length
    for (i = minLength; i <= maxLength; i++) {

        //Generate the first word for the password length by the repetition of first character.
        word = (chars[0] || "").repeat(i);
        yield word;

        //Generate other possible combinations for the word
        //Total combinations will be chars.length raised to power of word.length
        //Make iteration for all possible combinations
        for (j = 1; j < Math.pow(chars.length, i); j++) {

            //Make iteration for all indices of the word
            for (k = 0; k < i; k++) {

                //check if the current index char need to be flipped to the next char.
                if (!(j % Math.pow(chars.length, k))) {

                    // Flip the current index char to the next.
                    let charIndex = chars.indexOf(word[k]) + 1;
                    char = chars[charIndex < chars.length ? charIndex : 0];
                    word = word.substr(0, k) + char + word.substr(k + char.length);
                }
            }

            //Re-oder not neccesary but it makes the words are yeilded alphabetically on ascending order.
            yield word.split("").reverse().join("");
        }
    }
}

