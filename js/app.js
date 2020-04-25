const chapter = document.querySelector('#paragraph');

async function getBible() {
    try {
        const bible = await axios.get('/bible/json/ro_cornilescu.json');
        chapter.innerHTML = '';
        let i = 1;
        for (let verseData of bible.data[0].chapters[0]) {
            const verse = document.createElement('div');
            verse.classList.add('verse');
            verseNum = String(i);
            verse.innerHTML = `${verseNum}). ${verseData}`;
            chapter.append(verse);
            i++;
        }
    }catch(err) {
        console.log('We got an error!', err);
    }
}
getBible();