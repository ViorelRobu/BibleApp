const chapter = document.querySelector('#paragraph');

class Bible {
    constructor(bible, book = 0, chapter = 0) {
        this.bible = bible;
        this.book = book;
        this.chapter = chapter;
    }

    load() {
        return axios.get(`/bible/json/${this.bible}.json`);
    }

    async displayChapter() {
        const stream = await this.load();
        chapter.innerHTML = '';
        let verseNum;
        let i = 1;
        for (let verseData of stream.data[this.book].chapters[this.chapter]) {
            const verse = document.createElement('div');
            verse.classList.add('verse');
            verseNum = String(i);
            verse.innerHTML = `${verseNum}. ${verseData}`;
            chapter.append(verse);
            i++;
        }
    }

    change(book, chapter) {
        this.book = book;
        this.chapter = chapter;
        this.displayChapter();
    }
}

const bible = new Bible('ro_cornilescu', 1, 2);
bible.displayChapter();