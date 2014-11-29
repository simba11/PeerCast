window.onload = function() {

	var dropZoneTwo = document.querySelector('#dd-files');
	var fileContentPane = document.querySelector('#file-content');

	// Event Listener for when the dragged file is over the drop zone.
	dropZoneTwo.addEventListener('dragover', function(e) {
		if (e.preventDefault) e.preventDefault(); 
		if (e.stopPropagation) e.stopPropagation(); 

		e.dataTransfer.dropEffect = 'copy';
	});

	// Event Listener for when the dragged file enters the drop zone.
	dropZoneTwo.addEventListener('dragenter', function(e) {
		this.className = "over";
	});

	// Event Listener for when the dragged file leaves the drop zone.
	dropZoneTwo.addEventListener('dragleave', function(e) {
		this.className = "";
	});

	// Event Listener for when the dragged file dropped in the drop zone.
	dropZoneTwo.addEventListener('drop', function(e) {
		if (e.preventDefault) e.preventDefault(); 
		if (e.stopPropagation) e.stopPropagation(); 

		this.className = "";

		var fileList = e.dataTransfer.files;

		if (fileList.length > 0) {
			readTextFile(fileList[0]);
		}
	});


	// Read the contents of a file.
	function readTextFile(file) {
		var reader = new FileReader();

		reader.onloadend = function(e) {
			if (e.target.readyState == FileReader.DONE) {
				var content = reader.result;
				fileContentPane.innerHTML = /*"File: " + file.name + "\n\n" + */content;
				editor.getSession().setValue(content);
				conn.send(editor.getSession().getValue());

			}
		}
		
    reader.readAsBinaryString(file);
	}
	
};
