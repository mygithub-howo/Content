var arr=[];
var forEach=arr.forEach;
var contacts=[
	{id:1001,name:'ace',phone:'13533367831'},
	{id:1002,name:'luffy',phone:'18488668651'},
	{id:1003,name:'frank',phone:'13922588341'},
	{id:1004,name:'kaku',phone:'19998566573'},
	{id:1005,name:'luqi',phone:'18333666523'},
	{id:1006,name:'kuzan',phone:'13233215678'},
	{id:1007,name:'sanji',phone:'16726162761'},
	{id:1008,name:'nant',phone:'18762187621'},
	{id:1009,name:'solo',phone:'18376823642'},
	{id:1010,name:'chenglufei',phone:'18425152219'}
]

if(localStorage.contacts){
	var contacts=JSON.parse(localStorage.contacts)
}else{
	localStorage.contacts=JSON.stringify(contacts)
}
//创建一个对象
var dict = {};
contacts.forEach(function(v) {
	var k = v.name[0].toUpperCase();//获取name第一个字母，并转化为大写
	if (!dict[k]) {
		dict[k] = [];	
	};
	dict[k].push(v);	//将获取到的DOM对象放进首字母对应的数组里
})

//根据首字母进行排序
var zimuliebiao = Object.keys(dict).sort();
var $findList = document.querySelector('.findlist');
// var $container=document.querySelector('.container');
var $contacts=document.querySelector('.contacts')
var $ul = $findList.firstElementChild;
zimuliebiao.forEach(function(v){
	var li = document.createElement('li');
	var dl = document.createElement('dl');
	var dt = document.createElement('dt');
	li.innerHTML = '<a href="#'+v+'">'+v+'</a>';
	dt.innerHTML=v;
	dt.id=v;
	$contacts.appendChild(dt);
	var data = dict[v];
	data.forEach(function(v){
		var dd = document.createElement('dd');
		dd.setAttribute('data-id',v.id)
		var p1=v.phone.slice(0,3);
		var p2=v.phone.slice(3,7);
		var p3=v.phone.slice(7)
		dd.innerHTML='<h5 class="name">'+v.name+'</h5><h6 class="phone">'+p1+'－'+p2+'－'+p3+'</h6>'
		$contacts.appendChild(dd);
	})
	$ul.appendChild(li);
	// $container.appendChild(dl);
})
$findList.style.height = $ul.offsetHeight + 'px';

var $tips=document.querySelector('.tips')
$contacts.addEventListener('touchstart',function(e){
	var el = e.target;
	var id;
	if (el.nodeName=='H5' || el.nodeName=='H6' ) {
		id=el.parentElement.getAttribute('data-id')

	}else if ( el.nodeName==='DD') {
		id = el.getAttribute('data-id');
	}
	// var	value=contacts.filter(function(v){
	// 	return v.id=id;
	// })
	if (el.nodeName=='H5' || el.nodeName=='H6' ||el.nodeName==='DD'){
		$tips.style.display='block';
		id = Number(id)
		var tmp = contacts.filter(function(v){
			return v.id === id;
		})
		var data = tmp[0];
		$tips.querySelector('.name').innerHTML=data.name;
		$tips.querySelector('.phone').innerHTML=data.phone;
	}
		
})

var $calcle=document.querySelector('.cancle');
$calcle.addEventListener('touchstart',function(e){
	$tips.style.display='none';
})
$tips.addEventListener('touchstart',function(e){
	$tips.style.display='none';
})
$tips.firstElementChild.addEventListener('touchstart',function(e){
	var el=e.target;
	if (el.classList.contains('name') || el.classList.contains('phone')) {
		edithandler.call(el,e)
	}
	e.stopPropagation();
})
var $add=document.querySelector('.add');
$add.addEventListener('touchstart',function(e){
	$tips.style.display='block';
	$tips.querySelector('.name').innerHTML=null;
	$tips.querySelector('.phone').innerHTML=null;
})
var edithandler = function(e){
		if (this.classList.contains('editing')) {
			this.innerHTML=this.querySelector('input').value;
			this.classList.remove('editing');
		}else{
			this.classList.add('editing')
			this.innerHTML='<input type="text" value='+this.innerHTML+'>'
		}
		e.stopPropagation();
}
var $done = document.querySelector('.done');
$done.addEventListener('touchstart',function(e){
	var el=e.target;
	var gname=el.parentElement.parentElement.parentElement.querySelector('.name')
	var gphone=el.parentElement.parentElement.parentElement.querySelector('.phone')
	var key = gname.getAttribute('data-role');
	var key1 = gphone.getAttribute('data-role');
	var value1 = gname.innerHTML;
	var value2 = gphone.innerHTML;
	console.log(key,key1,value1,value2);
})
// var updateinfo=function(k,k1,v1,v2){
// 	ver tmp = contains.filter(function(v){
// 		v.id = 
// 	})
// }