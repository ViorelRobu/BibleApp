const controls = document.querySelector('#controls');
const book = controls.querySelector('#book');
const bookChapter = controls.querySelector('#chapter');
const load = controls.querySelector('#load');
const version = controls.querySelector('#version');
const chapter = document.querySelector('#paragraph');

class Bible {
    constructor(bible = 'ro_cornilescu', bookNum = 0, chapterNum = 0) {
        this.bible = bible;
        this.bookNum = bookNum;
        this.chapterNum = chapterNum;
        this.getBookNames();
        this.cache();
        
        window.addEventListener('load', () => {
            this.displayChapter();
            this.getChapterList(0);
        });
        load.addEventListener('click', () => {
            this.change(book.value, bookChapter.value);
        });
        book.addEventListener('change', () => {
            this.getChapterList(book.value);
        });
        version.addEventListener('change', () => {
            this.changeVersion(version.value);
        });
    }

    load() {
        return axios.get(`/bible/json/${this.bible}.json`);
    }

    async cache() {
        this.stream = await this.load();
    }

    async displayChapter() {
        try {
            const stream = await this.load();
            chapter.innerHTML = '';
            let verseNum;
            let i = 1;
            for (let verseData of stream.data[this.bookNum].chapters[this.chapterNum]) {
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
        this.bookNum = book;
        this.chapterNum = chapter;
        this.displayChapter();
    }

    async getBookNames() {
        const stream = await this.load();
        book.innerHTML = '';
        for (let i = 0; i < stream.data.length; i++) {
            const opt = document.createElement('option');
            opt.value = i;
            opt.text = stream.data[i].name;
            if(parseInt(this.bookNum) === i) opt.setAttribute('selected', true);
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

    move(direction) {

    }
}

const bible = new Bible();




