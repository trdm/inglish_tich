// trdm 2022-02-06 12:05:41  
// чистим html файлы текущего каталога от скриптов и стилей с добавлением фрагментов...
//имя файла: E:\Документы\Литература\_English\__СловарныйЗАпас\Add\_clean.js
var gFso = new ActiveXObject("Scripting.FileSystemObject");
var gWsh = new ActiveXObject("WScript.Shell");
var gCurrPath = '';
var gFilePatApendix; // = '2.html';


function strEndWithThis(psStrSrc, psEnd) {
	var vRetVal = false;
	var vLastIdx = psStrSrc.lastIndexOf(psEnd);
	if(vLastIdx != -1) {
		var vTl = vLastIdx + psEnd.length;
		if(psStrSrc.length == vTl) {
			var vRetVal = true;
        }
    }	
	return vRetVal;
}

// trdm  2022-02-06 11:05:24 
function cleanFileTextGet(psPath) {
	var vRetVal = '';
	var vFile = gFso.GetFile(psPath);
	if(vFile.Size == 0) {
		return vRetVal;
    }
	var vFileTs = vFile.OpenAsTextStream(1);//,-1);
	vRetVal = vFileTs.ReadAll();
	
	return vRetVal;
}
// trdm  2022-02-06 11:05:24 
function cleanFileTextSet(psPath, psText) {
	var vRetVal = '';
	var vPath = psPath+gFilePatApendix;
	var vFile;
	try { 
		vFile = gFso.CreateTextFile(vPath,true);
    } catch(e) {
		return '';
    }
	vFile.Write(psText);
	vFile.Close();
	try { 		//WScript.Echo(vPath);
    } catch(e) {
    }
	return vRetVal;
}

// trdm  2022-02-06 11:39:01 
function cleanFileTextFromTag( psText, psTagName ) {
	var vRetVal = psText;
	var vTagNameStart = "<"+psTagName+" ";
	var vTagNameEnd = "</"+psTagName+">";
	var vPos1 = -1, vPos2 = -1;
	var vText = '';
	while(vRetVal.indexOf(vTagNameStart) > -1) {
    	// break; continue;
		vPos1 =	vRetVal.indexOf(vTagNameStart);
		vPos2 =	vRetVal.indexOf(vTagNameEnd);
		vText = '';
		if(vPos1 > 0 && vPos2 > 0) {
			vText = vRetVal.substr(0,vPos1);
			vText  = vText + vRetVal.substr(vPos2+vTagNameEnd.length);
			vRetVal = vText;
		}		
    }
	
	return vRetVal;
}

// trdm  2022-02-06 11:04:13 
function cleanFile(psPath) {
	var vRetVal = cleanFileTextGet(psPath);
	var vLen1 = vRetVal.length; 
	vRetVal = cleanFileTextFromTag(vRetVal,'style');
	vRetVal = cleanFileTextFromTag(vRetVal,'script');
	
	//\todo -
	// { trdm 2023-06-18 09:09:15 
	//vRetVal = cleanFileTextByRegexp(vRetVal,'img'); // src="qrcx://localhost/icons/blank.png"
	//vRetVal = cleanFileTextFromRe(vRetVal,/onclick\=\"([^\"]+)\"/g);
	// надо удалить:
	//<img src="qrcx://localhost/icons/blank.png" class="gdcollapseicon" id="expandicon-8c8ffe4bd50ac512f3de59e1f613f965" title="Свернуть статью">
	// <a class="dsl_ref" href="gdlookup://localhost/hypothesis">hypothesis</a> ссылка для голдендикта, но надо обработать самому
	// } trdm 2023-06-18 09:09:15 
	var vApendHeadArr = new Array(2);
	vApendHeadArr[0] = '<link rel="stylesheet" type="text/css" href="_styles.css" />';
	vApendHeadArr[1] = '<script type="text/javascript" src = "_words.js"></script>';
	var vApendHead  = '';
	for(var i = 0; i<vApendHeadArr.length; i++) {
		vApendHead  = vApendHeadArr[i];
		if(vRetVal.indexOf(vApendHead) == -1) {
			vHeadStr = '</head>';
			vRetVal = vRetVal.replace(vHeadStr,vApendHead+vHeadStr);			//</head>
		}
    }

	
	if(vLen1 != vRetVal.length) {
		cleanFileTextSet(psPath,vRetVal);
    }	
	return 1;
}

// trdm  2022-02-06 10:15:50 
function clean() {
	var vRetVal = '';
	var vCuFolder = '';
	try { 
		// в jN для Notepad++ отладка скрипта запускается, но объект WScript - недоступен. по этому мухлюем в try/catch 
		vFileScr = gFso.GetFile(WScript.ScriptFullName);	
		gCurrPath = vFileScr.ParentFolder.Path; // WScript.Echo(gCurrPath);
		vCuFolder = vFileScr.ParentFolder;
    } catch(e) {
		gCurrPath = 'E:\\Документы\\Литература\\_English\\__СловарныйЗАпас\\Add'
		vCuFolder = gFso.GetFolder(gCurrPath);	
    }
	debugger;
	var vFilesEnum = new Enumerator(vCuFolder.files);   
	var vPathList = new Array;
	var vFileNm = '';
	for (; !vFilesEnum.atEnd();   vFilesEnum.moveNext()){   
		vFileNm = vFilesEnum.item().Name;
		vFileNm = vFileNm.toLocaleLowerCase();
		if(!strEndWithThis(vFileNm,'.html')) {
			continue;
		}
		vPath = vFilesEnum.item().Path;//	"E:\Документы\Литература\_English\__СловарныйЗАпас\Add\a.html"	String
		
		vPathList.push(vPath);
		if(vPathList.length > 2) {
			//break;
        }
    }   	
	for(var i = 0; i<vPathList.length; i++) {
		vPath = vPathList[i];
		cleanFile(vPath);
    }
	vStr = "Processing completed! Processed "+vPathList.length+" files! ";
	WScript.Echo(vStr);
	return vRetVal;
}
gFilePatApendix = ''; //'2.html';
clean();