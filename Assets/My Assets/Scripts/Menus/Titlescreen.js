var levelToLoad : String = "Main";
var creditsObj : GameObject;
var Titlescreen : GameObject;
function LoadLevel(){
	Application.LoadLevel(levelToLoad);
}
function QuitGame(){
	Application.Quit();
}
function SetDefaults(){
	if(!PlayerPrefs.HasKey("Difficulty")){
		PlayerPrefs.SetFloat("Difficulty",0.1);
		PlayerPrefs.Save();
	}
}
function Credits(){
	creditsObj.active = true;
	Titlescreen.active = false;
}
function Back(){
	Titlescreen.active = true;
	creditsObj.active = false;
}
function Start(){
	SetDefaults();
}