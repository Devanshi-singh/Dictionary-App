const input = document.querySelector('input');
const btn = document.querySelector('button');
const dictionaryArea = document.querySelector('.dictionary-app');

async function dictionaryFn(word) {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await res.json();
    return data[0];
}

btn.addEventListener('click', fetchandCreateCard);

async function fetchandCreateCard() {
    const data = await dictionaryFn(input.value);
    console.log(data);

    let partOfSpeechArray = [];
    for (let i = 0; i < data.meanings.length; i++) {
        partOfSpeechArray.push(data.meanings[i].partOfSpeech);
    }

    // Safe access to audio and example
    const audioSrc = data.phonetics[0]?.audio || '';
    const example = data.meanings[0].definitions[0].example || 'No example available';

    dictionaryArea.innerHTML = `
    <div class="card">
        <div class="property">
            <span>Word:</span>
            <span>${data.word}</span>
        </div>

        <div class="property">
            <span>Phonetics:</span>
            <span>${data.phonetic || 'N/A'}</span>
        </div>

        <div class="property">
            <span>Audio:</span>
            <audio controls src="${audioSrc}"></audio>
        </div>

        <div class="property">
            <span>Definition:</span>
            <span>${data.meanings[0].definitions[0].definition}</span>
        </div>

        <div class="property">
            <span>Example:</span>
            <span>${example}</span>
        </div>

        <div class="property">
            <span>Parts of Speech:</span>
            <span>${partOfSpeechArray.join(', ')}</span>
        </div>
    </div>
    `;
}
