
$('#SavePDF').click(function () {  

	// var imgLogo = '';
	var doc = new jsPDF('p','pt','a4');

	html2canvas($('#toPDF'), {
		onrendered: function(canvas){
			var img = canvas.toDataURL("image/png");			
			doc.addImage(img, 'PNG',45,30);
			doc.save('unilocker_renta.pdf');
		}
	});

});
