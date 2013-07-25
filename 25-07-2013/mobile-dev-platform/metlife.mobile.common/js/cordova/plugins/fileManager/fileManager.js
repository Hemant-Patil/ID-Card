define(function() {
	// prototype declaration for plugins
	var fileManager = {
		/**
		 * * Save the base64 String as a PDF file to the specified
		 * directory(i.e. in PDF folder)
		 * 
		 */
		savePDF : function(base64String,successPDF,errorPDF) {
       	cordova.exec(successPDF, errorPDF, "FileManager", "savePDF",
					[base64String,window.metlife.application.pdfDocName]);
		},
		openPDF : function(filePath,successOpenPDF,errorOpenPDF) {
			cordova.exec(successOpenPDF, errorOpenPDF, "FileManager", "openPDF",
					[filePath,window.metlife.application.pdfDocName]);
		},
        deleteSavedFile : function(filePath,successfulDelete,errorInDelete) {
            if(!successfulDelete){
                successfulDelete = function(data){
                    console.log('deleteFile.js > Success res:'+data);
                };
            }
            if(!errorInDelete){
                errorInDelete = function(error){
                    console.log('deleteFile.js > Err: '+error);
                };
            }
            cordova.exec(successfulDelete, errorInDelete, "FileManager", "deleteFile",
                    [filePath]);
       }
	};
	return fileManager;
});