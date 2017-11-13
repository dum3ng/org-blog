var handler = function(e) {
  var title = document.querySelector('h1.title').innerText.toLocaleLowerCase()
  if(document.readyState === 'interactive' ) {
    document.removeEventListener('readystatechange', handler)
    var links = document.querySelectorAll('.org-ul a')
    links.forEach(function(link) {
      var href = link.getAttribute('href')
      link.setAttribute('href', '../'+ title+'/'+href)
    })
  }
}
document.addEventListener('readystatechange', handler)
