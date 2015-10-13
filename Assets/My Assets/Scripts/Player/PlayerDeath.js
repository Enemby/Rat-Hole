var myTUI : GameObject; //text
var myPUI : GameObject; //portrait
var deathObject : GameObject;
function deathConvo(){
	if(deathObject != null){
		nextConvo = Instantiate(deathObject,Vector3(0,0,0),Quaternion.identity);
		nextConvo.GetComponent("Conversation").myTUI = this.myTUI;
		nextConvo.GetComponent("Conversation").myPUI = this.myPUI;
		deathObject = null;
		yield WaitForSeconds(5);
		Application.LoadLevel(Application.loadedLevel);
	}
}
function Update () {
	if(GameObject.Find("Player") == null){
		deathConvo();
	}
}