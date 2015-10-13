//Ramp difficulty on every win, then reload.
function OnTriggerEnter(colObj : Collider){
	if(colObj.gameObject.name == "Player"){
		PlayerPrefs.SetFloat("Difficulty",PlayerPrefs.GetFloat("Difficulty")+0.25);
		PlayerPrefs.Save();
		if(PlayerPrefs.GetFloat("Difficulty") >= 1){
			Application.LoadLevel("End"); //If we win 3 times, trigger end cutscene.
		}
		else{
			Application.LoadLevel(Application.loadedLevel);
		}
	}
}