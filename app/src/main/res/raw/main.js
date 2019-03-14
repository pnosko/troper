String.prototype.trim=function(){return this.replace(/^\s+/g,'').replace(/\s+$/g,'');}
String.prototype.csv=function(){return this.replace(/\s+/g,',');}
function object(objectId){if(document.getElementById&&document.getElementById(objectId)){return document.getElementById(objectId);}else if(document.all&&document.all(objectId)){return document.all(objectId);}else if(document.layers&&document.layers[objectId]){return document.layers[objectId];}else{return false;}}
/*only used for ajax */
var blockreq;
function blockloaded(){return blockreq.status==200;}
function reqok(){return(blockreq&&blockloaded());}
function sendurl(url){delete blockreq;if(window.XMLHttpRequest){blockreq=new XMLHttpRequest();blockreq.open("get",url,false);blockreq.send(null);}else if(window.ActiveXObject){try{blockreq=new ActiveXObject("Msxml2.XMLHTTP");}catch(e1){try{blockreq=new ActiveXObject("Microsoft.XMLHTTP");}catch(e2){}}if(blockreq){blockreq.open("get",url,false);blockreq.send();}}}
function getNodeValue(obj,nodeName){var st="";if(obj.hasChildNodes()){var i=0;while((st=="")&&(i<obj.childNodes.length)){if(!obj.childNodes[i].firstChild)return"";st=(obj.childNodes[i].nodeName==nodeName)?obj.childNodes[i].firstChild.nodeValue:getNodeValue(obj.childNodes[i],nodeName);i++;}}return st.trim();}
/* only used for ajax ends */
function setwatch(entry){url="http://tvtropes.org/pmwiki/watchlist.php?action=watch&entry="+entry;sendurl(url);if(blockreq&&blockloaded()){object('watchmsg').innerHTML+='<span class="asscaps">'+blockreq.responseText+'</span>';object('watchmsg2').innerHTML+='<span class="asscaps">'+blockreq.responseText+'</span>';}}
function dropwatch(entry){url="http://tvtropes.org/pmwiki/watchlist.php?action=dropwatch&entry="+entry;sendurl(url);if(blockreq&&blockloaded()){object('watchmsg').innerHTML+='<br/><span class="asscaps">'+blockreq.responseText+'</span>';object('watchmsg2').innerHTML+='<br/><span class="asscaps">'+blockreq.responseText+'</span>';}}
/* only used when editing */
function unlock(page) {	var url = "http://"+window.location.hostname; url += "/pmwiki/unlock.php?pagename="+page;sendurl(url);	var rd = ""+window.location.href;rd = rd.replace('?action=edit', '');window.location.href = rd;}
function checkauthor(event){var authorinput=object("authorinput");var author=""+authorinput.value;author=author.trim();if(author==""){object("inputform").action="#";object("inputmessage").innerHTML="please make up a wiki handle";authorinput.focus();return false;} return true;}
function do_preview(){object('source').value=object('editarea').value;return false;}
/* edit-only ends */
function togglepanel(id){closeall(id);var ele=object(id);if(ele.style.display=='none')ele.style.display='block';else ele.style.display='none';}
function closeall(id){if(!object('wikileftpage'))return;var divs=object('wikileftpage').getElementsByTagName('div');for(var i=0;i<divs.length;i++){if(divs[i].id!=id&&divs[i].getAttribute('iscat')=='true') divs[i].style.display='none';}}
function getselection(pulldown){var st="";for(var i=0;i<pulldown.options.length;i++)if(pulldown.options[i].selected){if(pulldown.options[i].value)st=pulldown.options[i].value;else st=pulldown.options[i].text;break;} return st;}
function createanchor(subject,url){subject.setAttribute('href',url);}
function findfor(){var target=""+object('findfor').value;if(target=="")return;window.location.href='http://tvtropes.org/pmwiki/el.php?findfor='+target;}
function toggleinline(anchor){var tgt=anchor.getElementsByTagName('div')[0];if(tgt.style.display=='none')tgt.style.display='inline';else tgt.style.display='none';} var last_toggle='none';function toggleAllFolders(){var divs=window.document.getElementsByTagName('div');for(var i=0;i<divs.length;i++){if(divs[i].getAttribute('isfolder')=='true') if(last_toggle=='block')divs[i].style.display='none';else divs[i].style.display='block';} last_toggle=(last_toggle=='block'?'none':'block');}
function togglefolder(id){var ele=object(id);if(ele.style.display=='none') ele.style.display='block';else ele.style.display='none';}
function setAllFolders(how){var way=""+how;if(way=="")way="none";if(way=="closed")way="none";if(way=="open")way="block";var divs=window.document.getElementsByTagName('div');for(var i=0;i<divs.length;i++){if(divs[i].getAttribute('isfolder')&&divs[i].getAttribute('isfolder')=='true') divs[i].style.display=way;var thisClass=""+divs[i].getAttribute('class');if(thisClass=='folderlabel'){var thelabel=""+divs[i].innerHTML;if(thelabel.indexOf('open/close all folders')!=-1)divs[i].setAttribute('class','folderlabelopen');}}last_toggle=way;}if(top.location!=location){top.location.href=document.location.href;}