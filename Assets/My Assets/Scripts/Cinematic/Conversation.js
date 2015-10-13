var myText : String = "I have nothing to say.";
var waitTime : float = 0.2;
var mySound : AudioClip;
var myTUI : GameObject; //text
var myPUI : GameObject; //portrait
var endWaitTime : float = 2;
var nextObject : GameObject;
var portrait : Sprite;
function Type(){
	myPUI.GetComponent(UI.Image).sprite = portrait;
	for(var myletter in myText.ToCharArray()){
		if(myTUI.GetComponent(UI.Text).text.Length != myText.Length+1){
			myTUI.GetComponent(UI.Text).text +=myletter;
			if(mySound != null){
				this.GetComponent(AudioSource).PlayOneShot(mySound);
			}
		}
		yield WaitForSeconds(waitTime);
	}
}
function next(){
	yield WaitForSeconds(endWaitTime);
		if(nextObject != null){
			nextConvo = Instantiate(nextObject,Vector3(0,0,0),Quaternion.identity);
			nextConvo.GetComponent("Conversation").myTUI = this.myTUI;
			nextConvo.GetComponent("Conversation").myPUI = this.myPUI;
		}
		Destroy(this.gameObject);
}
function Start(){
	myTUI.GetComponent(UI.Text).text = "";
	Type();
}
function Update(){
	if(myTUI.GetComponent(UI.Text).text == myText){
		next();
	}
}