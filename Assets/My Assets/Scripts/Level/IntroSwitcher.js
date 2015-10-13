function Update () {
	if(GameObject.FindWithTag("Narrative") == null){
		Application.LoadLevel("Main");
	}
}