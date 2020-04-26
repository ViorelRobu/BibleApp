const controls = document.querySelector('#controls');
const book = controls.querySelector('#book');
const bookChapter = controls.querySelector('#chapter');
const load = controls.querySelector('#load');
const version = controls.querySelector('#version');

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
        try {
            const stream = await this.load();
            this.getBookNames(stream.data);
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
        } catch (e) {
            console.log('Error: ', e);
        }
        
    }

    change(book, chapter) {
        this.book = book;
        this.chapter = chapter;
        this.displayChapter();
    }

    async getBookNames() {
        const stream = await this.load();
        book.innerHTML = '';
        for (let i = 0; i < stream.data.length; i++) {
            const opt = document.createElement('option');
            opt.value = i;
            opt.text = stream.data[i].name;
            book.append(opt);
        }
    }

    async getChapterList(book) {
        try {
            const stream = await this.load();
            bookChapter.innerHTML = '';
            for (let i = 0; i < stream.data[book].chapters.length; i++) {
                const opt = document.createElement('option');
                opt.value = i;
                opt.text = i + 1;
                bookChapter.append(opt);
            }
        } catch (e) {
            console.log('Error: ', e);
        }
    }

    changeVersion(version) {
        this.bible = version;
        this.displayChapter();
        this.getBookNames();
    }
}

const bible = new Bible('ro_cornilescu');

window.addEventListener('load', () => {
    bible.displayChapter();
    bible.getChapterList(0);
})

load.addEventListener('click', () => {
    bible.change(book.value, bookChapter.value);
});

book.addEventListener('change', () => {
    bible.getChapterList(book.value);
});

version.addEventListener('change', () => {
    bible.changeVersion(version.value);
})


