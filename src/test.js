const fetchingData = (word, setMeaning) => {
    fetch(`https://ru.wiktionary.org/w/api.php?action=query&titles=${word}&prop=revisions&rvprop=content&origin=*&rvslots=*&format=json`)
    .then(res => res.json())
    .then(json => {
        const currentWord = json.query.pages[Object.keys(json.query.pages)[0]]
        if (currentWord.missing === ""){
            console.log("Слова не существует");
        } else {
            console.log(currentWord.title)
            
            const unformatedString = currentWord.revisions[0].slots.main['*'].split("\n").join(' ')

            const meaningRegex = new RegExp(/==== Значение ====.*?====/)

            const unformatedMeaningString = unformatedString.match(meaningRegex)[0]

            const nextRegex = new RegExp(/==== Значение ====|====/g) //нужно изменить название

            const meaningStringWithTags = unformatedMeaningString.replace(nextRegex, '');

            const meaningArr = meaningStringWithTags.split("#");

            const masRegex = new RegExp(/\s{2,}|^\s|\s$|\[|\]|\{|\}|ru|выдел\|/g);

            // const tagObject = {"зоол.|" : "зоологическое значение",
            //                     "разг.|": "разговорное значение"}

            const finalArr = meaningArr.map(elem => elem.replace(masRegex, '')).filter(elem => elem !== "")

            const test = finalArr.map(elem => elem.split("пример|"))

            // const objectCreator = (arr) => {
            //     let key = 0;
            //     let obj = {};
            //     arr.forEach(elem => {
            //         obj["definition"+key] = elem;
            //         key++;
            //     });
                


            //     return obj;
            // }

            console.log(test)

            const list = test.map((elem, index) => (
                <div key={index}>
                    <p>{(index+1)+": "+elem[0]}</p>
                    {elem[1] !== '' && elem.length !== 1 ? <p><b>Пример:</b> {elem[1]}</p> : <p>Пример отсутствует!</p>}
                </div>
            ))

            setMeaning(list)
        }
    })
    .catch(e => setMeaning(<p>Слова нет в нашей базе :c</p>))
}

export default fetchingData;
