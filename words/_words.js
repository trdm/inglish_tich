// _words.js
var gArticleTitle = '';
// trdm  2023-06-08 17:41:47 
function onLoad() 
{
    var vTitleEls = document.getElementsByTagName('title');
	var vTitle = '';
    if (vTitleEls && vTitleEls.length > 0) {
        //alert(vTitle[0].outerText);
		vTitle = vTitleEls[0].outerText;
    }
	if(vTitle.length > 0) {
		var vCollect = document.getElementsByClassName('dsl_headwords');
		if(vCollect && vCollect.length > 0) {
			var vTitleCap = vCollect[0];
			//vTitleCap - вот тут и управляем элементами.
			// надо добавить: <p>vacancy <img src="icons/collapse_opt.png" class="hidden_expand_opt" id="hidden_expand_opt" onclick="gExpandOptPart()" alt="[-]"></p>
			var pEl = ''; //vCollect[0].childNodes.item(1);
			var idx = vTitleCap.childNodes.length;
			for(var i = 0; i< vTitleCap.childNodes.length; i++) {
            //}			while(vTitleCap.childNodes.length > 0) {
				pEl = vTitleCap.childNodes.item(i);
				if(pEl.nodeName == 'P' || pEl.nodeName == 'p') {
					try { 
					pEl.remove();                
                    } catch(e) {
						vTitleCap.removeChild(pEl); // oldwebkit
                    }
                }
            }
			var newEl = document.createElement('p');
			newEl.innerHTML = ""+vTitle+' <img src="icons/collapse_opt.png" class="hidden_expand_opt" id="hidden_expand_opt" onclick="gExpandOptPart()" alt="[-]">';
			try { 
				vTitleCap.append(newEl);
            } catch(e) {
				vTitleCap.appendChild(newEl); // oldwebkit
            }
        }
    }
	//dsl_headwords
    var vRetVal = '';
    return vRetVal;
}

function gExpandOptPart() { 
    var d1 = document.getElementById('hidden_expand_opt');
    var i = 0;
	var vSetDisplay = '';
    if ( d1.alt == '[+]' ) 
    {
        d1.alt = '[-]';
        d1.src = 'icons/collapse_opt.png';
		vSetDisplay = 'inline';
    }
    else 
    {
        d1.alt = '[+]';
        d1.src = 'icons/expand_opt.png';
        vSetDisplay = 'none';
    }
	var vCollect = document.getElementsByClassName('dsl_opt');
	if(vCollect && vCollect.length > 0 ) {
		for ( i = 0; i < vCollect.length; i++ ) 
		{
			var d2 = vCollect[i];
			
			if ( !d2 ) {
				break;
			}
			
			d2.style.display = vSetDisplay;
		}
	}

}
document.addEventListener("DOMContentLoaded", onLoad);
//E:\Projects\chm\__web\learn.javascript.ru\javascript.ru.html

