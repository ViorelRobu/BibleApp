const controls = document.querySelector('#controls');
const book = controls.querySelector('#book');
const bookChapter = controls.querySelector('#chapter');
const load = controls.querySelector('#load');
const version = controls.querySelector('#version');
const chapter = document.querySelector('#paragraph');

class Bible {
    constructor(bible = 'ro_cornilescu', bookNum = 0, chapterNum = 0, win = window, loadApp = load, bookApp = book, versionApp = version) {
        this.bible = bible;
        this.bookNum = bookNum;
        this.chapterNum = chapterNum;
        this.win = win;
        this.loadApp = loadApp;
        this.bookApp = bookApp;
        this.versionApp = versionApp;

        this.win.addEventListener('load', () => {
            this.displayChapter();
            this.getChapterList(0);
        });

        this.loadApp.addEventListener('click', () => {
            this.change(this.bookApp.value, bookChapter.value);
        });

        this.bookApp.addEventListener('change', () => {
            this.getChapterList(this.bookApp.value);
        });

        this.versionApp.addEventListener('change', () => {
            this.changeVersion(version.value);
        })
    }

    load() {
        return axios.get(`/bible/json/${this.bible}.json`);
    }

    async displayChapter() {
        try {
            const stream = await this.load();
            this.getBookNames();
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

    change(bookNum, chapterNum) {
        this.bookNum = bookNum;
        this.chapterNum = chapterNum;
        this.displayChapter();
    }

    async getBookNames() {
        const stream = await this.load();
        this.bookApp.innerHTML = '';
        for (let i = 0; i < stream.data.length; i++) {
            const opt = document.createElement('option');
            opt.value = i;
            opt.text = stream.data[i].name;
            this.bookApp.append(opt);
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

const bible = new Bible();




