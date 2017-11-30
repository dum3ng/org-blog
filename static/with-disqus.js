// this js file will only appear in the level 2 page, i.e the post page.

document.addEventListener('readystatechange', (e) => {
  if (e.target.readyState==='interactive'){
    var postamble = document.getElementById('postamble');
    var disqus = document.createElement('div');
    disqus.id = 'disqus_thread';

    postamble.prepend(disqus);

var disqus_config = function () {
this.page.url = window.location.href;  // Replace PAGE_URL with your page's canonical URL variable
this.page.identifier = window.location.pathname; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};

(function() { // DON'T EDIT BELOW THIS LINE
var d = document, s = d.createElement('script');
s.src = 'https://keepon-today-org-blog.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();


  }
} );
