<script src="jquery.3.5.1.min.js">
</script>

function GetSelectedText () {
            if (document.getSelection) {    // all browsers, except IE before version 9
                var sel = document.getSelection ();
                    // sel is a string in Firefox and Opera, 
                    // and a selectionRange object in Google Chrome, Safari and IE from version 9
                    // the alert method displays the result of the toString method of the passed object
                alert (sel);
            } 
            else {
                if (document.selection) {   // Internet Explorer before version 9
                    var textRange = document.selection.createRange ();
                    alert (textRange.text);
                }
            }
        }
		

		
alert($('#copier').value);
//.onclick=GetSelectedText();