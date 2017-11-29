var { h, create} = virtualDom;
// CATEGORIES
const CATEGORIES = {
  'web': ['javascript', 'css', 'clojurescript'],
	'system': ['linux'],
	'server': ['swift', 'python', 'node', 'clojure']
};

const repo = '/org-blog/';

/**
 * @param  {String} url to parse
 * @return {Dict}
 */
var getCategoryInfo = function(url) {
	var reg = /\/org-blog\/(.+)\/(.+)\//;
	var result = url.match(reg);
	result = result ? result : {};
	var cat = result[1] ? result[1] : Object.keys(CATEGORIES)[0];
	var sub = result[2] ? result[2] : CATEGORIES[cat][0];
	return {category: cat, sub: sub};
};
//--dom manipulations---

var addHeader = function() {
 
    var ele = document.createElement('div')
    ele.innerHTML = '<div id="header"><span class="home header-link">'+
      '<a href="/org-blog">home</a></span>'+
      ' <span class="up header-link"><a href="./theindex.html"> up</a></span></div>'
    var body = document.body
    body.prepend(ele)
    document.removeEventListener('readystatechange', addHeader)
 

};


var createAvatar = function() {
	var url = 'https://secure.gravatar.com/avatar/c18af877228e0835c931837c71c28b88?s=800&d=identicon';
	return h('.avatar-wrap.col', [h('img.avatar', {src: url})]);
};

var createSidebar = function() {
	var avatar = createAvatar();
	var cats = [];
	for(let c in CATEGORIES) {
		// the category link will goto the first sub category index page
		let link = repo + c + '/' + CATEGORIES[c][0] + '/theindex.html';
		cats.push(h('a', {href: link},  [h('.category.bg-danger.text-right', [c])]));
	}
	var catsWrap = h('.categories', cats);
	return h('.col-3', [h('.row.flex-column.sidebar.bg-primary',
				[avatar, h('.col'), catsWrap])] );
};

var createSubs = function(cat) {
	var subcats = CATEGORIES[cat];
	var subs = [];
	for(let s of subcats) {
		let link = repo + cat + '/' + s + '/theindex.html';
		subs.push(h('a.col.sub-category.text-center.text-secondary', {href: link}, 
					[s]));
	}
	return h('.row.subs.bg-primary',  subs);
};
//---- add sidebar and submenu
//var init = h('div')
//var root = create(init)
var createMain = function() {
	var url = window.location.pathname;
	var cat = getCategoryInfo(url).category;
	var subs = createSubs(cat);
	return h('.col-9.scroll', [h('.row.main.flex-column#main-content', [subs])]);
}
var makePage = function() {
	var sidebar = createSidebar();
	var mainContent = createMain();
	var page = h('.container-fluid', [h('.row.page', [sidebar, mainContent])]);

	var root = create(page);
	document.body.appendChild(root);


	// -- mount the content div into new position
	var content = document.getElementById('content');
	var postamble = document.getElementById('postamble');
	var mainContent = document.getElementById('main-content');
	mainContent.appendChild(content);
	mainContent.appendChild(postamble);
};

var reform = function(e) {
	 if (e.target.readyState==='interactive'){
	 	//addHeader();
	 	makePage();
	 }
}

document.addEventListener('readystatechange', reform );
