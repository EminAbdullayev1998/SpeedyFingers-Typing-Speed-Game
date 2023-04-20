let time = document.querySelector('#time');
let resetButton1 = document.querySelector('#reset1');
let resetButton2 = document.querySelector('#reset2');
let scoreModal = document.querySelector('#scoreModal');
let scoreP = document.querySelector('#scoreP');
let wordsBox = document.querySelector('.words-box');
let input = document.querySelector('input');


// zaman deyiskeni
let vaxt = 60;

// zamanin azalmasi ve 0 olduqda score modalinin acilmasi ve inputun disabled olmasi
let timer = setInterval(()=>{
   vaxt--;
   time.innerText = `${vaxt}`;

   if (vaxt === 0) {
      clearInterval(timer);
      input.disabled = true;
      scoreModal.style.display = 'block';
   }

}, 1000);


//  hero boxun icerisindeki reset butonu
 resetButton1.onclick = ()=>{
    window.location.reload();
    vaxt = 60;
    time.innerText = '60';
 };

//  modalin icerisindeki reset butonu
 resetButton2.onclick = ()=>{
    window.location.reload();
    vaxt = 60;
    time.innerText = '60';
    scoreModal.style.display = 'none';
    input.disabled = false;
 };



    let score = 0;
    let words = [];

   // butun datani fetch elemek
   fetch('http://localhost:5000/words')
    .then(res => res.json())
    .then(data => {
      words = data;
      showWords(0);
    });


   // function to show the next batch of words
   function showWords(startIndex) {
      // clear the wordsBox element
      wordsBox.innerHTML = '';

      words = shuffle(words);
    
      // 25 sozu gostermek ancaq 
      for (let i = startIndex; i < startIndex + 25; i++) {
        let span = document.createElement('span');
        span.innerText = words[i].word;
        wordsBox.appendChild(span);
      }
    
      // butun spanlari selector ile tutmaq
      let spans = document.querySelectorAll('span');
    
      // birinci soze active class vermek
      let currentWordIndex = 0;
      spans[currentWordIndex].classList.add('active');
    
      // inputa keyup funksiyasi vermek
      input.addEventListener('keyup', ({keyCode}) => {
        let typedWord = input.value.trim().toLowerCase();
    
        if (keyCode === 32) {
          if (typedWord === spans[currentWordIndex].innerText) {
            // duzgun soz olduqda
            spans[currentWordIndex].classList.remove('active');
            spans[currentWordIndex].classList.add('correct');
            score += 1;
            scoreP.innerText = `Your score is ${score}!`;
            currentWordIndex++;
            input.value = '';
            if (currentWordIndex < spans.length) {
              spans[currentWordIndex].classList.add('active');
            } else {
              // hazirki soz span lengthine beraber olduqda novbeti 25 soz gelsin
              showWords(startIndex + 25);
            }
          } else {
            // yanlis soz yazildiqda
            spans[currentWordIndex].classList.remove('active');
            spans[currentWordIndex].classList.add('wrong');
            currentWordIndex++;
            input.value = '';
            if (currentWordIndex < spans.length) {
              spans[currentWordIndex].classList.add('active');
            } else {
              // hazirki soz span lengthine beraber olduqda novbeti 25 soz gelsin
              showWords(startIndex + 25);
            }
          }
        }
      });
   }






   // sozleri random secilmesi kodlari
   function shuffle(array) {
     let currentIndex = array.length;
     let temporaryValue, randomIndex;
   
     // while there remain elements to shuffle
     while (0 !== currentIndex) {
       // pick a remaining element
       randomIndex = Math.floor(Math.random() * currentIndex);
       currentIndex -= 1;
   
       // swap it with the current element
       temporaryValue = array[currentIndex];
       array[currentIndex] = array[randomIndex];
       array[randomIndex] = temporaryValue;
     }
   
     return array;
   }



