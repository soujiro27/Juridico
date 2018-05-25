var menuActive = true;

function menu(b){
	b.childNodes[1].classList.toggle('menu-active-li')
	b.childNodes[1].childNodes[5].classList.toggle('menu-arrow-active')
	b.childNodes[3].classList.toggle('menu-active')
}

