var srcFiles = [
	'js/modules/Admin/controllers/FormaPgtController.js',
	'js/modules/Admin/services/FormaPagamentoService.js'  
]

$(function(){
	for (var i = 0; i < srcFiles.length; i++) {
		var imported = document.createElement('script');
		imported.src = srcFiles[i];
		document.head.appendChild(imported);
	};
});
