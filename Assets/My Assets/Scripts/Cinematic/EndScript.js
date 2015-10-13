var text : UI.Text;
var myString : String = "Hiiiii";
function loadTitlescreen(){
	PlayerPrefs.SetFloat("Difficulty",0); //No difficulty as a "win" reward :)
	PlayerPrefs.Save();
	Application.LoadLevel("Titlescreen");
}
function Update () {
	text.text = myString; //confusing
	if(Input.GetButtonDown("Jump")){
		loadTitlescreen();
	}
}