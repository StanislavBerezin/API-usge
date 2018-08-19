
var div = document.createElement('div');
div.innerHTML = "my <b>new</b> skill - <large>DOM maniuplation!</large>";
// set style
div.style.color = 'red';
// better to use CSS though - just set class
div.setAttribute('class', 'myclass'); // and make sure myclass has some styles in css
document.body.appendChild(div);
news.forEach(key => {
    console.log(key)
});