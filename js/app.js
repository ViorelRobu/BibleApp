const controls = document.querySelector('#controls');
const book = controls.querySelector('#book');
const bookChapter = controls.querySelector('#chapter');
const load = controls.querySelector('#load');
const version = controls.querySelector('#version');
const chapter = document.querySelector('#paragraph');
const forward = document.querySelector('#forward');
const back = document.querySelector('#back');

class Bible {
    constructor(bible = 'ro_cornilescu', bookNum = 0, chapterNum = 0) {
        this.bible = bible;
        this.bookNum = bookNum;
        this.chapterNum = chapterNum;
        this.load();
        
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

    request() {
        return axios.get(`/bible/json/${this.bible}.json`);
    }

    async load() {
        try {
            this.stream = await this.request();
            this.displayChapter();
            this.getBookNames();
            this.getChapterList(this.bookNum);
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    displayChapter() {
        chapter.innerHTML = '';
        let verseNum;
        let i = 1;
        for (let verseData of this.stream.data[this.bookNum].chapters[this.chapterNum]) {
            const verse = document.createElement('div');
            verse.classList.add('verse');
            verseNum = String(i);
            verse.innerHTML = `${verseNum}. ${verseData}`;
            chapter.append(verse);
            i++;
        }
        
    }

    change(book, chapter) {
        this.bookNum = book;
        this.chapterNum = chapter;
        this.displayChapter();
    }

    getBookNames() {
        book.innerHTML = '';
        for (let i = 0; i < this.stream.data.length; i++) {
            const opt = document.createElement('option');
            opt.value = i;
            opt.text = this.stream.data[i].name;
            if (parseInt(this.bookNum) === i) opt.setAttribute('selected', true);
            book.append(opt);
        }
    }

    getChapterList(book) {
        bookChapter.innerHTML = '';
        for (let i = 0; i < this.stream.data[book].chapters.length; i++) {
            const opt = document.createElement('option');
            opt.value = i;
            opt.text = i + 1;
            if (parseInt(this.chapterNum) === i) opt.setAttribute('selected', true);
            bookChapter.append(opt);
        }
    }

    changeVersion(version) {
        this.bible = version;
        this.load();
    }
}

const bible = new Bible();




